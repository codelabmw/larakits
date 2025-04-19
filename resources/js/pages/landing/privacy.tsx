import { GuestLayout } from '@/layouts/guest-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const sections = [
    { id: 'information-collected', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'policy-changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' },
];

export default function Privacy() {
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
            <Head title="Privacy Policy" />

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
                        <h1 className="mb-8 text-4xl font-bold tracking-tight text-left">Privacy Policy</h1>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="lead text-muted-foreground text-xl text-left">
                                At Larakits, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
                            </p>

                            <div className="my-12 space-y-12 sm:my-16 sm:space-y-16">
                                <section id="information-collected">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Information We Collect</h2>
                                    <p className="mt-2 text-left">Larakits curates Laravel starter kits from public sources such as Packagist. As part of this process, we collect and display publicly available maintainer and author metadata (which may include name and email address) for attribution. We do not collect personal information from kit submissions directly. In addition, we may collect the following types of information when you use our platform:</p>
                                    <ul className="mt-4 space-y-3 rounded-lg border bg-muted/40 p-4 text-left">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Name and email address if you contact us directly</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Maintainer and author metadata (including name and email address) from public Packagist listings</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Usage data and analytics (such as pages visited, browser type, and device information)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Cookies and similar tracking technologies for improving site experience</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="information-use">
                                    <h2 className="!mt-0 text-lg font-bold text-left">How We Use Your Information</h2>
                                    <p className="mt-2 text-left">We use the information we collect for the following purposes:</p>
                                    <ul className="mt-4 space-y-3 rounded-lg border bg-muted/40 p-4 text-left">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>To operate, maintain, and improve the Larakits platform</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>To display proper attribution for curated starter kits</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>To respond to your inquiries and provide support</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>To analyze usage and trends to enhance user experience</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>To ensure the security and integrity of the platform</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="data-security">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Data Security</h2>
                                    <p className="mt-2 text-left">
                                        We use reasonable administrative and technical safeguards to protect your information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                                    </p>
                                </section>

                                <section id="third-party">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Third-Party Services</h2>
                                    <p className="mt-2 text-left">
                                        Larakits may use third-party services (such as analytics providers or embedded content) that collect, monitor, and analyze data. These third parties have their own privacy policies governing their use of such information.
                                    </p>
                                </section>

                                <section id="your-rights">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Your Rights</h2>
                                    <p className="mt-2 text-left">You have the right to:</p>
                                    <ul className="mt-4 space-y-3 rounded-lg border bg-muted/40 p-4 text-left">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Access the personal information we hold about you</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Request correction or deletion of your data</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Object to or restrict certain processing of your data</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 text-primary">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                                            </span>
                                            <span>Request a copy of your data in a portable format</span>
                                        </li>
                                    </ul>
                                </section>

                                <section id="policy-changes">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Changes to This Policy</h2>
                                    <p className="mt-2 text-left">
                                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of Larakits after changes constitutes acceptance of the revised policy.
                                    </p>
                                </section>

                                <section id="contact">
                                    <h2 className="!mt-0 text-lg font-bold text-left">Contact Us</h2>
                                    <p className="mt-2 text-left">
                                        If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                                        <a href="mailto:privacy@larakits.dev" className="text-primary hover:underline">
                                            privacy@larakits.dev
                                        </a>
                                        .
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
