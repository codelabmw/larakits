import ReactGA4 from 'react-ga4';

export default function useGA4Analytics() {
    function initialize(measurementId: string, sessionId: string): void {
        ReactGA4.initialize(measurementId, {
            gaOptions: {
                sessionId: sessionId,
            },
        });
    }

    function sendPageView(page: string, title?: string): void {
        ReactGA4.send({
            hitType: 'pageview',
            page: page,
            title: title,
        });
    }

    function sendEvent(category: 'navigation' | 'engagement', action: string, label?: string, value?: number): void {
        ReactGA4.event({
            category: category,
            action: action,
            label: label,
            value: value
        })
    }

    return { initialize, sendPageView, sendEvent };
}
