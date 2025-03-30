<?php

use App\Models\Kit;
use App\Models\Stack;

test('to array', function () {
    // Arrange
    $kit = Kit::factory()->create();

    // Act
    $fields = $kit->toArray();

    // Assert
    expect(array_keys($fields))->toEqual([
        'slug',
        'name',
        'vendor',
        'description',
        'source_url',
        'source_type',
        'stars',
        'downloads',
        'maintainers',
        'authors',
        'licenses',
        'updated_at',
        'created_at',
    ]);
});

it('has stacks', function () {
    // Arrange
    $kit = Kit::factory()->create();
    $stack = Stack::factory()->create();

    // Act
    $kit->stacks()->attach($stack);

    // Assert
    expect($kit->stacks()->first()->slug)->toEqual($stack->slug);
})->only();

it('has tags')->todo();