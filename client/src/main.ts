import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import PrimeVue from 'primevue/config';
import PrimeOne from 'primevue/themes/primeone';
import PrimeVueStyled from 'primevue/styled';
import Aura from 'primevue/themes/primeone/aura';
// import Menubar from 'primevue/menubar';
import App from './App.vue'
import router from './router'
import { auth0 } from './auth0'
import '@/assets/styles.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVueStyled,  {
  theme: {
    base: PrimeOne,
    preset: Aura,
    options: {
      prefix: 'p',
      // darkModeSelector: 'system',
      cssLayer: false
    }
  }
});

// app.use(Menubar)

app.use(auth0)

app.mount('#app')
