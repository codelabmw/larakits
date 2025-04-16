<?php

namespace App\Services\Github;

use App\Exceptions\ConnectionException;
use Exception;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

final class Github
{
    /**
     * Creates a new Github instance.
     */
    public function __construct(
        private readonly string $baseUrl = 'https://api.github.com',
    ) {
        //
    }

    /**
     * Returns the contents of a file in a repository as a base64 encoded string.
     */
    public function contents(string $owner, string $repo, string $path): string
    {
        try {
            $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
                return $attempt * 1000;
            }, function (Exception $exception, PendingRequest $request) {
                if ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403])) {
                    return false;
                }

                return true;
            })->withHeader('Accept', 'application/vnd.github.v3+json')->get(
                    url: "{$this->baseUrl}/repos/{$owner}/{$repo}/contents/{$path}",
                );
        } catch (RequestException $exception) {
            throw new ConnectionException($exception->response, 'Failed to retrieve file contents');
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

    /**
     * Gets and returns the number of stars for a repository.
     */
    public function stars(string $owner, string $repo, ?string $token = null): int
    {
        try {
            $response = Http::retry(config('services.github.retry'), function (int $attempt, Exception $exception): int {
                return $attempt * 1000;
            }, function (Exception $exception, PendingRequest $request) {
                if ($exception instanceof RequestException && in_array($exception->response->status(), [404, 403, 401])) {
                    return false;
                }

                return true;
            })->withHeader('Authorization', "token {$token}")->get("{$this->baseUrl}/repos/{$owner}/{$repo}");
        } catch (RequestException $exception) {
            throw new ConnectionException($exception->response, 'Failed to retrieve repository stars');
        }

        return $response->json()['stargazers_count'];
    }
}