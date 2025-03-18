<template>
  <v-sheet class="mx-auto" elevation="0" style="max-width: 70vw;">
    <v-slide-group v-model="model" show-arrows>
      <v-slide-group-item
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ toggle, selected }"
      >
        <v-card
          class="ma-4 card-container"
          :class="{ 'selected-card': selected }"
          height="160"
          width="150"
          @click="toggle"
        >
          <!-- Image -->
          <v-img
            :src="item.image"
            height="100%"
            cover
          ></v-img>

          <!-- Blurred Background Text Overlay -->
          <div class="text-overlay">
            <h1>{{ item.name }}</h1>
            <h2>{{ item.price }}</h2>
            <div class="stock-section">
              <span>{{ item.stock }}</span>

              <v-btn
              v-if="!item.inCart"
              icon="mdi-cart"
              variant="text"
              @click.stop="addToCart(index)"
              >
              </v-btn>
              <div v-else class="quantity-controls">
                <v-btn icon="mdi-minus" size="30" variant="text" @click.stop="decreaseQuantity(index)"></v-btn>
                <span>{{ item.quantity }}</span>
                <v-btn icon="mdi-plus" size="30" variant="text" @click.stop="increaseQuantity(index)"></v-btn>
                <v-btn icon="mdi-check-circle" size="30" color="green" variant="text" @click.stop="confirmCart(index)"></v-btn>
              </div>  
            </div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';

const model = ref(null);

// Sample items
const items = ref([
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  {
    name: "Ayam",
    price: "Rp 40.000/kg",
    stock: "Sisa 2",
    image: "https://www.themeatman.co.uk/cdn/shop/files/High-Protein-Meats_2048x.jpg?v=1736865103",
    inCart: false,
    quantity: 0
  },
  
]);
const addToCart = (index) => {
  items.value[index].inCart = true;
  items.value[index].quantity = 1;
};

// Increase quantity
const increaseQuantity = (index) => {
  items.value[index].quantity++;
};

// Decrease quantity (if 0, remove from cart)
const decreaseQuantity = (index) => {
  if (items.value[index].quantity > 1) {
    items.value[index].quantity--;
  } else {
    items.value[index].inCart = false;
    items.value[index].quantity = 0;
  }
};

// Confirm selection
const confirmCart = (index) => {
  console.log(`Added ${items.value[index].quantity} of ${items.value[index].name} to cart`);
};
</script>

<style scoped>
.card-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}
.stock-section {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  font-size: 0.8em;
  gap: 1px;
}

/* Blurred bottom overlay */
.text-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px); /* Blur effect */
  color: white;
  padding: 1px;
  text-align: center;
}

/* Responsive typography */
.text-overlay h1 {
  font-size: 0.9rem;
  margin: 0;
}
.text-overlay h2 {
  font-size: 0.7rem;
  margin: 0;
}
.text-overlay h3 {
  font-size: 0.5rem;
  margin: 0;
}
</style>
