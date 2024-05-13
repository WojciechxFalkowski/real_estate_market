export interface PageConfiguration {
    // id: number;
    // title: string;
    // description: string;
    // pageUrl: string;
    [key: string]: string | number | undefined;
}

import { useCall } from '@/composables/useCall';

export const usePageConfiguration = () => {
    const { showToast } = useToast();
    const route = useRoute();

    const pageConfiguration = ref<PageConfiguration | null>();
    const isUpdatingPageConfiguration = ref(false)
    const { call } = useCall();

    const pageUrl = computed(() => {
        return route.path.replace("/cms", "");
    })

    const getPageConfiguration = async ({ isClient = false, isAuth = false }: { isClient?: boolean, isAuth?: boolean }) => {
        const { data } = await call<PageConfiguration>({
            endpoint: `/page-configuration/${encodeURIComponent(pageUrl.value)}`,
            isAuth: isClient,
            isClient: isAuth,
        });
        pageConfiguration.value = data;
    };

    const updatePageConfiguration = async ({ isClient = false, isAuth = false, configurationData }: { configurationData: any, isClient?: boolean, isAuth?: boolean }) => {
        const { data } = await call<{ message: string }>({
            method: 'PATCH',
            endpoint: `/page-configuration/${encodeURIComponent(pageUrl.value)}`,
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
