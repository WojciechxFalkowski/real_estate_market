<template>
  <Tiptap :modelValue="test" />
</template>

<script setup lang="ts">
const test = ref("<p>I’m running Tiptap with Vue.js. 🎉</p>");
</script>
