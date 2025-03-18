<template>
  <v-app>
    <div class="layout ">
      <!-- Sidebar -->
      <NavDrawer ref="navDrawerRef" />
      <!-- Main Content -->
      <div class="main-content">
        <p 
        style="font-size: 4vh; margin-top: 2%; margin-left: 7%; display: flex;  font-weight: bolder;"
        >Payment</p>
        <div class="d-flex justify-center mt-2">
          <PaymentBill/>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavDrawer from '../../components/NavDrawer.vue';
import PaymentBill from '../../components/PaymentBill.vue';

</script>

<style scoped>
.layout {
  display: flex;
  height: 100%; /* Full screen height */
  overflow: hidden;
}

/* Content when sidebar is in rail mode */
.content {
  flex: 1; /* Takes remaining space */
 /* Adjust based on viewport */
  transition: margin 0.3s ease-in-out;
}
.main-content{
  flex:1;
  width: 100%;

}

h1 {
  font-size: clamp(1.5rem, 2vw, 3rem);
}

v-btn {
  font-size: clamp(0.8rem, 1vw, 1.2rem);
}
</style>