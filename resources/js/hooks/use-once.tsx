import { useEffect, useState } from 'react';

export default function useOnce(callback: () => void) {
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        if (!hasRun) {
            callback();
            setHasRun(true);
        }
    }, [callback, hasRun]);

    return hasRun;
}
