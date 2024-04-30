<template>
  <div class="my-4 space-y-4">
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
        </div>

        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          multiple
          @change="handleFiles"
        />
      </label>
    </div>

    <div class="grid grid-cols-12 gap-4">
      <ImageUploaderElement
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :index="index"
        :isLoading="isLoading"
        :removeImage="removeImage"
        :isEditMode="isEditMode"
        @setNewIndexOfImage="setNewIndexOfImage"
        :isChangeOrderAvailable="isChangeOrderAvailable"
        :isLoadingChangeOrder="isLoadingChangeOrder"
        class="col-span-12 sm:col-span-6 lg:col-span-3 w-full h-40 lg:h-32 xl:h-48"
      ></ImageUploaderElement>
    </div>

    <Button
      class="block mx-auto px-4 py-2 bg-orange rounded shadow"
      @click="uploadImages"
      :isLoading="isLoading || isLoadingChangeOrder"
      :isDisabled="isDisableAddFiles || isLoadingChangeOrder"
    >
      Dodaj
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { ImageUploaderI } from "./contracts";
import ImageUploaderElement from "./partials/ImageUploaderElement.vue";
const props = defineProps({
  images: {
    type: Array as PropType<ImageUploaderI[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  removeImage: {
    type: Function as PropType<(index: number) => Promise<unknown>>,
    required: true,
  },
  flatId: {
    type: Number as PropType<number | undefined>,
  },
});

const emit = defineEmits<{
  submit: [];
}>();

const { changeImagesOrder } = useFlat();

const images = computed(() => {
  return props.images;
});

const isEditMode = computed(() => {
  return images.value.some((image) => image.newId !== null);
});

const isDisableAddFiles = computed(() => {
  return props.images.length === 0 || props.isLoading;
});

const isChangeOrderAvailable = computed(() => {
  return props.images.every((image) => image.isSaved);
});

const newIndexNextValue = ref(0);

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (const file of target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push({
          src: e.target!.result as string,
          file,
          id: images.value.length,
          newId: null,
          isSaved: false,
          publicId: null,
        });
      };
      reader.readAsDataURL(file);
    }
    resetOrderNewOrder();
  }
}

const resetOrderNewOrder = () => {
  images.value.forEach((image) => {
    image.newId = null;
    newIndexNextValue.value = 0;
  });
};

const setNewIndexOfImage = (imageId: number) => {
  const selectedImage = images.value.find((image) => image.id === imageId);
  if (!selectedImage) {
    return;
  }

  if (selectedImage.newId !== null) {
    if (selectedImage.newId === newIndexNextValue.value - 1) {
      selectedImage.newId = null;
      newIndexNextValue.value -= 1;
    } else {
      images.value.forEach((image) => {
        if (
          image.newId !== null &&
          image.newId > 0 &&
          selectedImage.newId !== null &&
          selectedImage.newId < image.newId
        ) {
          image.newId -= 1;
        }
      });
      selectedImage.newId = null;
      newIndexNextValue.value -= 1;
    }
  } else {
    selectedImage.newId = newIndexNextValue.value;
    newIndexNextValue.value += 1;
  }
};

const isLoadingChangeOrder = ref(false);
const { showToast } = useToast();

watch(newIndexNextValue, async () => {
  if (newIndexNextValue.value === images.value.length) {
    isLoadingChangeOrder.value = true;
    images.value.forEach((image) => {
      if (image.newId === null) {
        return;
      }
      image.id = image.newId;
      image.newId = null;
    });
    newIndexNextValue.value = 0;
    const newOrder = images.value.map((image) => {
      return {
        publicId: image.publicId as string,
        orderId: image.id,
      };
    });

    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("call");
    //     resolve("");
    //   }, 2000);
    // });
    if (!props.flatId) {
      return;
    }
    try {
      const data = await changeImagesOrder(props.flatId, newOrder);
      images.value.sort((imageA, imageB) => imageA.id - imageB.id);

      if (!data || !data.message) {
        return;
      }
      showToast(data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingChangeOrder.value = false;
    }
  }
});

// const isLoadingUploadImages = ref(false);

// const removeImageHandler = async (index: number) => {
//   try {
//     isLoadingUploadImages.value = true;
//     // const result = emit("removeImage", index);

//     await props.removeImage(index);
//     console.log("result");
//     // console.log(result);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     isLoadingUploadImages.value = false;
//   }
// };

const uploadImages = async () => {
  console.log("uploadImages");

  try {
    await emit("submit");
  } catch (error) {
    console.log(error);
  } finally {
  }
};
</script>

<style scoped>
/* Tu możesz dodać odpowiednie style */
</style>
