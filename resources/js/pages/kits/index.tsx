import KitCard from '@/components/kit-card';
import { KitDetailsSheet } from '@/components/kit-details-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Paginator, Stack, Tag } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import debounce from 'lodash/debounce';
import { Filter, PackageSearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

interface Props {
    kits: Paginator<Kit>;
    tags: Tag[];
    stacks: Stack[];
    filters: {
        search: string;
        tags: string[];
        stacks: string[];
    };
}

export default function Index({ kits, tags, stacks, filters }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(tags.filter((tag) => filters.tags.includes(tag.slug)).map((tag) => tag.slug));
    const [selectedStacks, setSelectedStacks] = useState<string[]>(
        stacks.filter((stack) => filters.stacks.includes(stack.slug)).map((stack) => stack.slug),
    );

    const updateFilters = useCallback(
        (params: { search?: string; tags?: string[]; stacks?: string[] }) => {
            router.get(
                '/kits',
                {
                    search: params.search ?? search,
                    tags: params.tags ?? selectedTags,
                    stacks: params.stacks ?? selectedStacks,
                },
                { preserveState: true, preserveScroll: true },
            );
        },
        [search, selectedTags, selectedStacks],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => updateFilters({ search: value }), 300),
        [updateFilters],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleTagChange = (tag: Tag, checked: boolean) => {
        const newTags = checked ? [...selectedTags, tag.slug] : selectedTags.filter((t) => t !== tag.slug);
        setSelectedTags(newTags);
        updateFilters({ tags: newTags });
    };

    const handleStackChange = (stack: Stack, checked: boolean) => {
        const newStacks = checked ? [...selectedStacks, stack.slug] : selectedStacks.filter((s) => s !== stack.slug);
        setSelectedStacks(newStacks);
        updateFilters({ stacks: newStacks });
    };

    const handleClearFilters = () => {
        setSearch('');
        setSelectedTags([]);
        setSelectedStacks([]);
        updateFilters({ search: '', tags: [], stacks: [] });
    };

    return (
        <GuestLayout>
            <Head title="Browse Starter Kits" />

            <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl py-8">
                {/* Header */}
                <div className="mb-8 py-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold tracking-wider">Browse starter kits</h1>
                    <p className="text-muted-foreground">Find the perfect Laravel starter kit for your next project</p>
                </div>

                {kits.data.length > 0 ? (
                    <>
                        {/* Search and Filters */}
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <div className="relative w-[30%]">
                                <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <Input
                                    type="search"
                                    placeholder="Search kits..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                {(search || selectedTags.length > 0 || selectedStacks.length > 0) && (
                                    <Button variant="ghost" onClick={handleClearFilters} className="text-muted-foreground hover:text-foreground">
                                        Clear filters
                                    </Button>
                                )}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Filters
                                            {(selectedTags.length > 0 || selectedStacks.length > 0) && (
                                                <Badge variant="secondary" className="ml-1">
                                                    {selectedTags.length + selectedStacks.length}
                                                </Badge>
                                            )}
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <div className="space-y-8 p-8">
                                            {/* Tags Filter */}
                                            <div>
                                                <h4 className="mb-4 text-sm font-medium">Tags</h4>
                                                <div className="space-y-4">
                                                    {tags.map((tag) => (
                                                        <div key={tag.slug} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`tag-${tag.slug}`}
                                                                checked={selectedTags.includes(tag.slug)}
                                                                onCheckedChange={(checked) => {
                                                                    handleTagChange(tag, checked as boolean);
                                                                }}
                                                            />
                                                            <Label htmlFor={`tag-${tag.slug}`}>{tag.name}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            {/* Stacks Filter */}
                                            <div>
                                                <h4 className="mb-4 text-sm font-medium">Tech Stack</h4>
                                                <div className="space-y-4">
                                                    {stacks.map((stack) => (
                                                        <div key={stack.slug} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`stack-${stack.slug}`}
                                                                checked={selectedStacks.includes(stack.slug)}
                                                                onCheckedChange={(checked) => {
                                                                    handleStackChange(stack, checked as boolean);
                                                                }}
                                                            />
                                                            <Label htmlFor={`stack-${stack.slug}`}>{stack.name}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Kits Grid */}
                        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {kits.data.map((kit) => (
                                <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {kits.total / kits.per_page > 1 && (
                            <div className="flex items-center justify-between">
                                <p className="text-muted-foreground text-sm">
                                    Page {kits.current_page} of {kits.last_page}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Link href={`/kits?page=1`} className={`${kits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}>
                                        <Button variant="outline" size="icon">
                                            <DoubleArrowLeftIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.current_page - 1}`}
                                        className={`${kits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <ChevronLeftIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.current_page + 1}`}
                                        className={`${kits.current_page === kits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/kits?page=${kits.last_page}`}
                                        className={`${kits.current_page === kits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <Button variant="outline" size="icon">
                                            <DoubleArrowRightIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mx-auto flex h-96 max-w-4xl items-center justify-center rounded border">
                        <div className="text-muted-foreground text-center">
                            <div className="flex items-center justify-center">
                                <PackageSearchIcon className="h-8 w-8" />
                            </div>
                            <p className="mt-2">No kits found at the moment! Still curating...</p>
                        </div>
                    </div>
                )}

                {/* Kit Details Sheet */}
                <KitDetailsSheet kit={selectedKit} onOpenChange={() => setSelectedKit(null)} />
            </div>
        </GuestLayout>
    );
}
