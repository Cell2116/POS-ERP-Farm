<template>
  <v-card class="card-container pa-5 pr-9">
    <v-row>
      <v-col class="logo-payment">
        <div class="d-flex flex-col align-center">
          <img :src=logo alt="/marketplace" style="height: 4vw;">
          <p style="font-size: 1em; font-weight: bold;">Farm's Payment</p>
        </div>
      </v-col>

      <v-col class="back-to-marketplace">
        <div class="d-flex align-center justify-end">
          <a href="javascript:void(0)" @click="backToMarketplace()" style="text-decoration: none; font-size: 2vh;"> Return to marketplace.</a>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="left-col ml-7"
      :key="index"
      >
        <p style="color: green; font-size: 2.2vh; font-weight: bold;">Rp {{ (totalPrice + (totalPrice * 12 / 100)).toLocaleString() }}</p>
        <p style="color: black; font-size: 2.2vh; font-weight: bold;">Bill of the Payment</p>
        <p style="margin-top: 1em; font-weight: bold; font-size: 2vh;">
          Fruits, Vegetables & Meats 
          <span style="color: green;">&nbsp;&nbsp;&nbsp;Rp {{ totalPrice.toLocaleString() }} </span>
        </p>
        <p style="margin-top: 0.1em; margin-bottom: 0.1em; font-size: 1.8vh;">
          This is all your goods that contain Fruits, Vegetables, and Meats. The value is only calculate all your stuff.
        </p>

        <v-divider :thickness="2"></v-divider>

        <p style="margin-top: 1.2em; font-weight: bold; font-size: 2vh;">
          Tax & Services 
          <span style="color: green;">&nbsp;&nbsp;&nbsp;Rp {{ (totalPrice * 12 / 100).toLocaleString() }} </span>
        </p>
        <p style="margin-top: 0.2em; margin-bottom: 0.3em; font-size: 1.8vh;">
          Tax and Services is a value that applies to your payment as a solid 
          form of terms and conditions that must be paid. 
          Tax is a payment to the state of
          <span style="color: green;">10%</span>
          and service is a payment for the application of <span style="color: green;">2%</span>.
        </p>
        <v-divider :thickness="2"></v-divider>
        <div style="margin-top: 1.2em;">
          <div style="font-weight: bold; font-size: 2vh; margin-bottom: 0.1em;">
            Courier: <span style="color: green;">{{ picked }}</span>
          </div>
          <input type="radio" id="one" value="SPXExpress" v-model="picked">
          <label for="one" style="margin-left: 0.5em; margin-right: 0.8em; font-size: 1.8vh;">SPX Express</label>
          <input type="radio" id="two" value="Fedex" v-model="picked">
          <label for="two" style="margin-left: 0.5em; margin-right: 0.8em; font-size: 1.8vh">Fed ex</label>
        </div>

        <div style="margin-top: 0.4em;">
          <div style="font-weight: bold; font-size: 2vh; margin-bottom: 0.1em;">
            Address: 
            <input style="font-weight: lighter; font-size: 1.8vh;" type="message" placeholder="Input the address">
          </div>
        </div>
        <v-divider :thickness="2"></v-divider>

          <p style=" margin-top: 2em; font-weight: bold; font-size: 2.2vh">
            Your Balance :
            <span style="color: green;">&nbsp;&nbsp;{{ userStore.walletBalance.toLocaleString() }} </span>
          </p>

          <div class="d-flex justify-center itemsz-center mt-5">
            <v-btn class="btn" @click.stop="showDialog = true">
              <span>
                Proceed Payment
              </span>
            </v-btn>
          </div>
      </v-col>

      <v-col class="right-col">
        <v-card class="card-right pt-2 pl-4 pr-4 pb-3" >
          <p style=" font-weight: bold; font-size: 2vh; font-family: 'Arial';">
            Order Recap
          </p>
          <div class="overflow-y-auto max-h-[200px] pr-2">
          <v-table class="no-border" dense>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="compact-row">
              <!-- Left Column: Name & Subtitle -->
              <td class="text-left">
                <p class="font-semibold leading-tight" style="font-size: 1.9vh; font-family: 'Roboto';">{{ item.name }}</p>
                <p class=" text-gray-500 leading-tight" style="font-size: 1.5vh; font-family: 'Roboto';">{{ item.price }} x {{ item.quantity }}</p>
              </td>

              <!-- Right Column: Total Price -->
              <td class="text-right font-semibold" style="font-size: 1.9vh; font-family: 'Roboto';">
                Rp {{ (parseFloat(item.price.replace(/\./g, '')) * item.quantity).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </v-table>
        </div>
        <p style=" margin-top: 2vh; font-weight: bold; font-size: 1.8vh; font-family: 'Arial';">
          Total: {{ totalPrice.toLocaleString() }}
        </p>
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <!-- Dialog -->
  <v-dialog v-model="showDialog" persistent max-width="400">
    <v-card class="text-center pa-5">
      <p style="font-size: 2vh; font-weight: bold;">Thanks for ordering</p>
      <v-btn color="primary" @click="showDialog = false">Close</v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import logo from '../assets/logo.png'
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/orderStore';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const cart = useCartStore();
const { items, totalPrice } = storeToRefs(cart);
const picked = ref('');
const showDialog = ref(false);
const userStore = useUserStore();
// const balance = ref(329000); // Example balance

const backToMarketplace = () =>{
  return router.push('/marketplace');
};

const Payment = () => {
  if (balance.value >= totalPrice.value + (totalPrice.value * 12 / 100)) {
    showDialog.value = true; // Proceed with payment
  } else {
    alert("Insufficient balance to complete the order."); // Show error
  }
};

</script>

<style scoped>


.no-border tbody tr {
  border-bottom: none !important;
  background-color: rgba(185, 185, 185, 0.856);
}

/* Compact row spacing */
.compact-row td {
  padding: 2px 4px !important; /* Reduces padding */
}

.list{
  background-color: grey;

}
/* Ensures the list is scrollable */
.overflow-y-auto {
  overflow-y: auto;
}
.max-h-\[200px\] {
  max-height: 200px;
}
.card-right{
  background-color: rgba(99, 99, 99, 0.384);
}

.btn{
  width: 90%; 
  height: 3.5vh; 
  font-size: 1.7vh; 
  font-weight: bold; 
  background-color: rgb(1, 68, 1); 
  color: white;
  text-transform: capitalize;
  
}.btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btn:hover span {
  padding-right: 25px;
}

.btn:hover span:after {
  opacity: 1;
  right: 0;
}
.card-container{
  width: 70%;
}

/* Blur and black overlay effect */
.v-overlay__scrim {
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>