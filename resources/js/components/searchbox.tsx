import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

type Props = React.ComponentProps<'div'> & {
    onSubmit: (query: string, filter?: 'Author' | 'General') => void;
};

function SearchBox({ className, onSubmit, ...props }: Props) {
    const [filter, setFilter] = useState<'Author' | 'General'>('Author');
    const searchInput = useRef<HTMLInputElement>(null);

    const changeFilter = (filter: 'Author' | 'General') => {
        setFilter(filter);
        searchInput.current?.focus();
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(searchInput.current?.value || '', filter);
    };

    return (
        <div className={cn('relative', className)} {...props}>
            <form onSubmit={handleSearch}>
                <Input placeholder="Search kits" className="w-full pr-24 pl-8" ref={searchInput} />
            </form>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground data-[state=open]:bg-accent/50 absolute top-1/2 right-0.5 -translate-y-1/2 text-xs"
                    >
                        <span>{filter}</span>
                        <CaretDownIcon className="ml-1 h-3 w-3" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-50">
                    <DropdownMenuItem onClick={() => changeFilter('Author')}>Author</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeFilter('General')}>General</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        </div>
    );
}

export { SearchBox };
