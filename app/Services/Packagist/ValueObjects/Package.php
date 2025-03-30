<?php

namespace App\Services\Packagist\ValueObjects;

final class Package
{
    /**
     * Creates a Package instance.
     */
    public function __construct(
        public readonly string|null $type,
    ) {
        //
    }

    /**
     * Creates a Package instance from an array.
     */
    public static function fromArray(array $data): self
    {
        return new self(
            type: $data['type'] ?? null,
        );
    }
}