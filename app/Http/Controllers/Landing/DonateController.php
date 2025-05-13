<?php

declare(strict_types=1);

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DonateController extends Controller
{
    /**
     * Shows the donate page.
     */
    public function __invoke(Request $request): InertiaResponse
    {
        return Inertia::render('landing/donate');
    }
}
