<?php

use App\Services\Packagist\Http\Response;
use App\Services\Packagist\Packagist;
use App\Services\Packagist\Contracts\Client;
use App\Services\Packagist\Paginator;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;
use Illuminate\Support\Collection;

beforeEach(function () {
    $this->response = new Response(
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
})->only();

test('service can be instantiated', function () {
    // Arrange
    $client = Mockery::mock(Client::class);

    $packagist = new Packagist(
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Assert
    expect($packagist)->toBeInstanceOf(Packagist::class);
});

it('searches packages by type', function () {
    // Arrange
    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json',                // URL
        ['type' => 'project'],                              // Parameters
        ['User-Agent' => 'Test User (test@example.com)']    // Headers
    )->andReturn($this->response);

    $packagist = new Packagist(
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(type: 'project');

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items)->toBeInstanceOf(Collection::class);
    expect($result->items->first())->toBeInstanceOf(Package::class);
});

it('searches packages by tags', function () {
    // Arrange
    $client = Mockery::mock(Client::class);

    $client->shouldReceive('get')->with(
        'https://packagist.org/search.json',                // URL
        ['tags' => ['project']],                            // Parameters
        ['User-Agent' => 'Test User (test@example.com)']    // Headers
    )->andReturn($this->response);

    $packagist = new Packagist(
        client: $client,
        agent: new Agent(name: 'Test User', email: 'test@example.com')
    );

    // Act
    $result = $packagist->search(tags: ['project']);

    // Assert
    expect($result)->toBeInstanceOf(Paginator::class);
    expect($result->items)->toBeInstanceOf(Collection::class);
    expect($result->items->first())->toBeInstanceOf(Package::class);
});

it('gets specific package')->todo();