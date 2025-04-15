<?php

use App\Enums\TaskStatus;
use App\Models\Task;

test('to array', function () {
    // Arrange
    $task = Task::first();

    // Act
    $fields = $task->toArray();

    // Assert
    expect(array_keys($fields))->toEqual([
        'id',
        'status',
        'exception',
        'should_run_at',
        'created_at',
        'updated_at',
    ]);
});

it('marks task as failed', function () {
    // Arrange
    $task = Task::first();

    // Act
    $task->markFailed();

    // Assert
    expect($task->status)->toBe(TaskStatus::FAILED);
});

it('marks task as successful', function () {
    // Arrange
    $task = Task::first();

    // Act
    $task->markSuccessful();

    // Assert
    expect($task->status)->toBe(TaskStatus::SUCCESS);
});

it('checks if task should run', function () {
    // Arrange
    $task = Task::first();

    // Act
    $shouldRun = $task->shouldRun();

    // Assert
    expect($shouldRun)->toBeTrue();
});

it('gets current task', function () {
    // Arrange
    $task = Task::first();

    // Act
    $currentTask = Task::currentTask();

    // Assert
    expect($currentTask->id)->toBe($task->id);
});

it('checks if task run successfully', function () {
    // Arrange
    $task = Task::first();
    $task->updateStatus(TaskStatus::SUCCESS);

    // Act
    $isPending = $task->wasRunSuccessfully();

    // Assert
    expect($isPending)->toBeTrue();
});