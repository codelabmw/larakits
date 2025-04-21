<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Contracts\Filter;
use App\Http\Controllers\Controller;
use App\Http\Filters\Kit\Order;
use App\Http\Filters\Kit\Search;
use App\Http\Filters\Kit\Stack as StackFilter;
use App\Http\Filters\Kit\Tag as TagFilter;
use App\Models\Kit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;
use Inertia\Inertia;
use Inertia\Response;

class KitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request): Response
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

        return Inertia::render('landing/kits/index', [
            'kits' => $kits,
            'filters' => [
                'search' => $request->get('search'),
                'tags' => $request->get('tags', []),
                'stacks' => $request->get('stacks', []),
            ],
        ]);
    }
}
