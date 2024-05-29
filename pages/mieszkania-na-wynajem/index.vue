<template>
  <PageTitle :title="pageConfiguration?.title" class="mt-8 md:mt-16 mb-2" />

  <div class="container m-auto">
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 flex justify-center">
        <ul class="flex gap-8 overflow-x-auto pb-3" v-if="locations">
          <li v-for="(location, index) in locations" :key="index">
            <router-link
              :to="{ query: { location } }"
              class="capitalize"
              :class="{
                'text-black': location === activeLocation,
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
  </div>

  <div class="container m-auto mt-32 my-16">
    <Newsletter />
  </div>
</template>

<script setup lang="ts">
const { fetchActiveFlats, flatsModel } = useFlat();
await fetchActiveFlats();

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();

useHead({
  title: pageConfiguration.value?.title?.toString() ?? "",
  meta: [
    {
      name: "description",
      content: "Mieszkania na wynajem",
    },
    {
      property: "og:title",
      content: pageConfiguration.value?.title?.toString() ?? "",
    },
  ],
});

const { sendOnMountedEvent } = useAnalytics();
onMounted(async () => {
  await sendOnMountedEvent();
});

const ALL = "wszystkie";
const locations = computed(() => {
  if (!Array.isArray(flatsModel.value) || flatsModel.value.length < 2) {
    return [];
  }

  return [
    ALL,
    ...new Set(flatsModel.value?.map((flat: FlatModel) => flat.location) ?? []),
  ];
});

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
