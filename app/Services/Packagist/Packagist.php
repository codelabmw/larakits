<?php

namespace App\Services\Packagist;

use App\Services\Packagist\ValueObjects\Agent;

final class Packagist
{
    /**
     * Creates a new instance of the Packagist class.
     */
    public function __construct(
        public readonly Agent $agent,
        public readonly string $host = 'https://packagist.org'
    ) {
        //
    }
}