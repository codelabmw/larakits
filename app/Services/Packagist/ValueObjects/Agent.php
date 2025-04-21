<?php

declare(strict_types=1);

namespace App\Services\Packagist\ValueObjects;

use Stringable;

/**
 * Represents an agent with a name and email
 * as required by Packagist.
 *
 * @property-read string $name
 * @property-read string $email
 */
final readonly class Agent implements Stringable
{
    /**
     * Creates a new instance of the Agent class.
     */
    public function __construct(
        public string $name,
        public string $email
    ) {
        //
    }

    /**
     * Gets a string representation of the object.
     */
    public function __toString(): string
    {
        return $this->name.' ('.$this->email.')';
    }
}
