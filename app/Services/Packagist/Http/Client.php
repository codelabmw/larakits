<?php

namespace App\Services\Packagist\Http;

use App\Services\Packagist\Contracts\Client as ClientContract;
use Illuminate\Support\Facades\Http;
;

final class Client implements ClientContract
{
    /**
     * Send a GET request.
     */
    public function get(string $url, array $parameters = [], array $headers = []): Response
    {
        $response = Http::withHeaders($headers)->get($url, $parameters);

        return new Response(
            status: $response->status(),
            body: $response->body(),
            headers: $response->headers(),
        );
    }
}
