<template>
  <v-app>
    <div class="layout">
      <NavDrawer/>
      <div class="main-content">
        <p 
        style="font-size: 4vh; margin-top: 2%; margin-left: 7%; display: flex;  font-weight: bolder;"
        >Farmers</p>
        <CarouselFarmer/>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavDrawer from '../../components/NavDrawer.vue';
import CarouselFarmer from '../../components/CarouselFarmer.vue';

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