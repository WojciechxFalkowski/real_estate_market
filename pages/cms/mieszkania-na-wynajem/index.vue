<template>
  <PageConfiguration :formConfiguration="flatPageConfiguration" />

  <div class="grid grid-cols-12 gap-4" name="list" tag="ul" key="abcx">
    <PageTitle title="Konfiguracja mieszkań" headingTag="h2" class="col-span-12 mt-16 mb-8" />

    <div class="col-span-12" v-if="!isLoadingFetchFlats">
      <router-link
        :to="{
          name: 'cms-mieszkania-na-wynajem-id',
          params: { id: NEW_FLAT_ROUTE },
        }"
        class="p-4 bg-gray-700 hover:bg-gray-600 text-white flex justify-center items-center rounded"
        aria-label="Dodaj nowe mieszkanie"
      >
        <PlusIcon />
      </router-link>
    </div>

    <div v-if="isLoadingFetchFlats" class="col-span-12 mx-auto mt-16">
      <LoadingIcon />
    </div>

    <slot v-else>
      <FlatCard
        v-for="flat in flatsModel"
        :title="flat.title"
        :description="flat.description"
        :image="flat.image"
        :url="flat.url"
        :key="flat.id"
        :flatDetails="flat.flatDetails"
        :isDetailsVisible="false"
        :routerName="'cms-mieszkania-na-wynajem-id'"
        class="col-span-12 md:col-span-6 xl:col-span-4"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
const { fetchFlats, flatsModel } = useFlat();
import { NEW_FLAT_ROUTE } from "~/components/EditFlatForm/config";
import { PlusIcon, LoadingIcon } from "~/components/icons";
import { flatPageConfiguration } from "./flatConfiguration";

const isLoadingFetchFlats = ref(false);

onMounted(() => {
  isLoadingFetchFlats.value = true;
  fetchFlats({ isClient: true, isAuth: true }).finally(() => {
    isLoadingFetchFlats.value = false;
  });
});
</script>
