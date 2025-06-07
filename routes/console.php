<?php

declare(strict_types=1);

use App\Console\Commands\FetchCommand;
use App\Models\Task;
use Illuminate\Support\Facades\Schedule;

Schedule::command(FetchCommand::class)
    ->name('fetch:packages')
    ->everyThirtyMinutes()
    ->withoutOverlapping()
    ->when(function () {
        return Task::openTask()?->shouldRun();
    });
