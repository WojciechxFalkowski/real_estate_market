export interface PageConfiguration {
    [key: string]: string | number | undefined;
}

import { useCall } from '@/composables/useCall';

export const usePageConfiguration = () => {
    const route = useRoute();

    const pageConfiguration = ref<PageConfiguration | null>();
    const { call } = useCall();

    const pageUrl = computed(() => {
        return route.path.replace("/cms", "");
    })

    const getModifiedPageUrl = computed(() => {
        return pageUrl.value === "" || pageUrl.value === "/" ? "/home" : pageUrl.value
    })

    const getPageConfiguration = async ({ isClient = false, isAuth = false }: { isClient?: boolean, isAuth?: boolean } = {}) => {
        const { data } = await call<PageConfiguration>({
            endpoint: `/page-configuration/${encodeURIComponent(getModifiedPageUrl.value)}`,
            isAuth: isClient,
            isClient: isAuth,
        });
        pageConfiguration.value = data;
    };

    const updatePageConfiguration = async ({ isClient = false, isAuth = false, configurationData }: { configurationData: any, isClient?: boolean, isAuth?: boolean }) => {
        const { data } = await call<{ message: string }>({
            method: 'PATCH',
            endpoint: `/page-configuration/${encodeURIComponent(getModifiedPageUrl.value)}`,
            isAuth: isClient,
            isClient: isAuth,
            body: JSON.stringify(configurationData)
        });
        return data
    };

    return {
        pageConfiguration,
        getPageConfiguration,
        updatePageConfiguration
    };
};
