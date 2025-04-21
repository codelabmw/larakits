<?php

declare(strict_types=1);

namespace App\Http\Filters\Kit;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

class Search implements Filter
{
    /**
     * Creates a new Search instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Filter results by search keywords.
     */
    public function handle(Builder|Relation $query, Closure $next)
    {
        $keyword = $this->request->get('search');

        if ($keyword) {
            $query->where(function ($query) use ($keyword) {
                $query->where('name', 'like', "%{$keyword}%")
                    ->orWhere('description', 'like', "%{$keyword}%");
            });
        }

        return $next($query);
    }
}
