<?php

namespace App\Enums;

enum TaskStatus: string
{
    case OPEN = 'open';
    case PENDING = 'pending';
    case SUCCESS = 'success';
    case FAILED = 'failed';
}
