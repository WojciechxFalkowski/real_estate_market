export interface FaqElement {
    type: 'section' | 'list';
    title?: string;
    description?: string;
    listTitle?: string;
    list?: string[];
    orderId?: number;
    isActive: boolean;
}

export const useFaq = () => {
    const faqCollection = ref<FaqElement[]>([])

    const { call } = useCall()

    const updateFaq = async (faqData: FaqElement[]) => {
        const { data } = await call<{ message: string }>({
            endpoint: `/faq`, method: 'PUT', isAuth: true, isClient: true, body: JSON.stringify(faqData.map((faqElement, index) => {
                return {
                    ...faqElement,
                    orderId: index
                }
            }))
        })
        return data
    }

    const getFaq = async ({ isClient, isAuth }: { isClient?: boolean, isAuth: boolean } = { isClient: false, isAuth: false }) => {
        const { data } = await call<FaqElement[] | null>({ endpoint: `/faq`, isAuth, isClient })

        if (!data) {
            return
        }
        faqCollection.value = data
    }

    const getActiveFaq = async () => {
        const { data } = await call<FaqElement[] | null>({ endpoint: `/faq/activeFaq`, isAuth: false, isClient: false })

        if (!data) {
            return
        }
        faqCollection.value = data
    }


    return {
        updateFaq,
        getFaq,
        faqCollection,
        getActiveFaq
    }
}