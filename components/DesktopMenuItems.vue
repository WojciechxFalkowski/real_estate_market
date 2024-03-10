<template>
  <div class="hidden lg:flex lg:items-center lg:w-auto w-full">
    <ul class="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
      <li v-for="item in menuItems" :key="item.name">
        <RouterLink :to="item.href" class="link-underline py-2">{{
          item.name
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type MenuItem = {
  name: string;
  href: string;
};

const props = defineProps<{
  menuItems: MenuItem[];
}>();
</script>

<style>
.link-underline {
  position: relative;
  display: inline-block;
  color: #4b5563; /* Tailwind's gray-600 */
  overflow: hidden;
}

.link-underline::after,
.link-active::after {
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

.link-underline:hover {
  color: black;

  &::after {
    transform: translateX(-50%) scaleX(1);
  }
}

/* Ensure the underline is always visible for the active link */
.link-underline.router-link-active {
  color: black;

  &::after {
    transform: translateX(-50%) scaleX(1);
  }
}
</style>
