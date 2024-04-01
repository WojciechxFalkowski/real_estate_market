export interface IToken {
  access_token: string;
  detail?: string;
}
export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig()
  const router = useRouter();

  const getUserToken = () => {
    return localStorage.getItem(UserStorageKey.token)
  }

  const removeUserToken = () => {
    localStorage.removeItem(UserStorageKey.token)
  }

  const setUserToken = (token: string) => {
    localStorage.setItem(UserStorageKey.token, token)
  }

  const verifyToken = async (tokenWithBearer: string): Promise<{ isValid: boolean }> => {
    const token = tokenWithBearer.replace("Bearer ", "");

    const response = await $fetch<{ isValid: boolean }>(`${runtimeConfig.public.BACKEND_BASE_URL}/auth/verify-token`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" }
    }).catch((error) => {
      console.log(error)
    });
    if (!response) {
      throw new Error('Invalid credentials. Please try again.');
    }
    return response;
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const response = await $fetch<IToken>(`${runtimeConfig.public.BACKEND_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" }
      })
      const token = `Bearer ${response.access_token}`;
      setUserToken(token);
      return;
    } catch (error: any) {
      throw new Error(error.response._data.message);
    }
  };

  const redirectIfTokenExist = async () => {
    const token = getUserToken()
    if (token) {
      const isTokenValid = await (await verifyToken(token)).isValid
      if (isTokenValid) {
        router.push({ name: 'cms' })
      }
      else {
        removeUserToken()
      }
    }
  }

  const signUp = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await $fetch(`${runtimeConfig.public.BACKEND_BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password: password,
        }),
        headers: { "Content-Type": "application/json" }
      })
    } catch (error: any) {
      throw new Error(error.response._data.message);
    }
  };

  return {
    signIn,
    signUp,
    verifyToken,
    getUserToken,
    removeUserToken,
    redirectIfTokenExist
  };
};
