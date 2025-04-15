<?php

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;
use App\Http\Response;
use App\Services\Packagist\Actions\SearchPackages;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\Paginator;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Tests\Fixtures\Packages;

beforeEach(function () {
    Http::preventStrayRequests();
})->only();

it('searches packages by type', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => [
                [
                    "name" => "[vendor]/[package]",
                    "description" => "[description]",
                    "url" => "https://packagist.org/packages/[vendor]/[package]",
                    "repository" => '[repository url]',
                    "downloads" => 1,
                    "favers" => 1,
                ],
            ],
            'total' => 1,
            'next' => null,
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(type: 'project');

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items())->toBeInstanceOf(Collection::class);
    expect($result->items()->first())->toBeInstanceOf(Package::class);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/search.json?type=project';
    });
});

it('searches packages by tags', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => [
                [
                    "name" => "[vendor]/[package]",
                    "description" => "[description]",
                    "url" => "https://packagist.org/packages/[vendor]/[package]",
                    "repository" => '[repository url]',
                    "downloads" => 1,
                    "favers" => 1,
                ],
            ],
            'total' => 1,
            'next' => null,
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(tags: ['laravel', 'starter-kit']);

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items())->toBeInstanceOf(Collection::class);
    expect($result->items()->first())->toBeInstanceOf(Package::class);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/search.json?tags%5B0%5D=laravel&tags%5B1%5D=starter-kit';
    });
});

it('retries search request on failure', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::sequence()
            ->push('Server error', 500)
            ->push('Server error', 500)
            ->push([
                'results' => [
                    [
                        "name" => "[vendor]/[package]",
                        "description" => "[description]",
                        "url" => "https://packagist.org/packages/[vendor]/[package]",
                        "repository" => '[repository url]',
                        "downloads" => 1,
                        "favers" => 1,
                    ],
                ],
                'total' => 1,
                'next' => null,
            ], 200, [
                'Content-Type' => 'application/json',
            ]),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(type: 'project');

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items())->toBeInstanceOf(Collection::class);
    expect($result->items()->first())->toBeInstanceOf(Package::class);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/search.json?type=project';
    });
});

it('ignores retrying on common client errors', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::sequence()
            ->push('Server error', 404)
            ->push([
                'status' => 200,
                'body' => json_encode([
                    'results' => [
                        [
                            "name" => "[vendor]/[package]",
                            "description" => "[description]",
                            "url" => "https://packagist.org/packages/[vendor]/[package]",
                            "repository" => '[repository url]',
                            "downloads" => 1,
                            "favers" => 1,
                        ],
                    ],
                    'total' => 1,
                    'next' => null,
                ]),
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
            ], 200)
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $packagist->search(type: 'project');
})->throws(ConnectionException::class);

it('searches with page limit', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?*' => Http::response([
            'results' => [
                [
                    "name" => "[vendor]/[package]",
                    "description" => "[description]",
                    "url" => "https://packagist.org/packages/[vendor]/[package]",
                    "repository" => '[repository url]',
                    "downloads" => 1,
                    "favers" => 1,
                ],
                [
                    "name" => "[vendor]/[package]",
                    "description" => "[description]",
                    "url" => "https://packagist.org/packages/[vendor]/[package]",
                    "repository" => '[repository url]',
                    "downloads" => 1,
                    "favers" => 1,
                ],
            ],
            'total' => 4,
            'per_page' => 2,
            'next' => null,
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(type: 'project', perPage: 2);

    // Assert
    expect($result->perPage())->toBe(2);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/search.json?type=project&per_page=2';
    });
});

it('gets specific package', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/packages/*' => Http::response([
            'package' => Packages::$detailed[0],
        ], 200),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->get('laravel/laravel');

    // Assert
    expect($result)->toBeInstanceOf(Package::class);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/packages/laravel/laravel.json';
    });
});

it('retries getting deatils on failure', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/packages/*' => Http::sequence()
            ->push('Server error', 500)
            ->push('Server error', 500)
            ->push([
                'package' => Packages::$detailed[0],
            ], 200),
    ]);

    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->get('laravel/laravel');

    // Assert
    expect($result)->toBeInstanceOf(Package::class);

    Http::assertSent(function (Request $request) {
        return $request->hasHeader('User-Agent', 'Test User (test@example.com)') &&
            $request->url() === 'https://packagist.org/packages/laravel/laravel.json';
    });
});