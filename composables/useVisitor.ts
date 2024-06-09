import DeviceDetector from "device-detector-js";
export const LocalStorageVisitorID = Symbol.for('LocalStorageVisitorID')

export const useVisitor = () => {
    const visitorStore = useVisitorStore()
    const { getLocalStorageValueByKey, setLocalStorageValueByKey } = useLocalStorage()
    const { call } = useCall()

    const setVisitorId = async () => {
        visitorStore.setVisitor(getLocalStorageValueByKey(LocalStorageVisitorID.toString()));

        if (visitorStore.visitorId) {
            const checkVisitorResponse = await call<{ isAvailable: boolean }>({ endpoint: `/visitor/${visitorStore.visitorId}`, method: 'GET', isAuth: false, isClient: true, body: undefined })
            if (checkVisitorResponse.data?.isAvailable) {
                return
            }

        }

        await fetchNewVisitor()
    }

    const setVisitorEmail = async (email: string) => {
        const query = `email=${email}`
        await call({ endpoint: `/visitor/${visitorStore.visitorId}?${query}`, method: 'POST', isAuth: false, isClient: true })
    }

    const fetchNewVisitor = async () => {
        const deviceDetector = new DeviceDetector();

        const userAgent = window.navigator.userAgent
        const device = deviceDetector.parse(userAgent);
        const deviceInfoData = {
            clientType: device.client?.type,
            clientName: device.client?.name,
            clientVersion: device.client?.version,
            osName: device.os?.name,
            osVersion: device.os?.version,
            deviceType: device.device?.type,
            deviceBrand: device.device?.brand,
            deviceModel: device.device?.model,
        };

        try {
            // TODO
            // problem with "call"
            // const ipResponse = await call<{ ip: string }>({ url: 'https://api.ipify.org?format=json', endpoint: ``, method: 'GET', isAuth: false, isClient: true })
            // ipAddress: ipResponse.data?.ip
            const ipResponse = await $fetch<{ ip: string }>('https://api.ipify.org?format=json')
            const { data } = await call<{ visitorId: string }>({ endpoint: `/visitor`, method: 'POST', isAuth: false, isClient: true, body: JSON.stringify({ deviceInfo: deviceInfoData, ipAddress: ipResponse.ip }) })
            visitorStore.setVisitor(data?.visitorId ?? null)
            //a9063e85-70ab-4712-8f60-bac32d874a60
            if (!data?.visitorId) {
                return
            }
            setLocalStorageValueByKey(LocalStorageVisitorID.toString(), data.visitorId)
        }
        catch (error) {
            console.error('Error creating visitor:', error);
        }
    }

    return {
        setVisitorId, setVisitorEmail
    }
}