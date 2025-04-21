<?php

declare(strict_types=1);

namespace App\Guessors\Stack;

use App\Contracts\Guessor;
use App\ValueObjects\StackPayload;
use Closure;
use Illuminate\Support\Str;

final class Volt implements Guessor
{
    /**
     * The name of the stack.
     */
    public const NAME = 'livewire/volt';

    /**
     * Guesses if payload has livewire dependencies.
     *
     * @param  StackPayload  $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        if (in_array(self::NAME, $payload->getComposerDependencies())) {
            $payload->addStack(Str::replace('/', '-', 'volt'));
        }

        return $next($payload);
    }
}
