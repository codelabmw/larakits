<?php

namespace App\Services\Packagist;

use App\Services\Packagist\Contracts\Client;
use App\Services\Packagist\Exceptions\ConnectionException;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;

final class Packagist
{
    /**
     * Creates a new instance of the Packagist class.
     */
    public function __construct(
        private readonly Client $client,
        private readonly Agent $agent,
        private readonly string $baseUrl = 'https://packagist.org',
    ) {
        //
    }

    /**
     * Searches for packages and returns a pagination object.
     * 
     * @return Paginator<Package>
     */
    public function search(?string $type): Paginator
    {
        $response = $this->client->get(
            url: $this->baseUrl . '/search.json',
            parameters: ['type' => $type],
            headers: ['User-Agent' => (string) $this->agent],
        );

        if ($response->status !== 200) {
            throw new ConnectionException(response: $response);
        }

        $data = $response->json();

        $items = array_map(fn($item) => Package::fromArray($item), $data['results']);

        return new Paginator(items: $items, total: $data['total'], next: $data['next']);
    }
}