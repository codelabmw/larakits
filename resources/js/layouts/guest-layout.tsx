import AppLogo from '@/components/app-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';

export function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="bg-background font-poppins min-h-screen">
            {/* Header */}
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                <div className="container mx-auto flex items-center py-5">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Search */}
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="w-full md:w-[300px] lg:w-[400px]">
                            <div className="relative">
                                <MagnifyingGlassIcon className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                <Input type="search" placeholder="Search kits..." className="pl-8" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="https://github.com/larakits/larakits" target="_blank" rel="noopener noreferrer" className="relative">
                                    <GitHubLogoIcon className="h-4 w-4" />
                                    <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                                        5k
                                    </span>
                                </a>
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-muted/40 border-t">
                <div className="container mx-auto py-12">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {/* Product */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">Product</h3>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <Link href="/kits" className="hover:text-foreground">
                                        Browse kits
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/how-to" className="hover:text-foreground">
                                        Documentation
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">Company</h3>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <Link href="/about" className="hover:text-foreground">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-foreground">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <Link href="/privacy" className="hover:text-foreground">
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-foreground">
                                        Terms
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="mb-4 text-sm font-semibold">Social</h3>
                            <ul className="text-muted-foreground space-y-3 text-sm">
                                <li>
                                    <a href="https://github.com/larakits" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com/larakits"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-foreground"
                                    >
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t pt-8 text-center sm:flex-row sm:text-left">
                        <div className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Larakits. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
