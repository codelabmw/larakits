<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Kit;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function __invoke(): Response
    {
        $totalKits = Kit::count();
        $totalVisitors = 1; // TODO: Plug in results from analytics api
        $totalStars = Cache::get('stars');

        return Inertia::render('about', compact('totalKits', 'totalVisitors', 'totalStars'));
    }
}
