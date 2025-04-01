<?php

namespace App\Console\Commands;

use App\Actions\EnsureIsLaravelProject;
use App\Guessors\Kit\ByDescription;
use App\Guessors\Kit\ByKeyword;
use App\Guessors\Kit\ByName;
use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Services\Packagist\Packagist;
use App\ValueObjects\Payload as KitPayload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Pipeline;
use App\Contracts\Guessor;
use Illuminate\Support\Str;
use App\Services\Github\Github;

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
        $paginator = $packagist->search(
            type: 'project',
            tags: ['laravel', 'starter', 'kit', 'starter-kit', 'starter kit', 'laravel starter kit'],
        );

        $paginator->items->each(function ($package) use ($packagist, $isLaravelProject) {
            $package = $packagist->get($package->name);

            if ($isLaravelProject($package)) {
                $payload = new KitPayload(package: $package, isKit: false);

                /** @var array<class-string<Guessor>> */
                $strategies = [
                    ByKeyword::class,
                    ByName::class,
                    ByDescription::class,
                ];

                Pipeline::send($payload)
                    ->through($strategies)
                    ->finally(function (KitPayload $kitPayload): void {
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

                            $stackPayload = new StackPayload(dependencies: $dependencies);

                            /** @var array<class-string<Guessor>> */
                            $strategies = [];

                            Pipeline::send($stackPayload)
                                ->through($strategies)
                                ->thenReturn();

                            $stacks = $stackPayload->getStacks();

                            DB::transaction(function () use ($package, $stacks): void {
                                [$vendor, $name] = explode('/', $package->name);

                                $kit = Kit::create(attributes: [
                                    'slug' => Str::slug($package->name),
                                    'name' => $name,
                                    'vendor' => $vendor,
                                    'description' => $package->description,
                                    'source_url' => $package->source['url'],
                                    'source_type' => $package->source['type'],
                                    'stars' => $package->stars,
                                    'downloads' => $package->downloads,
                                    'maintainers' => $package->maintainers,
                                    'authors' => $package->authors,
                                    'licenses' => $package->licenses,
                                ]);

                                foreach ($package->keywords as $keyword) {
                                    $tag = Tag::firstOrCreate(['slug' => Str::slug($keyword), 'name' => $keyword]);
                                    $kit->tags()->attach($tag);
                                }

                                foreach ($stacks as $stack) {
                                    $stack = Stack::firstOrCreate(['slug' => Str::slug($stack), 'name' => $stack]);
                                    $kit->stacks()->attach($stack);
                                }
                            });
                        }
                    })->thenReturn();
            }
        });
    }
}
