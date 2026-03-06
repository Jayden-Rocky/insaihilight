import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/creation/video-generator',
    name: 'VideoGenerator',
    component: () => import('../views/VideoGenerator.vue')
  },
  {
    path: '/scene/general-scene',
    name: 'GeneralScene',
    component: () => import('../views/GeneralScene.vue')
  },
  {
    path: '/scene/tiktok-scene',
    name: 'TikTokScene',
    component: () => import('../views/TikTokScene.vue')
  },
  {
    path: '/scene/ai-original-ad-scene',
    name: 'AiOriginalAdScene',
    component: () => import('../views/AiOriginalAdScene.vue')
  },
  {
    path: '/scene/product-display-ad-scene',
    name: 'ProductDisplayAdScene',
    component: () => import('../views/ProductDisplayAdScene.vue')
  },
  {
    path: '/scene/promotional-video-ad-scene',
    name: 'PromotionalVideoAdScene',
    component: () => import('../views/PromotionalVideoAdScene.vue')
  },
  {
    path: '/cloud/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/cloud/assets',
    name: 'Assets',
    component: () => import('../views/Assets.vue')
  }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
