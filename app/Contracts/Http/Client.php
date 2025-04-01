<?php

namespace App\Contracts\Http;

interface Client
{
    /**
     * Sends a GET request to the specified URL.
     */
    public function get(string $url, array $query = [], array $headers = []): Response;
}
