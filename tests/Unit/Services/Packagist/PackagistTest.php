<?php

use App\Services\Packagist\Packagist;

beforeEach()->skip();

test('service can be instantiated', function () {
    // Arrange
    $service = new Packagist(agent: new Agent(name: 'Test User', email: 'test@example.com'));

    // Assert
    $this->assertInstanceOf(Packagist::class, $service);
});

it('queries packages')->todo();

it('queries packages by type')->todo();

it('queries packages by tags')->todo();

it('queries specific package')->todo();