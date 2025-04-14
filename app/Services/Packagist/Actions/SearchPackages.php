<?php

namespace App\Services\Packagist\Actions;

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;
use App\Services\Packagist\ValueObjects\Agent;
use Illuminate\Support\Facades\Http;

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
        $response = Http::withHeaders([
            'User-Agent' => (string) $agent,
        ])->get(
            url: $url,
            query: $filters,
        );

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        $data = $response->json()['body'];

        return json_decode($data, true);
    }
}