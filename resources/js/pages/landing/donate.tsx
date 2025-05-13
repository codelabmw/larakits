import { Paypal } from '@/components/icons/paypal';
import { Button } from '@/components/ui/button';
import { GuestLayout } from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Donate() {
    return (
        <GuestLayout>
            <Head title="Donate" />

            <div className="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-24">
                    <div className="text-left lg:max-w-2xl">
                        <h2 className="text-left text-3xl font-bold tracking-tight sm:text-4xl">Donations</h2>
                        <p className="text-muted-foreground mt-2 text-left text-xs leading-6">
                            We currently only accept donations on PayPal because of the limitations we face because of the country (Malawi) we are
                            based in. That is the same reason payments are processed using a personal account.
                        </p>
                        <p className="text-muted-foreground mt-6 text-left text-lg leading-8">
                            Your support helps us continue maintaining Larakits. Any contribution, no matter how small, is greatly appreciated.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button asChild variant="secondary" size="lg" className="w-full">
                            <a href="https://paypal.me/chikondikamwendo" target="_blank" rel="noopener noreferrer">
                                <Paypal className="h-5 w-5" />
                                Donate on PayPal
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
