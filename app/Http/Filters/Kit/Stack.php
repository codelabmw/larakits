<?php

declare(strict_types=1);

namespace App\Http\Filters\Kit;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

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
            $query->whereHas('stacks', function ($query) use ($stacks): void {
                $query->whereIn('slug', $stacks);
            });
        }

        return $next($query);
    }
}
