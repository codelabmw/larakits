<?php

namespace App\Services\Github;

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;

final class Github
{
    /**
     * Creates a new Github instance.
     */
    public function __construct(
        private readonly Client $client,
        private readonly string $baseUrl = 'https://api.github.com'
    ) {
        //
    }

    /**
     * Returns the contents of a file in a repository as a base64 encoded string.
     */
    public function contents(string $owner, string $repo, string $path): string
    {
        $response = $this->client->get(
            url: "{$this->baseUrl}/repos/{$owner}/{$repo}/contents/{$path}",
            headers: [
                'Accept' => 'application/vnd.github.v3+json',
            ]
        );

        if ($response->status() !== 200) {
            throw new ConnectionException($response, 'Failed to retrieve file contents');
        }

        return $response->json()['content'];
    }

    /**
     * Returns the owner and repository name from a repository URL.
     */
    public static function ownerAndRepo(string $url): array
    {

        preg_match('/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/', $url, $matches);

        if (count($matches) !== 3) {
            throw new \InvalidArgumentException('Invalid repository URL');
        }

        return [$matches[1], $matches[2]];
    }
}