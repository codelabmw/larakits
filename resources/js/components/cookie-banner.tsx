import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const COOKIE_KEY = 'larakits_cookie_consent';

export function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_KEY);
        setVisible(consent !== 'accepted');
    }, []);

    const acceptCookies = () => {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="pointer-events-none fixed bottom-0 left-0 z-[100] flex w-full justify-center">
            <div className="bg-background/95 border-muted animate-slide-up pointer-events-auto mx-2 mb-6 flex w-full max-w-2xl items-center gap-4 rounded-t-xl border px-6 py-4 shadow-lg sm:mx-auto">
                <div className="text-muted-foreground flex-1 text-sm">
                    We use cookies to analyze site usage and enhance your experience. By continuing to browse, you agree to our use of cookies. See
                    our{' '}
                    <a href={route('privacy')} className="hover:text-primary underline transition-colors" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </a>
                    .
                </div>
                <button
                    aria-label="Dismiss cookie banner"
                    onClick={acceptCookies}
                    className="text-muted-foreground hover:text-foreground focus:ring-ring ml-1 rounded-md p-2 focus:ring-2 focus:outline-none"
                >
                    <XIcon className="h-4 w-4" />
                </button>
            </div>
            <style>{`
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
        </div>
    );
}
