<?php

namespace App\Providers;

use App\Services\Github\Github;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Exception;

class CachedDataServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->cacheGithubStars(app()->make(Github::class));
    }

    /**
     * Get projects repository stars.
     */
    private function cacheGithubStars(Github $github): void
    {
        // @codeCoverageIgnoreStart
        if (Cache::has('github-stars') && Cache::get('github-stars') !== null) {
            return;
        }
        // @codeCoverageIgnoreEnd

        Cache::remember('github-stars', 3600, fn() => $this->getGithubStars($github));
    }

    /**
     * Get projects repository stars.
     */
    private function getGithubStars(Github $github): ?int
    {
        $stars = null;

        try {
            $stars = $github->stars('codelabmw', 'larakits');
        } catch (Exception $exception) {
            //
        }

        return $stars;
    }
}
