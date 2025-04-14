<?php

use App\Contracts\Http\Client;
use App\Http\Response;
use App\Services\Packagist\Actions\SearchPackages;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\Paginator;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    Http::preventingStrayRequests();
})->only();

it('searches packages by type', function () {
    // Arrange
    Http::fake([
        'https://packagist.org/search.json?type=project' => [
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
        ],
    ]);

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
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
    $response = new Response(
        status: 200,
        body: json_encode([
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
        headers: [
            'Content-Type' => 'application/json',
        ],
    );

    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json',                // URL
        ['tags' => ['project']],                            // Parameters
        ['User-Agent' => 'Test User (test@example.com)']    // Headers
    )->andReturn($response);

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(tags: ['project']);

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items())->toBeInstanceOf(Collection::class);
    expect($result->items()->first())->toBeInstanceOf(Package::class);
})->todo();

it('searches with page limit', function () {
    // Arrange
    $response = new Response(
        status: 200,
        body: json_encode([
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
            'total' => 4,
            'per_page' => 2,
            'next' => null,
        ]),
        headers: [
            'Content-Type' => 'application/json',
        ],
    );

    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json',                // URL
        ['type' => 'project', 'per_page' => 2],             // Parameters
        ['User-Agent' => 'Test User (test@example.com)']    // Headers
    )->andReturn($response);

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(type: 'project', perPage: 2);

    // Assert
    expect($result->perPage())->toBe(2);
})->todo();

it('gets specific package', function () {
    // Arrange
    $response = new Response(
        status: 200,
        body: json_encode([
            'package' => [
                'name' => 'laravel/laravel',
            'description' => 'The Laravel framework',
            'url' => 'https://packagist.org/packages/laravel/laravel',
            'repository' => 'https://github.com/laravel/laravel',
            'downloads' => 1,
            'favers' => 1,
            ]
        ]),
        headers: [
            'Content-Type' => 'application/json',
        ],
    );

    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/packages/laravel/laravel.json',
        [],
        ['User-Agent' => 'Test User (test@example.com)']
    )->andReturn($response);

    $packagist = new Packagist(
        searchPackages: new SearchPackages(),
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->get('laravel/laravel');

    // Assert
    expect($result)->toBeInstanceOf(Package::class);
})->todo();