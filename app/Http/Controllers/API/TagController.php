<?php

namespace App\Http\Controllers\API;

use App\Http\Filters\Tag\Search;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Pipeline;
use Illuminate\Support\Facades\Response;

class TagController
{
    public function __invoke()
    {
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