<template>
  <div>
    <div class="flex justify-center">
      <component
        :is="headingTag"
        class="text-xl text-center border-b-2 border-orange pb-2"
      >
        {{ title }}
      </component>
    </div>

    <div v-if="description" class="flex justify-center mt-2 mb-8 lg:mb-16">
      <p class="text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  title: {
    type: String as PropType<string | number | undefined>,
    required: true,
    default: () => "",
  },

  description: {
    type: String as PropType<string | number | undefined>,
    required: false,
    default: () => "",
  },

  headingTag: {
    type: String as PropType<string>,
    required: false,
    default: () => "h1",
  },
});
</script>
