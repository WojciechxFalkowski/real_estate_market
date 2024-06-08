<template>
  <PageTitle :title="'Analityka'" />

  <PageViewsChart
    v-if="analyticsData"
    :analyticsData="analyticsData"
    :excludedVisitors="excludedVisitors"
    @fetchAnalyticsData="fetchAnalyticsData"
    @toggleVisitorExclusion="toggleVisitorExclusion"
    class="mt-8"
  />

  <UserCountByDeviceChart class="mt-8" />

  <UserCountByOSChart class="mt-8" />

  <UserCountByBrowserChart class="mt-8" />

  <UserActivityByHourChart class="mt-8" />

  <StepsViewsChart class="mt-8" />

  <VisitorExclusionManager
    class="my-8"
    :excludedVisitors="excludedVisitors"
    @removeExcludedVisitor="removeExcludedVisitorPermanently"
    @addExcludedVisitor="addExcludedVisitorPermanently"
  />
</template>

<script setup lang="ts">
const {
  analyticsData,
  fetchAnalyticsData,
  excludedVisitors,
  toggleVisitorExclusion,
  removeExcludedVisitorPermanently,
  addExcludedVisitorPermanently,
} = useAnalytics();
</script>
