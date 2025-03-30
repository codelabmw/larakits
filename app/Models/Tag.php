<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\CarbonInterface;

/**
 * @property-read int $id
 * @property-read string $slug
 * @property-read string $name
 * @property-read CarbonInterface $updated_at
 * @property-read CarbonInterface $created_at
 */
class Tag extends Model
{
    /** @use HasFactory<\Database\Factories\TagFactory> */
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
