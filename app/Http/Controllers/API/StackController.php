<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Contracts\Filter;
use App\Http\Filters\Stack\Search;
use App\Models\Stack;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Support\Facades\Response;

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
            ->then(fn (Builder $query) => $query->limit(10)->get());

        return Response::json($stacks);
    }
}
