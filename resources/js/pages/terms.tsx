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

            <div className="relative mx-auto max-w-7xl py-8 px-4 sm:px-6 md:px-8">
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
                    <div className="max-w-3xl min-w-0 flex-1 w-full">
                        <h1 className="mb-8 text-4xl font-bold tracking-tight text-left">Terms of Service</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-xl text-left">
                                By using Larakits, you agree to these terms. Please read them carefully.
                            </p>

                            <div className="my-12 space-y-12 sm:my-16 sm:space-y-16">
                                <section id="terms">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Terms</h2>
                                    <p className="mt-2 text-left">
                                        Larakits is a community-driven, open-source platform for discovering, sharing, and maintaining Laravel starter kits. By accessing or using Larakits, you agree to these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use the platform.
                                    </p>
                                </section>

                                <section id="use-license">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Use License</h2>
                                    <p className="mt-2 text-left">
                                        Larakits grants you a limited, non-exclusive license to access and use the platform for personal and non-commercial purposes, specifically for discovering, evaluating, and contributing Laravel starter kits. You may not:
                                    </p>
                                    <ul className="bg-muted/40 mt-4 space-y-3 rounded-lg border p-4 text-left">
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </span>
                                            <span>
                                                Modify or copy platform content except as permitted by kit licenses or contribution guidelines
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </span>
                                            <span>Use the platform or its content for commercial exploitation without permission</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </span>
                                            <span>Reverse engineer, attempt to gain unauthorized access, or disrupt the platform’s operation</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-primary mt-1">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </span>
                                            <span>Remove or alter copyright notices or attributions from kits or platform content</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="user-contributions">
                                    <h2 className="!mt-0 text-lg font-bold text-left">User Contributions</h2>
                                    <p className="mt-2 text-left">
                                        Larakits does not accept direct starter kit submissions. Instead, Larakits automatically curates publicly available Laravel starter kits from Packagist. All kit information, metadata, and documentation are sourced from Packagist and the respective public repositories. If you are a kit owner and wish to update or remove your kit’s information on Larakits, please update your Packagist listing or contact Larakits support for assistance.
                                    </p>
                                </section>

                                <section id="disclaimer">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Disclaimer</h2>
                                    <p className="mt-2 text-left">
                                        Larakits is provided as a community resource on an "as is" basis. While we strive to curate high-quality starter kits and information, Larakits makes no warranties, expressed or implied, regarding the accuracy, reliability, or suitability of any kits or content. Use of any kit or information from the platform is at your own risk.
                                    </p>
                                </section>

                                <section id="limitations">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Limitations</h2>
                                    <p className="mt-2 text-left">
                                        In no event shall Larakits, its maintainers, or contributors be liable for any damages arising from the use or inability to use the platform or any starter kit, including but not limited to loss of data, profits, or business interruption. Users are responsible for evaluating the suitability and security of any kit before use.
                                    </p>
                                </section>

                                <section id="accuracy">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Accuracy of Materials</h2>
                                    <p className="mt-2 text-left">
                                        Larakits aims to provide accurate and up-to-date information about Laravel starter kits, but does not guarantee that all content is error-free, complete, or current. Kit details, documentation, and statistics are provided by maintainers and the community, and may change at any time.
                                    </p>
                                </section>

                                <section id="links">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Links</h2>
                                    <p className="mt-2 text-left">
                                        Larakits contains links to third-party sites, repositories, and resources. These links are provided for convenience and do not imply endorsement. Larakits is not responsible for the content or availability of external sites and resources.
                                    </p>
                                </section>

                                <section id="modifications">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Modifications</h2>
                                    <p className="mt-2 text-left">
                                        Larakits may update these Terms of Service at any time to reflect changes in the platform, community guidelines, or legal requirements. Continued use of the platform after changes constitutes acceptance of the revised terms.
                                    </p>
                                </section>

                                <section id="governing-law">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Governing Law</h2>
                                    <p className="mt-2 text-left">
                                        These terms are governed by and construed in accordance with the laws applicable to the platform’s operators. Any disputes arising from these terms or the use of Larakits will be subject to the exclusive jurisdiction of the relevant courts.
                                    </p>
                                </section>
                            </div>

                            <div className="text-muted-foreground mt-12 border-t pt-6 text-sm text-left">Last updated: April 18, 2025</div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
