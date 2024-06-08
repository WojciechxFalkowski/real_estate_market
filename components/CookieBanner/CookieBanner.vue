<template>
  <div
    v-if="isVisible"
    class="fixed bottom-0 w-full bg-white bg-opacity-90 text-gray-800 p-4 shadow-lg z-50"
  >
    <div class="container mx-auto flex justify-between items-center">
      <p class="text-sm flex-1">
        Ta strona wykorzystuje pliki cookie. Używamy informacji zapisanych za
        pomocą plików cookies w celach statystycznych i w celu dostosowania
        naszej strony do indywidualnych potrzeb użytkowników. Korzystając ze
        strony wyrażasz zgodę na używanie plików cookies, zgodnie z aktualnymi
        ustawieniami przeglądarki.
      </p>

      <Button
        class="ml-4"
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
