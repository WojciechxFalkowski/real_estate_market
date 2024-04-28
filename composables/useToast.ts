import { useNuxtApp } from '#app';

export const useToast = () => {
    const { $toastify }: any = useNuxtApp();

    const showToast = (text: string, positive = true) => {
        const background = positive
            ? "linear-gradient(to right, #00b09b, #96c93d)"
            : "linear-gradient(to right, #ff416c, #ff4b2b)";

        $toastify({
            text: text,
            style: {
                background: background,
            },
        }).showToast();
    };

    return { showToast };
};
