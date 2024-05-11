<template>
  <div v-if="isFetchingEmails" class="flex justify-center h-full items-center">
    <LoadingIcon />
  </div>

  <EmailTable v-else-if="emailCollection" :emails="emailCollection" />
</template>

<script setup lang="ts">
const { emailCollection, getEmails } = useNewsletter();
const isFetchingEmails = ref(false);

onMounted(async () => {
  isFetchingEmails.value = true;
  await getEmails();
  isFetchingEmails.value = false;
});
</script>
