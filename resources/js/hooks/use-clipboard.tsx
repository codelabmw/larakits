import * as copyToClipboard from 'copy-to-clipboard';
import { useState } from 'react';

export default function useClipboard() {
    const [recentlyCopied, setRecentlyCopied] = useState<boolean>(false);

    const copy = (text: string) => {
        copyToClipboard.default(text);
        setRecentlyCopied(true);
        setTimeout(() => setRecentlyCopied(false), 2000);
    };

    return { copy, recentlyCopied };
}
