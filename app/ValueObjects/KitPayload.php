<?php

declare(strict_types=1);

namespace App\ValueObjects;

use App\Services\Packagist\ValueObjects\Package;

class KitPayload
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
