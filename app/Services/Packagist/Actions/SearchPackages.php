<?php

namespace App\Services\Packagist\Actions;

use App\Exceptions\ConnectionException;
use App\Services\Packagist\ValueObjects\Agent;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Exception;

class SearchPackages
{
    /**
     * Search packages from packages from Packagist.
     * 
     * @param array{type: string, tags: array<int, string>} $filters
     * @return array{results: array, total: int, next: ?string}
     */
    public function handle(
        Agent $agent,
        string $url,
        array $filters = [],
    ): array {
        try {
            $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
                return $attempt * 1000;
            }, function (Exception $exception, PendingRequest $request) {
                if ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])) {
                    return false;
                }

                return true;
            })->withUserAgent($agent)->get(
                    url: $url,
                    query: $filters,
                );

        } catch (Exception $exception) {
            if ($exception instanceof RequestException) {
                throw new ConnectionException(response: $exception->response);
            }

            throw $exception;
        }

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        return $response->json();
    }
}