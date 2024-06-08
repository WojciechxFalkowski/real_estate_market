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

export interface AnalyticsEvent {
    date: string;
    count: number;
}

export interface DeviceCount {
    deviceType: string;
    count: number;
}

export interface OSCount {
    osName: string;
    count: number;
}

export interface BrowserCount {
    clientName: string;
    count: number;
}

export interface ActivityByHour {
    hour: number;
    count: number;
}

export interface StepView {
    step: string;
    views: number;
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

    // const analyticsData = ref<AnalyticsEvent[]>([]);
    // const excludedVisitors = ref<string[]>([
    //     "0055d51d-18cc-40d7-93b4-c8f5e6169c07",
    //     "2e60b785-57e0-43cd-bade-d83d3a55c5f9",
    //     "f3d03709-bc74-4ab1-9f93-50afaf88c654"
    // ]);

    const analyticsData = ref<AnalyticsEvent[]>([]);
    const excludedVisitors = ref<string[]>([]);

    const fetchAnalyticsData = async (groupBy: 'day' | 'month' = 'day', unique: boolean = false) => {
        await fetchExcludedVisitors()


        const { data } = await call<AnalyticsEvent[]>({
            endpoint: `/analytics-events/page-views?groupBy=${groupBy}&excludedVisitors=${excludedVisitors.value.join(',')}&unique=${unique}`,
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        if (!data) {
            return;
        }
        analyticsData.value = data || [];
    };

    const fetchExcludedVisitors = async () => {
        const { data } = await call<string[]>({
            endpoint: `/analytics-events/excluded-visitors`,
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        if (!data) {
            return;
        }
        excludedVisitors.value = data || [];
    };

    const addExcludedVisitor = async (visitorId: string) => {
        // await call({
        //     endpoint: `/analytics-events/exclude-visitor`,
        //     method: 'POST',
        //     isAuth: true,
        //     isClient: true,
        //     body: JSON.stringify({ visitorId }),
        // });
        await fetchExcludedVisitors(); // Refresh the excluded visitors list
    };

    const addExcludedVisitorPermanently = async (visitorId: string) => {
        await call({
            endpoint: `/analytics-events/exclude-visitor`,
            method: 'POST',
            isAuth: true,
            isClient: true,
            body: JSON.stringify({ visitorId }),
        });
        await fetchAnalyticsData(); // Refresh the excluded visitors list
    };

    const removeExcludedVisitor = async (visitorId: string) => {
        // await call({
        //     endpoint: `/analytics-events/exclude-visitor`,
        //     method: 'DELETE',
        //     isAuth: true,
        //     isClient: true,
        //     body: JSON.stringify({ visitorId })
        // });
        fetchExcludedVisitors(); // Refresh the excluded visitors list
    };

    const removeExcludedVisitorPermanently = async (visitorId: string) => {
        await call({
            endpoint: `/analytics-events/exclude-visitor`,
            method: 'DELETE',
            isAuth: true,
            isClient: true,
            body: JSON.stringify({ visitorId })
        });
        await fetchAnalyticsData(); // Refresh the excluded visitors list
    };

    const toggleVisitorExclusion = async (visitorId: string) => {
        if (excludedVisitors.value.includes(visitorId)) {
            await removeExcludedVisitor(visitorId);
        } else {
            await addExcludedVisitor(visitorId);
        }
        fetchAnalyticsData(); // Refresh data when exclusion list changes
    };

    const updateExcludedVisitors = (visitors: string[]) => {
        excludedVisitors.value = visitors;
        // fetchAnalyticsData();
    };

    const fetchUserCountByDevice = async () => {
        const { data } = await call<DeviceCount[]>({
            endpoint: '/analytics-events/user-count-by-device',
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        return data || [];
    };

    const fetchUserCountByOS = async () => {
        const { data } = await call<OSCount[]>({
            endpoint: '/analytics-events/user-count-by-os',
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        return data || [];
    };

    const fetchUserCountByBrowser = async () => {
        const { data } = await call<BrowserCount[]>({
            endpoint: '/analytics-events/user-count-by-browser',
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        return data || [];
    };

    const fetchUserActivityByHour = async () => {
        const { data } = await call<ActivityByHour[]>({
            endpoint: '/analytics-events/user-activity-by-hour',
            method: 'GET',
            isAuth: true,
            isClient: true,
        });

        return data || [];
    };

    const fetchStepsViews = async () => {
        try {
            const { data } = await call<StepView[]>({
                endpoint: '/analytics-events/steps-views',
                method: 'GET',
                isClient: true,
                isAuth: true,
            });
            return data || [];
        } catch (error) {
            console.error('Error fetching steps views data:', error);
            return [];
        }
    };


    // const toggleVisitor = async (visitorId: string) => {
    //     if (excludedVisitors.value.includes(visitorId)) {
    //         // excludedVisitors.value = excludedVisitors.value.filter(
    //         //     (id) => id !== visitorId
    //         // );
    //         await removeExcludedVisitorPermanently(visitorId)
    //     }
    //     else {
    //         // excludedVisitors.value.push(visitorId);
    //         await addExcludedVisitorPermanently(visitorId)
    //     }
    // }

    return {
        trackPageView,
        trackClick,
        trackFormSubmit,
        trackMouseOver,
        trackScroll,
        trackVisibility,
        trackCustomEvent,
        sendOnMountedEvent,
        analyticsData,
        fetchAnalyticsData,
        excludedVisitors,
        toggleVisitorExclusion,
        fetchExcludedVisitors,
        updateExcludedVisitors,
        removeExcludedVisitorPermanently,
        addExcludedVisitorPermanently,
        fetchUserCountByDevice,
        fetchUserCountByOS,
        fetchUserCountByBrowser,
        fetchUserActivityByHour,
        fetchStepsViews,
    };
};
