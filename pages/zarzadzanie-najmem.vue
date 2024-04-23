<template>
  <div class="flex justify-center mt-8 md:mt-16">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      Jak Pracujemy?
    </h1>
  </div>

  <div class="flex justify-center mt-2 mb-8 lg:mb-16">
    <p class="text-sm">Poznaj {{ steps.length }} etapów zarządzania najmem</p>
  </div>

  <div class="flex justify-center items-center mt-8 md:mt-16 mb-32">
    <div class="relative" ref="circleContainer">
      <!-- Centralny element -->
      <div
        class="flex flex-col items-center justify-center w-80 h-80 md:w-500 md:h-500 rounded-full shadow-lg text-center border border-orange animated-border"
      >
        <!-- Elementy dookoła -->
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="absolute step opacity-0 transition-all duration-300 ease-in-out"
          :class="{
            '--active': activeStep && activeStep.id === step.id,
            [step.iconActiveClass]: activeStep && activeStep.id === step.id,
          }"
          :style="positionItem(index)"
        >
          <div
            @mouseenter="clearActiveStep(step)"
            @mouseleave="startActiveStepInterval"
            class="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
          >
            <!-- <span class="icon">{{ item.icon }}</span> -->
            <component
              :is="{ ...step.icon }"
              class="w-5 lg:w-10"
              :style="isMobile ? {} : step.desktopIconStyles"
            />
          </div>
        </div>

        <transition name="fade" mode="out-in">
          <div
            v-if="activeStep"
            :key="activeStep.id"
            class="content px-1 md:px-3 lg:px-6"
          >
            <h2
              class="text-sm md:text-xl lg:text-2xl font-semibold mt-4 md:px-3 px-6 mb-3"
            >
              {{ activeStep.title }}
            </h2>
            <p class="text-gray-600 text-xs lg:text-sm mt-1 px-6">
              {{ activeStep.description }}
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const activeStepIndex = ref(0);
const intervalId = ref(null);
const isMobile = ref(false);

