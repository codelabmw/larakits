<?php

declare(strict_types=1);

use App\Console\Commands\FetchCommand;
use App\Models\Task;
use Illuminate\Support\Facades\Schedule;

Schedule::command(FetchCommand::class)
    ->name('fetch:packages')
    ->everyMinute()
    ->withoutOverlapping()
    ->evenInMaintenanceMode()
    ->when(function () {
        return Task::openTask()?->shouldRun();
    });
