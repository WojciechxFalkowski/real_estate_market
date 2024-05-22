<template>
  <PageTitle
    :title="pageConfiguration?.title"
    :description="pageConfiguration?.description"
    class="mt-8 md:mt-16"
  />

  <div class="flex justify-center items-center mt-8 md:mt-16 mb-32">
    <div class="relative" ref="circleContainer">
      <div
        class="flex flex-col items-center justify-center w-80 h-80 md:w-500 md:h-500 rounded-full shadow-lg text-center border border-orange animated-border"
      >
        <div
          v-for="(step, index) in apiSteps"
          :key="step.id"
          class="absolute step transition-all duration-300 ease-in-out"
          :class="{
            '--active': activeStep && activeStep.id === step.id,
            [step.iconActiveClass]: activeStep && activeStep.id === step.id,
            'opacity-0': activeStep && activeStep.id !== step.id,
            'opacity-1': activeStep && activeStep.id === step.id,
          }"
          :style="positionItem(index)"
        >
          <div
            @mouseenter="clearActiveStep(step)"
            @mouseleave="startActiveStepInterval"
            class="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer"
          >
            <div class="w-5 md:w-8 lg:w-14">
              <div
                v-html="step.icon"
                class="lease-icon-wrapper mx-auto"
                :style="isMobile ? {} : step.desktopIconStyles"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-for="step in apiSteps"
          :key="step.id"
          class="content-wrapper"
          v-show="activeStep && activeStep.id === step.id"
        >
          <transition name="fade" mode="out-in">
            <div
              v-show="activeStep && activeStep.id === step.id"
              class="content px-1 md:px-3 lg:px-6"
            >
              <h2
                class="text-sm md:text-xl lg:text-2xl font-semibold mt-4 md:px-3 px-6 mb-3"
              >
                {{ step.id }}. {{ step.title }}
              </h2>
              <p class="text-gray-600 text-xs lg:text-sm mt-1 px-6">
                {{ step.description }}
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeStepIndex = ref(0);
const intervalId = ref();
const isMobile = ref(false);
const { leaseItems, getAllActiveLease } = useLeaseManager();
await getAllActiveLease({ isAuth: false, isClient: false });

const { getPageConfiguration, pageConfiguration } = usePageConfiguration();
await getPageConfiguration();

useHead({
  title: pageConfiguration.value?.title?.toString() ?? "",
  meta: [
    {
      name: "description",
      content: pageConfiguration.value?.description?.toString() ?? "",
    },
    {
      property: "og:title",
      content: pageConfiguration.value?.title?.toString() ?? "",
    },
    {
      property: "og:description",
      content: pageConfiguration.value?.description?.toString() ?? "",
    }
  ],
});
const {} = useAnalytics();

onMounted(() => {
  checkMobile();
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

interface DesktopIconStyles {
  width: string;
  height: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconActiveClass: string;
  desktopIconStyles: DesktopIconStyles;
}

const apiSteps = computed(() =>
  leaseItems.value.map((leaseItem, index) => {
    return {
      id: index + 1,
      title: leaseItem.title,
      description: leaseItem.description,
      icon: leaseItem.icon,
      iconActiveClass: leaseItem.classIcon,
      desktopIconStyles: {
        width: `${leaseItem.desktopSize}px`,
        height: `${leaseItem.desktopSize}px`,
      },
    };
  })
);

const activeStep = ref(apiSteps.value[0]);
const circleContainer = ref(null);

const positionItem = (index: number) => {
  if (!circleContainer.value) {
    return;
  }
  const shift = 2;
  const circle: HTMLElement = circleContainer.value;
  const radius = circle.offsetWidth / 2;

  const angle = ((2 * Math.PI) / apiSteps.value.length) * (index - shift);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const animationTime = 0.15;
  const delay = animationTime * index;
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: `transform ${animationTime}s ${delay}s, opacity ${animationTime}s ${delay}s`,
    opacity: 1,
  };
};

onMounted(() => {
  setFirstStep();
  startActiveStepInterval();
});

const setFirstStep = () => {
  activeStep.value = apiSteps.value[0];
};

const startActiveStepInterval = () => {
  const index = setInterval(() => {
    activeStepIndex.value = (activeStepIndex.value + 1) % apiSteps.value.length;
    activeStep.value = apiSteps.value[activeStepIndex.value];
  }, 3000);
  intervalId.value = index;
};

const clearActiveStep = (step: Step) => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  activeStep.value = step;
  activeStepIndex.value = apiSteps.value.findIndex((s) => s.id === step.id);
};
</script>

<style lang="scss">
.step.--stroke-white {
  & div {
    background-color: #ffc444;
    transition: "background-color" 0.3s;
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
    transition: "background-color" 0.3s;
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

.step {
  .lease-icon-wrapper svg {
    height: 100%;
    width: 100%;
  }
}

.opacity-0 {
  opacity: 0;
}
.opacity-1 {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
