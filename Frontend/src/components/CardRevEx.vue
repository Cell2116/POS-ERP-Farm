<template>
  <v-card class="fill-height">
    <v-card-title class="title">Income & Expenses</v-card-title>
    <v-card-text class="d-flex justify-center">
      <div v-for="(i, index) in items" :key="index" class="py-10 pb-0">
        <div v-if="i.type === 'Revenue'" class="flex flex-col">
          <p class="subtitle">Revenue</p>
          <div class="flex items-center">
            <span class="rev"> {{ formatNumber(i.value) }} </span>
          </div>
        </div>
        <div v-if="i.type === 'Expenditure'" class="flex flex-col ml-15">
          <p class="subtitle">Expenditure</p>
          <div class="flex items-center">
            <span class="expend">{{ formatNumber(i.value) }} </span>
          </div>
        </div>
      </div>

      <!-- Profit Section -->
      <div class="ml-15 py-10 pb-0">
        <p class="subtitle">Profit</p>
        <div class="flex items-center">
          <span :class="profit >= 0 ? 'profit' : 'loss'"> 
            {{ formatNumber(Math.abs(profit)) }} 
          </span>
          <span 
            class="mdi" 
            :class="profit >= 0 ? 'mdi-chevron-double-up profit' : 'mdi-chevron-double-down loss'"
          ></span>
        </div>
      </div>
    </v-card-text>
    <div class="d-flex justify-end pr-2 pb-2">
      <span class="span">*This shows in Rupiah</span>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample data
const items = ref([
  { type: 'Revenue', value: 1000000 },
  { type: 'Expenditure', value: 1200000 }
]);

// Compute revenue, expenditure, and profit
const revenue = computed(() => items.value.find(i => i.type === 'Revenue')?.value || 0);
const expenditure = computed(() => items.value.find(i => i.type === 'Expenditure')?.value || 0);
const profit = computed(() => revenue.value - expenditure.value);

// Function to format number with dot separators
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<style scoped>
.span{
  font-size: small;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7em;
  opacity: 0.3;
}

.subtitle {
  color: black;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1vh;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  opacity: 0.4;
}
.rev {
  color: black;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
}
.expend {
  color: black;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
}
.profit {
  color: green;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
}
.loss {
  color: red;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  font-size: 2.5vh;
}
.title{
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>
