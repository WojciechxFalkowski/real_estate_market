import DeviceDetector from "device-detector-js";
import { visitorStore } from "~/store/visitorStore";

export const LocalStorageVisitorID = Symbol.for('LocalStorageVisitorID')

export const useAnalytics = () => {
    // const visitorId = ref<string | null>(null)
    const { visitorId, setVisitor } = visitorStore()
    const { getLocalStorageValueByKey, setLocalStorageValueByKey, removeLocalStorageValueByKey } = useLocalStorage()
    const { call } = useCall()

    const setVisitorId = async () => {
        const deviceDetector = new DeviceDetector();
        setVisitor(getLocalStorageValueByKey(LocalStorageVisitorID.toString()));

        console.log('visitorId')
        if (!visitorId) {
            const userAgent = window.navigator.userAgent
            const device = deviceDetector.parse(userAgent);


            try {
                const ipResponsee = await call<{ ip: string }>({ url: 'https://api.ipify.org?format=json', endpoint: ``, method: 'GET', isAuth: false, isClient: true })

                console.log('ipResponsee')
                console.log(ipResponsee.data?.ip)
                // const { data } = await call<{ visitorId: string }>({ endpoint: ``, method: 'POST', isAuth: false, isClient: true, body: JSON.stringify({ device, ipAddress: ipResponse.data?.ip }) })
                // setVisitor(data?.visitorId ?? null)
            }
            catch (error) {
                console.error('Error creating visitor:', error);
            }
        }
    }

    return {
        setVisitorId
    }
}