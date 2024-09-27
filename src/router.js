import { createMemoryHistory, createRouter } from 'vue-router'

import Users from './components/Users.vue'
import Layoff from './components/Layoff.vue'
import HomePage from './components/HomePage.vue'

const routes = [
  { path: '/users', component: Users },
  { path: '/', component: HomePage },
  { path: '/layoff', component: Layoff },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router