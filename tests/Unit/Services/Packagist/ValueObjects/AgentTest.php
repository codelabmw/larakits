<?php

declare(strict_types=1);

use App\Services\Packagist\ValueObjects\Agent;

it('is stringangle', function (): void {
    expect(Agent::class)->toImplement(Stringable::class);
});

it('has a name & email', function (): void {
    // Arrange
    $agent = new Agent(name: 'Test User', email: 'test@example.com');

    // Assert
    expect($agent->name)->toBe('Test User');
    expect($agent->email)->toBe('test@example.com');
});

it('parses to string', function (): void {
    // Arrange
    $agent = new Agent(name: 'Test User', email: 'test@example.com');

    // Assert
    expect((string) $agent)->toBe('Test User (test@example.com)');
});
