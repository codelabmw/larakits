<?php

namespace App\Exceptions;

use App\Contracts\Http\Response;

final class ConnectionException extends \Exception
{
    public function __construct(
        public readonly Response $response,
        string $message = 'Failed to connect to server.',
    ) {
        parent::__construct($message);
    }
}