<template>
  <GenericForm
    :fields="editTableFormConfiguration.fields"
    :initialValues="initialValues"
    :submitButton="{
      ...editTableFormConfiguration.submitButton,
      isLoading: isLoading,
    }"
    :onSubmit="createAndEditFormSubmit"
    :formClass="editTableFormConfiguration.formClass"
  />

  <div class="h-0.5 bg-gray-300 my-16"></div>

  <div class="relative py-3">
    <div :class="{ 'absolute inset-0 bg-white/70 z-10': isNewFlatRoute }"></div>

    <div class="grid grid-cols-12 gap-4">
      <ToggleCheckbox
        class="col-span-12 lg:col-span-4"
        label="Widoczność na stronie"
        :value="isFlatActive"
        @change="toggleFlatStatus"
        :isLoading="isChangingStatusOfFlat"
      />

      <div class="col-span-12 lg:col-span-3">
        <DeleteFlatButton :flatUrl="flatModel?.url" />
      </div>
    </div>

    <div class="h-0.5 bg-gray-300 my-16"></div>

    <div clas="my-8">
      <ImageUploader
        :images="currentImages"
        :isLoading="isLoadingUploadImages"
        :flatId="flatId"
        @submit="handleUploadImages"
        :changeImagesOrder="handleChangeImagesOrder"
        :removeImage="removeImage"
      />
    </div>

    <div class="h-0.5 bg-gray-300 my-16"></div>

    <div class="mt-8">
      <Tiptap
        :tiptapContent="tiptapContent"
        @submit="handleSubmitTiptap"
        :isLoading="isLoadingTiptapContent"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import GenericForm from "~/components/GenericForm/GenericForm.vue";
import { editTableFormConfiguration } from "./config";
import ImageUploader from "~/components/ImageUploader/ImageUploader.vue";
import type { SaveFlat } from "~/composables/useFlat";
import { NEW_FLAT_ROUTE } from "~/components/EditFlatForm/config";
import type { ImageUploaderI, NewOrderI } from "../ImageUploader/contracts";
import type { PictureItem } from "../Carousel";
import { Theme, ComponentType } from "@/components/Button/Button.props";

const currentImages = ref<ImageUploaderI[]>([]);
const route = useRoute();
const routeId = route.params.id;
const {
  fetchFlat,
  flatModel,
  saveFlat,
  createNewFlat,
  uploadImages,
  deleteUploadedImage,
  changeImagesOrder,
} = useFlat();

const isLoading = ref(false);
const isLoadingUploadImages = ref(false);
const flatId = ref<number | undefined>(undefined);

onMounted(() => {
  if (isNewFlatRoute.value || typeof routeId !== "string") {
    return;
  }

  fetchFlat(routeId, true, true).then(() => {
    if (!flatModel.value) {
      return;
    }
    flatId.value = flatModel.value.id;
    tiptapContent.value = flatModel.value?.tiptapHTML;
    const images = flatModel.value.images;
    isFlatActive.value = flatModel.value.isActive;
    if (!images) {
      return;
    }

    currentImages.value = mapImages(images);
  });
});

const mapImages = (images: PictureItem[]): ImageUploaderI[] => {
  if (!images) {
    return [];
  }

  const mappedImages: ImageUploaderI[] = images.map((image, index) => {
    return {
      src: image.srcset,
      id: index,
      publicId: image.imageId || null,
      newId: null,
      isSaved: true,
    };
  });

  return mappedImages;
};

const isNewFlatRoute = computed(() => {
  return routeId === NEW_FLAT_ROUTE;
});

const initialValues = computed(() => {
  return editTableFormConfiguration.fields.map((field, index) => {
    const fieldId = field.id;
    let flatModalValue = "";
    // Sprawdź, czy flatModel.value istnieje oraz czy zawiera pole o kluczu równym fieldId
    if (flatModel.value && fieldId in flatModel.value) {
      flatModalValue = (flatModel.value as any)[fieldId];
    } else if (flatModel.value?.flatDetails) {
      const detail = flatModel.value.flatDetails.find((d) => d.id === fieldId);
      flatModalValue = detail ? detail.description : "";
    } else {
      flatModalValue = ""; // Przypisz domyślną wartość
    }
    return { id: field.id, initialValue: flatModalValue };
  });
});

