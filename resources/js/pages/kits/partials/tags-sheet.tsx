import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useAfter from '@/hooks/use-after';
import useOnce from '@/hooks/use-once';
import { Tag } from '@/types';
import { debounce } from 'lodash';
import { CheckIcon, TagIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';

interface Props {
    onChanged?: (tags: Tag[]) => void;
}

export default function TagsSheet({ onChanged }: Props) {
    const [search, setSearch] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    useOnce(() => {
        fetchTags({});
    });

    const fetchTags = useCallback(
        async (params: { search?: string }) => {
            try {
                const response = await fetch(route('tags', params ?? search));
                if (response.ok) {
                    const data: Tag[] = await response.json();
                    setTags(data);
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                //
            }
        },
        [search],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => fetchTags({ search: value }), 300),
        [fetchTags],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const toggleSelection = (tag: Tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags((prev) => prev.filter((t) => t !== tag));
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    useAfter(() => onChanged?.(selectedTags), [selectedTags]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <TagIcon className="h-4 w-4" />
                    <span>Tags</span>
                    {selectedTags.length > 0 && (
                        <Badge variant="secondary" className="ml-1">
                            {selectedTags.length}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-4 sm:p-6 w-[100%]">
                <div className="mb-4">
                    <h5 className="text-lg font-semibold">Tags</h5>
                </div>

                {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedTags.map((tag) => (
                            <Badge key={tag.slug} variant="secondary" className="cursor-pointer capitalize" onClick={() => toggleSelection(tag)}>
                                <span>{tag.name}</span>
                                <X className="ml-2" />
                            </Badge>
                        ))}
                    </div>
                )}

                <Input
                    type="search"
                    placeholder="Search tags..."
                    className="mb-4 w-full"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-2">
                        {tags.map((tag) => (
                            <Button
                                key={tag.slug}
                                variant={selectedTags.includes(tag) ? 'secondary' : 'ghost'}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
                                onClick={() => toggleSelection(tag)}
                            >
                                <span>{tag.name}</span>
                                {selectedTags.includes(tag) && <CheckIcon className="h-4 w-4" />}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
