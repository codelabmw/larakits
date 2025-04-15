<?php

use App\Models\Tag;
use Illuminate\Testing\Fluent\AssertableJson;

it('returns a successful response', function () {
    // Arrange
    Tag::factory()->count(10)->create();

    // Act
    $response = $this->getJson('/api/tags');

    // Assert
    $response->assertStatus(200);
    $response->assertJson(function (AssertableJson $json) {
        return $json->has(10);
    });
});

it('can filter tags by keyword', function () {
    // Arrange
    Tag::factory()->create(['name' => 'test']);
    Tag::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->getJson('/api/tags?search=' . $keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertJson(function (AssertableJson $json) {
        return $json->has(1);
    });
});
