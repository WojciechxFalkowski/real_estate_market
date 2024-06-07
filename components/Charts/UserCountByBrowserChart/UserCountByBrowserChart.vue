<template>
  <div>
    <canvas ref="chartCanvas" class="chart-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAnalytics } from "@/composables/useAnalytics";

// Rejestracja elementów Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BrowserCount {
  clientName: string;
  count: number;
}

// Dane wykresu
const chartData = ref<BrowserCount[]>([]);

// Opcje wykresu
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const { fetchUserCountByBrowser } = useAnalytics();

// Funkcja do tłumaczenia nazw przeglądarek na język polski
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
    chartInstance = new Chart(chartCanvas.value, {
      type: "bar",
      data: {
        labels: chartData.value.map((item) =>
          translateBrowserName(item.clientName)
        ),
        datasets: [
          {
            label: "Liczba użytkowników według przeglądarek",
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
