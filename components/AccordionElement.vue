<template>
  <div
    @click="toggle"
    class="flex gap-5 items-center p-4 cursor-pointer transition-colors duration-200"
  >
    <ArrowIcon
      :class="isOpen ? 'transform rotate-180' : ''"
      class="w-4 h-4 text-gray-800 transition-transform duration-200"
    />

    <h2 class="text-gray-700 font-bold text-sm md:text-md lg:text-lg">
      {{ title }}
    </h2>
  </div>

  <transition name="accordion-content">
    <div
      v-show="isOpen"
      class="ps-12 pe-4 ms-1 rounded-b-lg overflow-hidden text-gray-600"
    >
      <p v-if="content" class="py-2 text-sm pb-4">
        {{ content }}
      </p>

      <div v-if="list" class="py-2">
        <h3 class="text-gray-600 font-bold text-sm">
          {{ listTitle }}
        </h3>

        <ul class="pb-4">
          <li class="ms-4 list-disc text-gray-600" v-for="listElement of list">
            <p class="text-sm">
              {{ listElement }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  content?: string;
  listTitle?: string;
  list?: string[];
}>();

const emit = defineEmits<{
  (event: "isOpenFirstTimeAccordionElement"): void;
}>();
const isOpen = ref(false);
const isOpenFirstTime = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value && !isOpenFirstTime.value) {
    isOpenFirstTime.value = true;
    emit("isOpenFirstTimeAccordionElement");
  }
};
</script>

<style lang="scss">
/* Styles for the transition */
.accordion-content-enter-active,
.accordion-content-leave-active {
  transition: all 0.35s;
}
.accordion-content-enter-from,
.accordion-content-leave-to {
  /* height: 0; */
  /* opacity: 0; */
  max-height: 0;
}
.accordion-content-enter-to {
  /* height: 100%; */
  /* opacity: 1; */
  max-height: 30em;
  @media (min-width: 1024px) {
    max-height: 20em;
  }
}
</style>