onMounted(() => {
  checkMobile();
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

interface DesktopIconStyles {
  width?: string;
  height?: string;
}

// Interfejs dla pojedynczego kroku
interface Step {
  id: number;
  title: string;
  description: string;
  icon: Component;
  iconActiveClass: string;
  desktopIconStyles: DesktopIconStyles;
}

const steps: Step[] = reactive([
  // Dane dla kroków
  {
    id: 1,
    title: "1. Doradztwo w przygotowaniu lokalu do wynajęcia",
    description:
      "Urządzanie mieszkania na wynajem to zupełnie odmienny proces od wyposażania lokum na własne potrzeby. Wiemy na co zwracają uwagę najemcy i w jakie rozwiązania warto zainwestować, dlatego służymy wsparciem już na etapie wyboru nieruchomości pod zakup.",
    icon: Paintroller,
    iconActiveClass: "--stroke-white",
    desktopIconStyles: {},
  },
  {
    id: 2,
    title: "2. Poszukiwanie najemcy",
    description:
      "Na tym etapie angażujemy wszystkie, dostępne środki w celu znalezienia rzetelnego najemcy na możliwie najdłuższy okres najmu.",
    icon: Search,
    iconActiveClass: "--fill-white",
    desktopIconStyles: { width: "50px", height: "50px" },
  },
  {
    id: 3,
    title: "3. Przekazanie lokalu najemcy na podstawie protokołu",
    description:
      "Opracowana przez nas procedura przekazania mieszkania i szczegółowy protokół jest podstawą do długofalowej współpracy z najemcą, dlatego ten etap jest dla nas niezmiernie ważny.",
    icon: SheetPen,
    iconActiveClass: "--stroke-white",
    desktopIconStyles: {},
  },
  {
    id: 4,
    title: "4. Bieżąca obsługa",
    description:
      "Obejmuje pobieranie czynszu, wykonywanie opłat, organizacja napraw, monitorowanie stanu lokalu, organizowanie ubezpieczenia lokalu i pomoc w likwidacji szkód.",
    icon: Home,
    iconActiveClass: "--stroke-white",
    desktopIconStyles: { width: "40px", height: "40px" },
  },
  {
    id: 5,
    title: "5. Rozliczanie mediów",
    description:
      "Nasi właściciele mogą być spokojni o zużycie mediów – najemców rozliczamy nie tylko na koniec najmu, ale co 6 miesięcy od daty rozpoczęcia najmu. Dzięki temu możemy na bieżąco monitorować koszty zużycia i w porozumieniu z najemcą je optymalizować.",
    icon: Calculator,
    iconActiveClass: "--fill-white",
    desktopIconStyles: { width: "40px", height: "40px" },
  },
  {
    id: 6,
    title: "6. Nadzór nad terminowością wpłat",
    description:
      "Na bieżąco monitorujemy wpłaty czynszu, w razie konieczności prowadzimy wstępną windykację – nasze procedury pozwalają na minimalizowanie ryzyka.",
    icon: Clockwise,
    iconActiveClass: "--stroke-white",
    desktopIconStyles: {},
  },
  {
    id: 7,
    title: "7. Zakończenie najmu",
    description:
      "Ostatnim etapem najmu jest odbiór mieszkania, potwierdzony szczegółowym protokołem, z uwzględnionymi ewentualnymi zniszczeniami, brakami w wyposażeniu itp. Na jego podstawie dokonujemy rozliczenia liczników i ostatecznego rozliczenia kaucji.",
    icon: CircleCheck,
    iconActiveClass: "--fill-white",
    desktopIconStyles: { width: "50px", height: "50px" },
  },
  {
    id: 8,
    title: "8. Opieka nad mieszkaniem między najmami",
    description:
      "W okresie chwilowego pustostanu powierzone nam mieszkanie ma na bieżąco regulowane opłaty, pozostajemy w kontakcie ze wspólnotą i dostawcami mediów oraz koordynujemy pokazywanie lokalu potencjalnym najemcom.",
    icon: Eye,
    iconActiveClass: "--stroke-white",
    desktopIconStyles: { width: "50px", height: "50px" },
  },
]);
const activeStep = ref(steps[0]);
const circleContainer = ref(null);

const positionItem = (index: number) => {
  if (!circleContainer.value) {
    return;
  }
  const shift = 2;
  const circle: HTMLElement = circleContainer.value;
  // const itemSize = 48; // Zakładając, że element ma rozmiar 48px
  const radius = circle.offsetWidth / 2; // Promień to połowa szerokości kontenera minus rozmiar elementu

  const angle = ((2 * Math.PI) / steps.length) * (index - shift);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const animationTime = 0.15;
  const delay = animationTime * index; // Opóźnienie zależne od indeksu, np. 0.3s, 0.6s, 0.9s, itd.
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: `transform ${animationTime}s ${delay}s, opacity ${animationTime}s ${delay}s`,
    opacity: 1,
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
    activeStepIndex.value = (activeStepIndex.value + 1) % steps.length;
    activeStep.value = steps[activeStepIndex.value];
  }, 3000);
  intervalId.value = index;
};

const clearActiveStep = (step: Step) => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  activeStep.value = step;
  activeStepIndex.value = steps.findIndex((s) => s.id === step.id);
};
</script>

<style lang="scss">
.step.--stroke-white {
  & div {
    background-color: #ffc444;
    transition: all 0.3s;
  }

  svg rect,
  svg polyline,
  svg path,
  svg circle,
  svg line,
  svg polygon,
  svg ellipse {
    stroke: #fff;
  }
  svg g path,
  svg g circle {
    stroke: white;
  }
}

.step.--fill-white {
  & div {
    background-color: #ffc444;
    transition: all 0.3s;
  }
  svg rect,
  svg polyline,
  svg path,
  svg circle,
  svg line,
  svg polygon,
  svg ellipse {
    fill: #fff;
  }
}

/* Dodajemy klasy CSS dla animacji */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active w <2.1.8 */ {
  opacity: 0;
}
</style>
