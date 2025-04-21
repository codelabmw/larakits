<?php

declare(strict_types=1);

use App\Guessors\Stack\Bootstrap;
use App\Guessors\Stack\Livewire;
use App\Guessors\Stack\React;
use App\Guessors\Stack\Tailwindcss;
use App\Guessors\Stack\Volt;
use App\Guessors\Stack\Vue;
use App\ValueObjects\StackPayload;

test('it guesses react stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['react', 'react-dom', 'vue', 'livewire'],
    ]);

    // Act
    (new React())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['react']);
});

test('it guesses vue stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['vue', 'vue-router', 'react', 'react-dom'],
    ]);

    // Act
    (new Vue())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['vue']);
});

test('it guesses livewire stack', function () {
    // Arrange
    $payload = new StackPayload([
        'composer' => ['pestphp/pest', 'livewire/livewire', 'laravel/framework'],
    ]);

    // Act
    (new Livewire())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['livewire']);
});

test('it guesses tailwindcss stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['tailwindcss', 'vue', 'react', 'react-dom'],
    ]);

    // Act
    (new Tailwindcss())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['tailwindcss']);
});

it('it guesses volt stack', function () {
    // Arrange
    $payload = new StackPayload([
        'composer' => ['pestphp/pest', 'livewire/livewire', 'laravel/framework', 'livewire/volt'],
    ]);

    // Act
    (new Volt())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['volt']);
});

it('it guesses bootstrap stack', function () {
    // Arrange
    $payload = new StackPayload([
        'npm' => ['bootstrap', 'vue', 'react', 'react-dom'],
    ]);

    // Act
    (new Bootstrap())->handle($payload, fn ($payload) => null);

    // Assert
    expect($payload->getStacks())->toBe(['bootstrap']);
});
