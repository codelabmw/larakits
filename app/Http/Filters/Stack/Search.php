<?php

declare(strict_types=1);

namespace App\Http\Filters\Stack;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

final class Search implements Filter
{
    /**
     * Creates a new Search instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Search for a stack.
     */
    public function handle(Builder|Relation $query, Closure $next)
    {
        $this->request->whenHas('search', function (?string $keyword) use ($query) {
            if ($keyword) {
                $query->whereLike('name', '%'.$keyword.'%');
            }
        });

        return $next($query);
    }
}
