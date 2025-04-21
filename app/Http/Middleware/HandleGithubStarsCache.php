<?php

namespace App\Http\Middleware;

use App\Services\Github\Github;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class HandleGithubStarsCache
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->cacheGithubStars(App::make(Github::class));

        return $next($request);
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

        Cache::remember('github-stars', 3600, fn () => $this->getGithubStars($github));
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
