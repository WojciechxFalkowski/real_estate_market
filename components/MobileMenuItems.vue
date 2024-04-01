<template>
  <transition name="fade">
    <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-50 lg:hidden">
      <div class="flex flex-col items-center justify-center h-full space-y-6">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.href"
          class="link-underline py-2"
          @click="closeMenu"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
type MenuItem = {
  name: string;
  href: string;
};

const props = withDefaults(
  defineProps<{
    menuItems: MenuItem[];
    isMenuOpen: boolean;
  }>(),
  { isMenuOpen: false }
);

const { menuItems, isMenuOpen } = toRefs(props);

const emit = defineEmits(["closeMenu"]);

function closeMenu() {
  emit("closeMenu");
}
</script>

<style>
/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Link underline and hover styles */
.link-underline {
  position: relative;
  display: inline-block;
  color: #4b5563; /* Tailwind's gray-600 */
  overflow: hidden;
}

.link-underline::after,
.link-underline.router-link-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: 100%;
  height: 2px;
  background-color: #FFC444; /* Tailwind's gray-600 */
  transition: transform 0.3s ease;
}

.link-underline:hover::after,
.link-underline.router-link-active::after {
  transform: translateX(-50%) scaleX(1);
}

.link-underline:hover,
.link-underline.router-link-active {
  color: black;
}
</style>
