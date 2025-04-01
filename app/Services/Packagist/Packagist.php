<?php

namespace App\Services\Packagist;

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;
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
     * @param array<int, string>|null $tags
     * @return Paginator<Package>
     */
    public function search(?string $type = null, ?array $tags = null): Paginator
    {
        $parameters = [];

        if ($type !== null) {
            $parameters['type'] = $type;
        }

        if ($tags !== null) {
            $parameters['tags'] = $tags;
        }

        $response = $this->client->get(
            url: $this->baseUrl . '/search.json',
            query: $parameters,
            headers: ['User-Agent' => (string) $this->agent],
        );

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        $data = $response->json();

        $items = array_map(fn($item) => Package::fromArray($item), $data['results']);

        return new Paginator(items: $items, total: $data['total'], next: $data['next']);
    }

    /**
     * Gets a specific package.
     */
    public function get(string $name): Package
    {
        $response = $this->client->get(
            url: $this->baseUrl . '/packages/' . $name . '.json',
            headers: ['User-Agent' => (string) $this->agent],
        );

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        $data = $response->json();

        return Package::fromArray($data['package']);
    }
}