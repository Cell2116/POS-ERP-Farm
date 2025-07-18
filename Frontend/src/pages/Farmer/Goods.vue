<template>
  <v-app>
    <div class="layout">
      <NavDrawer/>
      <div class="main-content">
        <p 
        style="font-size: 4vh; margin-top: 2%; margin-left: 7%; display: flex;  font-weight: bolder;"
        >Product and Inventory Management</p>
        <div class="d-flex justify-center">
          <v-card style="width: 70vw; height: 80vh;">
            <Table :headers="headers" :items="goodsStore.goods" />
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavDrawer from '../../components/NavDrawer.vue';
import Table from '../../components/Table.vue';
import { useGoodsStore } from '../../stores/goodsStore';

const goodsStore = useGoodsStore();

const headers = ref([
  { title: 'Product Name', align: 'end', key: 'productname' },
  { title: 'Category', align: 'end', key: 'category' },
  { title: 'Expiry Date', align: 'start', key: 'expirydate' },
  { title: 'Stock', align: 'end', key: 'stock' },
  { title: 'Price', align: 'end', key: 'price' },
]);

onMounted(()=>{
  goodsStore.fetchGoods();
  console.log("data fetch:",goodsStore.goods);
})


</script>

<style scoped>
.layout {
  display: flex;
  height: 100%; /* Full screen height */
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.39);
}

.main-content{
  flex:1;
  width: 100%;

}
</style>