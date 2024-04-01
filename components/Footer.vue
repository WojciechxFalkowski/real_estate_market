<template>
  <footer>
    <div class="sm:flex sm:items-center sm:justify-between">
      <div class="mb-6 md:mb-0 flex justify-center">
        <WellRentLogo />
      </div>
      <ul
        class="flex flex-wrap items-center mb-6 text-sm sm:mb-0 mt-3 font-medium sm:mt-0 flex flex-wrap mb-6 text-sm sm:mb-0 justify-between"
      >
        <li class="mr-4 md:mr-6 last:mr-0">
          <a href="mailto:michal.krawczycki@outlook.com"
            >michal.krawczycki@outlook.com</a
          >
        </li>
        <li class="mr-4 md:mr-6 last:mr-0">
          <PhoneNumber class="ms-4 py-2" />
        </li>
      </ul>
    </div>
    <hr class="my-6 border-orange sm:mx-auto lg:my-8" />
    <p class="block text-sm text-center">
      © 2024
      <RouterLink class="hover:underline" to="/">
        wellrent-nieruchomosci.pl
      </RouterLink>
      <span class="hidden sm:inline mx-1">|</span>
      <span class="block sm:inline">Wszelkie Prawa Zastrzeżone.</span>
    </p>
  </footer>
</template>

<script setup lang="ts">
// Define your composition functions and reactive variables here
</script>

<style>
/* You can add extra styles here if needed */
</style>
