<template>
  <router-link
    class="flex flex-col bg-white border-collapse shadow relative"
    :to="{ name: routerName, params: { id: url } }"
  >
    <span
      class="absolute top-2 right-2 md:top-3 md:right-3 text-sm font-medium px-2 py-0.5 rounded"
      :class="statusBadge.classes"
    >
      {{ statusBadge.text }}
    </span>

    <div class="h-64 sm:h-80 md:h-64 2xl:h-80">
      <div
        v-if="image"
        class="h-full w-full bg-cover bg-no-repeat bg-center"
        :style="{ 'background-image': `url(${image.src})` }"
      ></div>
    </div>

    <div class="py-5 px-3 flex flex-col justify-between flex-grow">
      <div>
        <h5 class="tracking-tight text-gray-500 text-center">
          {{ title }}
        </h5>

        <p class="font-bold mb-0 text-center">
          {{ description }}
        </p>
      </div>

      <div
        v-if="isDetailsVisible"
        class="flex gap-x-8 justify-center items-center mt-4"
      >
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
import type { PropType } from "vue";

// type Props = {
//   title: string;
//   description: string;
//   img: string;
//   url: string;
//   flatDetails: ExtendedFlatDetail[];
//   isDetailsVisible: {
//     type: boolean;
//     required: false;
//     default(){
//       return false
//     }
//   };
// };

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: Object as PropType<{
      alt: string;
      src: string;
      srcset: string;
    }>,
  },
  url: {
    type: String,
  },
  flatDetails: {
    type: Object as PropType<ExtendedFlatDetail[]>,
  },
  isDetailsVisible: {
    type: Boolean,
    required: false,
    default() {
      return true;
    },
  },
  status: {
    type: String,
    required: true,
  },
  routerName: {
    type: String,
    required: false,
    default() {
      return "mieszkania-na-wynajem-id";
    },
  },
});

const statusBadge = computed(() => {
  const badge = {
    text: "",
    classes: "",
  };
  if (props.status === "available") {
    badge.text = "Dostępne";
    badge.classes =
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  } else if (props.status === "rented") {
    badge.text = "Wynajęte";
    badge.classes =
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  } else if (props.status === "reserved") {
    badge.text = "Zarezerwowane";
    badge.classes =
      "bg-yellow-100 text-yellow-800  dark:bg-blue-900 dark:text-blue-300";
  }
  return badge;
});
</script>
