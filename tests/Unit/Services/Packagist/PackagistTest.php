<?php

use App\Services\Packagist\Packagist;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Response;
use App\Services\Packagist\ValueObjects\Package;

test('service can be instantiated', function () {
    // Arrange
    $packagist = new Packagist(agent: new Agent(name: 'Test User', email: 'test@example.com'));

    // Assert
    expect($packagist)->toBeInstanceOf(Packagist::class);
});

it('searches packages by type', function () {
    // Arrange
    $packagist = new Packagist(
        agent: new Agent(name: 'Test User', email: 'test@example.com'),
        host: $this->packagistHost,
    );

    // Act
    $result = $packagist->search(type: 'project');

    // Assert
    expect($result)->toBeInstanceOf(Response::class);
    expect($result->data->first())->toBeInstanceOf(Package::class);
    expect($result->data->first()->type)->toBe('project');
});

it('searches packages by tags', function () {

})->todo();

it('gets specific package')->todo();