<?php

declare(strict_types=1);

use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use Inertia\Testing\AssertableInertia;

it('returns a successful response', function () {
    // Act
    $response = $this->get('/kits');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/kits/index')
            ->has('kits');
    });
});

it('can filter kits by keyword', function () {
    // Arrange
    Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->get('/kits?search='.$keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});

it('can filter kits by tags', function () {
    // Arrange
    $kit = Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $tag = Tag::factory()->create(['name' => 'test', 'slug' => 'test']);
    $kit->tags()->attach($tag);

    // Act
    $response = $this->get('/kits?tags[]='.$tag->slug);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});

it('can filter kits by stack', function () {
    // Arrange
    $kit = Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $stack = Stack::factory()->create(['name' => 'test', 'slug' => 'test']);
    $kit->stacks()->attach($stack);

    // Act
    $response = $this->get('/kits?stacks[]='.$stack->slug);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});
