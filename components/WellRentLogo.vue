<template>
  <!-- Logo and brand name -->
  <RouterLink to="/">
    <WellRent :style="{ width: '80px' }" />
  </RouterLink>
</template>

<script lang="ts" setup>
import WellRent from "./icons/WellRent.vue";
</script>
