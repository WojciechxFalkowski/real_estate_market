<template>
  <div>
    <canvas ref="chartCanvas" class="chart-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAnalytics } from "@/composables/useAnalytics";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface DeviceCount {
  deviceType: string;
  count: number;
}

// Chart data
const chartData = ref<DeviceCount[]>([]);
const totalUsers = ref(0);

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

const { fetchUserCountByDevice } = useAnalytics();

const loadUserCountByDevice = async () => {
  try {
    chartData.value = await fetchUserCountByDevice();
    totalUsers.value = chartData.value.reduce(
      (sum, item) => sum + Number(item.count),
      0
    );
    renderChart();
  } catch (error) {
    console.error(
      "Błąd podczas pobierania liczby użytkowników według urządzeń:",
      error
    );
  }
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    chartInstance = new ChartJS(chartCanvas.value, {
      type: "bar",
      data: {
        labels: chartData.value.map((item) => item.deviceType),
        datasets: [
          {
            label: `Liczba użytkowników według urządzeń (${totalUsers.value})`,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: chartData.value.map((item) => item.count),
          },
        ],
      },
      options: chartOptions,
    });
  }
};

onMounted(() => {
  loadUserCountByDevice();
});
</script>

<style scoped>
.chart-canvas {
  min-height: 200px;
}
</style>
