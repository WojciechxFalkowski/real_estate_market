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
        // pageConfiguration.value = data;
        return data
    };

    // const updateLeaseItems = async (items: LeaseItem[], header: { title: string, description: string }) => {
    //     try {
    //         isLoadingLease.value = true
    //         console.log(JSON.stringify({ leaseItems: items, header }))
    //         const { data } = await call<{ message: string }>({
    //             endpoint: `/lease`,
    //             method: 'PUT',
    //             isAuth: true,
    //             isClient: true,
    //             body: JSON.stringify({ leaseItems: items, header })
    //         });

    //         if (!data) {
    //             return;
    //         }
    //         showToast(data.message);
    //         return data;

    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    //     finally {
    //         isLoadingLease.value = false
    //     }
    // };


    return {
        pageConfiguration,
        getPageConfiguration,
        updatePageConfiguration
    };
};
