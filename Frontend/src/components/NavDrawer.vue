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
      <v-list-item
        prepend-icon="mdi-face-man-profile"
        title="Testing User"
        nav
        style="margin-top: 20%;"
      ></v-list-item>

      <v-divider :thickness="8" class="divider"></v-divider>

      <v-list style="flex-grow: 1;">
        <v-list-item v-if="userStore.isCustomer">
          <v-list-item>
            <v-list-item-title>Wallet Balance</v-list-item-title>
            <v-list-item-subtitle>{{ userStore.walletBalance }} Tokens</v-list-item-subtitle>
          </v-list-item>
        </v-list-item>
        <v-list-item prepend-icon="mdi-shopping" to="/marketplace" class="listItem">Marketplace</v-list-item>
        <v-list-item prepend-icon="mdi-cart-variant" to="/payment" class="listItem">Payment</v-list-item>
        <v-list-item prepend-icon="mdi-hoop-house" to="/farmer" class="listItem">Farmers</v-list-item>
        <v-list-item prepend-icon="mdi-view-dashboard" to="/dashboard-farmer" class="listItem">Dashboard</v-list-item>
        <v-list-item prepend-icon="mdi-package" to="/goods" class="listItem">Goods</v-list-item>
      </v-list>

      <!-- Bottom Section (Logout + Collapse Button) -->
      <div class="bottom-section">
        <!-- Logout button (Only when rail is expanded) -->
        <v-btn color="error" @click="logout" v-if="!rail" class="logout-btn">Logout</v-btn>

        <!-- Collapse button -->
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </div>

    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const drawer = ref(true);
const rail = ref(false);
const router = useRouter();

const logout = () =>{
  localStorage.clear('authToken');
  router.push('/login');
};
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
