<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class TermsController extends Controller
{
    /**
     * Display the terms of service page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('landing/terms');
    }
}
