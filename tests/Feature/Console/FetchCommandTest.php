<?php

use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Services\Packagist\Contracts\Client;
use App\Services\Packagist\Http\Response;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use Tests\Fixtures\Packages;

it('fetches & stores kits', function () {
    // Arrange
    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json',
        [
            'type' => 'project',
            'tags' => ['laravel', 'starter', 'kit', 'starter-kit', 'starter kit', 'laravel starter kit']
        ],
        ['User-Agent' => 'Larakits (info@larakits.dev)']
    )->andReturn(
            new Response(
                status: 200,
                body: json_encode([
                    'results' => Packages::$all,
                    'total' => count(Packages::$all),
                    'next' => null,
                ]),
                headers: [
                    'Content-Type' => 'application/json',
                ],
            )
        );

    foreach (Packages::$detailed as $package) {
        $client->shouldReceive('get')->with(
            'https://packagist.org/packages/' . $package['package']['name'] . '.json',
            [],
            ['User-Agent' => 'Larakits (info@larakits.dev)']
        )->andReturn(
                new Response(
                    status: 200,
                    body: json_encode($package),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist($client, new Agent(name: 'Larakits', email: 'info@larakits.dev'));

    $this->instance(Packagist::class, $packagist);

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Kit::count())->toBe(4);
    // expect(Stack::count())->toBeGreaterThan(0);
    expect(Tag::count())->toBe(4);
})->only();

it('updates existing kits')->todo();