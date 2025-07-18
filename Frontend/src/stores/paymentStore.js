import { defineStore } from "pinia";

export const useOrderStore = defineStore('order',{
  state: () =>({
    orders: [],
  }),
  getters: {
  },
  actions: {
    addOrder(order){
      this.orders.push(order);
    },
    clearOrder(){
      this.order = []
    }
  }
});
