// composables/useAnalytics.ts
import { useCall } from './useCall';

export enum EventType {
    PAGE_VIEW = 'page_view',
    CLICK = 'click',
    FORM_SUBMIT = 'form_submit',
    MOUSE_OVER = 'mouse_over',
    SCROLL = 'scroll',
    VISIBILITY = 'visibility',
    CUSTOM_EVENT = 'custom_event',
}

export const useAnalytics = () => {
    const { call } = useCall();
    const { setVisitorId } = useVisitor();
    const visitorStore = useVisitorStore();
    const route = useRoute();

    const sendOnMountedEvent = async () => {
        await trackPageView(route.fullPath);
    }

    const sendEvent = async (type: EventType, data: any) => {
        await setVisitorId();
        const visitorId = visitorStore.visitorId

        if (!visitorId) {
            console.log("??")
            return
        }

        try {
            await call({
                endpoint: '/analytics-events/event',
                method: 'POST',
                isAuth: false,
                isClient: true,
                body: JSON.stringify({
                    visitorId,
                    type,
                    data,
                }),
            });
        } catch (error) {
            console.error('Error sending event:', error);
        }
    };

    const trackPageView = async (url: string) => {
        await sendEvent(EventType.PAGE_VIEW, { url });
    };

    const trackClick = async (elementName: string, elementDescription?: string) => {
        await sendEvent(EventType.CLICK, { elementName, elementDescription });
    };

    const trackFormSubmit = async (formId: string, formData: any) => {
        await sendEvent(EventType.FORM_SUBMIT, { formId, formData });
    };

    const trackMouseOver = async (elementName: string) => {
        await sendEvent(EventType.MOUSE_OVER, { elementName });
    };

    const trackScroll = async (scrollPosition: number) => {
        await sendEvent(EventType.SCROLL, { scrollPosition });
    };

    const trackVisibility = async (elementName: string, elementDescription?: string) => {
        await sendEvent(EventType.VISIBILITY, { elementName, elementDescription });
    };

    const trackCustomEvent = async (eventName: string, eventData: any) => {
        await sendEvent(EventType.CUSTOM_EVENT, { eventName, eventData });
    };

    return {
        trackPageView,
        trackClick,
        trackFormSubmit,
        trackMouseOver,
        trackScroll,
        trackVisibility,
        trackCustomEvent,
        sendOnMountedEvent,
    };
};
