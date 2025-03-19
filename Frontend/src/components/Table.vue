<template>
  <v-data-table
    :custom-filter="filterData"
    :headers="headers"
    :items="items"
    :search="search"
    item-value="name"
    class="d-flex justify-center items-center"
    style="height: 80vh;"
    fixed-header
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        class="pt-2 pl-2 pr-2 search-bar"
        label="Find Data"
      >
      </v-text-field>
    </template>
    
    <template v-slot:header="{ props: { headers } }">
      <thead>
        <tr>
          <th 
            v-for="header in headers" 
            :key="header.key"
            class="text-center green-header"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref } from 'vue';
const search = ref('');
const headers = ref([
  {
    title: 'Product Name',
    align: 'end',
    key: 'name',
  },
  {
    title: 'Category',
    align: 'end',
    key: 'category',
  },
  {
    title: 'Expiry Date',
    align: 'start',
    key: 'eDate',
  },
  {
    title: 'Stock',
    align: 'end',
    key: 'stock',
  },
  {
    title: 'Price',
    align: 'end',
    key: 'price',
  },
]);

const items = ref([
  {
    name: 'Organic Carrots',
    category: 'Vegetables',
    eDate: '2025-08-12',
    stock: 50,
    price: 'Rp 10.000/kg',
  },
  {
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    eDate: '2025-07-20',
    stock: 30,
    price: 'Rp 15.000/kg',
  },
  {
    name: 'Raw Honey',
    category: 'Honey & Sweeteners',
    eDate: '2026-01-05',
    stock: 25,
    price: 'Rp 50.000/bottle',
  },
  {
    name: 'Brown Rice',
    category: 'Grains',
    eDate: '2026-03-15',
    stock: 40,
    price: 'Rp 30.000/kg',
  },
  {
    name: 'Fresh Spinach',
    category: 'Leafy Greens',
    eDate: '2025-06-30',
    stock: 20,
    price: 'Rp 12.000/bundle',
  },
  {
    name: 'Free-Range Eggs',
    category: 'Dairy & Eggs',
    eDate: '2025-04-10',
    stock: 60,
    price: 'Rp 25.000/dozen',
  },
  {
    name: 'Organic Bananas',
    category: 'Fruits',
    eDate: '2025-05-22',
    stock: 35,
    price: 'Rp 18.000/kg',
  },
  {
    name: 'Fresh Milk',
    category: 'Dairy & Eggs',
    eDate: '2025-04-18',
    stock: 45,
    price: 'Rp 30.000/liter',
  },
  {
    name: 'Peanuts',
    category: 'Nuts & Seeds',
    eDate: '2026-09-10',
    stock: 80,
    price: 'Rp 22.000/kg',
  },
  {
    name: 'Turmeric Powder',
    category: 'Herbs & Spices',
    eDate: '2026-12-01',
    stock: 55,
    price: 'Rp 40.000/pack',
  },
]);

const filterData = (value, query, item)=>{
  return value != null && query != null && typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(query) !== -1;
}

</script>

<style scoped>
.green-header {
  background-color: #4CAF50 !important; /* Green color */
  color: white !important;
}
.search-bar{
  width: 30vw;
  height: 20vh;
}
:deep(.v-data-table__thead) {
  position: sticky !important;
  top: 0;
  z-index: 1;
}
</style>
