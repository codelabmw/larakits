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
            ->get();

        $tags = Tag::all();
        $stacks = Stack::all();

        return Inertia::render('kits/index', [
            'kits' => $kits,
            'tags' => $tags,
            'stacks' => $stacks,
        ]);
    }
}
