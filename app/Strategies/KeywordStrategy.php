<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;

final class KeywordStrategy implements Strategy
{
    private array $keywords = [
        'starter-kit',
        'starter kit',
        'laravel-starter-kit',
        'laravel starter kit',
    ];

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

        $isLaravelProject = in_array('laravel', $payload->package->keywords);

        if ($hasKeyword && $isLaravelProject) {
            $payload->isKit = true;

            return null;
        }

        return $next($payload);
    }
}
