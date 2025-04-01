<?php

namespace App\Http;

use App\Contracts\Http\Response as ResponseContract;

class Response implements ResponseContract
{
    /**
     * Creates a new Response instance.
     * 
     * @param array<string, mixed> $headers 
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
     * Returns the JSON body of the response.
     */
    public function json(): array
    {
        return json_decode($this->body, true);
    }
}
