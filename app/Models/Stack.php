<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * @property-read int $id
 * @property-read string $slug
 * @property-read string $name
 */
class Stack extends Model
{
    /** @use HasFactory<\Database\Factories\StackFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'name',
    ];

    /**
     * The attributes that should be hidden.
     *
     * @var list<string>
     */
    protected $hidden = [
        'id',
    ];
}
