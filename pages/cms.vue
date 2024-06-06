<template>
  <div class="container mx-auto">
    <div class="md:flex mt-4 lg:mt-16">
      <ul
        class="flex-column space-y space-y-4 text-sm font-medium md:me-4 lg:me-8 mb-4 md:mb-0"
      >
        <li v-for="link in links" :key="link.name">
          <RouterLink
            :to="link.to"
            class="group inline-flex items-center px-4 py-3 bg-gray-50 rounded-lg w-full hover:bg-orange dark:hover:bg-orange hover:text-white"
            activeClass=""
            exact-active-class="bg-orange text-white dark:bg-orange"
            v-slot="{ isActive, isExactActive }"
          >
            <component
              :is="link.icon"
              :isActive="isExactActive"
              class="w-4 h-4 me-2 dark:text-gray-400 group-hover:fill-white fill-gray-500"
              :class="{ 'fill-white': isExactActive }"
            />

            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <div
        class="text-medium dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-96"
      >
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SquaresIcon,
  SettingsIcon,
  Home,
  HomeBoldIcon,
  NewsletterIcon,
  FaqIcon,
  ContactIcon,
  AnalyticsIcon,
} from "~/components/icons";

definePageMeta({
  layout: "restricted",
});

const links = [
  {
    to: { name: "cms" },
    icon: HomeBoldIcon,
    name: "Home",
  },
  {
    to: { name: "cms-zarzadzanie-najmem" },
    icon: FaqIcon,
    name: "Zarządzanie najmem",
  },
  {
    to: { name: "cms-mieszkania-na-wynajem" },
    icon: SquaresIcon,
    name: "Mieszkania",
  },
  {
    to: { name: "cms-email" },
    icon: SettingsIcon,
    name: "Email",
  },
  {
    to: { name: "cms-newsletter" },
    icon: NewsletterIcon,
    name: "Newsletter",
  },
  {
    to: { name: "cms-faq" },
    icon: FaqIcon,
    name: "FAQ",
  },
  {
    to: { name: "cms-kontakt" },
    icon: ContactIcon,
    name: "Kontakt",
  },
  {
    to: { name: "cms-analytics" },
    icon: AnalyticsIcon,
    name: "Analityka",
  },
];
</script>
