<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the contact page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('landing/contact');
    }
}
