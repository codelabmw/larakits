<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('about');
    }
}
