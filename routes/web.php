<?php

declare(strict_types=1);

use App\Http\Controllers\Landing\AboutController;
use App\Http\Controllers\Landing\ContactController;
use App\Http\Controllers\Landing\DocsController;
use App\Http\Controllers\Landing\DonateController;
use App\Http\Controllers\Landing\HomeController;
use App\Http\Controllers\Landing\KitController;
use App\Http\Controllers\Landing\PrivacyPolicyController;
use App\Http\Controllers\Landing\TermsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/about', AboutController::class)->name('about');

Route::get('/docs', DocsController::class)->name('docs');

Route::get('/kits', KitController::class)->name('kits');

Route::get('/contact', ContactController::class)->name('contact');

Route::get('/privacy', PrivacyPolicyController::class)->name('privacy');

Route::get('/terms', TermsController::class)->name('terms');

Route::get('/donate', DonateController::class)->name('donate');
