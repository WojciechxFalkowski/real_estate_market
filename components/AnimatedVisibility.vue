<template>
  <div
    ref="observerRef"
    class="duration-600 transition-all transform"
    :class="{
      'opacity-0 -translate-y-10': !isVisible,
      'opacity-100 translate-y-0': isVisible,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isMobileImediate: {
    type: Boolean as PropType<boolean>,
    default() {
      return false;
    },
  },
});

const observerRef: Ref<HTMLElement | null> = ref(null);
const isVisible: Ref<boolean> = ref(false);

let observer: IntersectionObserver | null = null;
const isMobile = ref(window?.innerWidth < 768);

// Nasłuchiwanie zmian rozmiaru okna, aby dostosować isMobile
watchEffect(() => {
  if (window) {
    isMobile.value = window.innerWidth < 768;
  }
});

onMounted(() => {
  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (isMobile.value) {
          if (props.isMobileImediate) {
            isVisible.value = true;
          } else {
            if (entry.intersectionRatio > 0.5) {
              isVisible.value = true;
            }
          }
        } else {
          if (entry.intersectionRatio > 0.75) {
            isVisible.value = true;
            if (observer && entry.target) {
              observer.unobserve(entry.target);
            }
          }
        }
      });
    },
    { threshold: [0.5, 1] }
  );

  if (observerRef.value) {
    observer.observe(observerRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
