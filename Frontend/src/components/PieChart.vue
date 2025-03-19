<template>
  <v-card class="card fill-height">
    <v-card-title class="title">Payment Status</v-card-title>
    <v-card-text class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');

    const data = {
      labels: ['Pending', 'Paid', 'Refunded'],
      datasets: [{
        label: 'Payment Status',
        data: [10, 50, 5], // Example data: 10 pending, 50 paid, 5 refunded
        borderWidth: 1,
        backgroundColor: ['#F1C40F', '#27AE60', '#CB4335'],
      }]
    };

    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Prevent default stretching
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 12
              }
            },
            onHover: handleHover,
            onLeave: handleLeave
          }
        }
      }
    };

    new Chart(ctx, config);
  }
});

function handleHover(evt, item, legend) {
  if (item.index !== undefined) {
    legend.chart.data.datasets[0].backgroundColor = legend.chart.data.datasets[0].backgroundColor.map((color, index) =>
      index === item.index || color.length === 9 ? color : color + '4D'
    );
    legend.chart.update();
  }
}

function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor = legend.chart.data.datasets[0].backgroundColor.map(color =>
    color.length === 9 ? color.slice(0, -2) : color
  );
  legend.chart.update();
}
</script>

<style scoped>
.card {
  text-align: center; /* Limit the card width */
  margin: auto;
}

.title {
  font-weight: bold;
  padding-bottom: 5vh;
}

/* Ensure the chart container has a fixed height */
.chart-container {
  height: 25vh; /* Adjust this to control the chart size */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
