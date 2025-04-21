<?php

declare(strict_types=1);

namespace App\Enums;

enum TaskStatus: string
{
    case OPEN = 'open';
    case PENDING = 'pending';
    case SUCCESS = 'success';
    case FAILED = 'failed';
}
