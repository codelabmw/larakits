<?php

use App\Models\Stack;
use Illuminate\Testing\Fluent\AssertableJson;

it('returns a successful response', function () {
    // Arrange
    Stack::factory()->count(10)->create();

    // Act
    $response = $this->getJson('/api/stacks');

    // Assert
    $response->assertStatus(200);
    $response->assertJson(function (AssertableJson $json) {
        return $json->has(10);
    });
});

it('can filter stacks by keyword', function () {
    // Arrange
    Stack::factory()->create(['name' => 'test']);
    Stack::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->getJson('/api/stacks?search=' . $keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertJson(function (AssertableJson $json) {
        return $json->has(1);
    });
});
