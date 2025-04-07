<?php

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
        'should_run_at',
        'created_at',
        'updated_at',
    ]);
});