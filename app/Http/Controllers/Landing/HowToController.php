<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HowToController extends Controller
{
    /**
     * Display the how to page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('how-to');
    }
}
