export interface LocalStorageI {
    /**
     * Retreves value from storage based on given key.
     * @param key key to be queried
     * @return value for key or null if no value present.
    */
    getLocalStorageValueByKey(key: string): string | null

    /**
     * Stores value in storage on given key
     * @param key key to be stored
     * @param value value to be saved
     */
    setLocalStorageValueByKey(key: string, value: string): void

    /**
     * Remove value from storage based on given key.
     * @param key key to be removed
     */
    removeLocalStorageValueByKey(key: string): void
}

export const useLocalStorage = (): LocalStorageI => {
    const getLocalStorageValueByKey = (key: string): string | null => {
        return localStorage.getItem(key)
    }
    const setLocalStorageValueByKey = (key: string, value: string): void => {
        localStorage.setItem(key, value)
    }
    const removeLocalStorageValueByKey = (key: string): void => {
        localStorage.removeItem(key)
    }

    return {
        getLocalStorageValueByKey, setLocalStorageValueByKey, removeLocalStorageValueByKey
    }
}