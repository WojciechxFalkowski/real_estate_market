<template>
  <PageTitle :title="pageConfiguration?.title" class="mt-8 lg:mt-16" />

  <div class="container mx-auto mb-32 mt-8 lg:mt-16">
    <Accordion
      :sections="faqCollection"
      @isOpenFirstTimeAccordionElement="isOpenFirstTimeAccordionElement"
    />
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
const { sendOnMountedEvent, trackClick } = useAnalytics();
onMounted(async () => {
  await sendOnMountedEvent();
});

const isOpenFirstTimeAccordionElement = (accordionElementIndex: number) => {
  const accordionElement = faqCollection.value[accordionElementIndex];
  if (!accordionElement || !accordionElement.title) {
    return;
  }

  trackClick("FAQ", accordionElement.title);
};
</script>
