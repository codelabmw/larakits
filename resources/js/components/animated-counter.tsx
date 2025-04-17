import numeral from 'numeral';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ value, className = '' }: { value: number; className?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<number>(0);

    useEffect(() => {
        const start = ref.current;
        const end = value;
        const duration = 900;
        let startTime: number | null = null;

        function animateCounter(ts: number) {
            if (!startTime) startTime = ts;

            const progress = Math.min((ts - startTime) / duration, 1);

            setDisplay(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                setDisplay(end);
            }
        }

        requestAnimationFrame(animateCounter);

        return () => {
            ref.current = end;
        };
    }, [value]);

    return <span className={className}>{numeral(display).format('0,0a')}</span>;
}
