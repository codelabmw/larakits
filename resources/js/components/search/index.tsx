import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { CheckIcon, Search as SearchIcon } from 'lucide-react';
import { useRef, useState } from 'react';

type SearchFilter = 'Author' | 'General';

interface SearchBoxProps extends React.ComponentProps<'div'> {
    onSearch: (query: string, filter: SearchFilter) => void;
    initialFilter?: SearchFilter;
    className?: string;
}

export function SearchBox({ 
    onSearch, 
    initialFilter = 'General',
    className,
    ...props 
}: SearchBoxProps) {
    const [filter, setFilter] = useState<SearchFilter>(initialFilter);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            onSearch(inputRef.current.value, filter);
        }
    };

    const handleFilterChange = (newFilter: SearchFilter) => {
        setFilter(newFilter);
        inputRef.current?.focus();
    };

    return (
        <div className={cn('relative', className)} {...props}>
            <form onSubmit={handleSubmit} className="w-full">
                <Input
                    ref={inputRef}
                    placeholder="Search kits..."
                    className="w-full pr-24 pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 rounded-full px-2 text-xs font-normal text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                                {filter}
                                <CaretDownIcon className="ml-1 h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem className="flex items-center justify-between" onClick={() => handleFilterChange('General')}>
                                <span>General</span>
                                {filter === 'General' && <CheckIcon className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center justify-between" onClick={() => handleFilterChange('Author')}>
                                <span>Author</span>
                                {filter === 'Author' && <CheckIcon className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </form>
        </div>
    );
}
