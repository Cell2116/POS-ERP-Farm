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
            <Table />
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