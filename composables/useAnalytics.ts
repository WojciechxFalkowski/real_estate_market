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

    onMounted(async () => {
        await setVisitorId();
        await trackPageView(route.fullPath);
    });

    const sendEvent = async (visitorId: string, type: EventType, data: any) => {
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
        console.log('trackPageView')
        if (!visitorStore.visitorId) {
            return
        }
        console.log('trackPageView -> 2')

        await sendEvent(visitorStore.visitorId, EventType.PAGE_VIEW, { url });
    };

    const trackClick = async (visitorId: string, elementId: string) => {
        await sendEvent(visitorId, EventType.CLICK, { elementId });
    };

    const trackFormSubmit = async (visitorId: string, formId: string, formData: any) => {
        await sendEvent(visitorId, EventType.FORM_SUBMIT, { formId, formData });
    };

    const trackMouseOver = async (visitorId: string, elementId: string) => {
        await sendEvent(visitorId, EventType.MOUSE_OVER, { elementId });
    };

    const trackScroll = async (visitorId: string, scrollPosition: number) => {
        await sendEvent(visitorId, EventType.SCROLL, { scrollPosition });
    };

    const trackVisibility = async (visitorId: string, elementId: string, isVisible: boolean) => {
        await sendEvent(visitorId, EventType.VISIBILITY, { elementId, isVisible });
    };

    const trackCustomEvent = async (visitorId: string, eventName: string, eventData: any) => {
        await sendEvent(visitorId, EventType.CUSTOM_EVENT, { eventName, eventData });
    };

    return {
        trackPageView,
        trackClick,
        trackFormSubmit,
        trackMouseOver,
        trackScroll,
        trackVisibility,
        trackCustomEvent,
    };
};
