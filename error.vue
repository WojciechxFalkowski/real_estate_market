<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center max-w-2xl p-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Strona, której szukasz, nie została znaleziona
      </h1>

      <p class="text-gray-600 mb-6">
        Strona, której szukasz, nie istnieje. Może została przeniesiona lub
        całkowicie usunięta. Może spróbujesz wrócić na stronę główną i zobaczyć,
        czy znajdziesz to, czego szukasz.
      </p>

      <Button
        :componentType="ComponentType.InternalLink"
        :link="{ path: '/' }"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        WRÓĆ NA STRONĘ GŁÓWNĄ
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme, ComponentType } from "@/components/Button/Button.props";
</script>
