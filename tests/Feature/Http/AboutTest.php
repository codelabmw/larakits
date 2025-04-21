<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;

it('returns a successful response', function () {
    // Act
    $response = $this->get('/about');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/about');
    });
});
