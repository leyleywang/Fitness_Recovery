<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">训练日记</h1>
      <p class="page-subtitle">记录您的每一次训练</p>
    </div>

    <div v-if="todayStats.isOverFatigue" class="fatigue-warning">
      <svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <div class="warning-content">
        <h3 class="warning-title">疲劳提醒</h3>
        <p class="warning-text">{{ todayStats.fatigueMessage }}</p>
      </div>
    </div>

    <div class="today-summary" v-if="todayStats.totalMinutes > 0">
      <div class="summary-title">今日训练统计</div>
      <div class="summary-stats">
        <div class="stat-item">
          <div class="stat-value">{{ todayStats.totalMinutes }}</div>
          <div class="stat-label">总时长(分钟)</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ Object.keys(todayStats.muscleGroups).length }}</div>
          <div class="stat-label">训练部位</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ getTotalCount() }}</div>
          <div class="stat-label">训练次数</div>
        </div>
      </div>
    </div>

    <div class="journal-list">
      <template v-if="Object.keys(groupedJournals).length > 0">
        <div
          v-for="(journals, date) in groupedJournals"
          :key="date"
          class="date-group fade-in"
        >
          <div class="date-header">
            <div class="date-info">
              <span class="date-text">{{ date }}</span>
              <span class="date-count">{{ journals.length }}次训练</span>
            </div>
            <div class="date-stats">
              <span class="stat-badge">
                {{ getDateTotalDuration(journals) }}分钟
              </span>
              <span
                v-if="isDateOverFatigue(journals)"
                class="stat-badge stat-badge-warning"
              >
                <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                </svg>
                疲劳
              </span>
            </div>
          </div>

          <div class="journal-items">
            <div
              v-for="journal in journals"
              :key="journal.id"
              class="journal-card"
            >
              <div class="journal-main">
                <div class="journal-muscle">
                  <svg class="muscle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path>
                    <path d="M8 12V8a4 4 0 0 1 8 0v4"></path>
                  </svg>
                  <div class="muscle-info">
                    <span class="muscle-name">{{ journal.muscleGroupName }}</span>
                    <span class="train-time">{{ formatTime(journal.createdAt) }}</span>
                  </div>
                </div>
                <div class="journal-duration">
                  <span class="duration-value">{{ journal.duration }}</span>
                  <span class="duration-unit">分钟</span>
                </div>
              </div>

              <div class="journal-footer">
                <div class="stretch-status">
                  <span
                    class="status-badge"
                    :class="journal.isStretched ? 'status-done' : 'status-pending'"
                  >
                    <svg v-if="journal.isStretched" class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    <svg v-else class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    {{ journal.isStretched ? '已拉伸' : '待拉伸' }}
                  </span>
                </div>
                <div class="stretch-actions">
                  <button
                    v-if="!journal.isStretched"
                    class="stretch-btn"
                    @click="goToStretch(journal)"
                  >
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                    </svg>
                    去拉伸
                  </button>
                  <button
                    v-if="!journal.isStretched"
                    class="stretch-btn stretch-btn-skip"
                    @click="markAsStretched(journal.id)"
                  >
                    跳过
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="empty-journal">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
        <h3 class="empty-title">暂无训练记录</h3>
        <p class="empty-desc">点击右下角"新建日记"开始记录您的训练</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJournalStore } from '../stores/journalStore'
import { muscleGroups, getRelaxMethodsByMuscleGroup } from '../data/relaxMethods'

const router = useRouter()
const journalStore = useJournalStore()

const groupedJournals = computed(() => {
  return journalStore.getJournalsByDate()
})

const todayStats = computed(() => {
  return journalStore.getTodayStats
})

const getTotalCount = () => {
  let count = 0
  for (const data of Object.values(todayStats.value.muscleGroups)) {
    count += data.count
  }
  return count
}

const getMuscleIcon = (muscleGroupId) => {
  const muscle = muscleGroups.find(m => m.id === muscleGroupId)
  return muscle ? muscle.icon : '💪'
}

const formatTime = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const getDateTotalDuration = (journals) => {
  return journals.reduce((sum, j) => sum + j.duration, 0)
}

const isDateOverFatigue = (journals) => {
  const totalMinutes = getDateTotalDuration(journals)
  const muscleGroupsMap = {}
  
  journals.forEach(j => {
    if (!muscleGroupsMap[j.muscleGroup]) {
      muscleGroupsMap[j.muscleGroup] = 0
    }
    muscleGroupsMap[j.muscleGroup]++
  })

  if (totalMinutes > 120) return true
  
  for (const count of Object.values(muscleGroupsMap)) {
    if (count > 2) return true
  }
  
  return false
}

const markAsStretched = (id) => {
  journalStore.markAsStretched(id)
}

const goToStretch = (journal) => {
  const methods = getRelaxMethodsByMuscleGroup(journal.muscleGroup)
  if (methods.length > 0) {
    router.push(`/relax/${methods[0].id}`)
  } else {
    router.push('/home')
  }
}
</script>

<style scoped>
.page-header {
  padding: 20px 16px;
  background-color: var(--bg-primary);
  margin-bottom: 12px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.fatigue-warning {
  display: flex;
  gap: 12px;
  margin: 0 16px 16px;
  padding: 16px;
  background-color: rgba(255, 77, 79, 0.1);
  border-radius: 12px;
  border-left: 4px solid var(--danger-color);
}

.warning-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  stroke: var(--danger-color);
}

.warning-content {
  flex: 1;
}

.warning-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--danger-color);
  margin-bottom: 4px;
}

.warning-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.today-summary {
  background-color: var(--bg-primary);
  margin: 0 16px 16px;
  padding: 20px 16px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.summary-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.journal-list {
  padding: 0 16px;
  padding-bottom: 20px;
}

.date-group {
  margin-bottom: 20px;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.date-count {
  font-size: 13px;
  color: var(--text-secondary);
}

.date-stats {
  display: flex;
  gap: 8px;
}

.stat-badge {
  padding: 4px 10px;
  background-color: rgba(74, 144, 217, 0.1);
  color: var(--primary-color);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.stat-badge-warning {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-color);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-icon {
  width: 12px;
  height: 12px;
  stroke: currentColor;
}

.journal-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.journal-card {
  background-color: var(--bg-primary);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.journal-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.journal-muscle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.muscle-icon {
  width: 36px;
  height: 36px;
  stroke: var(--primary-color);
}

.muscle-info {
  display: flex;
  flex-direction: column;
}

.muscle-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.train-time {
  font-size: 13px;
  color: var(--text-light);
}

.journal-duration {
  text-align: right;
}

.duration-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.duration-unit {
  font-size: 12px;
  color: var(--text-light);
}

.journal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.status-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
}

.status-done {
  background-color: rgba(82, 196, 26, 0.1);
  color: var(--success-color);
}

.status-pending {
  background-color: rgba(250, 173, 20, 0.1);
  color: var(--warning-color);
}

.stretch-actions {
  display: flex;
  gap: 8px;
}

.stretch-btn {
  padding: 8px 14px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
}

.stretch-btn:active {
  background-color: #3a7bc8;
}

.stretch-btn-skip {
  background-color: transparent;
  color: var(--text-light);
}

.stretch-btn-skip:active {
  background-color: var(--bg-secondary);
}

.empty-journal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  width: 72px;
  height: 72px;
  margin-bottom: 20px;
  stroke: var(--text-light);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
}
</style>
