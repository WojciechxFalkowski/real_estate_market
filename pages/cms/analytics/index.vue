<template>
  <PageTitle :title="'Analityka'" />

  <PageViewsChart
    v-if="analyticsData"
    :analyticsData="analyticsData"
    :excludedVisitors="excludedVisitors"
    @fetchAnalyticsData="fetchAnalyticsData"
    @toggleVisitorExclusion="toggleVisitorExclusion"
  />

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
