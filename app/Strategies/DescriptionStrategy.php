<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;
use Illuminate\Support\Str;

class DescriptionStrategy implements Strategy
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
     * Determines if the package is a kit based on its description.
     */
    public function handle(Payload $payload, Closure $next): mixed
    {
        $description = $payload->package->description;

        $descriptionQualifies = Str::contains($description, $this->keywords, true);

        if ($descriptionQualifies) {
            $payload->isKit = true;

            return $next($payload);
        }

        return $next($payload);
    }
}
