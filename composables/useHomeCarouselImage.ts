import type { ImageUploaderI } from "~/components/ImageUploader/contracts";

export interface HomeCarouselImageModel {
    id: number,
    order?: number,
    publicId?: string,
    url: string,
    newId?: number,
    createdAt?: Date,
    updatedAt?: Date,
    file?: File;
}

export interface HomeCarouselImageResponse {
    id: number,
    order: number,
    publicId: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
}

export const useHomeCarouselImage = () => {
    const carouselCollection = ref<HomeCarouselImageModel[] | null>([])
    const { call } = useCall()

    const addHomeCarouselImages = async (images: ImageUploaderI[]): Promise<string | undefined> => {
        const formData = new FormData();

        images.forEach((image) => {
            if (image.file && !image.publicId) {
                formData.append(`files`, image.file);
            }
        });

        const { data } = await call<{ message: string, images: HomeCarouselImageResponse[] }>(
            { endpoint: `/home-carousel-image`, method: 'POST', isClient: true, contentType: ContentType["multipart/form-data"], isAuth: true, body: formData })


        carouselCollection.value = data?.images ?? null

        return data?.message
    }

    const getHomeCarouselImages = async ({ isClient = false, isAuth = false }: { isClient?: boolean, isAuth?: boolean } = {}): Promise<void> => {
        const { data } = await call<HomeCarouselImageResponse[]>(
            { endpoint: `/home-carousel-image`, method: 'GET', isClient, isAuth, body: undefined })

        carouselCollection.value = data
    }

    const deleteHomeCarouselImages = async (publicId: string) => {
        const { data } = await call<{ message: string }>({ endpoint: `/home-carousel-image`, method: 'DELETE', isClient: true, isAuth: true, body: JSON.stringify({ publicId }) })
        return data
    }


    const changeHomeCarouselImageOrder = async (images: { publicId: string, orderId: number }[]) => {
        const { data } = await call<{ message: string }>(
            { endpoint: `/home-carousel-image/order`, method: 'PUT', isClient: true, isAuth: true, body: JSON.stringify({ images }) })
        return data
    }
    return {
        carouselCollection, addHomeCarouselImages, getHomeCarouselImages, deleteHomeCarouselImages, changeHomeCarouselImageOrder,
    }
}