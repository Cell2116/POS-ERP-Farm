// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice(state){
      return state.items.reduce((total, item)=>{
        const itemPrice = parseFloat(item.price.replace(/\./g, ''));
        return total + itemPrice * item.quantity; 
      }, 0) 
    },

    count(state){
      return state.items.length;
    }
  },
  actions: {
    addToCart(item){
      const existItem = this.items.find(i => i.name === item.name)
      if(existItem){
        existItem.quantity = item.quantity
      }
      else{
        const newItem = {
        ...item,
        id: randomId(), 
      };
        this.items.push(newItem)
      }
    },
    removeFromCart(itemId){
      this.items = this.items.filter(i => i.id !== itemId) 
    },
    changeQuantity(itemId, amount){
      const product = this.items.find(i => i.id === itemId)
      if(product){
        product.quantity += amount
        if(product.quantity <= 0){
          this.removeFromCart(itemName)
        }
      }
    },
    clearCart(){
      this.items = []
    }
  }
})

const randomId = () => {
  return Math.random().toString(36).substr(2, 9)
}
