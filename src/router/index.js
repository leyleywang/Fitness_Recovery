import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Journal from '../views/Journal.vue'
import Profile from '../views/Profile.vue'
import Training from '../views/Training.vue'
import RelaxDetail from '../views/RelaxDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/journal',
    name: 'journal',
    component: Journal,
    meta: { title: '日记' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { title: '我的' }
  },
  {
    path: '/training',
    name: 'training',
    component: Training,
    meta: { title: '新建训练' }
  },
  {
    path: '/relax/:id',
    name: 'relax-detail',
    component: RelaxDetail,
    meta: { title: '放松详情' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '健身康复助手'
  next()
})

export default router
