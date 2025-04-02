<?php

use App\Guessors\Stack\React;
use App\ValueObjects\StackPayload;

test('it guesses react stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['react', 'react-dom', 'vue', 'livewire'],
    ]);

    // Act
    (new React)->handle($payload, fn($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['react']);
});