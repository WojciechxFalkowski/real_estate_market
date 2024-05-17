<template>
  <AnimatedVisibility :isMobileImediate="true">
    <div class="md:flex md:items-center md:gap-6">
      <img
        v-if="teamMember.image.url"
        :src="teamMember.image.url"
        alt="Profile Image"
        class="w-full md:w-1/3 md:max-w-xs shadow-md"
        :class="{ 'order-1': isReversed }"
      />

      <div class="flex flex-col md:flex-1">
        <h2 class="text-xl font-semibold my-1 lg:my-2 uppercase order-1">
          {{ teamMemberName }}
        </h2>

        <h3 class="text-sm text-gray-500 mb-4 order-1">
          {{ teamMember.specialization }}
        </h3>

        <h4 class="text-sm text-gray-500 uppercase mt-4">
          {{ teamMember.teamName }}
        </h4>

        <p class="text-sm leading-7 order-1">
          {{ teamMember.biography }}
        </p>
      </div>
    </div>
  </AnimatedVisibility>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { TeamMember } from "~/composables/useTeamMember";

const props = defineProps({
  teamMember: {
    type: Object as PropType<TeamMember>,
    default: null,
  },
  isReversed: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const teamMemberName = computed(() => {
  return `${props.teamMember.firstName} ${props.teamMember.lastName}`;
});
</script>