const handleChangeImagesOrder = async (newOrder: NewOrderI[]) => {
  if (!flatId.value) {
    return;
  }

  const data = await changeImagesOrder(flatId.value, newOrder);

  return data;
};

// const mappedFields = computed(() => {
//   return editTableFormConfiguration.fields.map((field, index) => {
//     const fieldId = field.id;
//     let flatModalValue = "";
//     // Sprawdź, czy flatModel.value istnieje oraz czy zawiera pole o kluczu równym fieldId
//     if (flatModel.value && fieldId in flatModel.value) {
//       flatModalValue = (flatModel.value as any)[fieldId];
//     } else if (flatModel.value?.flatDetails) {
//       const detail = flatModel.value.flatDetails.find((d) => d.id === fieldId);
//       flatModalValue = detail ? detail.description : "";
//     } else {
//       flatModalValue = "PLN"; // Przypisz domyślną wartość
//     }
//     return { ...field, initialValue: flatModalValue };
//   });
// });

const router = useRouter();

const navigateToNewFlatPage = async (newFlatUrl: string) => {
  router.push({
    name: "cms-mieszkania-na-wynajem-id",
    params: { id: newFlatUrl },
  });
  await fetchFlat(newFlatUrl, true);
};

const { showToast } = useToast();

const createNewFlatHandler = async (formData: SaveFlat) => {
  try {
    isLoading.value = true;
    const response = await createNewFlat(formData);

    if (!response || !response.message) {
      return;
    }

    showToast(response?.message);

    await navigateToNewFlatPage(formData.url);
  } catch (error) {
    let errorMessage = "Nieoczekiwany błąd:";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    showToast(errorMessage, false);
  } finally {
    isLoading.value = false;
  }
};

const removeImage = async (index: number): Promise<unknown> => {
  if (!flatModel.value || !flatModel.value.images) {
    return;
  }

  const imageToDelete = currentImages.value[index];
  const publicId = imageToDelete.publicId;

  if (publicId) {
    try {
      const data = await deleteUploadedImage(flatModel.value.id, publicId);
      currentImages.value.splice(index, 1);
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
    console.log("Nie ma zdjęcia w bazie danych tylko lokalnie!");
    currentImages.value.splice(index, 1);
  }
};

const editFlatHandler = async (formData: Partial<SaveFlat>) => {
  if (!flatModel.value) {
    return;
  }

  isLoading.value = true;
  try {
    await saveFlat(flatModel.value.id, formData);
    showToast("Dane zosały zaktualizowane!");
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoading.value = false;
  }
};

const createAndEditFormSubmit = async (formData: SaveFlat) => {
  if (isNewFlatRoute.value) {
    await createNewFlatHandler(formData);
  } else {
    await editFlatHandler(formData);
  }
};

const tiptapContent = ref("");
const isLoadingTiptapContent = ref(false);
const handleSubmitTiptap = async (tiptapHTML: string) => {
  if (!flatModel.value) {
    return;
  }

  try {
    isLoadingTiptapContent.value = true;
    await saveFlat(flatModel.value.id, { tiptapHTML });
    showToast("Zapisano dane!");
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingTiptapContent.value = false;
  }
};

const handleUploadImages = async () => {
  if (!flatModel.value) {
    return;
  }

  try {
    isLoadingUploadImages.value = true;
    const data = await uploadImages(flatModel.value.id, currentImages.value);

    if (!data || !data.message || !data.images) {
      return;
    }

    currentImages.value = mapImages(
      data.images.map((image) => {
        return {
          alt: undefined,
          srcset: image.url,
          src: undefined,
          imageId: image.imageId,
        };
      })
    );

    showToast(data.message);
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoadingUploadImages.value = false;
  }
};

const isFlatActive = ref(false);
const isChangingStatusOfFlat = ref(false);

async function toggleFlatStatus(newStatus: boolean) {
  isChangingStatusOfFlat.value = true;
  try {
    await editFlatHandler({ isActive: newStatus });
    isFlatActive.value = newStatus;
  } catch (error) {
    console.error("Błąd podczas zmiany statusu mieszkania", error);
  } finally {
    isChangingStatusOfFlat.value = false;
  }
}
</script>
