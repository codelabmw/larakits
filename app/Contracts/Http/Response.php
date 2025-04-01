<?php

namespace App\Contracts\Http;

interface Response
{
    /**
     * Returns the status code of the response.
     */
    public function status(): int;

    /**
     * Returns the body of the response.
     */
    public function body(): string;

    /**
     * Returns the headers of the response.
     */
    public function headers(): array;

    /**
     * Returns the JSON body of the response.
     */
    public function json(): array;
}
