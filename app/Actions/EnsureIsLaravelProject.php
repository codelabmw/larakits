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
        $requiresLaravel = Collection::make($package->require)->has('laravel/framework');

        return $package->type === 'project' && $requiresLaravel && !$package->abandoned;
    }
}
