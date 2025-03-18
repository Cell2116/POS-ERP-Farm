import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore ('user',{
  state: ()=>({
    user:null,
    walletBalance: 100,
  }),

  getters:{
    isCustomer: (state) => state.user?.role === 'Customer',
    isFarmer: (state)  => state.user?.role === 'Farmer',
  },
  action: {
    setUser(userData){
      this.user = userData
    },
    setWalletBalance (balance){
      this.walletBalance = balance
    }
  }
})