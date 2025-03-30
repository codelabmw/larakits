<?php

namespace App\Services\Packagist\Contracts;

use App\Services\Packagist\Http\Response;

interface Client
{
    /**
     * Send a http get request to the specified
     * url.
     * 
     * @param array<string, mixed> $parameters
     * @param array<string, mixed> $headers
     */
    public function get(string $url, array $parameters = [], array $headers = []): Response;
}