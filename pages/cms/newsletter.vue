<template>
  <EmailTable v-if="emailCollection" :emails="emailCollection" />
</template>

<script setup lang="ts">
const { emailCollection, getEmails } = useNewsletter();
onMounted(() => {
  getEmails();
});
</script>
