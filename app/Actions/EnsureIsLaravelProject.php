<?php

namespace App\Actions;

use App\Services\Packagist\ValueObjects\Package;
use Illuminate\Support\Collection;

class EnsureIsLaravelProject
{
    /**
     * Determine if the package is a Laravel project.
     */
    public function __invoke(Package $package): bool
    {
        return Collection::make($package->require)->has('laravel/framework') && $package->type === 'project';
    }
}
