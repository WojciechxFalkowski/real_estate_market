<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="relative" ref="circleContainer">
      <!-- Centralny element -->
      <div
        class="flex flex-col items-center justify-center w-64 h-64 lg:w-500 lg:h-500 rounded-full shadow-lg text-center"
      >
        <!-- Elementy dookoła -->
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="absolute"
          :style="positionItem(index)"
        >
          <div
            @mouseenter="clearActiveStep(step)"
            @mouseleave="startActiveStepInterval"
            class="w-10 h-10 lg:w-20 lg:h-20 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
          >
            <!-- <span class="icon">{{ item.icon }}</span> -->
            <component :is="{ ...step.icon }" class="w-5 lg:w-10" />
          </div>
        </div>
        <div v-if="activeStep" class="px-6">
          <h2 class="text-xl lg:text-2xl font-semibold mt-4 px-6 mb-3">
            {{ activeStep.title }}
          </h2>

          <p class="text-gray-600 text-sm mt-1 px-6">
            {{ activeStep.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import {
  CircleCheck,
  Calculator,
  Clockwise,
  Eye,
  Home,
  Paintroller,
  Search,
  SheetPen,
} from "~/components/icons";

const activeStep = ref(null);
const activeStepIndex = ref(0);
const intervalId = ref(null);
const steps = reactive([
  // Dane dla kroków
  {
    id: 1,
    title: "1. Doradztwo w przygotowaniu lokalu do wynajęcia",
    description:
      "Urządzanie mieszkania na wynajem to zupełnie odmienny proces od wyposażania lokum na własne potrzeby. Wiemy na co zwracają uwagę najemcy i w jakie rozwiązania warto zainwestować, dlatego służymy wsparciem już na etapie wyboru nieruchomości pod zakup.",
    icon: Paintroller,
  },
  {
    id: 2,
    title: "2. Poszukiwanie najemcy",
    description:
      "Na tym etapie angażujemy wszystkie, dostępne środki w celu znalezienia rzetelnego najemcy na możliwie najdłuższy okres najmu.",
    icon: Search,
  },
  {
    id: 3,
    title: "3. Przekazanie lokalu najemcy na podstawie protokołu",
    description:
      "Opracowana przez nas procedura przekazania mieszkania i szczegółowy protokół jest podstawą do długofalowej współpracy z najemcą, dlatego ten etap jest dla nas niezmiernie ważny.",
    icon: SheetPen,
  },
  {
    id: 4,
    title: "4. Bieżąca obsługa",
    description:
      "Obejmuje pobieranie czynszu, wykonywanie opłat, organizacja napraw, monitorowanie stanu lokalu, organizowanie ubezpieczenia lokalu i pomoc w likwidacji szkód.",
    icon: Home,
  },
  {
    id: 5,
    title: "5. Rozliczanie mediów",
    description:
      "Nasi właściciele mogą być spokojni o zużycie mediów – najemców rozliczamy nie tylko na koniec najmu, ale co 6 miesięcy od daty rozpoczęcia najmu. Dzięki temu możemy na bieżąco monitorować koszty zużycia i w porozumieniu z najemcą je optymalizować.",
    icon: Calculator,
  },
  {
    id: 6,
    title: "6. Nadzór nad terminowością wpłat",
    description:
      "Na bieżąco monitorujemy wpłaty czynszu, w razie konieczności prowadzimy wstępną windykację – nasze procedury pozwalają na minimalizowanie ryzyka.",
    icon: Clockwise,
  },
  {
    id: 7,
    title: "7. Zakończenie najmu",
    description:
      "Ostatnim etapem najmu jest odbiór mieszkania, potwierdzony szczegółowym protokołem, z uwzględnionymi ewentualnymi zniszczeniami, brakami w wyposażeniu itp. Na jego podstawie dokonujemy rozliczenia liczników i ostatecznego rozliczenia kaucji.",
    icon: CircleCheck,
  },
  {
    id: 8,
    title: "8. Opieka nad mieszkaniem między najmami",
    description:
      "W okresie chwilowego pustostanu powierzone nam mieszkanie ma na bieżąco regulowane opłaty, pozostajemy w kontakcie ze wspólnotą i dostawcami mediów oraz koordynujemy pokazywanie lokalu potencjalnym najemcom.",
    icon: Eye,
  },
]);

const circleContainer = ref(null);

const positionItem = (index) => {
  if (!circleContainer.value) {
    return;
  }
  const shift = 2;
  // Zaczekaj na montowanie komponentu, aby `circleContainer` był dostępny
  //   console.log(circleContainer.value);
  const circle = circleContainer.value;
  const itemSize = 48; // Zakładając, że element ma rozmiar 48px
  const radius = circle.offsetWidth / 2; // Promień to połowa szerokości kontenera minus rozmiar elementu

  const angle = ((2 * Math.PI) / steps.length) * (index - shift);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: "transform 0.3s",
  };
};

onMounted(() => {
  // steps.forEach((_, index) => positionItem(index));
  setFirstStep();
  startActiveStepInterval();
});

const setFirstStep = () => {
  activeStep.value = steps[0];
};

const startActiveStepInterval = () => {
  const index = setInterval(() => {
    // po kolei wybiera krok
    activeStepIndex.value = (activeStepIndex.value + 1) % steps.length;
    activeStep.value = steps[activeStepIndex.value];
  }, 3000);

  intervalId.value = index;
};

const clearActiveStep = (step) => {
  clearInterval(intervalId.value);
  activeStep.value = step;
  activeStepIndex.value = steps.findIndex((s) => s.id === step.id);
};
</script>

<style scoped>
/* Styl dla ikony, można dostosować */
</style>
