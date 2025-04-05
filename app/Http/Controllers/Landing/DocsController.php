<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DocsController extends Controller
{
    /**
     * Display the how to page.
     */
    public function __invoke()
    {
        return Inertia::render('docs');
    }
}
