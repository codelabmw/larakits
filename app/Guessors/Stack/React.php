<?php

namespace App\Guessors\Stack;

use App\Contracts\Guessor;
use App\ValueObjects\StackPayload;
use Closure;

class React implements Guessor
{
    /**
     * The name of the stack.
     */
    const NAME = 'react';

    /**
     * Determines if the package is a stack based on its name.
     * 
     * @param StackPayload $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        if (in_array(self::NAME, $payload->getNpmDependencies())) {
            $payload->addStack(self::NAME);
        }

        return $next($payload);
    }
}
