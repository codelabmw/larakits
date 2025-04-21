<?php

declare(strict_types=1);

namespace App\Guessors\Kit;

use App\Contracts\Guessor;
use App\ValueObjects\KitPayload;
use Closure;
use Illuminate\Support\Str;

class ByDescription implements Guessor
{
    /**
     * The keywords to look for.
     */
    private array $keywords = [
        'starter-kit',
        'starter kit',
        'laravel-starter-kit',
        'laravel starter kit',
    ];

    /**
     * Determines if the package is a kit based on its description.
     *
     * @param  KitPayload  $payload
     */
    public function handle(mixed $payload, Closure $next): mixed
    {
        $description = $payload->package->description;

        $descriptionQualifies = Str::contains($description, $this->keywords, true);

        if ($descriptionQualifies) {
            $payload->isKit = true;

            return $next($payload);
        }

        return $next($payload);
    }
}
