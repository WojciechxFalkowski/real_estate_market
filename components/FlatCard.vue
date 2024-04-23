<template>
  <router-link
    class="flex flex-col bg-white border-collapse shadow dark:bg-gray-800 dark:border-gray-700"
    :to="{ name: 'mieszkania-na-wynajem-id', params: { id: url } }"
  >
    <div
      class="h-64 sm:h-80 md:h-64 2xl:h-80 bg-cover bg-no-repeat bg-center"
      :style="{ 'background-image': `url(${img})` }"
    ></div>

    <div class="py-5 px-3 flex flex-col justify-between flex-grow">
      <div>
        <h5 class="tracking-tight text-gray-500 text-center">
          {{ title }}
        </h5>

        <p class="font-bold mb-0 text-center">
          {{ description }}
        </p>
      </div>

      <div class="flex gap-x-8 justify-center items-center mt-4">
        <div v-for="flatDetail in flatDetails">
          <span>
            <component class="w-6 h-6 m-auto" :is="flatDetail.icon" />
          </span>

          <p class="whitespace-nowrap text-center mt-2 text-sm">
            {{ flatDetail.description }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  description: string;
  img: string;
  url: string;
  flatDetails: ExtendedFlatDetail[];
};

const props = defineProps<Props>();
</script>
