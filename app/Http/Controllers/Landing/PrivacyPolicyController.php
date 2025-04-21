<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PrivacyPolicyController extends Controller
{
    /**
     * Display the privacy policy page.
     */
    public function __invoke(): Response
    {
        return Inertia::render('landing/privacy');
    }
}
