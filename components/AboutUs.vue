<template>
  <PageTitle :title="'Kilka słów o nas'" class="mb-8 lg:mb-16" />

  <AnimatedVisibility :isMobileImediate="true">
    <div class="md:flex md:items-center md:space-x-6">
      <!-- Zdjęcie -->
      <img
        v-if="image"
        :src="image"
        alt="Profile Image"
        class="w-full md:w-1/3 md:max-w-xs shadow-md"
      />

      <!-- Imię i nazwisko, tytuł -->
      <div class="md:flex-1">
        <h3 class="text-sm text-gray-500 uppercase mt-4">{{ subline }}</h3>
        <h2 class="text-xl font-semibold my-1 lg:my-2 uppercase">{{ name }}</h2>
        <h4 class="text-sm text-gray-500 mb-4">{{ title }}</h4>

        <!-- Dłuższy opis -->
        <p class="text-sm leading-7" v-html="description" />
      </div>
    </div>
  </AnimatedVisibility>
</template>

<script setup lang="ts">
// const props = defineProps({
//   image: {
//     type: String,
//     default: null,
//   },
//   name: {
//     type: String,
//     default: "John Doe",
//   },
//   title: {
//     type: String,
//     default: "Developer",
//   },
//   description: {
//     type: String,
//     default:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   },
// });
const image = "/images/michal_krawczycki.jpg";
const name = "Michał Krawczycki";
const title = "Pośrednik w obrocie nieruchomościami";
const subline = "Zespół Well Rent";
const description = `Michał Krawczycki, Warszawski Agent nieruchomości oraz doświadczony Zarządca mieszkań na wynajem, związany z renomowaną firmą Better Estates,
 to prawdziwy profesjonalista w swojej dziedzinie. Specjalizuje się w negocjacjach i&nbsp;sprzedaży. 
  Jego bogate doświadczenie obejmuje pracę jako Pośrednik w obrocie nieruchomościami w Better Estates oraz w TEKTON Capital Sp. z o.o. 
   Michał ukończył studia na Uniwersytecie Warszawskim, zdobywając Licencjat na wydziale Zarządzania. 
   Jego główną specjalizacją jest zarządzanie mieszkaniami na wynajem, co potwierdzają liczne referencje zadowolonych klientów.`;
</script>
