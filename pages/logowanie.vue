<template>
  <div class="container mx-auto mt-16 lg:mt-32 mb-32">
    <SignIn />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { redirectIfTokenExist } = useAuth();

onMounted(async () => {
  await redirectIfTokenExist();
});
</script>
