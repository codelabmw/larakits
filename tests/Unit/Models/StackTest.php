<?php

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
})->only();

it('belongs to a kit')->todo();