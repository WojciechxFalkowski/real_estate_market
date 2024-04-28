<template>
  <div class="min-h-screen flex flex-col">
    <Navbar class="py-2.5" />

    <!-- <div class="flex-grow"> -->
    <slot v-if="showRestrictedContent" class="container m-auto" />
    <!-- <LoadingIcon v-else class="restricted__loader --loading" /> -->
    <!-- <MobileNavigation /> -->
    <div v-else class="flex-grow flex justify-center items-center">
      <span class="--loading-icon">
        <LoadingIcon name="loading" />
      </span>
    </div>

    <Footer class="container mx-auto my-8 lg:mt-16" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import LoadingIcon from "~/components/icons/LoadingIcon.vue";
import { userStore } from "~/store/userStore";

const { user, loadingWrapper, setUser, setPathBeforeRedirect } = userStore();

const showRestrictedContent = ref(!!user.data);
const route = useRoute();
const router = useRouter();
if (
  !showRestrictedContent.value &&
  !loadingWrapper.isLoading &&
  user.data === null
) {
  router.push({ name: "logowanie" });
}

onMounted(async () => {
  if (!loadingWrapper.isLoading && !user.data) {
    await setUser();
  }
});

watch(
  loadingWrapper,
  (_, newValue) => {
    if (!newValue.isLoading) {
      if (Object.keys(user.data ?? {}).length === 0) {
        setPathBeforeRedirect(route.path);
        router.push({ name: "logowanie" });
      } else {
        showRestrictedContent.value = true;
      }
    }
  },
  { deep: true }
);
</script>
