export interface IEmailConfiguration {
    email: string
    serviceType: string
}

export const useEmailConfiguration = () => {
    const runtimeConfig = useRuntimeConfig()
    const { getUserToken } = useAuth();

    const setEmailConfiguration = async (email: string, password: string, serviceType: string) => {
        try {
            const token = getUserToken()
            if (!token) {
                throw new Error("Empty token");
            }
            const response = await $fetch<void>(`${runtimeConfig.public.BACKEND_BASE_URL}/settings/saveEmailConfiguration`, {
                method: "PUT",
                body: JSON.stringify({
                    email,
                    password,
                    serviceType
                }),
                headers: { "Content-Type": "application/json", "Authorization": token }
            })

            return response
        }
        catch (error: any) {
            throw new Error(error)
        }
    }

    const getEmailConfiguration = async () => {
        try {
            const token = getUserToken()
            if (!token) {
                throw new Error("Empty token");
            }
            const response = await $fetch<IEmailConfiguration>(`${runtimeConfig.public.BACKEND_BASE_URL}/settings/getEmailConfiguration`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": token }
            })

            return response
        }
        catch (error: any) {
            throw new Error(error)
        }
    }

    const sendEmail = async (email: string, phone: string, message: string) => {
        try {
            const response = await $fetch<IEmailConfiguration>(`${runtimeConfig.public.BACKEND_BASE_URL}/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        email,
                        phone,
                        message
                    })
            })

            return response
        }
        catch (error: any) {
            throw new Error(error)
        }
    }

    return {
        setEmailConfiguration,
        getEmailConfiguration,
        sendEmail
    }
}