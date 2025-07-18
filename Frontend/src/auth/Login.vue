<template>
  <v-container class="container fill-height d-flex align-center justify-center">
    <v-row justify="center">
      <!-- Overlay Container for Logo and Cards -->
      <v-col cols="5" class="position-relative">
        <div class="overlay-container">
          <img v-if="activeCard === 'logo'" :src="logo" alt="" class="overlay-item" style="width: 90%; height: 90%;">

          <v-card
            class="cardHiddenPass pa-4 d-flex flex-column justify-center align-center overlay-item"
            v-if="activeCard === 'forgetPass'"
          >
            <h1>Forgot Password</h1>
            <v-container>
              <v-divider
                :thickness="3"
                class="border-opacity-100"
                color="green"
              ></v-divider>
              <ForgetPass />
            </v-container>
          </v-card>

          <v-card class="cardHiddenSignup pa-4 d-flex flex-column align-center overlay-item"
            v-if="activeCard === 'signUp'"
          >
            <h1>Register</h1>
            <v-container>
              <v-divider
                :thickness="3"
                class="border-opacity-100"
                color="green"
              ></v-divider>
            </v-container>
            <Register/>
          </v-card>
        </div>
      </v-col>

      <!-- Login Card Column -->
      <v-col cols="4" class="d-flex align-center justify-center">
        <v-card class="pa-4 w-100">
          <h1 class="d-flex justify-center pb-10">Login</h1>
          <form @submit.prevent="login">
            <div class="textInput">
              <v-text-field
                v-model="email"
                label="abc@abc.com"
                class="input"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="abc"
                class="input"
              ></v-text-field>
            </div>
            <div class="d-flex flex-column align-center pt-1 pb-3">
              <a
                @click="buttonToggle('forgetPass')"
                rel="noopener noreferrer"
                href="javascript:void(0)"
                style="color: blue; font-size: small; text-decoration: none; padding-bottom: 1em;"
              > Forget password </a>

              <p style="font-size:small; padding-bottom: 1em;">Don't have account?
                <a
                  @click="buttonToggle('signUp')"
                  rel="noopener noreferrer"
                  href="javascript:void(0)"
                  style="text-decoration: none;"
                >Sign up</a>
              </p>

              <v-btn class="buttonLogin" type="login">Login</v-btn>
            </div>
            <div class="social-message">
              <div class="line"></div>
              <p class="message">Login with social accounts</p>
              <div class="line"></div>
            </div>
            <div class="social-icons flex justify-center space-x-4">
              <button aria-label="Log in with Google" class="icon text-gray-700">
                <span class="mdi mdi-google"></span>
              </button>
              <button aria-label="Log in with Twitter" class="icon text-gray-700">
                <span class="mdi mdi-twitter"></span>
              </button>
              <button aria-label="Log in with GitHub" class="icon text-gray-700">
                <span class="mdi mdi-github"></span>
              </button>
            </div>
            <p
              v-if="errorMessage"
              class="d-flex justify-center items-center"
              style="color: red;"
            >{{ errorMessage }}</p>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Register from '../components/Register.vue'
import logo from '../assets/logo.png'
import ForgetPass from '../components/ForgotPass.vue'
import axios from '../models/axios'

const router = useRouter();

const fakeEmail = 'abc@abc.com'
const fakePassword = 'abc'

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const activeCard = ref('logo');

const login = () => {
  // Check for fake email and password
  if (email.value === fakeEmail && password.value === fakePassword) {
    localStorage.setItem('authToken', 'example-token');
    router.push('/marketplace');
    return;
  }

    const payload = {
    email: email.value,
    password: password.value
  };

  // Attempt to login via API
  axios.post('/auth/login', payload)
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        router.push('/marketplace');
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        errorMessage.value = 'Invalid username or password';
      } else if (error.response && error.response.status === 405) {
        errorMessage.value = 'User not found';
      } else {
        errorMessage.value = 'An error occurred. Please try again later.';
      }
    });
};

const buttonToggle = (card) => {
  activeCard.value = card;
};
</script>

<style scoped>
.input {
  opacity: 60%;
}
.textInput {
  margin-left: 8%;
  margin-right: 8%;
}
.social-message {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}
.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgb(8, 37, 88);
}
.social-message .message {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(90, 91, 92);
}
.social-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 2em;
  gap: 2em;
}
.social-icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em; 
  height: 2em; 
  border-radius: 50%;
  background-color: #f0f0f0; 
}
.social-icons .icon .mdi {
  font-size: 24px; 
}
.buttonLogin {
  color: white;
  background-color: rgb(13, 126, 92);
}
.position-relative {
  position: relative;
}
.overlay-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 36em;
}
.overlay-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}
@media (max-width: 1028px) {
  .container {
    width: 100%;
  }
}
</style>
