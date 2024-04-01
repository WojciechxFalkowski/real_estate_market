<template>
  <div class="container mx-auto mt-16 lg:mt-16 mb-16">
    <SignUp />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { redirectIfTokenExist } = useAuth();

onMounted(async () => {
  await redirectIfTokenExist();
});
</script>
