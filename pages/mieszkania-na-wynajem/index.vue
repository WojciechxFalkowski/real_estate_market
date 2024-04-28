<template>
  <div class="flex justify-center mt-8 md:mt-16">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      Mieszkania na wynajem
    </h1>
  </div>

  <div class="container m-auto mt-8">
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 flex justify-center">
        <ul class="flex gap-8 overflow-x-auto pb-3" v-if="locations">
          <li v-for="(location, index) in locations" :key="index">
            <router-link
              :to="{ query: { location } }"
              class="capitalize"
              :class="{
                'text-orange': location === activeLocation,
                'text-gray-500': location !== activeLocation,
              }"
            >
              {{ location }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <TransitionGroup
      class="grid grid-cols-12 gap-8 mt-8"
      name="list"
      tag="ul"
      key="card-group"
    >
      <FlatCard
        v-for="flat in filteredFlats"
        :title="flat.title"
        :description="flat.description"
        :image="flat.image"
        :url="flat.url"
        :key="flat.id"
        :flatDetails="flat.flatDetails"
        class="col-span-12 md:col-span-6 xl:col-span-4"
      />
    </TransitionGroup>
    <div class="grid grid-cols-12 gap-8 mt-8"></div>
  </div>
  <!-- <pre>{{ data }}</pre> -->
</template>

<script setup lang="ts">
const { fetchFlats, flatsModel } = useFlat();
await fetchFlats();
const ALL = "wszystkie";
const locations = ref([
  ALL,
  ...new Set(flatsModel.value?.map((flat: FlatModel) => flat.location) ?? []),
]);

// const activeLocation = ref<string>(ALL);
const activeLocation = computed(
  () => router.currentRoute.value.query.location ?? ALL
);

const filteredFlats = computed(() => {
  if (activeLocation.value === ALL) {
    return flatsModel.value;
  }

  return flatsModel.value?.filter(
    (flat: FlatModel) => flat.location === activeLocation.value
  );
});

const router = useRouter();
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
