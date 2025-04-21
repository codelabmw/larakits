<?php

declare(strict_types=1);

use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;

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
});

it('has tags', function () {
    // Arrange
    $kit = Kit::factory()->create();
    $tag = Tag::factory()->create();

    // Act
    $kit->tags()->attach($tag);

    // Assert
    expect($kit->tags()->first()->slug)->toEqual($tag->slug);
});

it('checks if kit exists corresponding to package name', function () {
    // Arrange
    Kit::factory()->create([
        'slug' => 'test-kit',
        'name' => 'kit',
        'vendor' => 'test',
    ]);

    // Act
    $exists = Kit::hasPackage('test/kit');

    // Assert
    expect($exists)->toBeTrue();
});
