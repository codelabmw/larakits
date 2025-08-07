import { Deferred, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollProps {
    children: React.ReactNode;
    data: string;
    whileLoading?: React.ReactNode;
    whileNoMoreData?: React.ReactNode;
}

type PageProps = {
    type: 'cursor' | 'paged';
    per_page: number;
    has_more: boolean;
    cursor?: string;
    page?: number;
};

type Payload = {
    per_page: number;
    cursor?: string;
    page?: number;
};

/**
 * Infinite scroll component.
 *
 * @param children - The children to render.
 * @param data - The data to load.
 * @param whileLoading - The component to render while loading.
 * @param whileNoMoreData - The component to render when there is no more data.
 */
function InfiniteScroll({ children, data, whileLoading, whileNoMoreData }: InfiniteScrollProps) {
    const page = usePage<PageProps>().props;
    const props: string[] = [data, 'type', 'per_page', 'has_more'];
    const payload: Payload = { per_page: page.per_page };
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = () => {
        if (page.type === 'cursor') {
            props.push('cursor');
            payload.cursor = page.cursor;
        } else if (page.type === 'paged') {
            props.push('page');
            payload.page = page.page! + 1;
        }

        router.reload({
            only: props,
            data: payload,
            preserveUrl: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            onError: () => setLoading(false),
        });
    };

    return (
        <>
            {children}
            <Deferred data={data} fallback={<>{whileLoading || <p className="text-muted-foreground text-center">Loading...</p>}</>}>
                {loading ? (
                    <>{whileLoading || <p className="text-muted-foreground text-center">Loading...</p>}</>
                ) : page.has_more ? (
                    <WhenVisible onVisible={loadData} />
                ) : (
                    <>{whileNoMoreData || <p className="text-muted-foreground text-center">No more data</p>}</>
                )}
            </Deferred>
        </>
    );
}

/**
 * When visible component.
 *
 * @param onVisible - The callback to call when the component is visible.
 */
function WhenVisible({ onVisible }: { onVisible: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onVisible();
                }
            },
            { threshold: 1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, onVisible]);

    return <div ref={ref} />;
}

export { InfiniteScroll };
