<?php

use App\Exceptions\ConnectionException;
use App\Http\Client;
use App\Services\Packagist\Packagist;

arch()->preset()->php();
arch()->preset()->security();
arch()->preset()->laravel()->ignoring([
    ConnectionException::class,
    Client::class,
]);