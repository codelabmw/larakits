<?php

namespace App\Services\Packagist\Http;

final class Response
{
    /**
     * Creates a new instance of the Response class.
     */
    public function __construct(
        public readonly int $status,
        public readonly string $body,
        public readonly array $headers,
    ) {
        //
    }

    /**
     * Decodes the response body as JSON.
     */
    public function json(): array
    {
        return json_decode($this->body, true);
    }
}