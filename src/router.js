import { createMemoryHistory, createRouter } from 'vue-router'

import Users from './components/Users.vue'
import UserInfo from './components/UserInfo.vue'
import Layoff from './components/Layoff.vue'
import HomePage from './components/HomePage.vue'

const routes = [
  { path: '/users', component: Users },
  { path: '/user/:id', component: UserInfo },
  { path: '/user/edit/:id', component: UserInfo },
  { path: '/', component: HomePage },
  { path: '/layoff', component: Layoff },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router