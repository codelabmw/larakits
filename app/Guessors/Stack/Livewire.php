<?php

namespace App\Guessors\Stack;

use App\Contracts\Guessor;
use App\ValueObjects\StackPayload;
use Closure;

final class Livewire implements Guessor
{
    /**
     * The name of the stack.
     */
    const NAME = 'laravel/livewire';

    /**
     * Guesses if payload has livewire dependencies.
     * 
     * @param StackPayload $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        if (in_array(self::NAME, $payload->getComposerDependencies())) {
            $payload->addStack(self::NAME);
        }

        return $next($payload);
    }
}
