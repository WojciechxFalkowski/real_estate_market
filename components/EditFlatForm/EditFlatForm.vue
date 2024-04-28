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

  <div clas="my-8">
    <!-- :newImages="newImages" -->
    <ImageUploader
      :images="currentImages"
      :isLoading="isLoadingUploadImages"
      @submit="handleUploadImages"
      :removeImage="removeImage"
    />
  </div>

  <div class="mt-8">
    <Tiptap :tiptapContent="tiptapContent" @submit="handleSubmitTiptap" />
  </div>
</template>
<script setup lang="ts">
import GenericForm from "~/components/GenericForm/GenericForm.vue";
import { editTableFormConfiguration } from "./config";
import ImageUploader from "~/components/ImageUploader/ImageUploader.vue";
import type { SaveFlat } from "~/composables/useFlat";
import { NEW_FLAT_ROUTE } from "~/components/EditFlatForm/config";
import type { ImageUploaderI } from "../ImageUploader/contracts";

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
} = useFlat();
const isLoading = ref(false);
const isLoadingUploadImages = ref(false);

onMounted(() => {
  fetchFlat(routeId, true, true).then(() => {
    if (!flatModel.value) {
      return;
    }
    tiptapContent.value = flatModel.value?.tiptapHTML;
    const images = flatModel.value.images;
    if (!images) {
      return;
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

    currentImages.value = mappedImages;
  });
});

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
    name: "cms-mieszkania-id",
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
  //todo -> zamienić na jedna tablice prawdopodobnie (currentImages / newImages)
  console.log("removeImage");
  // const promise = new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log("resolved");
  //     currentImages.value.splice(index, 1);

  //     resolve("");
  //   }, 2000);
  // });

  if (!flatModel.value || !flatModel.value.images) {
    return;
  }
  // const imageToDelete = flatModel.value.images[index];
  const imageToDelete = currentImages.value[index]
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

const EditFlatHandler = async (formData: SaveFlat) => {
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
    await EditFlatHandler(formData);
  }
};

const tiptapContent = ref("<p>Test sad saasd das </p>");

const handleSubmitTiptap = (tiptapHTML: string) => {
  if (!flatModel.value) {
    return;
  }

  saveFlat(flatModel.value.id, { tiptapHTML });
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

    showToast(data.message);
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoadingUploadImages.value = false;
  }
};
</script>
