<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      :checked="value"
      @change="change"
      class="sr-only peer"
      :disabled="isLoading"
    />

    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-gray-300 dark:bg-gray-700 peer-focus:ring-2 dark:peer-focus:ring-gray-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange"
    ></div>

    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {{ label }}
    </span>

    <span v-if="isLoading" class="ml-2 text-gray-500">
      <LoadingIcon />
    </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { LoadingIcon } from "~/components/icons";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: "change", value: boolean): void;
}>();

const change = (event: Event) => {
  emit("change", (event.target as HTMLInputElement).checked);
};
</script>
