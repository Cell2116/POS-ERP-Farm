<template>
  <v-container>
    <v-card-title>
      <span class="mr-2">{{ currentTitle }}</span>
      <v-avatar
      color="primary"
      size="24"
      >{{ step }}</v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <!-- window 1 -->
      <v-window-item :value="1">
        <v-card-text>
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              label="Full Name"
            ></v-text-field>

            <v-text-field
              v-model="phone.value.value"
              :counter="13"
              :error-messages="phone.errorMessage.value"
              label="Phone Number"
            ></v-text-field>

            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
            ></v-text-field>

            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              type="password"
              label="Password"
            ></v-text-field>
        </v-card-text>
      </v-window-item>
      
      <!-- window 2 -->
      <v-window-item :value="2">
        <div>
          <v-row align="stretch" class="d-flex justify-center align-center pt-5 pb-5">
            <v-col cols="3" class="mr-6" >
              <v-card 
              @click="selectRole('customer')"
              :class="{ 'selected-card': selectedRole === 'customer'}" 
              class="flex items-center justify-center cardCustomer" 
              style="width: 12rem; height: 9rem;"
              >
              <h4 class="text">I'm a Customer</h4>
              </v-card>
            </v-col>
            <v-col cols="3" class="ml-6">
              <v-card 
              @click="selectRole('farmer')"
              :class="{ 'selected-card': selectedRole === 'farmer'}" 
              class="flex justify-center items-center cardFarmer" 
              style="width: 12rem; height: 9rem;"
              >
                <h4 class="text">I'm a Farmer/Vendor</h4>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <v-alert
          v-if="showAlert"
          density="compact"
          title="Warning"
          type="warning"
          text="Please select a role before continuing."
          class="mt-3"
        ></v-alert>
        <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        label="I Agree with all the terms and conditions"
        type="checkbox"
        value="1"
        ></v-checkbox>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="success" type="submit" @click="submit">
            Register
          </v-btn>
        </v-card-actions>
        </v-window-item>
        
        <!-- window 3 -->
        <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            height="128"
            :src=logo
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">🎉 Congratulations! 🎉</h3>
          <p class="text-caption text-grey">Your registration was successful. Try to login</p>

        </div>
      </v-window-item>
    </v-window>
    
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="step > 1 && step < 3" variant="text" @click="step--">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step < 2" color="green" variant="flat" @click="step++">Next</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import logo from '../assets/logo.png'
import axios from '../models/axios';

const selectedRole = ref(null);
const step = ref(1);
const data = ref({
  name: '',
  phone: '',
  email: '',
  password: '',
  roles: '',
  checkbox: false,
});

const currentTitle= computed(() =>{
  switch(step.value){
    case 1: return 'Step 1: Personal Information'
    case 2: return 'Step 2: Choose Role'
    case 3: return 'Congratulation'
    default: return 'Complete'
  }
})

const { handleSubmit } = useForm({
  validationSchema: {
    name (value) {
      return value?.length >= 2 ? true : 'Name must be at least 2 characters.'
    },
    phone (value) {
      return /^[0-9-]{13,}$/.test(value) ? true : 'Phone number must be at least 12 digits.'
    },
    email (value) {
      return /^[a-z.-.0-9]+@[a-z.-]+\.[a-z]+$/i.test(value) ? true : 'Enter a valid email.'
    },
    password (value){
      return value?.length >= 8 ? true : 'Password must be at least 8 characters long.'
    },
    checkbox (value) {
      return value === '1' ? true : 'You must agreed with terms and conditions'
    },
  },
});

const name = useField('name')
const phone = useField('phone')
const email = useField('email')
const checkbox = useField('checkbox')
const password = useField('password')
const showAlert = ref(false);

const selectRole = (role) =>{
  selectedRole.value = role;
  showAlert.value = false
}

const submit = handleSubmit(values => {
  // alert(JSON.stringify(values, null, 2))
  if(!selectedRole.value){
    showAlert.value = true;
    return; 
  }
  const payload = {
    ...values,
    roles: selectedRole.value,
  }
  try{
    console.log(payload)
    const response = axios.post('/auth/register', payload);
    console.log('Response:', response.data);
    step.value = 3 
  }
  catch (error) {
    console.error('Error Registration:', error);
  }
})

const restartForm = () => {
  selectedRole.value = null;
  step.value = 1 // Reset form to Step 1
}

</script>

<style scoped>

.cardCustomer{
  background-image: url('../assets/customer.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
}
.cardFarmer{
  background-image: url('../assets/farmer.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
}
.text{
  font-size: 18px;
  text-shadow: 1px 2px 1px green;
  color: white;
  position: absolute;
  bottom: 1em;
  text-align: center;
}
.selected-card{
  border: 4px solid rgb(13, 126, 92);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
</style>