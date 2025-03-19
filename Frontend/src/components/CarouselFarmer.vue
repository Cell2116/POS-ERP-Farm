<template>
  <v-sheet class="mx-auto" elevation="0" style="max-width: 70vw;">
    <v-slide-group v-model="model" show-arrows>
      <v-container fluid>
        <v-row no-gutters>
          <v-col v-for="(pair, index) in cardPairs" :key="index" cols="auto">
            <div class="column-container">
              <v-card
                v-for="(item, subIndex) in pair"
                :key="subIndex"
                class="ma-1 card-container"
                height="160"
                width="150"
              >
                <v-img
                  :src="item.image"
                  height="100%"
                  cover
                ></v-img>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-group>
  </v-sheet>
</template>


<script setup>
import { ref, computed } from 'vue';
import farmer1 from '../assets/farmer1.webp'
import farmer2 from '../assets/farmer2.webp'

const model = ref(null);


// Sample items
const items = ref([
  {
    image: farmer1,
  },
  {
    image: farmer2,
  },
  {
    image: farmer2,
  },
  {
    image: farmer1,
  },
  {
    image: farmer1,
  },
  {
    image: farmer2,
  },
  {
    image: farmer2,
  },
  {
    image: farmer1,
  },
  {
    image: farmer1,
  },
  {
    image: farmer2,
  },
  {
    image: farmer2,
  },
  {
    image: farmer2,
  },
  {
    image: farmer1,
  },
  {
    image: farmer2,
  },
]);
const cardPairs = computed(() => {
  let pairs = [];
  for (let i = 0; i < items.value.length; i += 2) {
    pairs.push(items.value.slice(i, i + 2));
  }
  return pairs;
});

</script>

<style scoped>
.card-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}
.column-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
