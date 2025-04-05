import { GuestLayout } from '@/layouts/guest-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const sections = [
    { id: 'terms', title: 'Terms' },
    { id: 'use-license', title: 'Use License' },
    { id: 'user-contributions', title: 'User Contributions' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'limitations', title: 'Limitations' },
    { id: 'accuracy', title: 'Accuracy of Materials' },
    { id: 'links', title: 'Links' },
    { id: 'modifications', title: 'Modifications' },
    { id: 'governing-law', title: 'Governing Law' },
];

export default function Terms() {
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
            <Head title="Terms of Service" />

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
                        <h1 className="mb-8 text-4xl font-bold tracking-tight">Terms of Service</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-xl">
                                By using Larakits, you agree to these terms. Please read them carefully.
                            </p>

                            <div className="my-12 space-y-12">
                                <section id="terms">
                                    <h2 className="!mt-0 text-lg font-bold">Terms</h2>
                                    <p className="mt-2">
                                        By accessing LaraKits, you agree to be bound by these Terms of Service and to comply with all applicable laws
                                        and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this
                                        site.
                                    </p>
                                </section>

                                <section id="use-license">
                                    <h2 className="!mt-0 text-lg font-bold">Use License</h2>
                                    <p className="mt-2">
                                        Permission is granted to temporarily access LaraKits for personal, non-commercial transitory viewing only.
                                        This is the grant of a license, not a transfer of title, and under this license you may not:
                                    </p>
                                    <ul>
                                        <li>Modify or copy the materials</li>
                                        <li>Use the materials for any commercial purpose</li>
                                        <li>Attempt to decompile or reverse engineer any software contained on LaraKits</li>
                                        <li>Remove any copyright or other proprietary notations from the materials</li>
                                    </ul>
                                </section>

                                <section id="user-contributions">
                                    <h2 className="!mt-0 text-lg font-bold">User Contributions</h2>
                                    <p>When submitting starter kits to La className="mt-2"raKits, you agree that:</p>
                                    <ul>
                                        <li>You own or have the rights to share the submitted content</li>
                                        <li>Your submission doesn't infringe on any third party's intellectual property rights</li>
                                        <li>You grant LaraKits a non-exclusive license to use, modify, and distribute your submission</li>
                                        <li>You are responsible for maintaining and supporting your submitted starter kits</li>
                                    </ul>
                                </section>

                                <section id="disclaimer">
                                    <h2 className="!mt-0 text-lg font-bold">Disclaimer</h2>
                                    <p className="mt-2">
                                        The materials on LaraKits are provided on an 'as is' basis. LaraKits makes no warranties, expressed or
                                        implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                                        warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                                        intellectual property or other violation of rights.
                                    </p>
                                </section>

                                <section id="limitations">
                                    <h2 className="!mt-0 text-lg font-bold">Limitations</h2>
                                    <p className="mt-2">
                                        In no event shall LaraKits or its suppliers be liable for any damages (including, without limitation, damages
                                        for loss of data or profit, or due to business interruption) arising out of the use or inability to use
                                        LaraKits, even if LaraKits or a LaraKits authorized representative has been notified orally or in writing of
                                        the possibility of such damage.
                                    </p>
                                </section>

                                <section id="accuracy">
                                    <h2 className="!mt-0 text-lg font-bold">Accuracy of Materials</h2>
                                    <p className="mt-2">
                                        The materials appearing on LaraKits could include technical, typographical, or photographic errors. LaraKits
                                        does not warrant that any of the materials on its website are accurate, complete, or current.
                                    </p>
                                </section>

                                <section id="links">
                                    <h2 className="!mt-0 text-lg font-bold">Links</h2>
                                    <p className="mt-2">
                                        LaraKits has not reviewed all of the sites linked to its website and is not responsible for the contents of
                                        any such linked site. The inclusion of any link does not imply endorsement by LaraKits of the site. Use of any
                                        such linked website is at the user's own risk.
                                    </p>
                                </section>

                                <section id="modifications">
                                    <h2 className="!mt-0 text-lg font-bold">Modifications</h2>
                                    <p className="mt-2">
                                        LaraKits may revise these terms of service at any time without notice. By using this website, you are agreeing
                                        to be bound by the then current version of these terms of service.
                                    </p>
                                </section>

                                <section id="governing-law">
                                    <h2 className="!mt-0 text-lg font-bold">Governing Law</h2>
                                    <p className="mt-2">
                                        These terms and conditions are governed by and construed in accordance with the laws of the United States and
                                        you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                                    </p>
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
