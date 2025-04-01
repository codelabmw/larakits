<?php

namespace App\Guessors\Kit;

use App\Contracts\Guessor;
use App\ValueObjects\Payload;
use Illuminate\Support\Str;
use Closure;

class ByName implements Guessor
{
    /**
     * The keywords to look for.
     */
    private array $keywords = [
        'starter-kit',
        'starter kit',
        'laravel-starter-kit',
        'laravel starter kit',
    ];

    /**
     * Determines if the package is a kit based on its name.
     */
    public function handle(Payload $payload, Closure $next): mixed
    {
        $packageName = $payload->package->name;

        $nameQualifies = Str::contains($packageName, $this->keywords, true);

        if ($nameQualifies) {
            $payload->isKit = true;

            return $next($payload);
        }

        return $next($payload);
    }
}
