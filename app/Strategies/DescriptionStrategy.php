<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;

class DescriptionStrategy implements Strategy
{
    public function handle(Payload $payload, Closure $next): mixed
    {
        return $next($payload);
    }
}
