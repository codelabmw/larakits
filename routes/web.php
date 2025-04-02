<?php

use App\Http\Controllers\Landing\HomeController;
use App\Http\Controllers\Landing\KitController;
use App\Http\Controllers\Landing\AboutController;
use App\Http\Controllers\Landing\HowToController;
use App\Http\Controllers\Landing\ContactController;
use App\Http\Controllers\Landing\PrivacyPolicyController;
use App\Http\Controllers\Landing\TermsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/about', AboutController::class)->name('about');

Route::get('/how-to', HowToController::class)->name('how-to');

Route::get('/kits', KitController::class)->name('kits');

Route::get('/contact', ContactController::class)->name('contact');

Route::get('/privacy', PrivacyPolicyController::class)->name('privacy-policy');

Route::get('/terms', TermsController::class)->name('terms-of-service');