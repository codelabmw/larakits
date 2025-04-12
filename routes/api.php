<?php

use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\StackController;
use Illuminate\Support\Facades\Route;

Route::get('/tags', TagController::class)->name('tags');
Route::get('/stacks', StackController::class)->name('stacks');
