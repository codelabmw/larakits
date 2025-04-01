<?php

namespace App\Services\Packagist\Http;

use App\Contracts\Http\Client as ClientContract;
use App\Contracts\Http\Response as ResponseContract;
use Illuminate\Support\Facades\Http;
use Exception;
;

final class Client implements ClientContract
{
    /**
     * Send a GET request.
     */
    public function get(string $url, array $query = [], array $headers = []): ResponseContract
    {
        $response = Http::withHeaders($headers)
            ->retry(config('services.packagist.retry'), function (int $attempt, Exception $exception): int {
                return $attempt * 1000;
            })
            ->get($url, $query);

        return new Response(
            status: $response->status(),
            body: $response->body(),
            headers: $response->headers(),
        );
    }
}
