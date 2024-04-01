export enum UserStorageKey {
    token = 'user_token'
}

export interface IUser {
    email: string;
    id: number;
    createAt: string;
    updatedAt: string;
}

export const useUser = () => {
    const runtimeConfig = useRuntimeConfig()
    const { getUserToken } = useAuth();

    const getUser = async () => {
        try {
            const token = getUserToken()
            if (!token) {
                throw new Error("Empty token");
            }
            const response = await $fetch<IUser>(`${runtimeConfig.public.BACKEND_BASE_URL}/user/me`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": token }
            })

            return response
        }
        catch (error) {
            console.log(error)
        }
    }

    return {
        getUser
    }
}