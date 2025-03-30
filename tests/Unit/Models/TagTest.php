<?php

use App\Models\Kit;
use App\Models\Tag;


test('to array', function () {
    // Arrange
    $tag = Tag::factory()->create();

    // Act
    $fields = $tag->toArray();

    // Assert
    expect(array_keys($fields))->toEqual([
        'slug',
        'name',
        'updated_at',
        'created_at',
    ]);
});

it('has kits', function () {
    // Arrange
    $tag = Tag::factory()->create();
    $kit = Kit::factory()->create();

    // Act
    $tag->kits()->attach($kit);

    // Assert
    expect($tag->kits()->first()->slug)->toEqual($kit->slug);
})->only();