<?php

declare(strict_types=1);

namespace App\Contracts;

use Closure;

interface Guessor
{
    /**
     * Determine if the package in the payload is a kit.
     */
    public function handle(mixed $payload, Closure $next): mixed;
}
