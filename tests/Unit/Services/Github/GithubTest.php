<?php

use App\Contracts\Http\Client;
use App\Contracts\Http\Response;
use App\Services\Github\Github;

test('service can be instantiated', function () {
    // Arrange
    $github = new Github(client: Mockery::mock(Client::class));

    // Assert
    expect($github)->toBeInstanceOf(Github::class);
});

it('gets file contents', function () {
    // Arrange
    $client = Mockery::mock(Client::class);
    $response = Mockery::mock(Response::class);

    $client->shouldReceive('get')->with(
        'https://api.github.com/repos/laravel/framework/contents/example.json',
        [],
        ['Accept' => 'application/vnd.github.v3+json']
    )->andReturn($response);

    $response->shouldReceive('status')->andReturn(200);
    $response->shouldReceive('body')->andReturn(base64_encode(json_encode(['content' => 'Hello World'])));
    $response->shouldReceive('json')->andReturn(['content' => 'Hello World']);

    $github = new Github($client);

    // Act
    $result = $github->jsonContent('laravel', 'framework', 'example.json');

    // Assert
    expect($result)->toBe(['content' => 'Hello World']);
});