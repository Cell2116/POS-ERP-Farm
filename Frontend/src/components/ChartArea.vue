<template>
    <Line v-if="data" :data="data" :options="options" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { reactive } from 'vue'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

const data = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [40, 30, 50, 60, 70, 90],
      borderColor: 'rgb(128, 204, 179)',
      backgroundColor: 'rgba(128, 180, 179, 0.2)',
      fill: true,
      tension: 0.4
    }
  ]
})

const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  },
  interaction: {
    intersect: false
  }
})
</script>

<style scoped>
</style>
