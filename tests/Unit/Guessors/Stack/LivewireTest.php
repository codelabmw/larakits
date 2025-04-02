<?php

use App\Guessors\Stack\Livewire;
use App\ValueObjects\StackPayload;

test('it guesses livewire stack', function () {
    // Arrange
    $payload = new StackPayload([
        'composer' => ['pestphp/pest', 'laravel/livewire', 'laravel/framework'],
    ]);

    // Act
    (new Livewire)->handle($payload, fn($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['laravel/livewire']);
});