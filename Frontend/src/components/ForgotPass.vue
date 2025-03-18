<template>
  <v-container>
    <v-card-title>
      <span class="mr-2">{{ currentTitle }}</span>
      <v-avatar color="primary" size="24">{{ step }}</v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <!-- Step 1: Verify User -->
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

          <v-alert
            v-if="showAlert"
            density="compact"
            title="Error"
            type="error"
            text="User not found. Please check your details."
            class="mt-3"
          ></v-alert>
        </v-card-text>
      </v-window-item>
      
      <!-- Step 2: Reset Password -->
      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            v-model="newPassword.value.value"
            :error-messages="newPassword.errorMessage.value"
            type="password"
            label="New Password"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword.value.value"
            :error-messages="confirmPassword.errorMessage.value"
            type="password"
            label="Confirm Password"
          ></v-text-field>
        </v-card-text>
      </v-window-item>

      <!-- Step 3: Success Message -->
      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            height="128"
            :src= logo
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">🎉 Password Reset Successful! 🎉</h3>
          <p class="text-caption text-grey">You can now log in with your new password.</p>
        </div>
      </v-window-item>
    </v-window>
    
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="step > 1" variant="text" @click="step--">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step === 1" color="green" variant="flat" @click="checkUser">Next</v-btn>
      <v-btn v-if="step === 2" color="success" variant="flat" @click="resetPassword">Reset Password</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import logo from '../assets/logo.png'

const step = ref(1);
const showAlert = ref(false);

const currentTitle = computed(() => {
  switch (step.value) {
    case 1: return 'Step 1: Verify Your Identity';
    case 2: return 'Step 2: Reset Password';
    case 3: return 'Success!';
    default: return 'Forgot Password';
  }
});

const { handleSubmit, values } = useForm({
  validationSchema: {
    name(value) {
      return value?.length >= 2 ? true : 'Name must be at least 2 characters.';
    },
    phone(value) {
      return /^[0-9-]{10,}$/.test(value) ? true : 'Phone number must be at least 10 digits.';
    },
    email(value) {
      return /^[a-z.-.0-9]+@[a-z.-]+\.[a-z]+$/i.test(value) ? true : 'Enter a valid email.';
    },
    newPassword(value) {
      return value?.length >= 8 ? true : 'Password must be at least 8 characters long.';
    },
    confirmPassword(value) {
      return value === values.newPassword ? true : 'Passwords do not match.';
    },
  },
});

const name = useField('name');
const phone = useField('phone');
const email = useField('email');
const newPassword = useField('newPassword');
const confirmPassword = useField('confirmPassword');

const checkUser = () => {
  // Simulate checking user in database (always returns true for now)
  const userExists = true;

  if (userExists) {
    step.value = 2;
    showAlert.value = false;
  } else {
    showAlert.value = true;
  }
};

const resetPassword = handleSubmit(() => {
  step.value = 3;
});
</script>
