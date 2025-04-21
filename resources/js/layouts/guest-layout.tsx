import { CookieBanner } from '@/components/cookie-banner';
import { ThemeToggle } from '@/components/theme-toggle';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { MenuIcon, XIcon } from 'lucide-react';
import numeral from 'numeral';
import { PropsWithChildren, useState } from 'react';

const navigation = [
    {
        title: 'Browse',
        href: '/kits',
    },
    {
        title: 'Resources',
        items: [
            {
                title: 'About Larakits',
                href: '/about',
                description: 'Learn more about why we created Larakits.',
            },
            {
                title: 'Documentation',
                href: route('docs'),
                description: 'Learn how to use and get your kits discovered on Larakits.',
            },
            {
                title: 'Terms of Service',
                href: route('terms'),
                description: 'Read our terms of service.',
            },
            {
                title: 'Privacy Policy',
                href: route('privacy'),
                description: 'Read our privacy policy.',
            },
        ],
    },
];

const footerNavigation = {
    product: [
        { name: 'Browse kits', href: '/kits' },
        { name: 'Documentation', href: route('docs') },
    ],
    company: [
        { name: 'About', href: '/about' },
        { name: 'Terms', href: route('terms') },
        { name: 'Privacy', href: route('privacy') },
    ],
    community: [
        { name: 'GitHub', href: 'https://github.com/codelabmw/larakits' },
        // { name: 'Discord', href: 'https://discord.gg/larakits' },
        // { name: 'Twitter', href: 'https://twitter.com/larakits' },
        // { name: 'Newsletter', href: '/newsletter' },
    ],
    support: [
        { name: 'Documentation', href: route('docs') },
        { name: 'Contact', href: route('contact') },
    ],
};

export function GuestLayout({ children }: PropsWithChildren) {
    const { stars } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <CookieBanner />
            <div className="relative flex min-h-screen flex-col">
                {/* Header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                                <span>Larakits.</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:block">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        {navigation.map((item) =>
                                            item.items ? (
                                                <NavigationMenuItem key={item.title}>
                                                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                                                            {item.items.map((subItem) => (
                                                                <li key={subItem.title}>
                                                                    <NavigationMenuLink asChild>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={cn(
                                                                                'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                                                                            )}
                                                                        >
                                                                            <div className="text-sm leading-none font-medium">{subItem.title}</div>
                                                                            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                                                                {subItem.description}
                                                                            </p>
                                                                        </Link>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                            ) : (
                                                <NavigationMenuItem key={item.title}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={cn(
                                                                'group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                                                            )}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </NavigationMenuItem>
                                            ),
                                        )}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                            {/* GitHub */}
                            <a
                                href="https://github.com/codelabmw/larakits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm"
                                aria-label="View on GitHub"
                            >
                                <GitHubLogoIcon className="h-5 w-5" />
                                {stars && <span className="text-muted-foreground text-sm">{numeral(stars).format('0a')}</span>}
                            </a>

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Mobile Hamburger/Close Toggle */}
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground focus:ring-ring inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none md:hidden"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                onClick={() => setMobileMenuOpen((open) => !open)}
                            >
                                {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation (expands navbar, animated, card style) */}
                    <div
                        className={`mx-auto w-full max-w-7xl overflow-hidden px-4 pb-0 transition-all duration-300 ease-in-out sm:px-6 md:hidden lg:px-8 ${mobileMenuOpen ? 'max-h-[600px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                        aria-hidden={!mobileMenuOpen}
                    >
                        <div className="bg-muted mt-2 rounded-xl border p-4">
                            <nav className="space-y-4">
                                {navigation.map((item) =>
                                    item.items ? (
                                        <div key={item.title}>
                                            <div className="text-muted-foreground mb-3 text-sm font-light">{item.title}</div>
                                            <ul className="space-y-4">
                                                {item.items.map((subItem) => (
                                                    <li key={subItem.title}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="text-muted-foreground block rounded-md text-base font-semibold"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="text-muted-foreground block rounded-md text-base font-semibold"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ),
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="w-full flex-1 px-2 py-6 sm:px-4 md:px-6 lg:px-0">{children}</main>

                {/* Footer */}
                <footer className="bg-muted/40 mt-auto border-t">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* App Info */}
                        <div className="grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12">
                            <div className="lg:col-span-4">
                                <Link href="/" className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                    <span>Larakits.</span>
                                </Link>
                                <p className="text-muted-foreground text-sm">
                                    Larakits is a curated collection of community-maintained Laravel starter kits that help you kickstart your next
                                    project with the best practices and modern tooling.
                                </p>
                            </div>

                            {/* Navigation */}
                            <nav className="mt-8 grid gap-8 sm:mt-0 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold">Product</h3>
                                    <ul className="space-y-2">
                                        {footerNavigation.product.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="text-muted-foreground hover:text-foreground block py-1 text-sm">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold">Company</h3>
                                    <ul className="space-y-2">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="text-muted-foreground hover:text-foreground block py-1 text-sm">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold">Community</h3>
                                    <ul className="space-y-2">
                                        {footerNavigation.community.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="text-muted-foreground hover:text-foreground block py-1 text-sm">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold">Support</h3>
                                    <ul className="space-y-2">
                                        {footerNavigation.support.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="text-muted-foreground hover:text-foreground block py-1 text-sm">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </nav>
                        </div>

                        {/* Copyright */}
                        <div className="flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
                            <p className="text-muted-foreground text-center text-sm sm:text-left">
                                &copy; {new Date().getFullYear()} Larakits. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                                    Terms
                                </Link>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                                    Privacy
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
