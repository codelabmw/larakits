<?php

declare(strict_types=1);

namespace App\Services\Packagist;

use App\Exceptions\ConnectionException;
use App\Services\Packagist\ValueObjects\Agent;
use App\Services\Packagist\ValueObjects\Package;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Spatie\Url\Url;

final readonly class Packagist
{
    /**
     * Creates a new instance of the Packagist class.
     */
    public function __construct(
        private Agent $agent,
        private string $baseUrl = 'https://packagist.org',
    ) {
        //
    }

    /**
     * Searches for packages and returns a pagination object.
     *
     * @param  array<int, string>|null  $tags
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

        $data = $this->searchPackages(
            agent: $this->agent,
            url: $baseUrl.'/search.json',
            filters: $parameters,
        );

        $items = array_map(fn ($item): Package => Package::fromArray($item), $data['results']);

        return new Paginator(
            items: $items,
            next: $data['next'] ?? null,
            perPage: $data['per_page'] ?? null,
            getNextPage: fn (string $url): array => $this->getNextPage(
                Url::fromString($url)->withHost(
                    Url::fromString($baseUrl)->getHost(),
                ),
            ),
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

        try {
            $response = Http::retry(config('services.packagist.retry'), fn (int $attempt, Exception $exception): int => $attempt * 1000, fn (Exception $exception, PendingRequest $request): bool => ! ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])))->withUserAgent((string) $this->agent)->get(
                url: $baseUrl.'/packages/'.$name.'.json',
            );
        } catch (RequestException $exception) {
            throw new ConnectionException(response: $exception->response);
        }

        $data = $response->json();

        return Package::fromArray($data['package']);
    }

    /**
     * Gets the next page.
     */
    private function getNextPage(Url $url): array
    {

        return $this->searchPackages(
            agent: $this->agent,
            url: (string) $url->withoutQueryParameters(),
            filters: $url->getAllQueryParameters(),
        );
    }

    private function searchPackages(Agent $agent, string $url, array $filters = []): array
    {
        try {
            $response = Http::retry(config('services.packagist.retry'), fn (int $attempt, Exception $exception): int => $attempt * 1000, fn (Exception $exception, PendingRequest $request): bool => ! ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])))->withUserAgent((string) $agent)->get(
                url: $url,
                query: $filters,
            );

        } catch (RequestException $exception) {
            throw new ConnectionException(response: $exception->response);
        }

        return $response->json();
    }
}
