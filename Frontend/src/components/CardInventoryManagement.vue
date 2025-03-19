<template>
  <v-card class="fill-height">
    <v-card-title class="title">Inventory Overview</v-card-title>
    <v-card-text class="d-flex justify-between">
      <!-- Available Stock -->
      <div class="info-block">
        <p class="subtitle">Available Stock</p>
        <div class="info-content">
          <span class="stock">{{ formatNumber(availableStock) }}</span>
          <span class="mdi mdi-warehouse stock"></span>
        </div>
      </div>

      <!-- Low-Stock Alerts -->
      <div class="info-block">
        <p class="subtitle">Low-Stock Alerts</p>
        <div class="info-content">
          <span class="low-stock">{{ formatNumber(lowStockAlerts) }}</span>
          <span class="mdi mdi-alert-circle low-stock"></span>
        </div>
      </div>

      <!-- Incoming Shipments -->
      <div class="info-block">
        <p class="subtitle">Incoming Shipments</p>
        <div class="info-content">
          <span class="shipment">{{ formatNumber(incomingShipments) }} Kg</span>
          <span class="mdi mdi-truck-delivery shipment"></span>
        </div>
      </div>

      <!-- Expired Goods (Only visible if there are expired goods) -->
      <div v-if="expiredGoods > 0" class="info-block">
        <p class="subtitle">Expired Goods</p>
        <div class="info-content">
          <span class="expired">{{ formatNumber(expiredGoods) }}</span>
          <span class="mdi mdi-trash-can expired"></span>
        </div>
      </div>
    </v-card-text>

    <div class="d-flex justify-end pr-2 pb-2">
      <span class="note">* Data updated in real-time</span>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

// Sample data (Replace with API data)
const availableStock = ref(5000);  // Total available stock
const lowStockAlerts = ref(3);     // Number of low-stock items
const incomingShipments = ref(120); // Incoming stock in Kg
const expiredGoods = ref(5);        // Expired goods count

// Function to format numbers with dot separators
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>

<style scoped>
.title {
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 7vh;
}

.subtitle {
  color: black;
  font-size: 12px;
  font-weight: bold;
  opacity: 0.5;
}

.info-block {
  text-align: center;
  flex: 1;
}

.info-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stock {
  color: black;
  font-weight: bold;
}

.low-stock {
  color: red;
  font-weight: bold;
}

.shipment {
  color: blue;
  font-weight: bold;
}

.expired {
  color: darkred;
  font-weight: bold;
}

.mdi {
  margin-left: 5px;
  font-size: 1.2rem;
}

.note {
  font-size: small;
  opacity: 0.4;
}
</style>
