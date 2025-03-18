<template>
  <div class="cart-wrapper">
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-badge content="3" color="red">
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
      <v-list>
        <v-list-item>Option 1</v-list-item>
        <v-list-item>Option 2</v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped>


.cart-fab {
  border-radius: 2rem !important; /* Rounded button but not fully circular */
  box-shadow: 0 0.375rem 0.75rem rgba(0,0,0,0.3) !important;
  font-weight: 500;
  font-size: 0.8em;
  text-transform: capitalize;
  padding-right: 1rem !important;
  padding-left: 0.75rem !important;
}

/* Responsive text size */
@media (max-width: 600px) {
  .cart-fab {
    font-size: 0.875rem;
    padding-right: 0.75rem !important;
    padding-left: 0.5rem !important;
  }
}
</style>