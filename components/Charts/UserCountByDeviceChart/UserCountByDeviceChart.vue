<template>
  <div v-if="isClient">
    <canvas ref="chartCanvas"></canvas>
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

interface DeviceCount {
  deviceType: string;
  count: number;
}

// Dane wykresu
const chartData = ref<DeviceCount[]>([]);

// Opcje wykresu
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const { fetchUserCountByDevice } = useAnalytics();

const loadUserCountByDevice = async () => {
  try {
    chartData.value = await fetchUserCountByDevice();
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
    chartInstance = new Chart(chartCanvas.value, {
      type: "bar",
      data: {
        labels: chartData.value.map((item) => item.deviceType),
        datasets: [
          {
            label: "Liczba użytkowników według urządzeń",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: chartData.value.map((item) => item.count),
          },
        ],
      },
      options: chartOptions,
    });
  }
};

// Sprawdzanie, czy kod jest uruchamiany po stronie klienta
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
  loadUserCountByDevice();
});
</script>

<style scoped>
/* Opcjonalne style dla wykresu */
</style>
