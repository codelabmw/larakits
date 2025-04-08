<?php

namespace App\Guessors\Stack;

use App\Contracts\Guessor;
use App\ValueObjects\StackPayload;
use Closure;
use Illuminate\Support\Str;

final class React implements Guessor
{
    /**
     * The name of the stack.
     */
    const NAME = 'react';

    /**
     * Guesses if payload has react dependencies.
     * 
     * @param StackPayload $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        if (in_array(self::NAME, $payload->getNpmDependencies())) {
            $payload->addStack(Str::replace('/', '-', self::NAME));
        }

        return $next($payload);
    }
}
