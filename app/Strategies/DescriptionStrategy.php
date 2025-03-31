<?php

namespace App\Strategies;

use App\Contracts\Strategy;
use App\ValueObjects\Payload;
use Closure;
use Illuminate\Support\Str;

class DescriptionStrategy implements Strategy
{
    public function handle(Payload $payload, Closure $next): mixed
    {
        $description = $payload->package->description;
        $needles = ['starter-kit', 'starter kit', 'laravel-starter-kit', 'laravel starter kit'];

        $descriptionQualifies = Str::contains($description, $needles, true);
        $isLaravelProject = in_array('laravel', $payload->package->keywords);

        if ($descriptionQualifies && $isLaravelProject) {
            $payload->isKit = true;
            return null;
        }

        return $next($payload);
    }
}
