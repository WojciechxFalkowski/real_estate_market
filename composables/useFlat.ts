import type { DefineComponent } from "vue";
import type { PictureItem } from "~/components/Carousel";
import type { ImageUploaderI } from "~/components/ImageUploader/contracts";
import {
    SquareIcon,
    FloorIcon,
    BedroomIcon,
    RoomsIcon,
    KeysIcon,
    FlatIcon,
} from "~/components/icons";


interface IconMapping {
    [key: string]: DefineComponent<{}, {}, any>;
}

const iconMapping: IconMapping = {
    area: SquareIcon,
    floor: FloorIcon,
    bedroom: BedroomIcon,
    rooms: RoomsIcon,
    year_of_construction: KeysIcon,
    transaction_type: FlatIcon
};

export interface FlatDetail {
    id: string,
    title: string;
    description: string;
}

export interface ExtendedFlatDetail extends FlatDetail {
    icon: Component
}

export interface FlatModel {
    id: number;
    isActive: boolean;
    url: string;
    title: string;
    description: string;
    image?: {
        alt: string,
        src: string,
        srcset: string,
    };
    flatDetails: ExtendedFlatDetail[];
    location: string;
    images: {
        alt: string,
        src: string,
        srcset: string,
    }[] | null;
    price: string;
    currency: string;
    pricePerMeter: string;
    tiptapHTML: string
}

export interface FlatImageResponse {
    url: string,
    imageId?: string,
    orderId: number,
}

export interface Flat {
    id: number;
    isActive: boolean;
    url: string;
    title: string;
    description: string;
    image?: string;
    flatDetails: FlatDetail[];
    location: string;
    images: FlatImageResponse[] | null;
    price: string;
    currency: string;
    pricePerMeter: string;
    tiptapHTML: string
}

export interface SaveFlat {
    isActive: boolean;
    area: string;
    bedroom: string;
    currency: string;
    description: string;
    floor: string;
    location: string;
    price: string;
    pricePerMeter: string;
    rooms: string;
    title: string;
    transaction_type: string;
    url: string;
    year_of_construction: string;
    tiptapHTML: string
}

export const useFlat = () => {
    const flatsData = ref()
    const flatData = ref<Flat | null>()
    const { call } = useCall()

    const fetchFlat = async (url: string, isClient: boolean = false, isAuth: boolean = false) => {
        // const { data } = await useFetch<Flat[]>("/api/flats");
        const { data } = await call<Flat>({ endpoint: `/flats/${url}`, isAuth, isClient })
        flatData.value = data
    }

    const fetchFlats = async ({ isClient, isAuth }: { isClient?: boolean, isAuth: boolean } = { isClient: false, isAuth: false }) => {
        const { data } = await call<Flat[]>({ endpoint: '/flats', isAuth, isClient })
        flatsData.value = data
    }

    const fetchActiveFlats = async ({ isClient, isAuth }: { isClient?: boolean, isAuth: boolean } = { isClient: false, isAuth: false }) => {
        const { data } = await call<Flat[]>({ endpoint: '/flats/active', isAuth, isClient })
        flatsData.value = data
    }

    const saveFlat = async (flatId: number, flatForm: Partial<SaveFlat>) => {
        const { data } = await call<Flat[]>({ endpoint: `/flats/${flatId}`, method: 'PATCH', isClient: true, isAuth: true, body: JSON.stringify(flatForm) })

        return data
    }

    const createNewFlat = async (flatForm: SaveFlat) => {
        const { data } = await call<{ message: string }>({ endpoint: '/flats', method: 'POST', isClient: true, isAuth: true, body: JSON.stringify(flatForm) })
        return data
    }

    const flatModel = computed(() => {
        if (!flatData.value) {
            return;
        }
        const images = mapImages(flatData.value.images)
        return {
            ...flatData.value,
            image: images ? images[0] : undefined,
            flatDetails: mapDetails(flatData.value.flatDetails),
            images: images
        };
    });

    const flatsModel = computed(() => {
        if (!flatsData.value) {
            return;
        }
        const data: FlatModel[] = flatsData.value.map((flat: Flat) => {
            const images = mapImages(flat.images)
            return {
                ...flat,
                image: images ? images[0] : undefined,
                flatDetails: mapDetails(flat.flatDetails).filter(detail => detail.id !== 'transaction_type'),
                images: images
            };
        })
        return data
    });

    // const images: ComputedRef<PictureItem[]> = computed(() => {
    //     if (!flat.value) {
    //         return [];
    //     }

    //     return flat.value.details.images.map((image: string[]) => {
    //         return {
    //             src: image,
    //             alt: '',
    //             srcset: image,
    //         };
    //     });
    // });

    const mapDetails = (flatDetails: FlatDetail[]) => {
        return flatDetails.map((flatDetail: FlatDetail) => ({
            ...flatDetail,
            icon: iconMapping[flatDetail.id]
        }))
    }

    const mapImages = (images: FlatImageResponse[] | null): PictureItem[] | undefined => {
        if (!images) {
            return undefined
        }

        return images.map((image: FlatImageResponse) => {
            return {
                src: image.url,
                alt: '',
                srcset: image.url,
                imageId: image.imageId,
                isSaved: Boolean(image.imageId)
            }
        })
    }

    // const details = computed(() => {
    //     if (!flat.value || !flat.value.flatDetails) {
    //         return [];
    //     }

    //     return flat.value.flatDetails.map((flatDetails: FlatDetails) => ({
    //         ...flatDetails,
    //         icon: iconMapping[flatDetails.id]
    //     }))
    // })l

    const uploadImages = async (flatId: number, images: ImageUploaderI[]) => {
        const formData = new FormData();

        images.forEach((image) => {
            if (image.file && !image.isSaved) {
                formData.append(`files`, image.file);
            }
        });

        const { data } = await call<{ message: string, images: FlatImageResponse[] }>(
            { endpoint: `/flats/${flatId}/images`, method: 'POST', isClient: true, contentType: ContentType["multipart/form-data"], isAuth: true, body: formData })

        images.forEach((image) => {
            image.isSaved = true
        });

        return data
    }

    const changeImagesOrder = async (flatId: number, elements: { publicId: string, orderId: number }[]) => {
        console.log("changeImagesOrder");
        console.log(flatId);
        console.log(elements);
        const { data } = await call<{ message: string }>(
            { endpoint: `/flats/${flatId}/images/order`, method: 'PUT', isClient: true, isAuth: true, body: JSON.stringify({ flatId, elements }) })
        return data
    }

    const deleteUploadedImage = async (flatId: number, publicId: string) => {
        const { data } = await call<{ message: string }>({ endpoint: `/flats/${flatId}/images`, method: 'DELETE', isClient: true, isAuth: true, body: JSON.stringify({ publicId }) })
        return data
    }

    const deleteFlat = async (flatUrl: string) => {
        const { data } = await call<{ message: string }>({ endpoint: `/flats/${flatUrl}`, method: 'DELETE', isClient: true, isAuth: true, body: undefined })
        return data
    }

    return {
        fetchFlat, fetchFlats, flatModel, flatsModel, saveFlat, createNewFlat, uploadImages, deleteUploadedImage, changeImagesOrder, deleteFlat, fetchActiveFlats
    }
}