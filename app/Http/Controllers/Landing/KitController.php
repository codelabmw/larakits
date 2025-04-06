<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Http\Filters\Order;
use App\Http\Filters\Search;
use App\Http\Filters\Tag as TagFilter;
use App\Http\Filters\Stack as StackFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Pipeline;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kit;
use App\Models\Tag;
use App\Models\Stack;
use App\Contracts\Filter;

class KitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): Response
    {
        $query = Kit::query();

        /** @var array<class-string<Filter>> */
        $filters = [
            Search::class,
            TagFilter::class,
            StackFilter::class,
            Order::class,
        ];

        $kits = Pipeline::send($query)
            ->through($filters)
            ->then(function (Builder $query) {
                return $query->with(['stacks', 'tags'])->paginate()->withQueryString();
            });

        $tags = Tag::all();
        $stacks = Stack::all();

        return Inertia::render('kits/index', [
            'kits' => $kits,
            'tags' => $tags,
            'stacks' => $stacks,
            'filters' => [
                'search' => request('search'),
                'tags' => request('tags', []),
                'stacks' => request('stacks', []),
            ],
        ]);
    }
}
