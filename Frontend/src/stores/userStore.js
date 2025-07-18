import { defineStore } from "pinia";
import axios from "../models/axios";

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
    role: '',
    walletBalance: 20000,
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    isCustomer: (state) => state.role === 'Customer',
    isFarmer: (state) => state.role === 'Farmer',
  },
  actions: {
    async login(email, password){
      try{
        const response = await axios.post('/auth/login', { email, password });
        if(response.data.message === "success"){
          this.user = response.data.user[0];
          this.userName = this.user.name;
          this.role = this.user.roles;
          this.walletBalance = this.user.balance;
          this.isAuthenticated = true;
        }
      }
      catch(err){
        this.user = null;
        this.isAuthenticated = false;
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('/profile/');
        // Adjust according to your backend response structure
        const user = response.data.rows[0];
        this.userName = user.name;
        this.role = user.roles;
        this.walletBalance = user.balance;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
});