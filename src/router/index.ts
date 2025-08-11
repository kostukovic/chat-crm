import { createRouter, createWebHistory } from 'vue-router'

// Routen optional – App arbeitet auch ohne explizite Seiten
const routes = [
  { path: '/', name: 'home', component: () => import('../components/MainView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})