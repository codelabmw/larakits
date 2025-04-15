<?php

namespace App\Services\Packagist;

use App\Exceptions\ConnectionException;
use App\Services\Packagist\Actions\SearchPackages;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Spatie\Url\Url;

final class Packagist
{
    /**
     * Creates a new instance of the Packagist class.
     */
    public function __construct(
        private readonly SearchPackages $searchPackages,
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
    public function search(?string $type = null, ?array $tags = null, ?int $perPage = null, ?string $baseUrl = null): Paginator
    {
        $parameters = [];

        if ($baseUrl === null) {
            $baseUrl = $this->baseUrl;
        }

        if ($type !== null) {
            $parameters['type'] = $type;
        }

        if ($tags !== null) {
            $parameters['tags'] = $tags;
        }

        if ($perPage !== null) {
            $parameters['per_page'] = $perPage;
        }

        $data = $this->searchPackages->handle(
            agent: $this->agent,
            url: $baseUrl . '/search.json',
            filters: $parameters,
        );

        $items = array_map(fn($item) => Package::fromArray($item), $data['results']);


        return new Paginator(
            items: $items,
            total: $data['total'],
            next: $data['next'] ?? null,
            perPage: $data['per_page'] ?? null,
            getNextPage: fn(string $url) => $this->getNextPage(
                Url::fromString($url)->withHost(
                    Url::fromString($baseUrl)->getHost(),
                ),
            ),
        );
    }

    /**
     * Gets the next page.
     */
    private function getNextPage(Url $url): array
    {

        return $this->searchPackages->handle(
            agent: $this->agent,
            url: (string) $url->withoutQueryParameters(),
            filters: $url->getAllQueryParameters(),
        );
    }

    /**
     * Gets a specific package.
     */
    public function get(string $name, ?string $baseUrl = null): Package
    {
        if ($baseUrl === null) {
            $baseUrl = $this->baseUrl;
        }

        $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
            return $attempt * 1000;
        }, function (Exception $exception, PendingRequest $request) {
            if ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])) {
                return false;
            }

            return true;
        })->withUserAgent($this->agent)->get(
                url: $baseUrl . '/packages/' . $name . '.json',
            );

        if ($response->status() !== 200) {
            throw new ConnectionException(response: $response);
        }

        $data = $response->json();

        return Package::fromArray($data['package']);
    }
}