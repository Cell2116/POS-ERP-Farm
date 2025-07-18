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
import { ref, defineProps } from 'vue';
const search = ref('');

defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const filterData = (value, query, item) =>{
  return (
    value != null &&
    query != null &&
    typeof value === 'string' && value.toString().toLocaleLowerCase().indexOf(query) !== -1
  );
};

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
