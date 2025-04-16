<?php

namespace App\Http\Middleware;

use App\Services\Github\Github;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Create a new instance.
     */
    public function __construct(private readonly Github $github)
    {
        // 
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'stars' => Cache::remember('stars', 3600, fn () => $this->stars()),
        ];
    }

    /**
     * Get projects repository stars.
     */
    private function stars(): ?int
    {
        $stars = null;

        try {
            $stars = $this->github->stars('codelabmw', 'larakits');
        } catch (\Exception $e) {
            //
        }

        return $stars;
    }
}
