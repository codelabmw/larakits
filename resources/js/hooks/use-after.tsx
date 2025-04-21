import { useEffect, useState } from 'react';

export default function useAfter(callback: () => void, dependancies: unknown[]) {
    const [skip, setSkip] = useState(true);

    useEffect(() => {
        if (skip) {
            setSkip(false);
            return;
        }

        callback();
    }, dependancies);
}
