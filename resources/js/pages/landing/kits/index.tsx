import { InfiniteScroll } from '@/components/infinite-scroll';
import KitCard from '@/components/kit-card';
import { KitDetailsSheet } from '@/components/kit-details-sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Paginator, Stack, Tag } from '@/types';
import { Head, router } from '@inertiajs/react';
import { range } from 'lodash';
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
    author: string | null;
}

export default function Index({ kits, filters, author }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
    const [selectedStacks, setSelectedStacks] = useState<string[]>(filters.stacks || []);
    const [sort, setSort] = useState(filters.sort || 'downloads');
    const [order, setOrder] = useState(filters.order || 'desc');

    const handleSearch = (query: string, filter: 'Author' | 'General' = 'General') => {
        if (filter === 'Author') {
            router.get('/kits', { author: query }, { preserveState: true, preserveScroll: true });
        } else {
            setSearch(query);
            updateFilters({ search: query });
        }
        return true;
    };

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
        <GuestLayout onSearch={handleSearch}>
            <Head title="Starter Kits" />

            <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-2 py-8 sm:px-4">
                {/* Header */}
                <div className="mx-auto mb-8 max-w-3xl py-8 text-center">
                    {author ? (
                        <>
                            <h1 className="mb-2 text-3xl font-bold tracking-wider">
                                Starter kits by <span className="text-primary">{author}</span>
                            </h1>
                            <p className="text-muted-foreground">Viewing all starter kits created by {author}.</p>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-center">
                                <h1 className="text-2xl font-bold tracking-tight">Starter Kits</h1>
                            </div>
                            <p className="text-muted-foreground">
                                Find the perfect Laravel starter kit for your next project. You can narrow down your search by tags and stacks.
                            </p>
                        </>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                            <TagsSheet onChanged={handleTagsChange} />
                            <StackSheet onChanged={handleStacksChange} />
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
                </div>

                {kits === undefined ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Loading />
                    </div>
                ) : kits.data.length > 0 ? (
                    <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <InfiniteScroll data="kits" whileLoading={<Loading />} whileNoMoreData={<EndOfList />}>
                            {/* Kits Grid */}
                            {kits.data.map((kit) => (
                                <KitCard key={kit.slug} kit={kit} onClick={() => setSelectedKit(kit)} />
                            ))}
                        </InfiniteScroll>
                    </div>
                ) : (
                    <div className="mx-auto flex h-96 max-w-7xl items-center justify-center">
                        <div className="text-muted-foreground text-center">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <h1 className="text-2xl font-bold tracking-tight">Starter Kits</h1>
                                </div>
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

function Loading() {
    return (
        <>
            {range(7).map((index) => (
                <div key={index} className="bg-muted h-60 w-full animate-pulse rounded-xl"></div>
            ))}
        </>
    );
}

function EndOfList() {
    return (
        <div className="bg-muted/40 grid h-60 w-full place-content-center rounded-lg border p-4">
            <PackageSearchIcon className="text-muted-foreground mx-auto size-6" />
            <p className="text-muted-foreground mt-1 text-center text-sm">End of results.</p>
        </div>
    );
}
