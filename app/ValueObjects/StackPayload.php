<?php

declare(strict_types=1);

namespace App\ValueObjects;

class StackPayload
{
    /**
     * @var array<int, string>
     */
    private array $stacks = [];

    /**
     * Creates a new Payload instance.
     *
     * @param  array{composer: array<int, string>, npm: array<int, string>}  $dependencies
     */
    public function __construct(
        public readonly array $dependencies,
    ) {
        //
    }

    /**
     * Returns the stacks.
     *
     * @return array<int, string>
     */
    public function getStacks(): array
    {
        return $this->stacks;
    }

    /**
     * Adds a stack.
     */
    public function addStack(string $stack): void
    {
        $this->stacks[] = $stack;
    }

    /**
     * Returns the composer dependencies.
     *
     * @return array<int, string>
     */
    public function getComposerDependencies(): array
    {
        return $this->dependencies['composer'];
    }

    /**
     * Returns the npm dependencies.
     *
     * @return array<int, string>
     */
    public function getNpmDependencies(): array
    {
        return $this->dependencies['npm'];
    }
}
