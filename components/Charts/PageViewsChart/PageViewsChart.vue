<template>
  <div>
    <div class="flex gap-5">
      <div>
        <label for="groupBy">Group By: </label>
        <select id="groupBy" v-model="groupBy" @change="emitFetchAnalyticsData">
          <option value="day">Day</option>
          <option value="month">Month</option>
        </select>
      </div>

      <label>
        <input
          type="checkbox"
          v-model="unique"
          @change="emitFetchAnalyticsData"
        />
        Unique Visits
      </label>
    </div>

    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Chart,
  registerables,
  TimeScale,
  type ChartConfiguration,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables, TimeScale);

const props = defineProps<{
  analyticsData: AnalyticsEvent[];
  excludedVisitors: string[];
}>();
const emit = defineEmits(["fetchAnalyticsData", "toggleVisitorExclusion"]);

const chart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const groupBy = ref<"day" | "month">("day");
const unique = ref<boolean>(false);

const updateChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chart.value) {
    const config: ChartConfiguration<"bar"> = {
      type: "bar",
      data: {
        labels: props.analyticsData.map((item) => item.date),
        datasets: [
          {
            label: "Page Views",
            data: props.analyticsData.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: groupBy.value === "day" ? "day" : "month",
              tooltipFormat: "yyyy-MM-dd",
            },
            title: {
              display: true,
              text: groupBy.value === "day" ? "Day" : "Month",
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    chartInstance = new Chart(chart.value, config);
  }
};

const emitFetchAnalyticsData = () => {
  emit("fetchAnalyticsData", groupBy.value, unique.value);
};

const emitToggleVisitorExclusion = (visitorId: string) => {
  emit("toggleVisitorExclusion", visitorId);
};

watch(
  () => props.analyticsData,
  () => {
    updateChart();
  },
  { immediate: true }
);

onMounted(() => {
  emitFetchAnalyticsData();
  updateChart();
});
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
