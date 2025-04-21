<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Kit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function __invoke(): Response
    {
        $analytics = Analytics::fetchTotalVisitorsAndPageViews(Period::create(
            Carbon::parse(config('analytics.start_date')),
            now(),
        ));

        $activeUsers = 0;

        $analytics->each(function (array $entry) use (&$activeUsers): void {
            $activeUsers += $entry['activeUsers'];
        });

        $totalKits = Kit::count();
        $totalVisitors = $activeUsers;
        $totalStars = Cache::get('github-stars');

        return Inertia::render('landing/about', ['totalKits' => $totalKits, 'totalVisitors' => $totalVisitors, 'totalStars' => $totalStars]);
    }
}
