import { Laravel } from '@/components/icons/laravel';
import useGA4Analytics from '@/hooks/use-analytics';
import useOnce from '@/hooks/use-once';
import { GuestLayout } from '@/layouts/guest-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { CodeIcon, GearIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { Check, Code2, PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';

const sections = [
    { id: 'installation', title: 'Installation' },
    { id: 'using-herd', title: 'Using Herd' },
    { id: 'using-cli', title: 'Using Command Line' },
    { id: 'discovery', title: 'Discovery' },
    { id: 'best-practices', title: 'Best Practices' },
];

export default function Docs() {
    const { sendPageView } = useGA4Analytics();
    const [activeSection, setActiveSection] = useState('');

    useOnce(function () {
        sendPageView('docs', 'Larakits - Documentation');
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' },
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <GuestLayout>
            <Head title="Documentation" />

            <div className="relative mx-auto max-w-7xl px-2 py-8 sm:px-4">
                <div className="lg:flex lg:gap-12">
                    {/* Side Navigation */}
                    <div className="hidden lg:block lg:w-64">
                        <div className="sticky top-24 space-y-4">
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className={cn(
                                            'hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors',
                                            activeSection === section.id ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground',
                                        )}
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-3xl min-w-0 flex-1">
                        <h1 className="mb-8 text-left text-4xl font-bold tracking-tight">Documentation</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-left text-xl">
                                Learn how to install starter kits from Larakits and how to get your starter kits discovered.
                            </p>

                            <div className="my-12 space-y-16">
                                {/* Installation Section */}
                                <section id="installation">
                                    <h2 className="mb-4 text-left text-2xl font-bold tracking-tight">Installation</h2>
                                    <p className="text-muted-foreground mb-2 text-left text-lg">
                                        There are two ways to install Laravel starter kits: using the Herd button or using the command line. Both
                                        methods are simple and straight-forward.
                                    </p>
                                </section>

                                {/* Using Herd Section */}
                                <section id="using-herd" className="from-primary/5 to-secondary/5 rounded-xl border bg-gradient-to-br p-4 sm:p-8">
                                    <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                        <LightningBoltIcon className="text-primary h-6 w-6" />
                                        <h2 className="text-left text-xl font-semibold tracking-tight">Using Herd</h2>
                                    </div>
                                    <p className="text-muted-foreground mb-4 text-left">
                                        The fastest way to install starter kits is with Laravel Herd. When viewing a starter kit on Larakits, you'll
                                        see a <span className="font-medium">Laravel Herd</span> button that follows a deep-link to Laravel Herd and
                                        opens your installed Herd application.
                                    </p>
                                    <ol className="modern-list list-decimal space-y-3 pl-6">
                                        <li>
                                            <span className="font-medium">Browse and select a starter kit</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Find the kit you want to install from the Larakits platform.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Click the "Laravel Herd" button</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                This will open Herd and start the installation process for your chosen kit.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Follow any additional setup instructions</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Some kits may provide extra steps or configuration after installation.
                                            </p>
                                        </li>
                                    </ol>
                                </section>

                                {/* Using CLI Section */}
                                <section id="using-cli" className="dark:bg-muted/70 rounded-xl border bg-white/80 p-4 shadow-sm sm:p-8">
                                    <div className="mb-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                        <CodeIcon className="text-primary h-6 w-6" />
                                        <h2 className="text-left text-xl font-semibold tracking-tight">Using Command Line</h2>
                                    </div>
                                    <p className="text-muted-foreground mb-4 text-left">You can also install starter kits using the Laravel CLI:</p>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="font-medium">Basic command</span>
                                            <pre className="bg-muted text-muted-foreground mt-1 overflow-x-auto rounded-lg p-4 text-left">
                                                <code>laravel new project-name --using=vendor/name</code>
                                            </pre>
                                        </div>
                                        <div>
                                            <span className="font-medium">Example</span>
                                            <pre className="bg-muted text-muted-foreground mt-1 overflow-x-auto rounded-lg p-4 text-left">
                                                <code>laravel new my-app --using=laravel/react-starter-kit</code>
                                            </pre>
                                        </div>
                                    </div>
                                </section>

                                {/* Discovery Section */}
                                <section id="discovery">
                                    <h2 className="mb-4 text-left text-2xl font-bold tracking-tight">Discovery</h2>
                                    <p className="text-muted-foreground mb-4 text-left">
                                        Larakits automatically curates Laravel starter kits from Packagist using a multi-step discovery process. This
                                        ensures that only laravel starter kits appear on the platform, making it easier for developers to find and use
                                        them.
                                    </p>
                                </section>

                                <section className="from-primary/5 to-secondary/5 mb-8 rounded-xl border bg-gradient-to-br p-4 sm:p-8">
                                    <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                        <LightningBoltIcon className="text-primary h-6 w-6" />
                                        <h3 className="text-left text-xl font-bold tracking-tight">Discovery Process</h3>
                                    </div>
                                    <ol className="modern-list list-decimal space-y-3 pl-6">
                                        <li>
                                            <span className="font-medium">Packagist Search</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Larakits searches Packagist for packages of type <code>project</code> with tags <code>laravel</code>,{' '}
                                                <code>starter-kit</code>, and <code>laravel-starter-kit</code>.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Qualification</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                For each package found, Larakits checks that it requires <code>laravel/framework</code> and that its{' '}
                                                <code>name</code>, <code>description</code>, or <code>keywords</code> contain qualifying tags.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Stack Detection</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                If a package qualifies, Larakits analyzes both Composer and npm dependencies to guess which tech stack
                                                (e.g., React, Vue, TailwindCSS, Livewire) the kit uses.
                                            </p>
                                        </li>
                                    </ol>
                                </section>

                                <section className="from-primary/5 to-secondary/5 rounded-xl border bg-gradient-to-br p-4 sm:p-8">
                                    <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                                        <CodeIcon className="text-primary h-6 w-6" />
                                        <h3 className="text-left text-xl font-bold tracking-tight">Getting Discovered</h3>
                                    </div>
                                    <ol className="modern-list list-decimal space-y-3 pl-6">
                                        <li>
                                            <span className="font-medium">Use Qualifying Keywords</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Add <code>laravel-starter-kit</code> and <code>starter-kit</code> to your <code>composer.json</code>{' '}
                                                keywords array.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Clear Description</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Write a concise, intentional description that includes qualifying keywords so Larakits and users can
                                                easily understand your kit’s purpose.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Descriptive Name</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Choose a package name that clearly indicates it’s a starter kit, e.g., <code>vue-starter-kit</code> or{' '}
                                                <code>react-starter-kit</code>.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Require Laravel</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Ensure your <code>composer.json</code> has <code>laravel/framework</code> as a required dependency.
                                            </p>
                                        </li>
                                        <li>
                                            <span className="font-medium">Include Stack Dependencies</span>
                                            <p className="text-muted-foreground mt-1 text-left text-sm">
                                                Add relevant npm and Composer dependencies (like <code>react</code>, <code>vue</code>,{' '}
                                                <code>tailwindcss</code>, <code>livewire/livewire</code>) to help Larakits accurately detect your tech
                                                stack.
                                            </p>
                                        </li>
                                    </ol>
                                </section>

                                {/* Best Practices Section */}
                                <section id="best-practices">
                                    <h2 className="mb-6 text-left text-2xl font-bold tracking-tight">Best Practices</h2>
                                    <p className="text-muted-foreground mb-8 text-left">
                                        Follow these guidelines to ensure your starter kit is well-received:
                                    </p>

                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        <div className="dark:bg-muted/70 flex h-full flex-col items-start rounded-xl border bg-white/80 p-4 shadow-sm sm:p-6">
                                            <span className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                                <Check />
                                            </span>
                                            <span className="mb-2 text-left text-lg font-semibold">Keep dependencies up to date</span>
                                            <p className="text-muted-foreground text-left text-sm">
                                                Regularly update both Composer and npm dependencies to ensure security and compatibility.
                                            </p>
                                        </div>

                                        <div className="dark:bg-muted/70 flex h-full flex-col items-start rounded-xl border bg-white/80 p-4 shadow-sm sm:p-6">
                                            <span className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                                <PenLine />
                                            </span>
                                            <span className="mb-2 text-left text-lg font-semibold">Provide clear documentation</span>
                                            <p className="text-muted-foreground text-left text-sm">
                                                Include a comprehensive README and usage instructions to help users get started quickly.
                                            </p>
                                        </div>

                                        <div className="dark:bg-muted/70 flex h-full flex-col items-start rounded-xl border bg-white/80 p-4 shadow-sm sm:p-6">
                                            <span className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                                <GearIcon className="h-6 w-6" />
                                            </span>
                                            <span className="mb-2 text-left text-lg font-semibold">Include example configurations</span>
                                            <p className="text-muted-foreground text-left text-sm">
                                                Offer sample environment files or configuration examples for easier setup.
                                            </p>
                                        </div>

                                        <div className="dark:bg-muted/70 flex h-full flex-col items-start rounded-xl border bg-white/80 p-4 shadow-sm sm:p-6">
                                            <span className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                                <Code2 />
                                            </span>
                                            <span className="mb-2 text-left text-lg font-semibold">Maintain a clean and organized codebase</span>
                                            <p className="text-muted-foreground text-left text-sm">
                                                Use consistent formatting, structure, and naming conventions throughout your project.
                                            </p>
                                        </div>

                                        <div className="dark:bg-muted/70 flex h-full flex-col items-start rounded-xl border bg-white/80 p-4 shadow-sm sm:p-6">
                                            <span className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                                <Laravel className="text-3xl" />
                                            </span>
                                            <span className="mb-2 text-left text-lg font-semibold">Follow Laravel's coding standards</span>
                                            <p className="text-muted-foreground text-left text-sm">
                                                Adhere to official Laravel guidelines for code quality and style.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <div className="text-muted-foreground mt-12 border-t pt-6 text-left text-sm">Last updated: April 2, 2025</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
