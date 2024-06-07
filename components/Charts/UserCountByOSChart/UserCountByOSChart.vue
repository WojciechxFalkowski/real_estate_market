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

interface OSCount {
  osName: string;
  count: number;
}

// Dane wykresu
const chartData = ref<OSCount[]>([]);

// Opcje wykresu
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const { fetchUserCountByOS } = useAnalytics();

const translateOSName = (osName: string): string => {
  const translations: { [key: string]: string } = {
    Windows: "Windows",
    macOS: "macOS",
    Linux: "Linux",
    Android: "Android",
    iOS: "iOS",
  };
  return translations[osName] || osName;
};

const loadUserCountByOS = async () => {
  try {
    chartData.value = await fetchUserCountByOS();
    renderChart();
  } catch (error) {
    console.error(
      "Błąd podczas pobierania liczby użytkowników według systemów operacyjnych:",
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
        labels: chartData.value.map((item) => translateOSName(item.osName)),
        datasets: [
          {
            label: "Liczba użytkowników według systemów operacyjnych",
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
  loadUserCountByOS();
});
</script>

<style scoped>
.chart-canvas {
  min-height: 200px;
}
</style>
