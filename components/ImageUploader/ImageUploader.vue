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
      <!-- <div
        v-for="(image, index) in images"
        :key="index"
        class="col-span-12 sm:col-span-6 lg:col-span-3 w-full h-40 lg:h-32 xl:h-48 bg-cover rounded-lg shadow-md relative"
        :style="{ backgroundImage: `url(${image.src})` }"
      >
        <div
          class="absolute w-full h-full cursor-pointer"
          @click="() => setNewIndexOfImage(image.id)"
        >
          <div
            v-if="image.newId !== null"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
          >
            <div class="text-lg">{{ image.newId }}</div>
          </div>
        </div>

        <button
          v-if="!isEditMode"
          class="bg-red-500 text-white w-6 h-6 rounded-full transform translate-y-1 translate-x-1"
          @click="removeImageHandler(index)"
        >
          <span v-if="isLoadingUploadImages">Loading</span>
          <TrashIcon v-else />
        </button>
      </div> -->

      <ImageUploaderElement
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        :index="index"
        :isLoading="isLoading"
        :removeImage="removeImage"
        :isEditMode="isEditMode"
        @setNewIndexOfImage="setNewIndexOfImage"
        class="col-span-12 sm:col-span-6 lg:col-span-3 w-full h-40 lg:h-32 xl:h-48"
      ></ImageUploaderElement>
    </div>

    <Button
      class="block mx-auto px-4 py-2 bg-orange rounded shadow"
      @click="uploadImages"
      :isLoading="isLoading"
      :isDisabled="isDisableAddFiles"
    >
      Dodaj
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { ImageUploaderI } from "./contracts";
import TrashIcon from "~/components/icons/TrashIcon.vue";
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
});

const emit = defineEmits<{
  submit: [];
  // removeImage: [id: number];
}>();

const images = computed(() => {
  return props.images;
});

const isEditMode = computed(() => {
  return images.value.some((image) => image.newId !== null);
});

const isDisableAddFiles = computed(() => {
  return props.images.length === 0 || props.isLoading;
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
          publicId: null
        });
      };
      reader.readAsDataURL(file);
    }
  }
}

const setNewIndexOfImage = (imageId: number) => {
  console.log('setNewIndexOfImage')
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

watch(newIndexNextValue, () => {
  if (newIndexNextValue.value === images.value.length) {
    images.value.forEach((image) => {
      if (image.newId === null) {
        return;
      }
      image.id = image.newId;
      image.newId = null;
    });
    newIndexNextValue.value = 0;
    images.value.sort((imageA, imageB) => imageA.id - imageB.id);
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
