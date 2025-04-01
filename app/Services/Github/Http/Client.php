<?php

namespace App\Services\Github\Http;

use App\Contracts\Http\Client as ClientContract;
use App\Contracts\Http\Response as ResponseContract;
use Illuminate\Support\Facades\Http;
use Exception;

class Client implements ClientContract
{
    /**
     * Send a GET request.
     * 
     * @param array<string, mixed> $query
     * @param array<string, mixed> $headers
     */
    public function get(string $url, array $query = [], array $headers = []): ResponseContract
    {
        $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
            return $attempt * 1000;
        })->withHeaders($headers)->get($url, $query);

        return new Response(
            status: $response->status(),
            body: $response->body(),
            headers: $response->headers(),
        );
    }
}
