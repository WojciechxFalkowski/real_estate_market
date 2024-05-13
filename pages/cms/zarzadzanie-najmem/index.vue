<template>
  <PageConfiguration :formConfiguration="pageLeaseManagmentFormConfiguration" />

  <LeaseManager class="mt-16" />
</template>

<script setup lang="ts">
import { pageLeaseManagmentFormConfiguration } from "./pageLeaseManagment";
</script>
