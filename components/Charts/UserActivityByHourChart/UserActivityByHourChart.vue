<template>
  <div>
    <canvas ref="chartCanvas" class="chart-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useAnalytics } from "@/composables/useAnalytics";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface ActivityByHour {
  hour: number;
  count: number;
}

// Chart data
const chartData = ref<ActivityByHour[]>([]);
const totalUsers = ref(0);

// Chart options
const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "category",
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    y: {
      beginAtZero: true,
    },
  },
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS<"line"> | null = null;

const { fetchUserActivityByHour } = useAnalytics();

const loadUserActivityByHour = async () => {
  try {
    chartData.value = await fetchUserActivityByHour();
    totalUsers.value = chartData.value.reduce(
      (sum, item) => sum + Number(item.count),
      0
    );
    renderChart();
  } catch (error) {
    console.error(
      "Błąd podczas pobierania aktywności użytkowników w ciągu dnia:",
      error
    );
  }
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    const activityData = Array.from({ length: 24 }, (_, hour) => {
      const data = chartData.value.find((item) => item.hour === hour);
      return data ? data.count : 0;
    });

    chartInstance = new ChartJS(chartCanvas.value, {
      type: "line",
      data: {
        datasets: [
          {
            label: `Aktywność użytkowników w ciągu dnia (${totalUsers.value})`,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            data: activityData,
            fill: true,
            tension: 0.1,
            borderWidth: 1, // Make the line thinner
          },
        ],
      },
      options: chartOptions,
    });
  }
};

onMounted(loadUserActivityByHour);
</script>

<style scoped>
.chart-canvas {
  min-height: 200px; /* Adjust the height as needed */
}
</style>
