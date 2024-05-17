<template>
  <div class="container mx-auto mt-8 md:mt-16 mb-32">
    <ContactForm :pageConfiguration="pageConfiguration" />
  </div>
</template>

<script setup lang="ts">
const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();

useHead({
  title: pageConfiguration.value?.title?.toString() ?? "",
  meta: [
    {
      property: "og:title",
      content: pageConfiguration.value?.title?.toString() ?? "",
    },
    {
      property: "robots",
      content: "index, follow",
    },
  ],
});
</script>
