<template>
  <div class="space-y-2 bg-[#F5F5F7] rounded">
    <div
      :class="{ 'border-b': index !== sections.length - 1 }"
      v-for="(section, index) in sections"
      :key="index"
    >
      <AccordionElement
        :title="section.title"
        :content="section.description"
        :listTitle="section.listTitle"
        :list="section.list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ sections: FaqElement[] }>();
</script>
