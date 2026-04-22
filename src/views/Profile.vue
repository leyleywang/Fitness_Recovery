<template>
  <div class="page-container">
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar">
          <span class="avatar-text">{{ userName.charAt(0) }}</span>
        </div>
        <div class="user-detail">
          <h2 class="user-name">{{ userName }}</h2>
          <p class="user-status">欢迎回来，祝您训练愉快！</p>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stats-card">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
        <div class="stat-content">
          <div class="stat-value">{{ totalTrainings }}</div>
          <div class="stat-label">总训练次数</div>
        </div>
      </div>
      <div class="stats-card">
        <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
        </svg>
        <div class="stat-content">
          <div class="stat-value">{{ totalMinutes }}</div>
          <div class="stat-label">总训练时长(分钟)</div>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <h3 class="section-title">功能设置</h3>
      <div class="menu-list">
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span class="menu-label">设置</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="menu-label">通知提醒</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2h4l2-3h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path>
              <polyline points="12,11 12,17"></polyline>
              <polyline points="9,14 15,14"></polyline>
            </svg>
            <span class="menu-label">数据备份</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <h3 class="section-title">关于</h3>
      <div class="menu-list">
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span class="menu-label">关于我们</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span class="menu-label">使用帮助</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span class="menu-label">隐私政策</span>
          </div>
          <svg class="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <div class="version-section">
      <p class="version-text">版本号: {{ version }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useJournalStore } from '../stores/journalStore'

const journalStore = useJournalStore()

const userName = ref('健身达人')
const version = ref('1.0.0')

const totalTrainings = computed(() => {
  return journalStore.journals.length
})

const totalMinutes = computed(() => {
  return journalStore.journals.reduce((sum, j) => sum + j.duration, 0)
})
</script>

<style scoped>
.profile-header {
  padding: 30px 20px;
  background: linear-gradient(135deg, var(--primary-color), #5fa8e5);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.4);
}

.avatar-text {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.user-detail {
  flex: 1;
}

.user-name {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.user-status {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.stats-section {
  display: flex;
  gap: 12px;
  padding: 16px;
  margin-top: -20px;
  position: relative;
  z-index: 1;
}

.stats-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 32px;
  height: 32px;
  stroke: var(--primary-color);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.menu-section {
  padding: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-list {
  background-color: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: var(--bg-secondary);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  width: 20px;
  height: 20px;
  stroke: var(--text-secondary);
}

.menu-label {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
}

.menu-arrow {
  width: 16px;
  height: 16px;
  stroke: var(--text-light);
}

.version-section {
  text-align: center;
  padding: 30px 20px;
  padding-bottom: 50px;
}

.version-text {
  font-size: 13px;
  color: var(--text-light);
}
</style>
