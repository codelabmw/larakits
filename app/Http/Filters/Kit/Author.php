<?php

declare(strict_types=1);

namespace App\Http\Filters\Kit;

use App\Contracts\Filter;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;

class Author implements Filter
{
    /**
     * Creates a new Author instance.
     */
    public function __construct(private readonly Request $request)
    {
        //
    }

    /**
     * Filter results by author.
     */
    public function handle(Builder|Relation $query, Closure $next): mixed
    {
        $author = $this->request->get('author');

        if ($author) {
            $query->whereLike('maintainers', "%{$author}%");
        }

        return $next($query);
    }
}
