import { defineStore } from "pinia";
import axios from "../models/axios"

export const useGoodsStore = defineStore('goods',{
  state: () =>({
    goods: [],
  }),
  actions:{
    async fetchGoods(){
      const response = await axios.get('/good/listgood');
      this.goods = response.data.rows.map(item =>({
        ...item,
        expirydate: item.expirydate ? item.expirydate.split('T')[0] : '' 
      }))
      console.log("Data fetch: ", this.goods);
    },
  },
})