<?php

declare(strict_types=1);

namespace App\Http\Filters\Kit;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Str;

class Order implements Filter
{
    /**
     * Creates a new Order instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Filter results by order.
     */
    public function handle(Builder|Relation $query, Closure $next)
    {
        $orderBy = $this->request->get('sort', 'downloads');
        $sort = $this->request->get('order', 'desc');

        $orderBy = Str::lower($orderBy);
        $sort = Str::lower($sort);

        if (! in_array($orderBy, ['downloads', 'stars', 'created_at'])) {
            $orderBy = 'downloads';
        }

        if (! in_array($sort, ['asc', 'desc'])) {
            $sort = 'desc';
        }

        $query->orderBy($orderBy, $sort);

        return $next($query);
    }
}
