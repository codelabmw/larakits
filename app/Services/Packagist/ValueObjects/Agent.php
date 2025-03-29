<?php

namespace App\Services\Packagist\ValueObjects;

use Stringable;

/**
 * Represents an agent with a name and email.
 * 
 * @property-read string $name
 * @property-read string $email
 */
final class Agent implements Stringable
{
    /**
     * Creates a new instance of the Agent class.
     */
    public function __construct(
        public readonly string $name,
        public readonly string $email
    ) {
        //
    }

    /**
     * Gets a string representation of the object.
     */
    public function __tostring(): string
    {
        return $this->name . ' (' . $this->email . ')';
    }
}