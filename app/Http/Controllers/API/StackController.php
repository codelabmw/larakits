<?php

namespace App\Http\Controllers\API;

use App\Models\Stack;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Support\Facades\Response;
use App\Http\Filters\Stack\Search;
use App\Contracts\Filter;

class StackController
{
    /**
     * Handle stacks request.
     */
    public function __invoke(): JsonResponse
    {
        /** @var array<class-string<Filter>> */
        $filters = [
            Search::class,
        ];

        $query = Stack::query();

        $stacks = Pipeline::send($query)
            ->through($filters)
            ->then(function (Builder $query) {
                return $query->limit(10)->get();
            });

        return Response::json($stacks);
    }
}