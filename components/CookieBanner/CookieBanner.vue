<template>
  <div
    v-if="isVisible"
    class="fixed bottom-0 w-full bg-white bg-opacity-90 text-gray-800 shadow-lg z-50"
  >
    <div
      class="container mx-auto flex justify-between items-center flex-col py-4 lg:flex-row"
    >
      <p class="text-sm text-justify">
        Ta strona wykorzystuje pliki cookie. Używamy informacji zapisanych za
        pomocą plików cookies w celach statystycznych. Korzystając ze
        strony wyrażasz zgodę na używanie plików cookies.
      </p>

      <Button
        class="mt-4 lg:ml-4 lg:mt-0"
        :componentType="ComponentType.Button"
        :theme="Theme.Primary"
        @click="hideBanner"
      >
        Zamknij
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Theme, ComponentType } from "@/components/Button/Button.props";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { COOKIE_BANNER_KEY } from "./config";

const { getLocalStorageValueByKey, setLocalStorageValueByKey } =
  useLocalStorage();
const isVisible = ref(false);

const checkBannerStatus = () => {
  isVisible.value = !getLocalStorageValueByKey(COOKIE_BANNER_KEY);
};

const hideBanner = () => {
  setLocalStorageValueByKey(COOKIE_BANNER_KEY, "true");
  isVisible.value = false;
};

onMounted(() => {
  checkBannerStatus();
});
</script>
