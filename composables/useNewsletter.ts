export interface EmailModel {
    id: number,
    email: string,
    createdAt: string,
    updatedAt: string,
}

export const useNewsletter = () => {
    const emailCollection = ref<EmailModel[] | null>()

    const { call } = useCall()

    const addEmailToNewsletter = async (email: string) => {
        const { data } = await call<{ message: string }>({ endpoint: `/email/newsletter`, method: 'POST', isAuth: true, isClient: true, body: JSON.stringify({ email }) })
        return data
    }

    const getEmails = async () => {
        const { data } = await call<EmailModel[] | null>({ endpoint: `/email/newsletter`, isAuth: true, isClient: true })

        emailCollection.value = data
    }


    return {
        emailCollection,
        getEmails,
        addEmailToNewsletter
    }
}