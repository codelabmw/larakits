<?php

namespace App\Console\Commands;

use App\Actions\EnsureIsLaravelProject;
use App\Enums\TaskStatus;
use App\Exceptions\ConnectionException;
use App\Guessors\Kit\ByDescription;
use App\Guessors\Kit\ByKeyword;
use App\Guessors\Kit\ByName;
use App\Guessors\Stack\Livewire;
use App\Guessors\Stack\React;
use App\Guessors\Stack\Tailwindcss;
use App\Guessors\Stack\Vue;
use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Models\Task;
use App\Services\Packagist\Packagist;
use App\ValueObjects\KitPayload as KitPayload;
use App\ValueObjects\StackPayload;
use Illuminate\Console\Command;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Pipeline;
use App\Contracts\Guessor;
use Illuminate\Support\Str;
use App\Services\Github\Github;
use PDOException;

class FetchCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:kits';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch kits from Packagist.';

    /**
     * Execute the console command.
     */
    public function handle(Packagist $packagist, EnsureIsLaravelProject $isLaravelProject)
    {

        $task = Task::currentTask();

        try {
            $paginator = $packagist->search(
                type: 'project',
                tags: ['laravel', 'starter', 'kit', 'starter-kit', 'starter kit', 'laravel starter kit'],
            );

            do {
                $paginator->items()->each(function ($package) use ($packagist, $isLaravelProject) {
                    $package = $packagist->get($package->name);

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
                });
            } while ($paginator->next());
        } catch (ConnectionException $exception) {
            $task?->markFailed(json_encode([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                'payload' => [
                    'name' => 'response',
                    'status' => $exception->response->status(),
                    'body' => $exception->response->body(),
                    'headers' => $exception->response->headers(),
                ]
            ]));
        } finally {
            $task?->refresh();
        }

        if ($task?->status === TaskStatus::PENDING) {
            $task->markSuccessful();
        }

        // If the task is successful, schedule the next task tommorow at a random time
        // Else schedule the next task today at a random time between 10 minutes from now and 2 hours from now
        $nextRunTime = $task->should_run_at;

        if ($task->status === TaskStatus::SUCCESS) {
            $nextRunTime = $nextRunTime->addDay()->addMinutes(random_int(10, 120));
        } else {
            $nextRunTime = $nextRunTime->addMinutes(random_int(10, 120));
        }

        Task::create([
            'status' => TaskStatus::PENDING,
            'should_run_at' => $nextRunTime,
        ]);
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
            ];

            if ($package->source['type'] === 'git') {
                /** @var Github */
                $github = App::make(Github::class);

                [$owner, $repo] = Github::ownerAndRepo($package->source['url']);
                $packageJson = $github->jsonContent($owner, $repo, 'package.json');

                $dependencies['npm'] = array_keys(array_merge(
                    $packageJson['dependencies'] ?? [],
                    $packageJson['devDependencies'] ?? [],
                ));
            }

            $stackPayload = new StackPayload($dependencies);

            /** @var array<class-string<Guessor>> */
            $guessors = [
                React::class,
                Vue::class,
                Livewire::class,
                Tailwindcss::class,
            ];

            Pipeline::send($stackPayload)
                ->through($guessors)
                ->thenReturn();

            $stacks = $stackPayload->getStacks();

            DB::transaction(function () use ($package, $stacks): void {
                [$vendor, $name] = explode('/', $package->name);

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
                    fn($keyword) => !in_array($keyword, [
                        'laravel',
                        'starter',
                        'kit',
                        'starter-kit',
                        'starter kit',
                        'laravel starter kit',
                    ])
                );

                $tags = array_unique($keywords);

                foreach ($tags as $keyword) {
                    $tag = Tag::firstOrCreate(['slug' => Str::slug($keyword), 'name' => $keyword]);

                    try {
                        $kit->tags()->attach($tag);
                    } catch (UniqueConstraintViolationException $e) {
                        //
                    }
                }

                foreach ($stacks as $stack) {
                    $stack = Stack::firstOrCreate(['slug' => Str::slug($stack), 'name' => $stack]);

                    try {
                        $kit->stacks()->attach($stack);
                    } catch (UniqueConstraintViolationException $e) {
                        //
                    }
                }
            });
        }
    }
}
