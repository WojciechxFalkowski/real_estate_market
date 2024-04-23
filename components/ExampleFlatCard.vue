<template>
  <div
    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img class="rounded-t-lg" :src="img" alt="" />
    </a>
    <div class="py-5 px-3">
      <a href="#">
        <h5
          class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-center"
        >
          {{ title }}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  description: string;
  img: string;
};

const props = defineProps<Props>();
</script>
