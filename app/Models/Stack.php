<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property-read int $id
 * @property-read string $slug
 * @property-read string $name
 * @property-read CarbonInterface $updated_at
 * @property-read CarbonInterface $created_at
 * @property-read Collection<Kit> $kits
 *
 * @method BelongsToMany<Kit, Stack> kits()
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

    /**
     * The kits that belong to the stack.
     *
     * @return BelongsToMany<Kit, $this>
     */
    public function kits(): BelongsToMany
    {
        return $this->belongsToMany(Kit::class);
    }
}
