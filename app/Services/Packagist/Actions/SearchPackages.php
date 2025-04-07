<?php

namespace App\Services\Packagist\Actions;

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;
use App\Services\Packagist\ValueObjects\Agent;

class SearchPackages
{
    /**
     * Search packages from packages from Packagist.
     * 
     * @param array{type: string, tags: array<int, string>} $filters
     * @return array{results: array, total: int, next: ?string}
     */
    public function handle(
        Client $client,
        Agent $agent,
        string $url,
        array $filters = [],
    ): array {
        $response = $client->get(
            url: $url,
            query: $filters,
            headers: ['User-Agent' => (string) $agent],
        );

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        return $response->json();
    }
}