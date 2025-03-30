<?php

namespace App\Services\Packagist\Exceptions;

use App\Services\Packagist\Http\Response;

final class ConnectionException extends \Exception
{
    public function __construct(
        string $message = 'Failed to connect to packagist server.',
        public readonly Response $response,
    ) {
        parent::__construct($message);
    }
}