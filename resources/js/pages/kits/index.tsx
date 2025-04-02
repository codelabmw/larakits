import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GuestLayout } from '@/layouts/guest-layout';
import type { Kit, Stack, Tag } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckIcon, CopyIcon, DownloadIcon, GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { FilterIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    kits: Kit[];
    tags: Tag[];
    stacks: Stack[];
}

export default function Index({ kits: initialKits, tags, stacks }: Props) {
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
    const [copied, setCopied] = useState<'herd' | 'composer' | null>(null);

    // Filter kits based on search and selected filters
    const filteredKits = initialKits.filter((kit) => {
        const matchesSearch = kit.name.toLowerCase().includes(search.toLowerCase()) || kit.description.toLowerCase().includes(search.toLowerCase());

        const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => kit.tags.some((t) => t.slug === tag));

        const matchesStacks = selectedStacks.length === 0 || selectedStacks.every((stack) => kit.stacks.some((s) => s.slug === stack));

        return matchesSearch && matchesTags && matchesStacks;
    });

    const copyToClipboard = async (command: string, type: 'herd' | 'composer') => {
        await navigator.clipboard.writeText(command);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <GuestLayout>
            <Head title="Browse Starter Kits" />

            <div className="container mx-auto py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Browse Starter Kits</h1>
                    <p className="text-muted-foreground">Find the perfect Laravel starter kit for your next project</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            type="search"
                            placeholder="Search kits..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <FilterIcon className="h-4 w-4" />
                                Filters
                                {(selectedTags.length > 0 || selectedStacks.length > 0) && (
                                    <Badge variant="secondary" className="ml-1">
                                        {selectedTags.length + selectedStacks.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="space-y-8 p-6">
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
                                                        if (checked) {
                                                            setSelectedTags([...selectedTags, tag.slug]);
                                                        } else {
                                                            setSelectedTags(selectedTags.filter((t) => t !== tag.slug));
                                                        }
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
                                                        if (checked) {
                                                            setSelectedStacks([...selectedStacks, stack.slug]);
                                                        } else {
                                                            setSelectedStacks(selectedStacks.filter((s) => s !== stack.slug));
                                                        }
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

                {/* Kits Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredKits.map((kit) => (
                        <Card
                            key={kit.slug}
                            className="hover:bg-muted/50 flex cursor-pointer flex-col p-6 transition-colors"
                            onClick={() => setSelectedKit(kit)}
                        >
                            <h3 className="mb-2 text-lg font-semibold">{kit.name}</h3>
                            <p className="text-muted-foreground mb-4 flex-1 text-sm">{kit.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                                    <span className="flex items-center">
                                        <GitHubLogoIcon className="mr-1 h-4 w-4" />
                                        {kit.stars}
                                    </span>
                                    <span className="flex items-center">
                                        <DownloadIcon className="mr-1 h-4 w-4" />
                                        {kit.downloads}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    {kit.tags.map((tag) => (
                                        <Badge key={tag.slug} variant="secondary">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Kit Details Sheet */}
                <Sheet open={!!selectedKit} onOpenChange={() => setSelectedKit(null)}>
                    <SheetContent className="p-6 sm:max-w-xl">
                        {selectedKit && (
                            <ScrollArea className="h-full pr-6">
                                <div className="space-y-8">
                                    {/* Header */}
                                    <div>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight">{selectedKit.name}</h2>
                                        <p className="text-muted-foreground">{selectedKit.description}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <GitHubLogoIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.stars} stars
                                        </div>
                                        <div className="text-muted-foreground flex items-center text-sm">
                                            <DownloadIcon className="mr-1 h-4 w-4" />
                                            {selectedKit.downloads} downloads
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedKit.stacks.map((stack) => (
                                                <Badge key={stack.slug} variant="outline">
                                                    {stack.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Maintainers */}
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Maintainers</h3>
                                        <div className="flex -space-x-2">
                                            {selectedKit.maintainers.map((maintainer) => (
                                                <img
                                                    key={maintainer.name}
                                                    src={maintainer.avatar}
                                                    alt={maintainer.name}
                                                    className="border-background h-8 w-8 rounded-full border-2"
                                                    title={maintainer.name}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Installation */}
                                    <div>
                                        <h3 className="mb-3 text-sm font-medium">Installation</h3>
                                        <div className="space-y-4">
                                            {/* Herd */}
                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Label>Using Herd</Label>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 gap-2"
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                `herd new my-app --using=${selectedKit.vendor}/${selectedKit.name}`,
                                                                'herd',
                                                            )
                                                        }
                                                    >
                                                        {copied === 'herd' ? (
                                                            <>
                                                                <CheckIcon className="h-4 w-4" />
                                                                Copied!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CopyIcon className="h-4 w-4" />
                                                                Copy
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                                <code className="bg-muted block rounded-lg p-4 font-mono text-sm">
                                                    herd new my-app --using={selectedKit.vendor}/{selectedKit.name}
                                                </code>
                                            </div>

                                            {/* Composer */}
                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Label>Using Composer</Label>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 gap-2"
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                `composer create-project ${selectedKit.vendor}/${selectedKit.name}`,
                                                                'composer',
                                                            )
                                                        }
                                                    >
                                                        {copied === 'composer' ? (
                                                            <>
                                                                <CheckIcon className="h-4 w-4" />
                                                                Copied!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CopyIcon className="h-4 w-4" />
                                                                Copy
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                                <code className="bg-muted block rounded-lg p-4 font-mono text-sm">
                                                    composer create-project {selectedKit.vendor}/{selectedKit.name}
                                                </code>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="space-y-4">
                                        {/* Authors */}
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium">Authors</h3>
                                            <div className="text-muted-foreground text-sm">{selectedKit.authors.join(', ')}</div>
                                        </div>

                                        {/* Licenses */}
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium">Licenses</h3>
                                            <div className="text-muted-foreground text-sm">{selectedKit.licenses.join(', ')}</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </GuestLayout>
    );
}
