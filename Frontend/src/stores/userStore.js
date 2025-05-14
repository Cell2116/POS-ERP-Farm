import { defineStore } from "pinia";
import axios from "../models/axios";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: 'John Doe',
    role: 'Customer',
    walletBalance: 2000000,
  }),

  getters: {
    isCustomer: (state) => state.role === 'Customer',
    isFarmer: (state) => state.role === 'Farmer',
  },
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get('/profile');
        const { userName, role, walletBalance } = response.data;

        this.userName = userName;
        this.role = role;
        this.walletBalance = walletBalance;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
});