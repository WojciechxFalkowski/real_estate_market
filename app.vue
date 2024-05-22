<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Well Rent` : "Well Rent";
  },
  // titleTemplate: (titleChunk) => {
  //   return titleChunk
  //     ? `${titleChunk} | Well Rent | mieszkania na wynajem Warszawa`
  //     : "Well Rent | mieszkania na wynajem Warszawa";
  // },
  meta: [
    {
      name: "google-site-verification",
      content: "rxAipKTOgycQJYvnfco-6awgcxmHst7nnCPiqFqic70",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "http://wellrent-nieruchomosci.pl",
    },
    {
      name: "og:site_name",
      content: "http://wellrent-nieruchomosci.pl",
    },
    {
      property: "lang",
      content: "pl",
    },
    {
      name: "og:url",
      content: route.fullPath,
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
  htmlAttrs: {
    lang: "pl",
  },
});

const { setVisitorId } = useVisitor();
onMounted(async () => {
  await setVisitorId();
});
</script>
