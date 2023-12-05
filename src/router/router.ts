import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Editor = () => import('@/views/Editor.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/editor', name: "editor", component: Editor }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router