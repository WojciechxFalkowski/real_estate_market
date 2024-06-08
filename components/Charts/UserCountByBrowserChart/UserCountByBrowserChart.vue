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

interface BrowserCount {
  clientName: string;
  count: number;
}

// Chart data
const chartData = ref<BrowserCount[]>([]);
const totalUsers = ref(0);

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "Przeglądarka",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Liczba użytkowników",
      },
    },
  },
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

const { fetchUserCountByBrowser } = useAnalytics();

// Function to translate browser names to Polish
const translateBrowserName = (clientName: string): string => {
  const translations: { [key: string]: string } = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Safari: "Safari",
    Edge: "Edge",
    IE: "Internet Explorer",
    Opera: "Opera",
    "Mobile Safari": "Safari Mobile",
    "Samsung Internet": "Samsung Internet",
  };
  return translations[clientName] || clientName;
};

const loadUserCountByBrowser = async () => {
  try {
    chartData.value = await fetchUserCountByBrowser();
    totalUsers.value = chartData.value.reduce(
      (sum, item) => sum + Number(item.count),
      0
    );
    renderChart();
  } catch (error) {
    console.error(
      "Błąd podczas pobierania liczby użytkowników według przeglądarek:",
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
        labels: chartData.value.map((item) =>
          translateBrowserName(item.clientName)
        ),
        datasets: [
          {
            label: `Liczba użytkowników według przeglądarek (${totalUsers.value})`,
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
  loadUserCountByBrowser();
});
</script>

<style scoped>
.chart-canvas {
  min-height: 200px;
}
</style>
