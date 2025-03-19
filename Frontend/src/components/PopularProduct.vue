<template>
  <v-card class="fill-height">
    <v-card-title class="title">Popular Products</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-group>
          <v-list-item 
            v-for="(product, index) in sortedProducts" 
            :key="index"
            class="list-item"
          >

            <v-list-item-content>
              <v-list-item-title class="product-name">
                {{ product.name }}
              </v-list-item-title>
            </v-list-item-content>

            <template v-slot:append>
              <span class="sales-count">
                {{ product.sales }} Sold
              </span>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const products = ref([
  { name: "Tomatoes", sales: 120 },
  { name: "Carrots", sales: 80 },
  { name: "Potatoes", sales: 150 },
  { name: "Spinach", sales: 50 },
  { name: "Eggplant", sales: 95 }
]);

const sortedProducts = computed(() => {
  return [...products.value].sort((a, b) => a.sales - b.sales);
});
</script>

<style scoped>
.title {
  font-weight: bold;
  font-family: "Roboto", sans-serif;
}
.product-name {
  font-weight: bold;
  font-size: 1.8vh;
}
.sales-count {
  font-size: 1.6vh;
  font-weight: bold;
  color: gray;
}
.list-item{
  padding: 4px 0;
  min-height: 36px; 
}
</style>
