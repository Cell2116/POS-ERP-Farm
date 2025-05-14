<script setup>
import { useCartStore } from '../stores/orderStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cart = useCartStore();
const { items, count, totalPrice } = storeToRefs(cart);

const router = useRouter();

const editCart = (itemId) => {
  const item = items.value.find(i => i.id === itemId);
  if(item){
    item.inCart = true;
  }
};

// Increase quantity
const increaseQuantity = (itemId) => {
  cart.changeQuantity(itemId, 1);
};
  
  // Decrease quantity (if 0, remove from cart)
const decreaseQuantity = (itemId) => {
  if(cart.items.find(i => i.id === itemId).quantity > 1) {
    cart.changeQuantity(itemId, -1);
  } else {
    const item = items.value.find(i => i.id === itemId);
    item.inCart = false;
    item.quantity = 0;
    if (item.quantity === 0) {
      cart.removeFromCart(itemId);
    }
  }
};

// Confirm selection
const confirmCart = (itemId) => {
  const itemIndex = items.value.findIndex(i => i.id === itemId);
  if (itemIndex !== -1) {
    const item = { ...items.value[itemIndex], inCart: false }; // Mark as no longer being edited
    cart.addToCart(item);
    items.value.splice(itemIndex, 1, item); // Update the items array to trigger reactivity
    console.log(`Added ${item.quantity} of ${item.name} to cart`);
  }
};

const goPay = () =>{
  return router.push('/payment');
};

</script>

<template>
  <div class="cart-wrapper">
    <v-menu offset-y min-width="300">
      <template v-slot:activator="{ props }">
        <v-badge :content="count" color="red" overlap>
          <v-btn
            v-bind="props"
            color="rgb(128, 204, 179)"
            elevation="8"
            class="cart-fab text-white"
          >
            <v-icon start>mdi-cart</v-icon>
            See Your Cart
          </v-btn>
        </v-badge>
      </template>

      <v-card class="pa-2 rounded-xl" elevation="4" width="25em">
        <v-list>
          <v-list-item
            v-for="item in items"
            class="d-flex align-center rounded-lg mb-2"
            :key="item.id"
          >
            <div class="d-flex align-center justify-space-between" style="width: 100%;">
              <v-img
                :src="item.image || 'https://via.placeholder.com/50'"
                alt="product"
                width="50"
                height="50"
                class="rounded"
                cover
              ></v-img>
            
              <v-list-item-content class="ml-4">
                <v-list-item-title class="text-subtitle-2 font-weight-medium">
                  {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  x{{ item.quantity }} • Rp {{ (parseFloat(item.price.replace(/\./g, '')) * item.quantity).toLocaleString() }}
                </v-list-item-subtitle>
              </v-list-item-content>
              
              <div 
                style="position: absolute; right: 0;">
                <v-btn
                v-if="!item.inCart"
                icon="mdi-pencil"
                size="small"
                color="red"
                style="margin-right: 0.4em;"
                @click.stop="editCart(item.id)"
                />

                <div v-else class="quantity-controls">
                  <v-btn icon="mdi-minus" size="30" variant="text" @click.stop="decreaseQuantity(item.id)"></v-btn>
                  <span>{{ item.quantity }}</span>
                  <v-btn icon="mdi-plus" size="30" variant="text" @click.stop="increaseQuantity(item.id)"></v-btn>
                  <v-btn icon="mdi-check-circle" size="30" color="green" variant="text" @click.stop="confirmCart(item.id)"></v-btn>
                </div>
                
                <v-btn
                icon="mdi-delete"
                size="small"
                color="red"
                @click="cart.removeFromCart(item.id)"
                />
              </div>
            </div>
          </v-list-item>
        </v-list>
        <v-divider class="my-2" />
        <div class="text-right pr-3 pb-2 font-weight-bold">
          Total: Rp{{ totalPrice.toLocaleString() }}
          <v-btn
          size="small"
          color="green"
          style="margin-left: 0.5em;"
          @click.stop = goPay();
          >
            Pay          
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>


.cart-fab {
  border-radius: 2rem !important;
  box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.3) !important;
  font-weight: 500;
  font-size: 0.8em;
  text-transform: capitalize;
  padding-right: 1rem !important;
  padding-left: 0.75rem !important;
}
@media (max-width: 600px) {
  .cart-fab {
    font-size: 0.875rem;
    padding-right: 0.75rem !important;
    padding-left: 0.5rem !important;
  }
}
</style>
