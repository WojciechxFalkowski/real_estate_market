<template>
  <div class="space-y-2 bg-[#F5F5F7] rounded">
    <div
      :class="{ 'border-b': index !== sections.length - 1 }"
      v-for="(section, index) in sections"
      :key="index"
    >
      <AccordionElement
        :title="section.title"
        :content="section.content"
        :list="section.list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export type List = {
  title: string;
  elements: string[];
};
export type AccordionI = {
  title: string;
  content?: string;
  list?: List;
};

const props = defineProps<{ sections: AccordionI[] }>();
</script>
