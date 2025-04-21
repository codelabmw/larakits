<?php

declare(strict_types=1);

use App\Exceptions\ConnectionException;
use App\Services\Github\Github;
use Illuminate\Http\Client\Request;

beforeEach(function (): void {
    Http::preventStrayRequests();
});

it('gets file contents', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework/contents/example.json' => Http::response([
            'content' => base64_encode('Hello World'),
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $github = new Github();

    // Act
    $result = $github->contents('laravel', 'framework', 'example.json');

    // Assert
    expect(base64_decode($result))->toBe('Hello World');
    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.github.com/repos/laravel/framework/contents/example.json');
});

it('retries on failure', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework/contents/example.json' => Http::sequence()
            ->push('Server error', 500)
            ->push('Server error', 500)
            ->push([
                'content' => base64_encode('Hello World'),
            ], 200),
    ]);

    $github = new Github();

    // Act
    $result = $github->contents('laravel', 'framework', 'example.json');

    // Assert
    expect(base64_decode($result))->toBe('Hello World');
    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.github.com/repos/laravel/framework/contents/example.json');
});

it('ignores retrying on common client errors', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework/contents/example.json' => Http::sequence()
            ->push('Server error', 404)
            ->push([
                'content' => base64_encode('Hello World'),
            ], 200),
    ]);

    $github = new Github();

    // Act
    $github->contents('laravel', 'framework', 'example.json');
})->throws(ConnectionException::class);

it('parses owner and repository from URL', function (): void {
    // Arrange
    $url = 'https://github.com/laravel/framework';

    // Act
    $result = Github::ownerAndRepo($url);

    // Assert
    expect($result)->toBe(['laravel', 'framework']);
});

it('throws on invalid URL', function (): void {
    // Arrange
    $url = 'https://laravel.com/laravel';

    // Act
    Github::ownerAndRepo($url);
})->throws(InvalidArgumentException::class);

it('gets a repositories stars', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework' => Http::response([
            'stargazers_count' => 1000,
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $github = new Github();

    // Act
    $result = $github->stars('laravel', 'framework');

    // Assert
    expect($result)->toBe(1000);
    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.github.com/repos/laravel/framework');
});

it('gets a repositories stars with token', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework' => Http::response([
            'stargazers_count' => 1000,
        ], 200, [
            'Content-Type' => 'application/json',
        ]),
    ]);

    $github = new Github();

    // Act
    $result = $github->stars('laravel', 'framework', 'token');

    // Assert
    expect($result)->toBe(1000);
    Http::assertSent(fn (Request $request) => $request->hasHeader('Authorization', 'token token'));
});

it('retries getting stars on failure', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework' => Http::sequence()
            ->push('Server error', 500)
            ->push('Server error', 500)
            ->push([
                'stargazers_count' => 1000,
            ], 200),
    ]);

    $github = new Github();

    // Act
    $result = $github->stars('laravel', 'framework');

    // Assert
    expect($result)->toBe(1000);
    Http::assertSent(fn (Request $request): bool => $request->url() === 'https://api.github.com/repos/laravel/framework');
});

it('ignores retrying getting stars on common client errors', function (): void {
    // Arrange
    Http::fake([
        'https://api.github.com/repos/laravel/framework' => Http::sequence()
            ->push('Server error', 404)
            ->push('Server error', 403)
            ->push([
                'stargazers_count' => 1000,
            ], 200),
    ]);

    $github = new Github();

    // Act
    $github->stars('laravel', 'framework');
})->throws(ConnectionException::class);
