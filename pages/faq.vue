<template>
  <PageTitle :title="pageConfiguration?.title" class="mt-8 lg:mt-16" />

  <div class="container mx-auto mb-32 mt-8 lg:mt-16">
    <Accordion :sections="faqCollection" />
  </div>
</template>

<script setup lang="ts">
const { getActiveFaq, faqCollection } = useFaq();

await getActiveFaq();

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();

useHead({
  title: pageConfiguration.value?.title?.toString() ?? "",
  meta: [
    {
      name: "description",
      content: pageConfiguration.value?.title?.toString() ?? "",
    },
    {
      property: "og:title",
      content: pageConfiguration.value?.title?.toString() ?? "",
    },
  ],
});
</script>
