<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;

final class TagStrategy implements Strategy
{
    private array $tags = [
        'kit',
        'starter',
        'starter-kit',
        'starter kit',
        'laravel starter kit',
    ];

    public function handle(Payload $payload, Closure $next): mixed
    {
        $qualified = false;

        foreach ($payload->package->keywords as $keyword) {
            $keywordFound = in_array(
                $keyword,
                $this->tags,
            );

            if ($keywordFound) {
                $qualified = true;
                break;
            }
        }

        if ($qualified) {
            $payload->isKit = true;

            return null;
        }

        return $next($payload);
    }
}
