<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;

it('returns a successful response', function (): void {
    // Act
    $response = $this->get('/donate');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page): void {
        $page->component('landing/donate');
    });
});
