<template>
  <button
    @click="handleToggleMenu"
    class="flex items-center space-x-2 focus:outline-none z-100 h-6"
  >
    <div class="w-6 flex items-center justify-center relative">
      <span
        :class="isOpenMenu ? 'translate-y-0 rotate-45' : '-translate-y-2'"
        class="transform transition w-full h-px bg-current absolute"
      ></span>

      <span
        :class="isOpenMenu ? 'opacity-0 translate-x-3' : 'opacity-100'"
        class="transform transition w-full h-px bg-current absolute"
      ></span>

      <span
        :class="isOpenMenu ? 'translate-y-0 -rotate-45' : 'translate-y-2'"
        class="transform transition w-full h-px bg-current absolute"
      ></span>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  isOpenMenu: boolean;
}>();

// const open = ref(false);
const emit = defineEmits(["toggleMobileMenu"]);

const handleToggleMenu = () => {
  emit("toggleMobileMenu");
};
</script>
