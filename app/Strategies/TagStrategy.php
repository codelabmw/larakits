<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;

final class TagStrategy implements Strategy
{
    private array $tags = [
        'starter-kit',
        'starter kit',
        'laravel starter kit',
    ];

    public function handle(Payload $payload, Closure $next): mixed
    {
        $hasKitKeyword = false;

        foreach ($payload->package->keywords as $keyword) {
            $keywordFound = in_array(
                $keyword,
                $this->tags,
            );

            if ($keywordFound) {
                $hasKitKeyword = true;
                break;
            }
        }

        if ($hasKitKeyword && in_array('laravel', $payload->package->keywords)) {
            $payload->isKit = true;

            return null;
        }

        return $next($payload);
    }
}
