<?php

namespace App\Contracts;

use App\ValueObjects\Payload;
use Closure;

interface Guessor
{
    /**
     * Determine if the package in the payload is a kit.
     */
    public function handle(Payload $payload, Closure $next): mixed;
}