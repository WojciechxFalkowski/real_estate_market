<template>
  <RouterLink
    @click="handleClickLogo"
    to="/"
    aria-label="Przekierowanie na stronę https://wellrent-nieruchomosci.pl"
  >
    <WellRent :style="{ width: '80px' }" />
  </RouterLink>
</template>

<script lang="ts" setup>
import WellRent from "./icons/WellRent.vue";

const props = defineProps({
  componentPlacement: {
    type: String,
  },
});
const { trackClick } = useAnalytics();

const handleClickLogo = () => {
  trackClick(`logo`, `położenie: ${props.componentPlacement}`);
};
</script>
