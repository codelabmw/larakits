<?php

declare(strict_types=1);

use App\Exceptions\ConnectionException;

arch()->preset()->php();
arch()->preset()->security();
arch()->preset()->laravel()->ignoring([
    ConnectionException::class,
]);
