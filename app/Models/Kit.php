<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Collection;
use Carbon\CarbonInterface;

/**
 * @property-read int $id
 * @property-read string $slug
 * @property-read string $name
 * @property-read string $vendor
 * @property-read string $description
 * @property-read string $source_url
 * @property-read string $source_type
 * @property-read int $stars
 * @property-read int $downloads
 * @property-read array $maintainers
 * @property-read array $authors
 * @property-read array $licenses
 * 
 * @property-read CarbonInterface $created_at
 * @property-read CarbonInterface $updated_at
 * 
 * @property-read Collection<Stack> $stacks
 * @property-read Collection<Tag, Kit> $tags
 * 
 * @method BelongsToMany<Stack, Kit> stacks()
 * @method BelongsToMany<Tag, Kit> tags()
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
        'maintainers',
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
        'maintainers' => 'array',
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

    /**
     * The kits that belong to the kit.
     *
     * @return BelongsToMany<Stack, Kit>
     */
    public function stacks(): BelongsToMany
    {
        return $this->belongsToMany(Stack::class);
    }

    /**
     * The tags that belong to the kit.
     * 
     * @return BelongsToMany<Tag, Kit>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
