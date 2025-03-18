<template>
  <v-container fluid class="banner">
    <v-row align="center" justify="center" class="text-container">
      <v-col cols="12" class="text-center">
        <h1 class="title">Welcome to Farm's</h1>
        <p class="subtitle">Enjoy your fresh goods</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.banner {
  height: 15vh; /* Adjust height dynamically */
  background: url('../assets/banner.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-container {
  background: rgba(255, 255, 255, 0.178); /* Dark overlay for readability */
  padding: 2vh;
  border-radius: 10px;
}

.title {
  font-size: clamp(1rem, 5vw, 2rem); /* Responsive text */
  font-weight: bold;
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1rem);
}
</style>
