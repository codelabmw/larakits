<?php

use Inertia\Testing\AssertableInertia;

it('returns a successful response', function () {
    // Act
    $response = $this->get('/');

    // Assert
    $response->assertStatus(200);
    $response->assertInertia(function (AssertableInertia $page) {
        $page->component('welcome');
    });
});