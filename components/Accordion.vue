<template>
  <div class="space-y-2">
    <!-- Pętla po sekcjach akordeonu -->
    <div v-for="(section, index) in sections" :key="index">
      <!-- Nagłówek sekcji -->
      <div
        @click="toggle(index)"
        class="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-300 transition-colors duration-200"
      >
        <h3 class="text-gray-800 font-medium">{{ section.title }}</h3>
        <svg
          :class="openIndex === index ? 'transform rotate-180' : ''"
          class="w-4 h-4 text-gray-800 transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <!-- Transition wrapper for section content -->
      <transition name="accordion-content">
        <div
          v-if="openIndex === index"
          class="px-4 bg-white border border-t-0 rounded-b-lg overflow-hidden"
        >
          <p class="py-2">{{ section.content }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Section = {
  title: string;
  content: string;
};

const props = defineProps<{
  sections: Section[];
}>();

const openIndex = ref(-1);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<style>
/* Styles for the transition */
.accordion-content-enter-active, .accordion-content-leave-active {
  transition: all 0.35s;
}
.accordion-content-enter-from, .accordion-content-leave-to {
  /* height: 0; */
  /* opacity: 0; */
  max-height: 0;
}
.accordion-content-enter-to {
  /* height: 100%; */
  /* opacity: 1; */
  max-height: 10em;
}
</style>
