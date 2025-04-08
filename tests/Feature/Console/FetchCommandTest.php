<?php

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;
use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Http\Response;
use App\Models\Task;
use App\Services\Github\Github;
use App\Services\Packagist\Actions\SearchPackages;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use Tests\Fixtures\Packages;

beforeEach()->only();

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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Kit::count())->toBe(4);
    expect(Stack::count())->toBeGreaterThan(0);
    expect(Tag::count())->toBeGreaterThan(0);
});

it('fetches through paginated results', function () {
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
                    'results' => array_slice(Packages::$all, 0, 4),
                    'total' => count(Packages::$all),
                    'next' => 'https://packagist.org/search.json?tags=laravel&tags=starter&tags=kit&tags=starter-kit&tags=starter+kit&tags=laravel+starter+kit&page=2',
                ]),
                headers: [
                    'Content-Type' => 'application/json',
                ],
            )
        );

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json?tags=laravel&tags=starter&tags=kit&tags=starter-kit&tags=starter+kit&tags=laravel+starter+kit&page=2',
        [
        ],
        ['User-Agent' => 'Larakits (info@larakits.dev)']
    )->andReturn(
            new Response(
                status: 200,
                body: json_encode([
                    'results' => array_slice(Packages::$all, 4),
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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Kit::count())->toBe(4);
    expect(Stack::count())->toBeGreaterThan(0);
    expect(Tag::count())->toBeGreaterThan(0);
});

it('updates existing kits', function () {
    // Arrange
    $kit = Kit::factory()->create([
        'slug' => 'devdojo-wave',
        'name' => 'wave',
        'vendor' => 'devdojo',
        'description' => 'Wave SaaS Starter Kit',
        'source_url' => 'https://github.com/thedevdojo/wave',
        'source_type' => 'git',
        'stars' => 100,
        'downloads' => 1000
    ]);

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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');
    $kit = $kit->refresh();

    // Assert
    expect(Kit::count())->toBe(4);
    expect($kit->slug)->toBe('devdojo-wave');
    expect($kit->stars)->toBe(5928);
    expect($kit->downloads)->toBe(491);
});

it('updates existing kits that has tags/stacks', function () {
    // Arrange
    $tag = Tag::factory()->create([
        'slug' => 'saas',
        'name' => 'saas'
    ]);

    $stack = Stack::factory()->create([
        'slug' => 'laravel-livewire',
        'name' => 'laravel-livewire'
    ]);

    $kit = Kit::factory()->create([
        'slug' => 'devdojo-wave',
        'name' => 'wave',
        'vendor' => 'devdojo',
        'description' => 'Wave SaaS Starter Kit',
        'source_url' => 'https://github.com/thedevdojo/wave',
        'source_type' => 'git',
        'stars' => 100,
        'downloads' => 1000
    ]);

    $kit->tags()->attach($tag);
    $kit->stacks()->attach($stack);

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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');
    $kit = $kit->refresh();

    // Assert
    expect(Kit::count())->toBe(4);
    expect($kit->slug)->toBe('devdojo-wave');
    expect($kit->stars)->toBe(5928);
    expect($kit->downloads)->toBe(491);
    expect($kit->tags()->count())->toBe(2);
    expect($kit->stacks()->count())->toBe(2);
});

it('updates current task on success', function () {
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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::first()->status)->toBe('success');
});

it('updates current task on failure', function () {
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
                status: 500,
                body: json_encode([
                    'error' => 'Internal Server Error'
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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::first()->status)->toBe('failed');
});

it('schedules next task', function () {
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

    foreach (Packages::$starterKitRepos as $key => $respository) {
        [$owner, $repo] = Github::ownerAndRepo($respository);

        $client->shouldReceive('get')->with(
            "https://api.github.com/repos/{$owner}/{$repo}/contents/package.json",
            [],
            ['Accept' => 'application/vnd.github.v3+json']
        )->andReturn(
                new Response(
                    status: 200,
                    body: base64_encode(json_encode(Packages::$packageJsons[$key])),
                    headers: [
                        'Content-Type' => 'application/json',
                    ],
                )
            );
    }

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github($client));

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::count())->toBe(2);
});