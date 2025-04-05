import { GuestLayout } from '@/layouts/guest-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { CodeIcon, GitHubLogoIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const sections = [
    { id: 'installation', title: 'Installation' },
    { id: 'using-herd', title: 'Using Herd' },
    { id: 'using-cli', title: 'Using Command Line' },
    { id: 'discovery', title: 'Discovery' },
    { id: 'best-practices', title: 'Best Practices' },
];

export default function Docs() {
    const [activeSection, setActiveSection] = useState('');

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

            <div className="relative mx-auto max-w-7xl py-8">
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
                        <h1 className="mb-8 text-4xl font-bold tracking-tight">Documentation</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-xl">
                                Learn how to install starter kits from Larakits and how to get your starter kits discovered.
                            </p>

                            <div className="my-12 space-y-12">
                                <section id="installation">
                                    <h2 className="!mt-0 text-lg font-bold">Installation</h2>
                                    <p className="mt-2">
                                        There are two ways to install Laravel starter kits: using the Herd button or using the command line. Both
                                        methods are simple and straight-forward.
                                    </p>
                                </section>

                                <section id="using-herd">
                                    <h2 className="!mt-0 text-lg font-bold">Using Herd</h2>
                                    <div className="mt-4 flex items-center gap-2">
                                        <LightningBoltIcon className="text-primary h-5 w-5" />
                                        <span className="font-medium">The fastest way to install starter kits</span>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <p>
                                            When viewing a starter kit on Larakits, you'll see a Herd button that allows for one-click installation:
                                        </p>
                                        <ol className="list-decimal space-y-2 pl-5">
                                            <li>Browse and select a starter kit</li>
                                            <li>Click the "Install with Herd" button</li>
                                            <li>Follow any additional setup instructions if provided</li>
                                        </ol>
                                    </div>
                                </section>

                                <section id="using-cli">
                                    <h2 className="!mt-0 text-lg font-bold">Using Command Line</h2>
                                    <div className="mt-4 flex items-center gap-2">
                                        <CodeIcon className="text-primary h-5 w-5" />
                                        <span className="font-medium">Traditional installation method</span>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <p>You can also install starter kits using the Laravel CLI:</p>
                                        <pre className="bg-muted text-muted-foreground rounded-lg p-4">
                                            <code>laravel new project-name --using=vendor/name</code>
                                        </pre>
                                        <p>For example:</p>
                                        <pre className="bg-muted text-muted-foreground rounded-lg p-4">
                                            <code>laravel new my-app --using=laravel/react-starter-kit</code>
                                        </pre>
                                    </div>
                                </section>

                                <section id="discovery">
                                    <h2 className="!mt-0 text-lg font-bold">Discovery</h2>
                                    <div className="mt-4 flex items-center gap-2">
                                        <TagIcon className="text-primary h-5 w-5" />
                                        <span className="font-medium">Get your starter kit discovered</span>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <p>
                                            To ensure your starter kit is discovered by Larakits, follow these best practices when submitting to
                                            Packagist:
                                        </p>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-medium">Use Qualifying Keywords</h3>
                                                <p className="mt-1">Include these keywords in your composer.json:</p>
                                                <ul className="mt-2 list-disc space-y-1 pl-5">
                                                    <li>laravel-starter-kit</li>
                                                    <li>starter-kit</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Clear Description</h3>
                                                <p className="mt-1">
                                                    Write an intentional, clear, and concise description in your composer.json that includes
                                                    qualifying keywords. This helps with discovery and lets users quickly understand your kit's
                                                    purpose.
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Descriptive Name</h3>
                                                <p className="mt-1">Choose a name that clearly indicates it's a starter kit. Examples:</p>
                                                <ul className="mt-2 list-disc space-y-1 pl-5">
                                                    <li>vue-starter-kit</li>
                                                    <li>react-starter-kit</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section id="best-practices">
                                    <h2 className="!mt-0 text-lg font-bold">Best Practices</h2>
                                    <div className="mt-4 flex items-center gap-2">
                                        <GitHubLogoIcon className="text-primary h-5 w-5" />
                                        <span className="font-medium">Maintain a quality starter kit</span>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <p>Follow these guidelines to ensure your starter kit is well-received:</p>
                                        <ul className="list-disc space-y-2 pl-5">
                                            <li>Keep dependencies up to date</li>
                                            <li>Provide clear documentation</li>
                                            <li>Include example configurations</li>
                                            <li>Maintain a clean and organized codebase</li>
                                            <li>Follow Laravel's coding standards</li>
                                        </ul>
                                    </div>
                                </section>
                            </div>

                            <div className="text-muted-foreground mt-12 border-t pt-6 text-sm">Last updated: April 2, 2025</div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
