<?php

use App\Models\Task;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\FetchCommand;

Schedule::command(FetchCommand::class)
    ->name('fetch:packages')
    ->hourly()
    ->withoutOverlapping()
    ->evenInMaintenanceMode()
    ->when(function () {
        return Task::currentTask()?->shouldRun();
    });
