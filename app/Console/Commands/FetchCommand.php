<?php

namespace App\Console\Commands;

use App\Models\Kit;
use App\Models\Tag;
use App\Services\Packagist\Packagist;
use App\Strategies\DescriptionStrategy;
use App\Strategies\KeywordStrategy;
use App\Strategies\NameStrategy;
use App\ValueObjects\Payload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Pipeline;
use App\Contracts\Strategy;
use Illuminate\Support\Str;

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
    public function handle(Packagist $packagist)
    {
        $paginator = $packagist->search(
            type: 'project',
            tags: ['laravel', 'starter', 'kit', 'starter-kit', 'starter kit', 'laravel starter kit'],
        );

        $paginator->items->each(function ($package) use ($packagist) {
            $package = $packagist->get($package->name);
            $payload = new Payload(package: $package, isKit: false);

            /** @var array<class-string<Strategy>> */
            $strategies = [
                KeywordStrategy::class,
                NameStrategy::class,
                DescriptionStrategy::class,
            ];

            Pipeline::send($payload)
                ->through($strategies)
                ->finally(function (Payload $payload): void {
                    if ($payload->isKit) {
                        [$vendor, $name] = explode('/', $payload->package->name);
                        $package = $payload->package;

                        DB::transaction(function () use ($package, $vendor, $name): void {
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
                        });
                    }
                })->thenReturn();
        });
    }
}
