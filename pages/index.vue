<template>
  <!-- <Carouselv1
    :pictures="pictures"
    class="my-10"
    :slide="true"
    :animation="true"
  /> -->
  <!-- <div class="container m-auto"> -->
  <HeroCarousel :pictures="pictures" :autoplay="2000" />

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
    <AnimatedVisibility>
      <ContactUs />
    </AnimatedVisibility>
  </div>

  <div class="container m-auto">
    <AnimatedVisibility>
      <AddressMap />
    </AnimatedVisibility>
  </div>
</template>

<script setup>
// import Carousel from "@/components/Carousel.vue";
// import Carousel2 from "@/components/Carousel2.vue";
const pictures = [
  // {
  //   src: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
  //   alt: "Image 1",
  // },
  //   {
  //     src: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
  //     alt: "Image 2",
  //   },
  //   {
  //     src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  //     alt: "Image 3",
  //   },
  // {
  //   srcset:
  //     "https://api.cl.lirene.com/storage/2024/02/28/90x60px/lir130-banner-www-desktop-0286-1.p5cx.jpg 400w,https://api.cl.lirene.com/storage/2024/02/28/580xpx/lir130-banner-www-desktop-0286-1.qdbj.jpg 580w,https://api.cl.lirene.com/storage/2024/02/28/1180xpx/lir130-banner-www-desktop-0286-1.12pe.jpg 1180w,https://api.cl.lirene.com/storage/2024/02/28/1200xpx/lir130-banner-www-desktop-0286-1.sq48.jpg 1200w,https://api.cl.lirene.com/storage/2024/02/28/1920xpx/lir130-banner-www-desktop-0286-1.hu1j.jpg 1920w",
  //   alt: "Image 1",
  // },
  // {
  //   srcset:
  //     "https://flowbite.com/docs/images/carousel/carousel-1.svg 600w, /images/carousel_1.jpeg 1024w",
  //   alt: "Image 1",
  // },
  {
    src: "/images/carousel_1.jpeg",
    srcset: "/images/carousel_1.jpeg 600w,",
    alt: "Image 1",
  },
  {
    src: "/images/carousel_2.jpeg",
    // srcset: "/images/carousel_2.jpeg 600w,",
    alt: "Image 2",
  },
  {
    src: "/images/carousel_3.jpeg",
    // srcset: "/images/carousel_3.jpeg 600w,",
    alt: "Image 3",
  },
  {
    src: "/images/carousel_4.png",
    // srcset: "/images/carousel_3.jpeg 600w,",
    alt: "Image 4",
  },
];

const { teamMembers, getTeamMembers } = useTeamMember();
await getTeamMembers();

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();
</script>
