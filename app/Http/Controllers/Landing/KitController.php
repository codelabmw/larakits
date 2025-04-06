<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Kit;
use App\Models\Tag;
use App\Models\Stack;

class KitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): Response
    {
        $kits = Kit::query()
            ->with(['stacks', 'tags'])
            ->when(request('search'), function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when(request('tags'), function ($query, $tags) {
                $query->whereHas('tags', function ($query) use ($tags) {
                    $query->whereIn('slug', $tags);
                });
            })
            ->when(request('stacks'), function ($query, $stacks) {
                $query->whereHas('stacks', function ($query) use ($stacks) {
                    $query->whereIn('slug', $stacks);
                });
            })
            ->paginate()
            ->withQueryString();

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
