<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Illuminate\Support\Str;
use Closure;

class NameStrategy implements Strategy
{
    /**
     * Determines if the package is a kit based on its name.
     */
    public function handle(Payload $payload, Closure $next): mixed
    {
        $packageName = $payload->package->name;
        $needles = ['starter-kit', 'starter kit', 'laravel starter kit'];

        $nameQualifies = Str::contains($packageName, $needles, false);

        if ($nameQualifies && in_array('laravel', $payload->package->keywords)) {
            $payload->isKit = true;
            return null;
        }

        return $next($payload);
    }
}
