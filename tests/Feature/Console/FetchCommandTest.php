<?php

declare(strict_types=1);

use App\Enums\TaskStatus;
use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use App\Models\Task;
use App\Services\Github\Github;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use Tests\Fixtures\Packages;

beforeEach(function () {
    Http::preventStrayRequests();
});

it('fetches & stores kits', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Kit::count())->toBe(4);
    expect(Stack::count())->toBeGreaterThan(0);
    expect(Tag::count())->toBeGreaterThan(0);
});

it('fetches through paginated results', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?type=project&tags%5B0%5D=laravel&tags%5B1%5D=starter-kit&tags%5B2%5D=starter%20kit&tags%5B3%5D=laravel-starter-kit&tags%5B4%5D=laravel%20starter%20kit&per_page=50' => Http::response([
            'results' => array_slice(Packages::$all, 0, 4),
            'total' => count(Packages::$all),
            'next' => 'https://packagist.org/search.json?type=project&tags%5B0%5D=laravel&tags%5B1%5D=starter-kit&tags%5B2%5D=starter%20kit&tags%5B3%5D=laravel-starter-kit&tags%5B4%5D=laravel%20starter%20kit&per_page=50&page=2',
        ]),
        'https://packagist.org/search.json?type=project&tags%5B0%5D=laravel&tags%5B1%5D=starter-kit&tags%5B2%5D=starter%20kit&tags%5B3%5D=laravel-starter-kit&tags%5B4%5D=laravel%20starter%20kit&per_page=50&page=2' => Http::response([
            'results' => array_slice(Packages::$all, 4, 4),
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Kit::count())->toBe(4);
    expect(Stack::count())->toBeGreaterThan(0);
    expect(Tag::count())->toBeGreaterThan(0);
});

it('updates existing kits', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $kit = Kit::factory()->create([
        'slug' => 'devdojo-wave',
        'name' => 'wave',
        'vendor' => 'devdojo',
        'description' => 'Wave SaaS Starter Kit',
        'source_url' => 'https://github.com/thedevdojo/wave',
        'source_type' => 'git',
        'stars' => 100,
        'downloads' => 1000,
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

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
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $tag = Tag::factory()->create([
        'slug' => 'saas',
        'name' => 'saas',
    ]);

    $stack = Stack::factory()->create([
        'slug' => 'laravel-livewire',
        'name' => 'laravel-livewire',
    ]);

    $kit = Kit::factory()->create([
        'slug' => 'devdojo-wave',
        'name' => 'wave',
        'vendor' => 'devdojo',
        'description' => 'Wave SaaS Starter Kit',
        'source_url' => 'https://github.com/thedevdojo/wave',
        'source_type' => 'git',
        'stars' => 100,
        'downloads' => 1000,
    ]);

    $kit->tags()->attach($tag);
    $kit->stacks()->attach($stack);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');
    $kit = $kit->refresh();

    // Assert
    expect(Kit::count())->toBe(4);
    expect($kit->slug)->toBe('devdojo-wave');
    expect($kit->stars)->toBe(5928);
    expect($kit->downloads)->toBe(491);
    expect($kit->tags()->count())->toBe(1);
    expect($kit->stacks()->count())->toBe(3);
});

it('updates current task on success', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::first()->status)->toBe(TaskStatus::SUCCESS);
});

it('updates current task on failure', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response('Server error', 500),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::first()->status)->toBe(TaskStatus::FAILED);
});

it('schedules next task', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $this->artisan('fetch:kits');

    // Assert
    expect(Task::count())->toBe(2);
});

it('fetches kits in debug mode', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $result = $this->artisan('fetch:kits --debug');

    // Assert
    $result->assertExitCode(0);
});

it('fetches new kits only', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => Packages::$all,
            'total' => count(Packages::$all),
            'next' => null,
        ]),
        'https://packagist.org/packages/*' => Http::sequence(array_map(
            fn ($package) => Http::response($package),
            Packages::$detailed
        )),
        'https://api.github.com/repos/*' => Http::sequence(array_map(
            fn ($packageJson) => Http::response([
                'content' => base64_encode(json_encode($packageJson)),
            ]),
            Packages::$packageJsons
        )),
    ]);

    Kit::factory()->create([
        'slug' => 'devdojo-wave',
        'name' => 'wave',
        'vendor' => 'devdojo',
        'description' => 'Wave SaaS Starter Kit',
        'source_url' => 'https://github.com/thedevdojo/wave',
        'source_type' => 'git',
        'stars' => 100,
        'downloads' => 1000,
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Larakits', email: 'info@larakits.dev')
    );

    $this->instance(Packagist::class, $packagist);
    $this->instance(Github::class, new Github());

    // Act
    $result = $this->artisan('fetch:kits --new');

    // Assert
    $result->assertExitCode(0);
    Http::assertNotSent(function (Request $request) {
        return $request->url() === 'https://packagist.org/packages/laravel/wave';
    });
});
