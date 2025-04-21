<?php

declare(strict_types=1);

use App\Models\Kit;
use App\Models\Stack;

test('to array', function (): void {
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

it('has kits', function (): void {
    // Arrange
    $kit = Kit::factory()->create();
    $stack = Stack::factory()->create();

    // Act
    $stack->kits()->attach($kit);

    // Assert
    expect($stack->kits()->first()->slug)->toEqual($kit->slug);
});
