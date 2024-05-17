<template>
  <PageTitle title="Konfiguracja karuzeli" headingTag="h2" class="mt-16 mb-8" />

  <ImageUploader
    :images="currentImages"
    :isLoading="isLoadingUploadImages"
    @submit="handleUploadImages"
    @addImage="addImage"
    :changeImagesOrder="handleChangeImagesOrder"
    :removeImage="removeImage"
  />
</template>

<script setup lang="ts">
import type { ImageUploaderI, NewOrderI } from "../ImageUploader/contracts";

const currentImages = ref<ImageUploaderI[]>([]);
// const currentImages = computed<ImageUploaderI[]>(() => {
//   if (!carouselCollection.value) {
//     return [];
//   }
//   return carouselCollection.value.map((image) => {
//     return {
//       id: image.id,
//       newId: image.newId ?? null,
//       publicId: image.publicId ?? null,
//       src: image.url,
//       file: image.file,
//     };
//   });
// });
const isLoadingUploadImages = ref(false);
const isFetchingHomeCarouselImages = ref(false);
const { showToast } = useToast();
const {
  addHomeCarouselImages,
  getHomeCarouselImages,
  deleteHomeCarouselImages,
  carouselCollection,
  changeHomeCarouselImageOrder,
} = useHomeCarouselImage();

onMounted(async () => {
  isFetchingHomeCarouselImages.value = true;
  await getHomeCarouselImages({ isClient: true, isAuth: false });
  if (!carouselCollection.value) {
    return [];
  }
  currentImages.value = carouselCollection.value.map((image) => {
    return {
      id: image.id,
      newId: image.newId ?? null,
      publicId: image.publicId ?? null,
      src: image.url,
      file: image.file,
    };
  });
  isFetchingHomeCarouselImages.value = false;
});

// const mapImages = (images: PictureItem[]): ImageUploaderI[] => {
//   if (!images) {
//     return [];
//   }

//   const mappedImages: ImageUploaderI[] = images.map((image, index) => {
//     return {
//       src: image.srcset,
//       id: index,
//       publicId: image.imageId || null,
//       newId: null,
//     };
//   });

//   return mappedImages;
// };

const addImage = (image: ImageUploaderI) => {
  if (!carouselCollection.value) {
    return;
  }
  currentImages.value.push(image);
  //   carouselCollection.value.push({
  //     id: image.id,
  //     order: undefined,
  //     publicId: undefined,
  //     url: image.src,
  //     newId: image.newId ?? undefined,
  //     createdAt: undefined,
  //     updatedAt: undefined,
  //     file: image.file,
  //   });
};

const handleUploadImages = async () => {
  try {
    isLoadingUploadImages.value = true;
    const message = await addHomeCarouselImages(currentImages.value);
    if (!message) {
      return;
    }

    showToast(message);
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoadingUploadImages.value = false;
  }
};

const handleChangeImagesOrder = async (newOrder: NewOrderI[]) => {
  if (!carouselCollection.value) {
    return;
  }

  const data = await changeHomeCarouselImageOrder(newOrder);

  return data;
};

const removeImage = async (imageId: number): Promise<unknown> => {
  if (!carouselCollection.value) {
    return;
  }

  const imageIndexToDelete = currentImages.value.findIndex(
    (carouselModel) => carouselModel.id === imageId
  );

  const imageToDelete = currentImages.value[imageIndexToDelete];

  if (!imageToDelete) {
    return;
  }
  const publicId = imageToDelete.publicId;
  if (publicId) {
    try {
      const data = await deleteHomeCarouselImages(publicId);
      currentImages.value.splice(imageIndexToDelete, 1);
      if (!data) {
        return;
      }
      showToast(data.message);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        showToast(error.message, false);
      }
    }
  } else {
    currentImages.value.splice(imageIndexToDelete, 1);
  }
};
</script>
