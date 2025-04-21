<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Contracts\Filter;
use App\Http\Filters\Tag\Search;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Support\Facades\Response;

class TagController
{
    /**
     * Handle tags request.
     */
    public function __invoke(): JsonResponse
    {
        /** @var array<class-string<Filter>> */
        $filters = [
            Search::class,
        ];

        $query = Tag::query();

        $tags = Pipeline::send($query)
            ->through($filters)
            ->then(function (Builder $query) {
                return $query->limit(10)->get();
            });

        return Response::json($tags);
    }
}
