<template>
  <div class="flex justify-center mt-8 lg:mt-16">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      {{ pageConfiguration?.title }}
    </h1>
  </div>

  <div class="container mx-auto mb-32 mt-8 lg:mt-16">
    <Accordion :sections="faqCollection" />
  </div>
</template>

<script setup lang="ts">
const { getActiveFaq, faqCollection } = useFaq();

await getActiveFaq();

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();
</script>
