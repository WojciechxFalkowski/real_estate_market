<template>
  <!-- <Carouselv1
    :pictures="pictures"
    class="my-10"
    :slide="true"
    :animation="true"
  /> -->
  <!-- <div class="container m-auto"> -->
  <div v-if="teamMembers.length" class="2xl:container md:mx-auto md:mt-4">
    <HeroCarousel
      :pictures="homeCarouselImages"
      :autoplay="2000"
      @sendIsVisibleCarouselElement="sendIsVisibleCarouselElement"
    />
  </div>

  <div v-if="teamMembers.length" class="container mx-auto mt-4 lg:mt-16">
    <PageTitle :title="pageConfiguration?.title" class="mb-8 lg:mb-16" />

    <AboutUs
      class="mt-8"
      v-for="(teamMember, index) of teamMembers"
      :teamMember="teamMember"
      :key="index"
      :isReversed="index % 2 === 1"
    />
  </div>

  <div class="container m-auto my-16">
    <AnimatedVisibility @sendIsVisibleEvent="sendIsVisibleContactUs">
      <ContactUs />
    </AnimatedVisibility>
  </div>

  <div class="container m-auto">
    <AnimatedVisibility @sendIsVisibleEvent="sendIsVisibleAddressMap">
      <AddressMap />
    </AnimatedVisibility>
  </div>
</template>

<script setup>
const { teamMembers, getTeamMembers } = useTeamMember();
await getTeamMembers();

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();

useHead({
  title: "wellrent-nieruchomosci.pl | Zarządzanie mieszkaniami na wynajem",
  meta: [
    {
      name: "description",
      content: "Pośrednicy w obrocie nieruchomościami",
    },
    {
      property: "og:title",
      content: "wellrent-nieruchomosci.pl | Zarządzanie mieszkaniami na wynajem",
    },
    {
      property: "og:description",
      content: "Pośrednicy w obrocie nieruchomościami",
    },
  ],
});

const { getHomeCarouselImages, carouselCollection } = useHomeCarouselImage();
await getHomeCarouselImages();

const homeCarouselImages = computed(() => {
  return carouselCollection.value.map((homeCarouselImage) => {
    return {
      src: homeCarouselImage.url,
      alt: "",
    };
  });
});

const { sendOnMountedEvent, trackVisibility } = useAnalytics();
onMounted(async () => {
  await sendOnMountedEvent();
});

const sendIsVisibleContactUs = async () => {
  await trackVisibility("contact_us");
};

const sendIsVisibleAddressMap = async () => {
  await trackVisibility("address_map");
};

const sendIsVisibleCarouselElement = (currentSlideIndex) => {
  trackVisibility(`karuzela strona główna zdjęcie ${currentSlideIndex}`);
};
</script>
