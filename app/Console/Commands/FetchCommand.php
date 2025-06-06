<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Actions\EnsureIsLaravelProject;
use App\Contracts\Guessor;
use App\Enums\TaskStatus;
use App\Exceptions\ConnectionException;
use App\Guessors\Kit\ByDescription;
use App\Guessors\Kit\ByKeyword;
use App\Guessors\Kit\ByName;
use App\Guessors\Stack\Bootstrap;
use App\Guessors\Stack\Livewire;
use App\Guessors\Stack\React;
use App\Guessors\Stack\Tailwindcss;
use App\Guessors\Stack\Volt;
use App\Guessors\Stack\Vue;
use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Models\Task;
use App\Services\Github\Github;
use App\Services\Packagist\Packagist;
use App\Services\Timer;
use App\ValueObjects\KitPayload;
use App\ValueObjects\StackPayload;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Support\Str;
use InvalidArgumentException;

// @codeCoverageIgnoreStart
class FetchCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:kits 
                            {--packagist= : Base URL of Packagist}
                            {--new : Only fetch new kits}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch kits from Packagist.';

    /**
     * The logger instance.
     *
     * @var \Psr\Log\LoggerInterface
     */
    private $logger;

    /**
     * Creates a new command instance.
     */
    public function __construct(private readonly Timer $timer)
    {
        parent::__construct();
        $this->logger = Log::channel('fetch');
    }

    /**
     * Execute the console command.
     */
    public function handle(Packagist $packagist, EnsureIsLaravelProject $isLaravelProject): void
    {
        $task = Task::openTask();

        if (! $task instanceof Task || ! $task->shouldRun()) {
            return;
        }

        $this->timer->start();

        $task->markPending();

        $baseUrl = $this->option('packagist');
        $onlyNew = $this->option('new');

        try {
            $this->logger->info('------ Fetching kits from Packagist ------');

            $paginator = $packagist->search(
                type: 'project',
                tags: ['laravel', 'starter-kit', 'starter kit', 'laravel-starter-kit', 'laravel starter kit'],
                perPage: 50,
                baseUrl: $baseUrl,
            );

            $this->logger->info('Fetched kits from Packagist.');

            do {
                $paginator->items()->each(
                    function ($package) use ($packagist, $isLaravelProject, $baseUrl, $onlyNew): void {
                        if ($onlyNew && Kit::hasPackage($package->name)) {
                            $this->logger->info('Kit '.$package->name.' already exists. Skipping...');

                            return;
                        }

                        $this->logger->info('Fetching kit '.$package->name.'...');

                        try {
                            $package = $packagist->get($package->name, baseUrl: $baseUrl);

                            $this->logger->info('Fetched kit '.$package->name.'.');

                            if ($isLaravelProject($package)) {
                                $kitPayload = new KitPayload(package: $package, isKit: false);

                                /** @var array<class-string<Guessor>> */
                                $guessors = [
                                    ByKeyword::class,
                                    ByName::class,
                                    ByDescription::class,
                                ];

                                Pipeline::send($kitPayload)
                                    ->through($guessors)
                                    ->thenReturn();

                                $this->saveKit($kitPayload);
                            }
                        } catch (ConnectionException $exception) {
                            $this->logger->error('Failed to fetch kit '.$package->name.'.');

                            if (! in_array($exception->response->status(), [404, 401, 403])) {
                                throw $exception;
                            }
                        }
                    }
                );
            } while ($paginator->next());
        } catch (Exception $exception) {
            $this->logger->error('Failed to fetch kits from Packagist.');

            if ($exception instanceof ConnectionException) {

                $task->markFailed(json_encode([
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'payload' => [
                        'name' => 'response',
                        'status' => $exception->response->status(),
                        'body' => $exception->response->body(),
                        'headers' => $exception->response->headers(),
                    ],
                ]));
            } else {
                $task->markFailed(json_encode([
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                ]));
            }
        } finally {
            $task->refresh();
        }

        if ($task->status === TaskStatus::PENDING) {
            $task->markSuccessful();
        }

        // If the task is successful, schedule the next task tommorow at a random time
        // Else schedule the next task today at a random time between 10 minutes from now and 2 hours from now
        $nextRunTime = $task->should_run_at;

        if ($task->status === TaskStatus::SUCCESS) {
            $nextRunTime = $nextRunTime->addDay()
                ->setTime(random_int(0, 23), random_int(0, 59));
        } else {
            $nextRunTime = $nextRunTime->addMinutes(random_int(10, 120));
        }

        Task::create([
            'status' => TaskStatus::OPEN->value,
            'should_run_at' => $nextRunTime,
        ]);

        $this->timer->stop();
        $this->logger->info('------ Fetch kits task completed. Took '.number_format($this->timer->duration(), 2).' seconds. ------');
    }

    /**
     * Saves the kit to the database.
     */
    private function saveKit(KitPayload $kitPayload): void
    {
        if ($kitPayload->isKit) {
            $package = $kitPayload->package;

            /** @var array{composer: array<int, string>, npm: array<int, string>} */
            $dependencies = [
                'composer' => array_keys(array_merge(
                    $package->require ?? [],
                    $package->requireDev ?? [],
                )),
                'npm' => [],
            ];

            if ($package->source['type'] === 'git') {
                /** @var Github */
                $github = App::make(Github::class);

                try {
                    [$owner, $repo] = Github::ownerAndRepo($package->source['url']);
                    $repo = Str::remove(subject: $repo, search: '.git');

                    $packageJson = $github->contents($owner, $repo, 'package.json');
                    $packageJson = json_decode(base64_decode($packageJson), true);

                    $dependencies['npm'] = array_keys(array_merge(
                        $packageJson['dependencies'] ?? [],
                        $packageJson['devDependencies'] ?? [],
                    ));
                } catch (ConnectionException) {
                    //
                } catch (InvalidArgumentException) {
                    // TODO: Handle other reposioty types.
                }
            }

            $stackPayload = new StackPayload($dependencies);

            /** @var array<class-string<Guessor>> */
            $guessors = [
                React::class,
                Vue::class,
                Livewire::class,
                Tailwindcss::class,
                Volt::class,
                Bootstrap::class,
            ];

            Pipeline::send($stackPayload)
                ->through($guessors)
                ->thenReturn();

            $stacks = $stackPayload->getStacks();

            DB::transaction(function () use ($package, $stacks): void {
                [$vendor, $name] = explode('/', (string) $package->name);

                $metadata = [
                    'description' => $package->description,
                    'source_url' => $package->source['url'],
                    'source_type' => $package->source['type'],
                    'stars' => $package->stars,
                    'downloads' => $package->downloads,
                    'maintainers' => $package->maintainers,
                    'authors' => $package->authors,
                    'licenses' => $package->licenses,
                ];

                $kit = Kit::firstOrCreate(
                    attributes: [
                        'slug' => Str::slug(implode('-', [$vendor, $name])),
                        'name' => $name,
                        'vendor' => $vendor,
                    ],
                    values: $metadata
                );

                $kit->fill($metadata);

                if ($kit->isDirty()) {
                    $kit->save();
                }

                $keywords = array_filter(
                    $package->keywords,
                    fn ($keyword): bool => ! in_array($keyword, [
                        'laravel',
                        'starter',
                        'kit',
                        'starter-kit',
                        'starter kit',
                        'laravel starter kit',
                        'framework',
                    ])
                );

                $tags = array_unique($keywords);

                foreach ($tags as $keyword) {
                    try {
                        $tag = Tag::firstOrCreate(['slug' => Str::slug($keyword), 'name' => $keyword]);
                        $kit->tags()->attach($tag);
                    } catch (UniqueConstraintViolationException) {
                        //
                    }
                }

                foreach ($stacks as $stack) {
                    try {
                        $stack = Stack::firstOrCreate(['slug' => Str::slug($stack), 'name' => $stack]);
                        $kit->stacks()->attach($stack);
                    } catch (UniqueConstraintViolationException) {
                        //
                    }
                }
            });
        }
    }
}
// @codeCoverageIgnoreEnd
