import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import useAfter from '@/hooks/use-after';
import useOnce from '@/hooks/use-once';
import { Stack } from '@/types';
import { StackIcon } from '@radix-ui/react-icons';
import { debounce } from 'lodash';
import { CheckIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';

interface Props {
    onChanged?: (stacks: Stack[]) => void;
}

export default function StackSheet({ onChanged }: Props) {
    const [search, setSearch] = useState<string>('');
    const [selectedStacks, setSelectedStacks] = useState<Stack[]>([]);
    const [stacks, setStacks] = useState<Stack[]>([]);

    useOnce(() => {
        fetchStacks({});
    });

    const fetchStacks = useCallback(
        async (params: { search?: string }) => {
            try {
                const response = await fetch(route('stacks', params ?? search));
                if (response.ok) {
                    const data: Stack[] = await response.json();
                    setStacks(data);
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                //
            }
        },
        [search],
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => fetchStacks({ search: value }), 300),
        [fetchStacks],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const toggleSelection = (stack: Stack) => {
        if (selectedStacks.includes(stack)) {
            setSelectedStacks((prev) => prev.filter((s) => s !== stack));
        } else {
            setSelectedStacks((prev) => [...prev, stack]);
        }
    };

    useAfter(() => onChanged?.(selectedStacks), [selectedStacks]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <StackIcon className="h-4 w-4" />
                    <span>Stack</span>
                    {selectedStacks.length > 0 && (
                        <Badge variant="secondary" className="ml-1">
                            {selectedStacks.length}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[100%] flex-col p-4 sm:p-6">
                <div className="mb-4">
                    <h5 className="text-lg font-semibold">Stack</h5>
                </div>

                {selectedStacks.length > 0 ? (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {selectedStacks.map((stack) => (
                            <Badge key={stack.slug} variant="secondary" className="cursor-pointer capitalize" onClick={() => toggleSelection(stack)}>
                                <span>{stack.name}</span>
                                <X className="ml-2" />
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <div className="text-muted-foreground mb-4 px-1 text-left text-sm">
                        <p>Not all stacks are shown. Try searching for a specific stack.</p>
                    </div>
                )}

                <Input
                    type="search"
                    placeholder="Search stacks..."
                    className="mb-4 w-full"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-2">
                        {stacks.map((stack) => (
                            <Button
                                key={stack.slug}
                                variant={selectedStacks.includes(stack) ? 'secondary' : 'ghost'}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
                                onClick={() => toggleSelection(stack)}
                            >
                                <span>{stack.name}</span>
                                {selectedStacks.includes(stack) && <CheckIcon className="h-4 w-4" />}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
