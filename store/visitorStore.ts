export const visitorStore = defineStore('visitor', () => {
    const visitorId = ref<string | null>(null)

    const setVisitor = (value: string | null) => {
        visitorId.value = value;
    };

    return {
        visitorId, setVisitor
    }
})