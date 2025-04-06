<?php

namespace App\Contracts;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

interface Filter
{
    /**
     * Handle the filter.
     */
    public function handle(Builder|Relation $query, Closure $next);
}
