<template>
  <div>
    <canvas ref="chartCanvas" class="chart-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAnalytics } from "@/composables/useAnalytics"; // Adjust the import path as needed

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface FaqClick {
  elementDescription: string;
  count: number;
}

// Ref for the chart canvas
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS<"bar"> | null = null;

// Fetch the data
const { fetchFaqClicks } = useAnalytics();
const faqClicksData = ref<FaqClick[]>([]);

// Function to render the chart
const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  if (chartCanvas.value) {
    const labels = faqClicksData.value.map((_, index) => `Q${index + 1}`);
    const data = faqClicksData.value.map((item) => item.count);
    const totalClicks = data.reduce((sum, count) => sum + Number(count), 0);
    const tooltips = faqClicksData.value.map((item, index) => ({
      title: `Q${index + 1}: ${item.elementDescription}`,
      label: `${item.count}`,
    }));

    chartInstance = new ChartJS(chartCanvas.value, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `FAQ (${totalClicks})`,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: data,
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
              title: function (context) {
                return tooltips[context[0].dataIndex].title;
              },
              label: function (context) {
                return tooltips[context.dataIndex].label;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Pytanie",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Liczba kliknięć",
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
};

// Fetch and render the data on component mount
onMounted(async () => {
  faqClicksData.value = await fetchFaqClicks();
  renderChart();
});
</script>

<style scoped>
.chart-canvas {
  height: 200px;
  width: 100%;
}
</style>
