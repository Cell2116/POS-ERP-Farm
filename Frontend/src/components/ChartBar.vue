<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue';

const chartCanvas = ref(null);

// Custom function to generate random numbers
const generateNumbers = (count, min, max) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
};

// Custom function to generate months
const generateMonths = (count) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.slice(0, count);
};

const labels = generateMonths(7);


onMounted(() => {
  if (chartCanvas.value) {
    const labels = generateMonths(7);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Fully Rounded',
          data: generateNumbers(7, -100, 100),
          borderColor: 'rgba(220, 0, 0, 0.8)',
          backgroundColor: 'rgba(220, 0, 0, 0.4)',
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        },
        {
          label: 'Small Radius',
          data: generateNumbers(7, -100, 100),
          borderColor: 'rgba(3, 111, 0, 0.8)',
          backgroundColor: 'rgba(3, 111, 0, 0.4)',
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },
    };

    // Create the Chart
    new Chart(chartCanvas.value, config);
  }
});

</script>
