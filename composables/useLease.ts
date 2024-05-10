export interface LeaseItem {
    id?: number;
    title: string;
    description: string;
    icon: string;
    classIcon: string;
}

import { useCall } from '@/composables/useCall';

export const useLeaseManager = () => {
    const { showToast } = useToast();

    const leaseItems = ref<LeaseItem[]>([]);
    const isLoadingLease = ref(false)
    const { call } = useCall();

    const fetchLeaseItems = async  ({ isClient, isAuth }: { isClient?: boolean, isAuth: boolean } = { isClient: false, isAuth: false }) => {
        isLoadingLease.value = true
        const { data } = await call<LeaseItem[]>({
            endpoint: `/lease`,
            isAuth: isClient,
            isClient: isAuth,
        });
        isLoadingLease.value = false
        leaseItems.value = data || [];
    };

    const updateLeaseItems = async (items: LeaseItem[]) => {
        try {
            isLoadingLease.value = true
            const { data } = await call<{ message: string }>({
                endpoint: `/lease`,
                method: 'PUT',
                isAuth: true,
                isClient: true,
                body: JSON.stringify(items)
            });

            if (!data) {
                return;
            }
            showToast(data.message);
            return data;

        }
        catch (error) {

        }
        finally {
            isLoadingLease.value = false
        }
    };

    const addLeaseItem = (item: LeaseItem) => {
        leaseItems.value.push(item);
    };

    const removeLeaseItem = (id: number) => {
        leaseItems.value = leaseItems.value.filter(item => item.id !== id);
    };

    const moveLeaseItemUp = (index: number) => {
        if (index > 0) {
            const item = leaseItems.value[index];
            leaseItems.value.splice(index, 1);
            leaseItems.value.splice(index - 1, 0, item);
        }
    }

    const moveLeaseItemDown = (index: number) => {
        if (index < leaseItems.value.length - 1) {
            const item = leaseItems.value[index];
            leaseItems.value.splice(index, 1);
            leaseItems.value.splice(index + 1, 0, item);
        }
    }

    return {
        leaseItems,
        fetchLeaseItems,
        updateLeaseItems,
        addLeaseItem,
        removeLeaseItem,
        moveLeaseItemUp,
        moveLeaseItemDown,
        isLoadingLease
    };
};
