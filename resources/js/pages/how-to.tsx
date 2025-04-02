import { Card } from '@/components/ui/card';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { CheckIcon, CodeIcon, FileTextIcon, GitHubLogoIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { TagIcon } from 'lucide-react';

export default function HowTo() {
    return (
        <GuestLayout>
            <Head title="How To" />

            <div className="container mx-auto py-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">How to Use LaraKits</h1>
                    <p className="text-muted-foreground text-lg">Learn how to discover, install, and submit Laravel starter kits to our platform.</p>
                </div>

                {/* Discovery Process */}
                <section className="mb-16">
                    <h2 className="mb-8 text-2xl font-bold tracking-tight">Kit Discovery Process</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <TagIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Use Proper Keywords</h3>
                            <p className="text-muted-foreground text-sm">
                                When submitting to Packagist, include keywords like "laravel-kit", "laravel-starter", or "laravel-boilerplate" in your
                                composer.json.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <FileTextIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Clear Description</h3>
                            <p className="text-muted-foreground text-sm">
                                Write a clear and concise description that highlights the key features and technologies included in your starter kit.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                                <GitHubLogoIcon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">GitHub Repository</h3>
                            <p className="text-muted-foreground text-sm">
                                Maintain a well-documented GitHub repository with installation instructions, features list, and contribution
                                guidelines.
                            </p>
                        </Card>
                    </div>
                </section>

                {/* Installation Process */}
                <section className="mb-16">
                    <h2 className="mb-8 text-2xl font-bold tracking-tight">Installation Process</h2>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Using Herd */}
                        <Card className="p-6">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
                                    <LightningBoltIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Using Herd</h3>
                                    <p className="text-muted-foreground text-sm">The fastest way to install Laravel starter kits</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">1</div>
                                    <p className="text-sm">Make sure you have Herd installed on your system</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">2</div>
                                    <p className="text-sm">Find a kit you like and click on it to view details</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">3</div>
                                    <p className="text-sm">Copy and run the Herd installation command</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">4</div>
                                    <p className="text-sm">Follow any additional setup instructions in the kit's documentation</p>
                                </div>
                            </div>
                        </Card>

                        {/* Using Composer */}
                        <Card className="p-6">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
                                    <CodeIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Using Composer</h3>
                                    <p className="text-muted-foreground text-sm">Traditional way to install Laravel starter kits</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">1</div>
                                    <p className="text-sm">Ensure you have Composer installed on your system</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">2</div>
                                    <p className="text-sm">Browse kits and select one that matches your needs</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">3</div>
                                    <p className="text-sm">Copy and run the Composer create-project command</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">4</div>
                                    <p className="text-sm">Follow the kit's documentation for any additional setup steps</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Best Practices */}
                <section>
                    <h2 className="mb-8 text-2xl font-bold tracking-tight">Best Practices</h2>
                    <div className="grid gap-8 sm:grid-cols-2">
                        <Card className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">For Kit Authors</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Keep your kit up to date with the latest Laravel version</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Include comprehensive documentation and setup instructions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Follow Laravel's coding standards and best practices</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Provide example environment files and configuration</span>
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">For Kit Users</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Read the documentation thoroughly before installation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Check the kit's requirements and dependencies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Review the GitHub repository for open issues and activity</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="text-primary mt-1 h-4 w-4" />
                                    <span className="text-sm">Contribute back by reporting issues or submitting PRs</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </section>
            </div>
        </GuestLayout>
    );
}
