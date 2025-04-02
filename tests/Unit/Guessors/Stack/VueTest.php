<?php

use App\Guessors\Stack\Vue;
use App\ValueObjects\StackPayload;

test('it guesses vue stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['vue', 'vue-router', 'react', 'react-dom'],
    ]);

    // Act
    (new Vue)->handle($payload, fn($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['vue']);
});
