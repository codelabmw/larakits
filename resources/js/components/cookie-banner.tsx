import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

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
    <div className="fixed bottom-0 left-0 z-[100] w-full flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-background/95 border border-muted shadow-lg rounded-t-xl px-6 py-4 mb-6 flex items-center gap-4 max-w-2xl w-full mx-2 sm:mx-auto animate-slide-up">
        <div className="flex-1 text-sm text-muted-foreground">
          We use cookies to analyze site usage and enhance your experience. By continuing to browse, you agree to our use of cookies. See our{' '}
          <a href={route('privacy')} className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </div>
        <button
          aria-label="Dismiss cookie banner"
          onClick={acceptCookies}
          className="ml-1 text-muted-foreground hover:text-foreground p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <XIcon className="w-4 h-4" />
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
