<template>
  <div class="tab-bar">
    <div
      v-for="item in tabs"
      :key="item.path"
      class="tab-item"
      :class="{ active: isActive(item.path) }"
      @click="navigateTo(item.path)"
    >
      <span class="tab-icon">{{ item.icon }}</span>
      <span class="tab-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  {
    path: '/home',
    label: '首页',
    icon: '🏠'
  },
  {
    path: '/journal',
    label: '日记',
    icon: '📝'
  },
  {
    path: '/profile',
    label: '我的',
    icon: '👤'
  }
]

const isActive = (path) => {
  return route.path === path || (path === '/home' && route.path === '/')
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  background-color: var(--bg-primary);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
  padding-bottom: var(--safe-area-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-icon {
  font-size: 24px;
  line-height: 1;
  margin-bottom: 4px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.tab-label {
  font-size: 12px;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.tab-item.active .tab-icon {
  opacity: 1;
  transform: scale(1.1);
}

.tab-item.active .tab-label {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
