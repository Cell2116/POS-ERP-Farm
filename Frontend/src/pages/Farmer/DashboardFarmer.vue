<template>
  <v-app>
    <div class="layout">
      <NavDrawer/>
      <div class="main-content">
        <p 
        style="font-size: 4vh; margin-top: 2%; margin-left: 3%; display: flex;  font-weight: bolder;"
        >Hi, Farmers</p>
        <div class="pl-9 pt-6 pr-9">
          <v-row no-gutters align="stretch">
            <v-col cols="5" class="ma-0 pr-2">
              <CardRevEx/>
            </v-col>
            <v-col cols="7" class="ma-0 pr-2">
              <CardInventoryManagement/>
            </v-col>
          </v-row>
          <v-row no-gutters class="ma-0 pt-2" align="stretch">
            <v-col cols="6" class="ma-0 pr-2">
              <v-card class="fill-height">
                <v-card-title class="title">Sales Overview</v-card-title>
                <v-card-text style="height: 30vh;">
                  <ChartArea/>
                </v-card-text>
              </v-card>
            </v-col >

            <v-col cols="3" class="ma-0 pr-2">
              <PopularProduct/>
            </v-col>
            <v-col cols="3" class="ma-0 pr-2">
              <PieChart/>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavDrawer from '../../components/NavDrawer.vue';
import ChartArea from '../../components/ChartArea.vue';
import ChartBar from '../../components/ChartBar.vue';
import CardRevEx from '../../components/CardRevEx.vue';
import CardInventoryManagement from '../../components/CardInventoryManagement.vue';
import PopularProduct from '../../components/PopularProduct.vue';
import PieChart from '../../components/PieChart.vue';

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
.title{
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>