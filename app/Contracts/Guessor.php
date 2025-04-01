<?php

namespace App\Contracts;

use Closure;

interface Guessor
{
    /**
     * Determine if the package in the payload is a kit.
     */
    public function handle(mixed $payload, Closure $next): mixed;
}