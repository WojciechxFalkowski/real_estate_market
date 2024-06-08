<template>
  <Navbar class="py-2.5" />

  <div>
    <slot class="container m-auto" />
  </div>

  <AnimatedVisibility @sendIsVisibleEvent="sendIsVisibleFooter">
    <Footer class="container mx-auto my-8 lg:mt-16" />
  </AnimatedVisibility>

  <CookieBanner />
</template>
<script setup lang="ts">
const { trackVisibility } = useAnalytics();
const sendIsVisibleFooter = async () => {
  await trackVisibility("Footer");
};
</script>
