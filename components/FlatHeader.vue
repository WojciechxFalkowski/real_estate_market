<template>
  <div class="lg:border-b lg:pb-5">
    <h1 class="text-lg mb-4">
      {{ title }}
    </h1>
    <div class="flex justify-between flex-col md:flex-row gap-x-2 lg:items-center">
      <ul class="flex flex-row flex-wrap gap-y-2 sm:gap-x-5 xl:gap-x-10">
        <li
          class="flex flex-row gap-3 lg:gap-x-5 items-center w-1/2 sm:w-auto"
          v-for="detail in details"
          :key="detail.title"
        >
          <span>
            <component :is="{ ...detail.icon }" class="w-6 h-6" />
          </span>

          <div class="flex flex-col">
            <p class="mb-0 text-gray-500 text-sm">{{ detail.title }}</p>
            <p class="mb-0 text-sm">{{ detail.description }}</p>
          </div>
        </li>
      </ul>

      <div
        class="flex justify-center mt-8 my-4 divide-x-2 md:my-0 md:items-baseline"
      >
        <p class="whitespace-nowrap text-xl pe-4">
          <strong class="me-1">{{ price }}</strong>
          <span>{{ currency }}</span>
        </p>
        <p class="whitespace-nowrap text-lg text-gray-500 ps-4">
          <span class="me-1">{{ pricePerMeter }}</span>
          <span class="me-1">{{ currency }}</span>
          <span>/ m²</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  details: {
    type: Array as PropType<
      {
        title: string;
        description: string;
        icon: Component;
      }[]
    >,
    default: [],
  },
  title: {
    type: String,
    default: null,
  },
  price: {
    type: String,
    default: null,
  },
  currency: {
    type: String,
    default: null,
  },
  pricePerMeter: {
    type: String,
    default: null,
  },
});
import type { PropType } from "vue";
</script>
