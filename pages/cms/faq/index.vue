<template>
  <PageConfiguration :formConfiguration="faqPageConfiguration" />

  <FAQEditor class="mt-16" />
</template>

<script setup lang="ts">
import { faqPageConfiguration } from "./faqConfiguration";
</script>
