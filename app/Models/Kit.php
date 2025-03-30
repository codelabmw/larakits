<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *  @property-read int $id
 *  @property-read string $slug
 *  @property-read string $name
 *  @property-read string $vendor
 *  @property-read string $description
 *  @property-read string $source_url
 *  @property-read string $source_type
 *  @property-read int $stars
 *  @property-read int $downloads
 *  @property-read array $authors
 *  @property-read array $licenses
 *  @property-read \Carbon\Carbon $created_at
 *  @property-read \Carbon\Carbon $updated_at
 */
class Kit extends Model
{
    /** @use HasFactory<\Database\Factories\KitFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'name',
        'vendor',
        'description',
        'source_url',
        'source_type',
        'stars',
        'downloads',
        'authors',
        'licenses',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var list<string>
     */
    protected $casts = [
        'stars' => 'integer',
        'downloads' => 'integer',
        'authors' => 'array',
        'licenses' => 'array',
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
