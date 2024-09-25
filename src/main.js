import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrashAlt)

createApp(App)
  .use(store)  
  .use(router) 
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
