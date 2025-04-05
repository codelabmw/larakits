import { Button } from '@/Components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <SunIcon className="h-4 w-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
