<template>
  <HeroCarousel v-if="flatModel" :pictures="flatModel.images" />

  <section class="container mx-auto">
    <FlatHeader
      v-if="flatModel"
      :details="flatModel.flatDetails"
      :price="flatModel.price"
      :currency="flatModel.currency"
      :pricePerMeter="flatModel.pricePerMeter"
      class="mt-5"
    />

    <div class="mt-16" v-if="flatModel">
      <h1 class="text-2xl text-gray-500">{{ flatModel.title }}</h1>

      <p class="text-lg mt-4">{{ flatModel.description }}</p>
    </div>

    <div class="grid grid-cols-12">
      <div class="long-content mt-8 col-span-12 lg:col-span-7 2xl:col-span-6" v-html.safe="flatModel?.tiptapHTML"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
const { fetchFlat, flatModel } = useFlat();
await fetchFlat(id);
</script>
