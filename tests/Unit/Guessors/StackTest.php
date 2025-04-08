<?php

use App\Guessors\Stack\React;
use App\Guessors\Stack\Tailwindcss;
use App\Guessors\Stack\Vue;
use App\Guessors\Stack\Livewire;
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

test('it guesses livewire stack', function () {
    // Arrange
    $payload = new StackPayload([
        'composer' => ['pestphp/pest', 'laravel/livewire', 'laravel/framework'],
    ]);

    // Act
    (new Livewire)->handle($payload, fn($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['laravel-livewire']);
});

test('it guesses tailwindcss stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['tailwindcss', 'vue', 'react', 'react-dom'],
    ]);

    // Act
    (new Tailwindcss)->handle($payload, fn($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['tailwindcss']);
});