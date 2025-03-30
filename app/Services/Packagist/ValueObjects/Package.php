<?php

namespace App\Services\Packagist\ValueObjects;

final class Package
{
    /**
     * Creates a Package instance.
     */
    public function __construct(
        public readonly string|null $name,
        public readonly string|null $description,
        public readonly string|null $time,
        public readonly array|null $maintainers,
        public readonly string|null $homepage,
        public readonly array|null $keywords,
        public readonly array|null $licenses,
        public readonly array|null $authors,
        public readonly array|null $source,
        public readonly array|null $require,
        public readonly array|null $requireDev,
        public readonly string|null $type,
        public readonly bool|null $abandoned,
        public readonly int|null $downloads,
        public readonly int|null $stars,
    ) {
        //
    }

    /**
     * Creates a Package instance from an array.
     */
    public static function fromArray(array $data): self
    {
        $downloads = 0;

        if (isset($data['downloads'])) {
            if (is_numeric($data['downloads'])) {
                $downloads = (int) $data['downloads'];
            } else {
                $downloads = (int) $data['downloads']['total'];
            }
        }

        $currentVersion = [];

        if (isset($data['versions'])) {
            $versions = array_values($data['versions']);
            $currentVersion = $versions[0];
        }

        return new self(
            name: $data['name'] ?? null,
            description: $data['description'] ?? null,
            time: $data['time'] ?? null,
            maintainers: $data['maintainers'] ?? null,
            homepage: $currentVersion['homepage'] ?? null,
            keywords: $currentVersion['keywords'] ?? null,
            licenses: $currentVersion['license'] ?? null,
            authors: $currentVersion['authors'] ?? null,
            source: $currentVersion['source'] ?? null,
            require: $currentVersion['require'] ?? null,
            requireDev: $currentVersion['require-dev'] ?? null,
            type: $data['type'] ?? null,
            abandoned: $data['abandoned'] ?? false,
            downloads: $downloads,
            stars: $data['github_stars'] ?? null,
        );
    }
}