<template>
  <PageConfiguration :formConfiguration="homePageConfiguration" />

  <PageTitle title="Konfiguracja zespołu" headingTag="h2" class="mt-16 mb-8" />

  <router-link
    :to="{
      name: TEAM_MEMBER_ROUTE,
      params: { id: NEW_TEAM_MEMBER_ROUTE },
    }"
    class="p-4 bg-gray-700 hover:bg-gray-600 text-white flex justify-center items-center rounded"
    aria-label="Dodaj nowe mieszkanie"
  >
    <PlusIcon />
  </router-link>

  <RouterLink
    v-for="(teamMember, index) of teamMembers"
    :key="index"
    :to="{ name: TEAM_MEMBER_ROUTE, params: { id: teamMember.id } }"
  >
    <AboutUs
      :teamMember="teamMember"
      :isReversed="index % 2 === 1"
      class="block border rounded mt-8 hover:border-orange"
    />
  </RouterLink>
</template>

<script setup lang="ts">
import { homePageConfiguration } from "./cms/homeConfiguration";
import {
  NEW_TEAM_MEMBER_ROUTE,
  TEAM_MEMBER_ROUTE,
} from "./cms/homeConfiguration";

const { teamMembers, getTeamMembers } = useTeamMember();
const isFetchingTeamMembers = ref(false);

onMounted(async () => {
  isFetchingTeamMembers.value = true;
  await getTeamMembers({ isAuth: true, isClient: true });
  isFetchingTeamMembers.value = false;
});
</script>
