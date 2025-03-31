<?php

namespace App\Console\Commands;

use App\Models\Kit;
use App\Services\Packagist\Packagist;
use App\Strategies\KeywordStrategy;
use App\ValueObjects\Payload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Pipeline;
use App\Contracts\Strategy;

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

        foreach ($paginator->items as $package) {
            $package = $packagist->get($package->name);

            $payload = new Payload(package: $package, isKit: false);

            /** @var array<class-string<Strategy>> */
            $strategies = [
                KeywordStrategy::class,
            ];

            Pipeline::send(passable: $payload)
                ->through(pipes: $strategies)
                ->finally(callback: function (Payload $payload): void {
                    if ($payload->isKit) {
                        [$vendor, $name] = explode('/', $payload->package->name);

                        Kit::create(attributes: [
                            'slug' => str($payload->package->name)->slug()->value(),
                            'name' => $name,
                            'vendor' => $vendor,
                            'description' => $payload->package->description,
                        ]);
                    }
                })->thenReturn();
        }
    }
}
