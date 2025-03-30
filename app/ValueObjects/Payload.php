<?php

namespace App\ValueObjects;

use App\Services\Packagist\ValueObjects\Package;

class Payload
{
    /**
     * Creates a new Payload instance.
     */
    public function __construct(
        public readonly Package $package,
        public bool $isKit,
    ) {
        //
    }
}
