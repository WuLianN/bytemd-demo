import { createRouter, createWebHistory } from 'vue-router'

const Editor = () => import('@/views/Editor.vue')

const routes = [
  { path: '/', redirect: '/editor?id=1' },
  { path: '/editor', name: "editor", component: Editor }
]

const router = createRouter({
  history: createWebHistory('/bytemd-demo/'),
  routes,
})

export default router