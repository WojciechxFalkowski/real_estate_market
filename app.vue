<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Well Rent`
      : "Well Rent";
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
      property: "lang",
      content: "pl",
    },
  ],
  htmlAttrs: {
    lang: "pl_PL",
  },
});
</script>
