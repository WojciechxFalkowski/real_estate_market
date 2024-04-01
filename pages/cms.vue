<template>
  <div class="container mx-auto">
    <div class="md:flex mt-4 lg:mt-16">
      <ul
        class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 lg:me-8 mb-4 md:mb-0"
      >
        <li>
          <RouterLink
            :to="{ name: 'cms-mieszkania' }"
            class="group inline-flex items-center px-4 py-3 bg-gray-50 rounded-lg w-full hover:bg-orange dark:hover:bg-orange hover:text-white"
            activeClass="bg-orange text-white dark:bg-orange"
            v-slot="{ isActive }"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400 group-hover:fill-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
              :class="{ 'fill-white': isActive }"
            >
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
              />
            </svg>
            Mieszkania
          </RouterLink>
        </li>

        <li>
          <NuxtLink
            :to="{ name: 'cms-email' }"
            class="group inline-flex items-center px-4 py-3 bg-gray-50 rounded-lg w-full hover:bg-orange dark:hover:bg-orange hover:text-white"
            activeClass="bg-orange text-white dark:bg-orange"
            v-slot="{ isActive }"
          >
            <svg
              class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400 group-hover:fill-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="{ 'fill-white': isActive }"
            >
              <path
                d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"
              />
            </svg>
            Email
          </NuxtLink>
        </li>
      </ul>

      <div
        class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-96"
      >
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "restricted",
});
</script>