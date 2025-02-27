<template>
  <div
    class="w-full h-full bg-cover rounded-lg shadow-md relative"
    :style="{ backgroundImage: `url(${image.src})` }"
  >
    <div
      class="absolute w-full h-full"
      :class="{
        'cursor-pointer': isChangeOrderAvailable && !isLoadingChangeOrder,
      }"
      @click="() => handleSetNewIndexOfImage(image.id)"
    >
      <div
        v-if="image.newId !== null"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
      >
        <div class="text-lg">{{ image.newId }}</div>
      </div>
    </div>

    <div
      v-if="!image.publicId"
      class="bg-white w-full h-6 absolute bottom-0 left-0 opacity-70 text-center"
    >
      Do dodania
    </div>

    <button
      v-if="!isEditMode && !isLoadingChangeOrder"
      class="bg-red-500 text-white w-6 h-6 rounded-full transform translate-y-1 translate-x-1"
      @click="removeImageHandler(image.id)"
    >
      <LoadingIcon v-if="isRemovingImage" class="m-auto" />
      <TrashIcon v-else />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { ImageUploaderI } from "./../contracts";
import { TrashIcon, LoadingIcon } from "~/components/icons";
const props = defineProps({
  image: {
    type: Object as PropType<ImageUploaderI>,
    required: true,
  },
  index: {
    type: Number,
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
  isEditMode: {
    type: Boolean,
    required: true,
  },
  isChangeOrderAvailable: {
    type: Boolean,
    required: true,
  },
  isLoadingChangeOrder: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  setNewIndexOfImage: [imageId: number];
}>();

const isRemovingImage = ref(false);

const removeImageHandler = async (id: number) => {
  try {
    isRemovingImage.value = true;

    await props.removeImage(id);
  } catch (error) {
    console.log(error);
  } finally {
    isRemovingImage.value = false;
  }
};

const handleSetNewIndexOfImage = (id: number) => {
  if (!props.isChangeOrderAvailable || props.isLoadingChangeOrder) {
    return;
  }

  emit("setNewIndexOfImage", id);
};
</script>

<style scoped>
/* Tu możesz dodać odpowiednie style */
</style>
