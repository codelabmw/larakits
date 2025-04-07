<?php

namespace App\Http;

use App\Contracts\Http\Client as ClientContract;
use App\Contracts\Http\Response as ResponseContract;
use App\Exceptions\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Response as IlluminateResponse;
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
        try {
            $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
                return $attempt * 1000;
            }, function (Exception $exception, PendingRequest $request) {
                if ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])) {
                    return false;
                }
    
                return true;
            })->withHeaders($headers)->get($url, $query);
    
            return new Response(
                status: $response->status(),
                body: $response->body(),
                headers: $response->headers(),
            );
        } catch (Exception $exception) {
            if ($exception instanceof RequestException) {
                throw new ConnectionException(response: new Response(
                    status: $exception->response->status(),
                    body: $exception->response->body(),
                    headers: $exception->response->headers(),
                ));
            }

            throw $exception;
        }
    }
}
