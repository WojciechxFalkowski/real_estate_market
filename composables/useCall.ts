export enum ContentType {
    "application/json" = "application/json",
    "multipart/form-data" = "multipart/form-data",
}

export interface CallConfig {
    url?: string,
    endpoint: string,
    isAuth?: boolean
    isClient?: boolean
    method?: string
    body?: string | undefined | FormData
    contentType?: ContentType | null
    requestOptions?: any
}

export const useCall = () => {
    const { getUserToken } = useAuth()
    const runtimeConfig = useRuntimeConfig()
    const call = async<T>({
        url = runtimeConfig.public.BACKEND_BASE_URL,
        endpoint = '',
        isAuth = false,
        isClient = false,
        method = 'GET',
        body = undefined,
        contentType = null,
        requestOptions = {}
    }: CallConfig) => {
        const headers = {
            ...requestOptions,
        }
        if (contentType) {
            headers['Content-Type'] = contentType
        }

        if (isClient) {
            try {
                const data = await $fetch<T>(`${url}${endpoint}`, {
                    headers,
                    onRequest({ request, options }) {
                        options.method = method
                        options.body = body
                        if (isAuth && options.headers) {
                            const userToken = getUserToken()
                            if (userToken) {
                                //@ts-ignore
                                options.headers.authorization = userToken
                            }
                        }
                    }
                });
                return { data }
            }
            catch (error) {
                const err = error as { response: { _data: { message: string; error: string; statusCode: number; }; }; };
                if (err.response && err.response._data && err.response._data.message) {
                    throw new Error(err.response._data.message);
                }

                throw error
            }
        }

        try {
            const { data, pending } = await useFetch<T>(`${url}${endpoint}`, {
                headers,
                onRequest({ request, options }) {
                    options.method = method
                    options.body = body
                    if (isAuth && options.headers) {
                        const userToken = getUserToken()
                        if (userToken) {
                            //@ts-ignore
                            options.headers.authorization = userToken
                        }
                    }
                }
            });

            return { data: data.value, pending }
        }
        catch (error) {
            const err = error as { response: { _data: { message: string; error: string; statusCode: number; }; }; };
            if (err.response && err.response._data && err.response._data.message) {
                throw new Error(err.response._data.message);
            }

            throw error
        }

    }

    return { call }
}