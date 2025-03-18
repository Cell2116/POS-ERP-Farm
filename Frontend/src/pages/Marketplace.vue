<template>
  <v-app >
    <div class="layout ">
      <!-- Sidebar -->
      <NavDrawer ref="navDrawerRef" />
      <!-- Main Content -->
      <div :class="{'content-overlay': !isRail, 'content': isRail}" >
        <Banner/>
        <p 
        style="font-size: 1.5rem; margin-top: 1%; margin-left: 3%; display: flex;  font-weight: bolder;"
        >Fruits & Vegetables</p>
        <GoodsCarousel/>
        <p 
        style="font-size: 1.5rem; margin-top: 1%; margin-left: 3%; display: flex;  font-weight: bold;"
        >Meats</p>
        <GoodsCarouselMeat/>
      </div>
    </div>
    <v-fab-transition>
      <div class="cart-container">
        <Cart />
      </div>
    </v-fab-transition>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavDrawer from '../components/NavDrawer.vue';
import Banner from '../components/Banner.vue';
import GoodsCarousel from '../components/GoodsCarousel.vue';
import GoodsCarouselMeat from '../components/GoodsCarouselMeat.vue';
import Cart from '../components/Cart.vue';

const router = useRouter();
const navDrawerRef = ref(null);
const isRail = ref(true); // Sidebar starts in rail mode

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
};

// Listen for sidebar toggle from NavDrawer
onMounted(() => {
  if (navDrawerRef.value) {
    navDrawerRef.value.$watch('rail', (newVal) => {
      isRail.value = newVal;
    });
  }
});
</script>

<style scoped>
/* Responsive layout using flexbox */
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



h1 {
  font-size: clamp(1.5rem, 2vw, 3rem);
}

v-btn {
  font-size: clamp(0.8rem, 1vw, 1.2rem);
}

.cart-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999 !important; /* Force highest z-index */
  pointer-events: auto !important;
}

/* Optional animation for better floating effect */
.v-fab-transition .cart-container {
  transition: all 0.3s ease;
}

/* Responsive positioning */
@media (max-width: 600px) {
  .cart-container {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
