<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;
use Spatie\Analytics\Facades\Analytics;

it('returns a successful response', function (): void {
    // Arrange
    Analytics::fake();

    // Act
    $response = $this->get('/about');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/about');
    });
});
