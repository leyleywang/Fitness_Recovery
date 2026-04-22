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
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalTrainings }}</div>
          <div class="stat-label">总训练次数</div>
        </div>
      </div>
      <div class="stats-card">
        <div class="stat-icon">⏱️</div>
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
            <span class="menu-icon">⚙️</span>
            <span class="menu-label">设置</span>
          </div>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <span class="menu-icon">🔔</span>
            <span class="menu-label">通知提醒</span>
          </div>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <span class="menu-icon">💾</span>
            <span class="menu-label">数据备份</span>
          </div>
          <span class="menu-arrow">></span>
        </div>
      </div>
    </div>

    <div class="menu-section">
      <h3 class="section-title">关于</h3>
      <div class="menu-list">
        <div class="menu-item">
          <div class="menu-left">
            <span class="menu-icon">ℹ️</span>
            <span class="menu-label">关于我们</span>
          </div>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <span class="menu-icon">📋</span>
            <span class="menu-label">使用帮助</span>
          </div>
          <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
          <div class="menu-left">
            <span class="menu-icon">📝</span>
            <span class="menu-label">隐私政策</span>
          </div>
          <span class="menu-arrow">></span>
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
  font-size: 32px;
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
  font-size: 20px;
}

.menu-label {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
}

.menu-arrow {
  font-size: 16px;
  color: var(--text-light);
  font-weight: 300;
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
