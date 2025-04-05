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
        $kits = Kit::query()->with('tags', 'stacks');

        $trendingKits = $kits->latest('stars')->take(6)->get();
        $recentKits = $kits->latest('created_at')->take(6)->get();

        return Inertia::render('welcome', [
            'trendingKits' => $trendingKits,
            'recentKits' => $recentKits,
        ]);
    }
}
