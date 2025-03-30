<?php

use App\Models\Kit;

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
        'authors',
        'licenses',
        'updated_at',
        'created_at',
    ]);
});

it('has stack')->todo();

it('has tags')->todo();