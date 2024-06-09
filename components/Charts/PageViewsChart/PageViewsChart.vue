<template>
  <div>
    <div class="flex gap-5">
      <div>
        <label for="groupBy">Grupuj według: </label>
        <select id="groupBy" v-model="groupBy" @change="emitFetchAnalyticsData">
          <option value="day">Dzień</option>
          <option value="month">Miesiąc</option>
        </select>
      </div>

      <label>
        <input
          type="checkbox"
          v-model="unique"
          @change="emitFetchAnalyticsData"
        />
        Unikatowi użytkownicy
      </label>
    </div>

    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  registerables,
  TimeScale,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartConfiguration,
  type ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
  ...registerables,
  TimeScale,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const props = defineProps<{
  analyticsData: AnalyticsEvent[];
  excludedVisitors: string[];
}>();
const emit = defineEmits(["fetchAnalyticsData", "toggleVisitorExclusion"]);

const chart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const groupBy = ref<"day" | "month">("day");
const unique = ref<boolean>(false);

const totalUsers = ref(0);

const chartOptions: ChartOptions<"line"> = {
  scales: {
    x: {
      type: "time",
      time: {
        unit: groupBy.value === "day" ? "day" : "month",
        tooltipFormat: "yyyy-MM-dd",
      },
      title: {
        display: true,
        text: groupBy.value === "day" ? "Dzień" : "Miesiąc",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Liczba wejść",
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.raw}`;
        },
      },
    },
    legend: {
      position: "top",
    },
  },
};

const updateChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chart.value) {
    totalUsers.value = props.analyticsData.reduce(
      (sum, item) => sum + Number(item.count),
      0
    );

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: props.analyticsData.map((item) => item.date),
        datasets: [
          {
            label: `Wejścia na stronę (${totalUsers.value})`,
            data: props.analyticsData.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
            tension: 0.1,
          },
        ],
      },
      options: chartOptions,
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
.chart-container {
  width: 100%;
  height: 200px;
}
</style>
