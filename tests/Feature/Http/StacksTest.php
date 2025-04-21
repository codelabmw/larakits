<?php

declare(strict_types=1);

use App\Models\Stack;
use Illuminate\Testing\Fluent\AssertableJson;

it('returns a successful response', function (): void {
    // Arrange
    Stack::factory()->count(10)->create();

    // Act
    $response = $this->getJson('/api/stacks');

    // Assert
    $response->assertStatus(200);
    $response->assertJson(fn (AssertableJson $json): AssertableJson => $json->has(10));
});

it('can filter stacks by keyword', function (): void {
    // Arrange
    Stack::factory()->create(['name' => 'test']);
    Stack::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->getJson('/api/stacks?search='.$keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertJson(fn (AssertableJson $json): AssertableJson => $json->has(1));
});
