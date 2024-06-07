<template>
  <a
    @click="handleClickInstagram"
    href="https://www.instagram.com/well.rent/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Przekierowanie na profil instagram https://www.instagram.com/well.rent"
  >
    <InstagramIcon />
  </a>
</template>
<script setup lang="ts">
import InstagramIcon from "./icons/InstagramIcon.vue";

const { trackClick } = useAnalytics();

const handleClickInstagram = () => {
  trackClick("instagram", "ikona");
};
</script>
