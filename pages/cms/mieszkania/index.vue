<template>
  <div class="grid grid-cols-12 gap-4" name="list" tag="ul" key="abcx">
    <div class="col-span-12">
      <router-link
        :to="{ name: 'cms-mieszkania-id', params: { id: NEW_FLAT_ROUTE } }"
        class="p-4 bg-gray-700 hover:bg-gray-600 text-white flex justify-center items-center rounded"
        aria-label="Dodaj nowe mieszkanie"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </router-link>
    </div>
    <FlatCard
      v-for="flat in flatsModel"
      :title="flat.title"
      :description="flat.description"
      :image="flat.image"
      :url="flat.url"
      :key="flat.id"
      :flatDetails="flat.flatDetails"
      :isDetailsVisible="false"
      :routerName="'cms-mieszkania-id'"
      class="col-span-12 md:col-span-6 xl:col-span-4"
    />
  </div>
</template>

<script setup lang="ts">
const { fetchFlats, flatsModel } = useFlat();
import { NEW_FLAT_ROUTE } from "~/components/EditFlatForm/config";

onMounted(() => {
  fetchFlats({ isClient: true, isAuth: true });
});

const test = ref("<p>I’m running Tiptap with Vue.js. 🎉</p>");
</script>
