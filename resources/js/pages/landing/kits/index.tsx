import KitCard from '@/components/kit-card';
import { KitDetailsSheet } from '@/components/kit-details-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Paginator, Stack, Tag } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import debounce from 'lodash/debounce';
import { PackageSearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import StackSheet from './partials/stack-sheet';
import TagsSheet from './partials/tags-sheet';

interface Props {
    kits: Paginator<Kit>;
    filters: {
        search: string;
        tags: string[];
        stacks: string[];
        sort: string;
        order: string;
    };
}

export default function Index({ kits, filters }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
    const [selectedStacks, setSelectedStacks] = useState<string[]>(filters.stacks || []);
    const [sort, setSort] = useState(filters.sort || 'downloads');
    const [order, setOrder] = useState(filters.order || 'desc');

    const updateFilters = useCallback(
        (params: { search?: string; tags?: string[]; stacks?: string[]; sort?: string; order?: string }) => {
            router.get(
                '/kits',
                {
                    search: params.search ?? search,
                    tags: params.tags ?? selectedTags,
                    stacks: params.stacks ?? selectedStacks,
                    sort: params.sort ?? sort,
                    order: params.order ?? order,
                },
                { preserveState: true, preserveScroll: true },
            );
        },
        [search, selectedTags, selectedStacks, sort, order],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => updateFilters({ search: value }), 300),
        [updateFilters],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleTagsChange = (tags: Tag[]) => {
        setSelectedTags(tags.map((tag) => tag.slug));
        updateFilters({ tags: tags.map((tag) => tag.slug) });
    };

    const handleStacksChange = (stacks: Stack[]) => {
        setSelectedStacks(stacks.map((stack) => stack.slug));
        updateFilters({ stacks: stacks.map((stack) => stack.slug) });
    };

    const handleSortChange = (value: string) => {
        setSort(value);
        updateFilters({ sort: value });
    };

    const handleOrderChange = (value: string) => {
        setOrder(value);
        updateFilters({ order: value });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedTags([]);
        setSelectedStacks([]);
        setSort('downloads');
        setOrder('desc');

        updateFilters({
            search: '',
            tags: [],
            stacks: [],
            sort: 'downloads',
            order: 'desc',
        });
    };

    return (
        <GuestLayout>
            <Head title="Browse Starter Kits" />

            <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-2 py-8 sm:px-4">
                {/* Header */}
                <div className="mx-auto mb-8 max-w-xl py-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold tracking-wider">Browse starter kits</h1>
                    <p className="text-muted-foreground">
                        Find the perfect Laravel starter kit for your next project. You can narrow down your search by tags and stacks.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                            <TagsSheet onChanged={handleTagsChange} />
                            <StackSheet onChanged={handleStacksChange} />
                        </div>

                        <div className="hidden h-5 sm:block">
                            <Separator orientation="vertical" />
                        </div>

                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <Select onValueChange={handleSortChange} defaultValue="downloads">
                                <SelectTrigger className="w-full sm:w-[10rem]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="downloads">Downloads</SelectItem>
                                    <SelectItem value="stars">GitHub stars</SelectItem>
                                    <SelectItem value="created_at">Date curated</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={handleOrderChange} defaultValue="desc">
                                <SelectTrigger className="w-full sm:w-[9rem]">
                                    <SelectValue placeholder="Order" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="asc">Ascending</SelectItem>
                                    <SelectItem value="desc">Descending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="relative order-first w-full sm:order-2 sm:w-[30%]">
                        <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="search"
                            placeholder="Search kits..."
                            className="w-full pl-9"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                {kits.data.length > 0 ? (
                    <>
                        {/* Kits Grid */}
                        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {kits.data.map((kit) => (
                                <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                            ))}
                        </div>

                        {/* Results Summary & Pagination */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                            <div className="text-muted-foreground text-sm">
                                Page {kits.current_page} of {kits.last_page}
                            </div>
                            <div className="flex w-full flex-wrap justify-center gap-2 sm:w-auto sm:justify-start">
                                <Button asChild variant="outline">
                                    <Link
                                        href={kits.prev_page_url ?? ''}
                                        className={`${kits.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <ChevronLeftIcon className="h-4 w-4" />
                                    </Link>
                                </Button>

                                {kits.links.slice(1, -1).map((link) => (
                                    <Button asChild key={link.url} variant={link.active ? 'default' : 'secondary'}>
                                        <Link href={link.url ?? ''}>{link.label}</Link>
                                    </Button>
                                ))}

                                <Button asChild variant="outline">
                                    <Link
                                        href={kits.next_page_url ?? ''}
                                        className={`${kits.current_page === kits.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                    >
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="mx-auto flex h-96 max-w-7xl items-center justify-center">
                        <div className="text-muted-foreground text-center">
                            <div className="flex items-center justify-center">
                                <PackageSearchIcon className="h-8 w-8" />
                            </div>
                            <p className="mt-2">No kits found at the moment! Try adjusting your filters.</p>
                            <div className="mt-4">
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear filters
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Kit Details Sheet */}
                <KitDetailsSheet kit={selectedKit} onOpenChange={() => setSelectedKit(null)} />
            </div>
        </GuestLayout>
    );
}
