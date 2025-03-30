<?php

use App\Models\Kit;
use App\Models\Stack;

test('to array', function () {
    // Arrange
    $stack = Stack::factory()->create();

    // Act
    $fields = $stack->toArray();

    // Assert
    expect(array_keys($fields))->toEqual([
        'slug',
        'name',
        'updated_at',
        'created_at',
    ]);
});

it('belongs to a kit', function () {
    // Arrange
    $kit = Kit::factory()->create();
    $stack = Stack::factory()->create();

    // Act
    $stack->kits()->attach($kit);

    // Assert
    expect($stack->kits()->first()->slug)->toEqual($kit->slug);
});