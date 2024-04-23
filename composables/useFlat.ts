import type { DefineComponent } from "vue";
import type { PictureItem } from "~/components/Carousel";
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

export interface Flat {
    id: number;
    url: string;
    title: string;
    description: string;
    image: string;
    flatDetails: FlatDetail[];
    transactionType: string;
    location: string;
    housingType: string;
    images: string[];
    price: string;
    currency: string;
    pricePerMeter: string;
    tiptapHTML: string
}

export const useFlat = () => {
    const flatsData = ref()
    const flatData = ref<Flat | null>()

    const fetchFlat = async (flatId: string | string[]) => {
        const { data } = await useFetch<Flat[]>("/api/flats");
        const flat = data.value?.find(flat => flat.url === flatId)
        flatData.value = flat
    }

    const fetchFlats = async () => {
        const { data } = await useFetch("/api/flats");
        flatsData.value = data.value
    }

    const flatModel = computed(() => {
        if (!flatData.value) {
            return;
        }

        return {
            ...flatData.value,
            flatDetails: mapDetails(flatData.value.flatDetails),
            images: mapImages(flatData.value.images)
        };
    });

    const flatsModel = computed(() => {
        if (!flatsData.value) {
            return;
        }
        const data = flatsData.value.map((flat: Flat) => {
            return {
                ...flat,
                flatDetails: mapDetails(flat.flatDetails).filter(detail => detail.id !== 'transaction_type'),
                images: mapImages(flat.images),
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

    const mapImages = (images: string[]): PictureItem[] | undefined => {
        return images.map((image: string) => {
            return {
                src: image,
                alt: '',
                srcset: image,
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
    // })

    return {
        fetchFlat, fetchFlats, flatModel, flatsModel
    }
}