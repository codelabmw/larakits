<?php

namespace App\Http\Filters;

use App\Contracts\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Closure;

class Stack implements Filter
{
    /**
     * Creates a new Stack instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Filter results by stack.
     */
    public function handle(Builder|Relation $query, Closure $next)
    {
        $stacks = $this->request->get('stacks');

        if ($stacks) {
            $query->whereHas('stacks', function ($query) use ($stacks) {
                $query->whereIn('slug', $stacks);
            });
        }

        return $next($query);
    }
}
