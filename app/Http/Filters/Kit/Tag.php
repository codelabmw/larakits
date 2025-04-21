<?php

declare(strict_types=1);

namespace App\Http\Filters\Kit;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

class Tag implements Filter
{
    /**
     * Creates a new Tag instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Filter results by tag.
     */
    public function handle(Builder|Relation $query, Closure $next)
    {
        $tags = $this->request->get('tags');

        if ($tags) {
            $query->whereHas('tags', function ($query) use ($tags): void {
                $query->whereIn('slug', $tags);
            });
        }

        return $next($query);
    }
}
