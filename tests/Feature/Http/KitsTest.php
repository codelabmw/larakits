<?php

declare(strict_types=1);

use App\Models\Kit;
use App\Models\Stack;
use App\Models\Tag;
use Inertia\Testing\AssertableInertia;

it('returns a successful response', function (): void {
    // Act
    $response = $this->get('/kits');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits');
    });
});

it('can filter kits by keyword', function (): void {
    // Arrange
    Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $keyword = 'test';

    // Act
    $response = $this->get('/kits?search='.$keyword);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});

it('can filter kits by tags', function (): void {
    // Arrange
    $kit = Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $tag = Tag::factory()->create(['name' => 'test', 'slug' => 'test']);
    $kit->tags()->attach($tag);

    // Act
    $response = $this->get('/kits?tags[]='.$tag->slug);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});

it('can filter kits by stack', function (): void {
    // Arrange
    $kit = Kit::factory()->create(['name' => 'test']);
    Kit::factory()->count(4)->create();

    $stack = Stack::factory()->create(['name' => 'test', 'slug' => 'test']);
    $kit->stacks()->attach($stack);

    // Act
    $response = $this->get('/kits?stacks[]='.$stack->slug);

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 1);
    });
});

it('can sort kits by downloads', function (): void {
    // Arrange
    Kit::factory()->create(['downloads' => 1]);
    Kit::factory()->create(['downloads' => 2]);
    Kit::factory()->create(['downloads' => 3]);
    Kit::factory()->create(['downloads' => 4]);
    Kit::factory()->create(['downloads' => 5]);

    // Act
    $response = $this->get('/kits?sort=downloads&order=desc');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 5)
            ->where('kits.data.0.downloads', 5)
            ->where('kits.data.1.downloads', 4)
            ->where('kits.data.2.downloads', 3)
            ->where('kits.data.3.downloads', 2)
            ->where('kits.data.4.downloads', 1);
    });
});

it('can sort kits by stars', function (): void {
    // Arrange
    Kit::factory()->create(['stars' => 1]);
    Kit::factory()->create(['stars' => 2]);
    Kit::factory()->create(['stars' => 3]);
    Kit::factory()->create(['stars' => 4]);
    Kit::factory()->create(['stars' => 5]);

    // Act
    $response = $this->get('/kits?sort=stars&order=desc');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/kits/index')
            ->has('kits')
            ->count('kits.data', 5)
            ->where('kits.data.0.stars', 5)
            ->where('kits.data.1.stars', 4)
            ->where('kits.data.2.stars', 3)
            ->where('kits.data.3.stars', 2)
            ->where('kits.data.4.stars', 1);
    });
});
