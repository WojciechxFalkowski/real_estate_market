<template>
  <div>
    <canvas ref="chartCanvas" class="chart-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { useAnalytics, type StepView } from "@/composables/useAnalytics";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement
);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS<"line"> | null = null;
const stepsViewsData = ref<StepView[]>([]);

const { fetchStepsViews } = useAnalytics();

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    const labels = stepsViewsData.value.map((item, index) => index + 1);
    const data = stepsViewsData.value.map((item) => item.views);
    const tooltips = stepsViewsData.value.map(
      (item) => `${item.step}: ${item.views}`
    );
    const totalViews = data.reduce((sum, views) => sum + Number(views), 0);

    chartInstance = new ChartJS(chartCanvas.value, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Zarządzania najmem (${totalViews})`,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
            data: data,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return tooltips[context.dataIndex];
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Numer kroku",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Liczba wyświetleń",
            },
          },
        },
      },
    });
  }
};

onMounted(async () => {
  stepsViewsData.value = await fetchStepsViews();
  renderChart();
});
</script>

<style scoped>
.chart-canvas {
  height: 200px;
  width: 100%;
}
</style>
