<?php

namespace App\Http\Filters;

use App\Contracts\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Closure;

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
        $orderBy = $this->request->get('orderBy') ?? 'created_at';
        $sort = $this->request->get('sort') ?? 'desc';

        $query->orderBy($orderBy, $sort);

        return $next($query);
    }
}
