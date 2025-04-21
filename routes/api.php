<?php

declare(strict_types=1);

use App\Http\Controllers\API\StackController;
use App\Http\Controllers\API\TagController;
use Illuminate\Support\Facades\Route;

Route::get('/tags', TagController::class)->name('tags');
Route::get('/stacks', StackController::class)->name('stacks');
