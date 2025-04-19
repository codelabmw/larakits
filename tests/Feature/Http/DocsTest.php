<?php

use Inertia\Testing\AssertableInertia;

it('returns a successful response', function () {
    // Act
    $response = $this->get('/docs');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('landing/docs');
    });
});
