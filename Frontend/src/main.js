import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons:{
    defaultSet: 'mdi'
  },
})


app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount('#app');
