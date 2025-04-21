<?php

declare(strict_types=1);

use App\Models\Tag;
use Illuminate\Testing\Fluent\AssertableJson;

it('returns a successful response', function (): void {
    // Arrange
    Tag::factory()->count(10)->create();

    // Act
    $response = $this->getJson('/api/tags');

    // Assert
    $response->assertStatus(200);
    $response->assertJson(fn (AssertableJson $json): AssertableJson => $json->has(10));
});

it('can filter tags by keyword', function (): void {
    // Arrange
    Tag::factory()->create(['name' => 'test']);
    Tag::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->getJson('/api/tags?search='.$keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertJson(fn (AssertableJson $json): AssertableJson => $json->has(1));
});
