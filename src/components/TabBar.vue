<template>
  <div class="tab-bar">
    <div
      v-for="item in tabs"
      :key="item.path"
      class="tab-item"
      :class="{ active: isActive(item.path) }"
      @click="navigateTo(item.path)"
    >
      <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="item.iconName === 'home'" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline v-if="item.iconName === 'home'" points="9,22 9,12 15,12 15,22"></polyline>
        <path v-if="item.iconName === 'journal'" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline v-if="item.iconName === 'journal'" points="14,2 14,8 20,8"></polyline>
        <line v-if="item.iconName === 'journal'" x1="16" y1="13" x2="8" y2="13"></line>
        <line v-if="item.iconName === 'journal'" x1="16" y1="17" x2="8" y2="17"></line>
        <path v-if="item.iconName === 'profile'" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle v-if="item.iconName === 'profile'" cx="12" cy="7" r="4"></circle>
      </svg>
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
    iconName: 'home'
  },
  {
    path: '/journal',
    label: '日记',
    iconName: 'journal'
  },
  {
    path: '/profile',
    label: '我的',
    iconName: 'profile'
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
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  opacity: 0.6;
  transition: all 0.3s ease;
  stroke: var(--text-light);
}

.tab-label {
  font-size: 12px;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.tab-item.active .tab-icon {
  opacity: 1;
  transform: scale(1.1);
  stroke: var(--primary-color);
}

.tab-item.active .tab-label {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
