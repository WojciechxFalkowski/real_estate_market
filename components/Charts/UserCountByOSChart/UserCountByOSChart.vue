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
  type ChartOptions,
} from "chart.js";
import { useAnalytics } from "@/composables/useAnalytics";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface OSCount {
  osName: string;
  count: number;
}

// Chart data
const chartData = ref<OSCount[]>([]);
const totalUsers = ref(0);

// Chart options
const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "System operacyjny",
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

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

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
    totalUsers.value = chartData.value.reduce(
      (sum, item) => sum + Number(item.count),
      0
    );
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
    chartInstance = new ChartJS(chartCanvas.value, {
      type: "bar",
      data: {
        labels: chartData.value.map((item) => translateOSName(item.osName)),
        datasets: [
          {
            label: `Liczba użytkowników według systemów operacyjnych (${totalUsers.value})`,
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
