<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kit;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $trendingKits = Kit::query()->with('tags', 'stacks')->latest('downloads')->take(6)->get();
        $recentKits = Kit::query()->with('tags', 'stacks')->latest('created_at')->take(6)->get();

        return Inertia::render('landing/welcome', [
            'trendingKits' => $trendingKits,
            'recentKits' => $recentKits,
        ]);
    }
}
