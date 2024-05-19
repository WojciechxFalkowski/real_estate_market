<template>
  <Carousel :autoplay="autoplay" :wrap-around="true">
    <Slide v-for="(picture, index) in pictures" :key="index">
      <div class="overflow-hidden relative h-64 sm:h-96 lg:h-600 w-full">
        <div class="absolute inset-0 -translate-y-0">
          <NuxtImg
            :alt="picture.alt"
            :src="picture.src"
            :srcset="picture.srcset"
            :title="picture.alt"
            class="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
            author="wellrent-nieruchomosci.pl"
            :caption="picture.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import type { PictureItem } from "./Carousel";

defineProps({
  pictures: {
    type: Array as PropType<PictureItem[]>,
    default() {
      return [];
    },
  },
  autoplay: {
    type: undefined as unknown as PropType<number | undefined>,
    default: 0,
  },
  noIndicators: {
    type: Boolean,
    default: false,
  },
  noControls: {
    type: Boolean,
    default: false,
  },
  slide: {
    type: Boolean,
    default: false,
  },
  slideInterval: {
    type: Number,
    default: 3000,
  },
  animation: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
@import url("vue3-carousel/dist/carousel.css");
/* styles https://github.com/GambaLabs/vue3-carousel/blob/master/src/components/Pagination.ts */
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: unset;
}

.carousel__prev,
.carousel__next {
  display: none;
  box-sizing: content-box;
  border: unset;
  background-color: rgb(255 255 255 / 0.3);
  color: white;
  border-radius: 50%;
  padding: 5px;

  @media (min-width: 1024px) {
    display: flex;
  }

  &:hover {
    background-color: rgb(255 255 255 / 0.5);
    color: white;
  }
}

/* Pagination all styles */
.carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  // margin: 10px 0 0;
  height: 0;
  margin: 0;
}

.carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
  transform: translateY(-40px);
  margin: 0 2px;
}

.carousel__pagination-button::after {
  display: block;
  content: "";
  width: 12px; /* var(--vc-pgn-width) */
  height: 12px; /* var(--vc-pgn-height) */
  border-radius: 50%;
  /* border-radius: var(--vc-pgn-border-radius); */
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* var(--vc-pgn-background-color) */
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: rgba(255, 255, 255, 1);
  /* background-color: var(--vc-pgn-active-color); */
}
</style>
