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

    <div class="mt-8" v-if="flatModel">
      <h1 class="text-lg uppercase text-gray-500">{{ flatModel.title }}</h1>

      <p class="mt-4 font-bold">{{ flatModel.description }}</p>
    </div>

    <div class="grid grid-cols-12 mt-4">
      <div
        class="long-content col-span-12 lg:col-span-12 2xl:col-span-12"
        v-html.safe="flatModel?.tiptapHTML"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
const { fetchFlat, flatModel } = useFlat();
await fetchFlat(id);

const mainImage = flatModel.value?.images ? flatModel.value?.images[0] : null;
useHead({
  title: flatModel.value?.title ?? "",
  meta: [
    {
      property: "og:title",
      content:
        `${flatModel.value?.title} ${flatModel.value?.description}` ?? "",
    },
    {
      property: "og:description",
      content: flatModel.value?.description ?? "",
    },
    {
      property: "robots",
      content: "index, follow",
    },
    {
      property: "og:image",
      content: mainImage ? mainImage.src : "",
    },
    {
      property: "og:image:secure_url",
      content: mainImage ? mainImage.src : "",
    },
    {
      property: "og:url",
      content: route.fullPath,
    },
  ],
});
</script>

<style lang="scss">
.long-content {
  font-size: 14px;
  line-height: 23px;

  ul {
    padding-left: 16px;
    li {
      list-style-type: square;
    }
  }
}
</style>
