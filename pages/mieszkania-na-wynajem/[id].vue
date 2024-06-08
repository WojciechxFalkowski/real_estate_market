<template>
  <div class="2xl:container 2xl:mx-auto md:mt-4">
    <HeroCarousel v-if="flatModel" :pictures="flatModel.images" />
  </div>

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
const metaDescription =
  flatModel.value?.title && flatModel.value?.description
    ? `${flatModel.value?.title} ${flatModel.value?.description}`
    : "Mieszkanie na wynajem";

useHead({
  title: flatModel.value?.title ?? "",
  meta: [
    {
      name: "description",
      content: metaDescription,
    },
    {
      property: "og:title",
      content: metaDescription,
    },
    {
      property: "og:description",
      content: flatModel.value?.description ?? "",
    },
    {
      property: "og:image",
      content: mainImage ? mainImage.src : "",
    },
    {
      property: "og:image:secure_url",
      content: mainImage ? mainImage.src : "",
    },
  ],
});

const { sendOnMountedEvent } = useAnalytics();
onMounted(async () => {
  await sendOnMountedEvent();
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
