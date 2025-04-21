import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit): [React.RefObject<T>, boolean] {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
        observer.observe(node);
        return () => observer.disconnect();
    }, [options]);

    return [ref as React.RefObject<T>, inView];
}
