export const userStore = defineStore("user", () => {
    const user = reactive<{ data: Partial<IUser> | null | undefined }>({
        data: undefined,
    });
    const { verifyToken, getUserToken, removeUserToken } = useAuth();
    const { getUser } = useUser();
    const pathBeforeRedirect = ref<string | null>(null);
    const loadingWrapper = reactive({ isLoading: false });

    const setIsLoading = (value: boolean) => {
        loadingWrapper.isLoading = value;
    };

    const setUser = async () => {
        setIsLoading(true);

        try {
            const token = getUserToken()
            if (!token) {
                throw new Error("Empty token");
            }
            const isTokenValid = await (await verifyToken(token)).isValid
            if (!isTokenValid) {
                removeUser()
            }
            // const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
            // await delay(5000);

            const response = await getUser();
            user.data = { ...response };
        } catch (error) {
            user.data = null;
            // throw new Error('Error')
        } finally {
            setIsLoading(false);
        }
    };

    const setPathBeforeRedirect = (path: string) => {
        pathBeforeRedirect.value = path;
    };

    // const isLoading = computed(() => user.isLoading)

    const removeUser = () => {
        user.data = null;
        removeUserToken();
    };



    return {
        setUser,
        user,
        removeUser,
        pathBeforeRedirect,
        setPathBeforeRedirect,
        setIsLoading,
        loadingWrapper
    };
});
