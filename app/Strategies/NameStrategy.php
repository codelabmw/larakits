<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Illuminate\Support\Str;
use Closure;

class NameStrategy implements Strategy
{
    public function handle(Payload $payload, Closure $next): mixed
    {
        $packageName = $payload->package->name;
        $needles = ['starter-kit', 'starter kit', 'laravel starter kit'];

        if (Str::contains($packageName, $needles, false)) {
            $payload->isKit = true;
            return null;
        }

        return $next($payload);
    }
}
