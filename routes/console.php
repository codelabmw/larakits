<?php

use App\Models\Task;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\FetchCommand;

Schedule::command(FetchCommand::class)
    ->name('fetch:packages')
    ->everyMinute()
    ->withoutOverlapping()
    ->evenInMaintenanceMode()
    ->when(function () {
        return Task::openTask()?->shouldRun();
    });