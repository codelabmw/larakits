<?php

namespace App\Guessors\Kit;

use App\Contracts\Guessor;
use App\ValueObjects\Payload;
use Closure;

final class ByKeyword implements Guessor
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
     * Determines if the package is a kit based on its keywords.
     */
    public function handle(Payload $payload, Closure $next): mixed
    {
        $hasKeyword = false;

        foreach ($payload->package->keywords as $keyword) {
            $keywordFound = in_array(
                $keyword,
                $this->keywords,
            );

            if ($keywordFound) {
                $hasKeyword = true;
                break;
            }
        }

        if ($hasKeyword) {
            $payload->isKit = true;

            return $next($payload);
        }

        return $next($payload);
    }
}
