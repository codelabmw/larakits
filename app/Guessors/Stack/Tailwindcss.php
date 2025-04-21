<?php

declare(strict_types=1);

namespace App\Guessors\Stack;

use App\Contracts\Guessor;
use App\ValueObjects\StackPayload;
use Closure;
use Illuminate\Support\Str;

final class Tailwindcss implements Guessor
{
    /**
     * The name of the stack.
     */
    public const NAME = 'tailwindcss';

    /**
     * Guesses tailwindcss stack.
     *
     * @param  StackPayload  $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        if (in_array(self::NAME, $payload->getNpmDependencies())) {
            $payload->addStack(Str::replace('/', '-', self::NAME));
        }

        return $next($payload);
    }
}
