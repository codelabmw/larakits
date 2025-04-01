<?php

namespace App\Services\Packagist\Http;

use App\Contracts\Http\Response as ResponseContract;

final class Response implements ResponseContract
{
    /**
     * Creates a new instance of the Response class.
     */
    public function __construct(
        private readonly int $status,
        private readonly string $body,
        private readonly array $headers,
    ) {
        //
    }

    /**
     * Returns the status code of the response.
     */
    public function status(): int
    {
        return $this->status;
    }

    /**
     * Returns the body of the response.
     */
    public function body(): string
    {
        return $this->body;
    }

    /**
     * Returns the headers of the response.
     */
    public function headers(): array
    {
        return $this->headers;
    }

    /**
     * Decodes the response body as JSON.
     */
    public function json(): array
    {
        return json_decode($this->body, true);
    }
}