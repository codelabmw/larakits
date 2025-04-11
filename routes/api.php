<?php

use App\Http\Controllers\API\TagController;
use Illuminate\Support\Facades\Route;

Route::get('/tags', TagController::class)->name('tags');