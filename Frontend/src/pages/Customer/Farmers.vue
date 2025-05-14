<template>
  <v-app>
    <div class="layout">
      <NavDrawer />
      <div class="main-content">
        <v-card class="profile-card" elevation="2">
          <v-btn icon class="edit-button">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-card-title class="profile-header">
            <v-avatar size="100">
              <img src="/src/assets/farmer2.webp" alt="Profile Picture" />
            </v-avatar>
            <div class="profile-info">
              <p class="name">{{ userStore.userName }}</p>
              <p class="role">{{ userStore.role }}</p>
              <p class="token-balance">Balance: {{ userStore.walletBalance }}</p>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="top-up-section">
              <p>10k Rupiah is equal to 10 tokens</p>
              <div class="top-up-options">
                <v-btn 
                  v-for="amount in [10, 20, 50, 100]" 
                  :key="amount" 
                  class="top-up-button" 
                  outlined 
                  @click="selectAmount(amount)">
                  {{ amount }}k
                </v-btn>
              </div>
              <div v-if="selectedAmount" class="payment-popup">
                <p>You selected {{ selectedAmount }}k. Choose payment method:</p>
                <div class="payment-methods">
                  <v-btn class="payment-method" outlined>QRIS</v-btn>
                  <v-btn class="payment-method" outlined>Virtual Account</v-btn>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import NavDrawer from '../../components/NavDrawer.vue';
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
const selectedAmount = ref(null);

function selectAmount(amount) {
  selectedAmount.value = amount;
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100%;
  overflow: hidden;
  background-color: rgba(245, 245, 245, 0.39);
}

.main-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.profile-card {
  width: 600px;
  padding: 40px;
  background-color: #ffffff;
  border: 2px solid #4caf50;
  border-radius: 10px;
  position: relative;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-info {
  margin-top: 20px;
}

.name {
  font-size: 2em;
  font-weight: bold;
  color: #4caf50;
}

.role {
  font-size: 1.5em;
  color: gray;
}

.token-balance {
  font-size: 1.3em;
  margin-top: 10px;
  color: #4caf50;
}

.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.top-up-section {
  margin-top: 20px;
}

.top-up-options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.top-up-button {
  flex: 1;
  color: #4caf50;
  border-color: #4caf50;
}

.payment-popup {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9;
  border: 1px solid #4caf50;
  border-radius: 5px;
}

.payment-methods {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.payment-method {
  flex: 1;
  color: #ffffff;
  background-color: #4caf50;
  border-color: #4caf50;
  border-radius: 20px;
}
</style>