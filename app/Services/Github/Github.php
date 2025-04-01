<?php

namespace App\Services\Github;

use App\Contracts\Http\Client;
use App\Exceptions\ConnectionException;

final class Github
{
    /**
     * Creates a new Github instance.
     */
    public function __construct(private readonly Client $client)
    {
        //
    }

    /**
     * Returns the contents of a file in a repository as a base64 encoded string.
     */
    public function contents(string $owner, string $repo, string $path): string
    {
        $response = $this->client->get(
            url: "https://api.github.com/repos/{$owner}/{$repo}/contents/{$path}",
            headers: [
                'Accept' => 'application/vnd.github.v3+json',
            ]
        );

        if ($response->status() !== 200) {
            throw new ConnectionException($response, 'Failed to retrieve file contents');
        }

        return $response->body();
    }

    /**
     * Returns the contents of a file in a repository as an array.
     */
    public function jsonContent(string $owner, string $repo, string $path): array
    {
        $base64Data = $this->contents($owner, $repo, $path);

        return json_decode(base64_decode($base64Data), true);
    }
}