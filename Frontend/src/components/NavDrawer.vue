<template>
  <v-app style="max-width: 12%;">
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      app
      class="sidebar"
    >
      <v-list-item style="margin-top: 20%; text-align: center;" nav>
    <!-- Profile Picture -->
    <v-avatar size="64" class="mx-auto mb-2">
      <img src="https://cdn-thumbs.ohmyprints.net/1/4d7a20102bc57f1faea0b4d3b2df9eeb/817x600/thumbnail/fit.jpg" alt="Profile Picture" style="object-fit: cover; width: 100%; height: 100%;">
    </v-avatar>

    <!-- User Name -->
    <v-list-item-title class="text-h6">{{ userStore.userName }}</v-list-item-title>

    <!-- Role -->
    <div
      :class="userStore.isCustomer ? 'role-customer' : 'role-farmer'"
      class="mb-1 mt-4"
    >
      {{ userStore.isCustomer ? 'Customer' : 'Farmer' }}
    </div>

    <!-- Wallet -->
    <v-list-item-subtitle class="wallet-info">
    <v-icon size="20" color="green">mdi-wallet</v-icon>
    Rp. {{ userStore.walletBalance.toLocaleString() }} 
    </v-list-item-subtitle>
  </v-list-item>

      <v-divider :thickness="8" class="divider"></v-divider>

      <v-list style="flex-grow: 1;">
        <v-list-item prepend-icon="mdi-shopping" to="/marketplace" class="listItem">Marketplace</v-list-item>
        <v-list-item prepend-icon="mdi-cart-variant" to="/payment" class="listItem">Payment</v-list-item>
        <v-list-item prepend-icon="mdi-account-tie" to="/farmer" class="listItem">Profile / History</v-list-item>
        <v-list-item prepend-icon="mdi-view-dashboard" to="/dashboard-farmer" class="listItem">Dashboard</v-list-item>
        <v-list-item prepend-icon="mdi-package" to="/goods" class="listItem">Goods</v-list-item>
      </v-list>

      <!-- Bottom Section (Logout + Collapse Button) -->
      <div class="bottom-section">
        <!-- Logout button (Only when rail is expanded) -->
        <v-btn color="error" @click="logout" v-if="!rail" class="logout-btn">Logout</v-btn>

        <!-- Collapse button -->
        <!-- 
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
        -->
      </div>

    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const userStore = useUserStore();
const drawer = ref(true);
const rail = ref(false);
const router = useRouter();

console.log(userStore);

const logout = () =>{
  localStorage.clear('authToken');
  router.push('/login');
  console.log("Data user: ", userStore.fetchUser());
};
onMounted(() => {
  userStore.fetchUser();
  console.log("Data user: ", userStore.fetchUser());
});
</script>

<style scoped>
.listItem {
  font-size: 12px;
}

/* Ensures sidebar elements are properly positioned */
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: rgb(128, 204, 179);
  overflow: hidden;
}

/* Bottom section (Logout + Collapse Button) */
.bottom-section {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

/* Logout button styling */
.logout-btn {
  flex-grow: 1;
  margin-top: 1vh;
  margin-right: 2%;
  height: 4vh;
  width: 2vw;
}

.divider{
  margin-top: 20%;
  color: rgb(5, 167, 5);
}
</style>
