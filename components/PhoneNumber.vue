<template>
  <a @click="handleClickPhone" :href="`tel:${phoneNumber}`">{{
    phoneNumber
  }}</a>
</template>

<script setup lang="ts">
const props = defineProps({
  componentPlacement: {
    type: String,
  },
});

const { trackClick } = useAnalytics();

const phoneNumber = ref("+48 506 777 586");

const handleClickPhone = () => {
  trackClick(`telefon`, `number: ${phoneNumber.value} położenie: ${props.componentPlacement}`);
};
</script>
