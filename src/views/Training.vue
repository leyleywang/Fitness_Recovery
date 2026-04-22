<template>
  <div class="training-page">
    <div class="training-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      <h1 class="header-title">新建训练</h1>
      <div class="header-placeholder"></div>
    </div>

    <div v-if="step === 1" class="step-content fade-in">
      <div class="form-section">
        <label class="form-label">选择训练部位</label>
        <div class="muscle-grid">
          <div
            v-for="muscle in muscleGroups"
            :key="muscle.id"
            class="muscle-item"
            :class="{ active: selectedMuscle === muscle.id }"
            @click="selectedMuscle = muscle.id"
          >
            <svg class="muscle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <g v-if="muscle.icon === 'neck'">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M9 14v3a3 3 0 0 1-3 3h-1"></path>
                <path d="M15 14v3a3 3 0 0 0 3 3h1"></path>
              </g>
              <g v-else-if="muscle.icon === 'shoulder'">
                <circle cx="12" cy="6" r="3"></circle>
                <path d="M12 9v4"></path>
                <path d="M8 13h8"></path>
                <path d="M5 17l-1 4"></path>
                <path d="M19 17l1 4"></path>
              </g>
              <g v-else-if="muscle.icon === 'backMuscle'">
                <path d="M4 12l6 3 6-3 6 3v4l-12 6-12-6z"></path>
                <path d="M10 15l2 4 2-4"></path>
              </g>
              <g v-else-if="muscle.icon === 'chest'">
                <path d="M4 12h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path>
                <path d="M8 12V6a4 4 0 0 1 8 0v6"></path>
              </g>
              <g v-else-if="muscle.icon === 'arm'">
                <path d="M6 10h12"></path>
                <path d="M10 10l2 8 2-8"></path>
                <circle cx="18" cy="10" r="2"></circle>
                <circle cx="6" cy="10" r="2"></circle>
              </g>
              <g v-else-if="muscle.icon === 'leg'">
                <path d="M12 4v8"></path>
                <path d="M12 12l-4 8"></path>
                <path d="M12 12l4 8"></path>
                <circle cx="12" cy="4" r="2"></circle>
              </g>
              <g v-else-if="muscle.icon === 'glutes'">
                <ellipse cx="12" cy="12" rx="10" ry="6"></ellipse>
                <path d="M12 6v12"></path>
              </g>
            </svg>
            <span class="muscle-name">{{ muscle.name }}</span>
          </div>
        </div>
      </div>

      <div class="form-section">
        <label class="form-label">选择训练时长</label>
        <div class="duration-options">
          <div
            v-for="duration in durationOptions"
            :key="duration.value"
            class="duration-option"
            :class="{ active: selectedDuration === duration.value }"
            @click="selectedDuration = duration.value"
          >
            <span class="duration-number">{{ duration.value }}</span>
            <span class="duration-unit">分钟</span>
          </div>
        </div>
        <div class="custom-duration">
          <input
            v-model.number="customDuration"
            type="number"
            min="1"
            max="180"
            placeholder="或输入自定义时长"
            class="custom-input"
          />
          <span class="custom-unit">分钟</span>
        </div>
      </div>

      <div class="action-footer">
        <button
          class="btn btn-primary btn-full"
          :disabled="!canStart"
          @click="startTraining"
        >
          开始训练
        </button>
      </div>
    </div>

    <div v-if="step === 2" class="timer-section fade-in">
      <div class="timer-display">
        <div class="timer-circle">
          <div class="timer-progress" :style="progressStyle"></div>
          <div class="timer-content">
            <div class="timer-time">{{ formattedTime }}</div>
            <div class="timer-label">{{ currentMuscleName }}</div>
          </div>
        </div>
      </div>

      <div class="timer-controls">
        <button class="control-btn control-btn-secondary" @click="pauseTraining">
          {{ isPaused ? '继续' : '暂停' }}
        </button>
        <button class="control-btn control-btn-danger" @click="showEndConfirm">
          结束训练
        </button>
      </div>

      <div class="timer-tips">
        <p>
          <svg class="tip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          时间到后会自动提醒结束训练
        </p>
      </div>
    </div>

    <div v-if="step === 3" class="result-section fade-in">
      <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
      <h2 class="result-title">训练完成！</h2>
      <p class="result-desc">
        您已完成 <span class="result-highlight">{{ selectedDuration || customDuration }}分钟</span> 的
        <span class="result-highlight">{{ currentMuscleName }}</span> 训练
      </p>

      <div class="recommend-section">
        <h3 class="recommend-title">推荐拉伸放松课程</h3>
        <div class="recommend-list">
          <div
            v-for="method in recommendedMethods"
            :key="method.id"
            class="recommend-card"
            @click="goToRelaxDetail(method.id)"
          >
            <div class="recommend-img">
              <img :src="method.image" :alt="method.title" />
            </div>
            <div class="recommend-info">
              <h4 class="recommend-name">{{ method.title }}</h4>
              <div class="recommend-meta">
                <span class="meta-tag">{{ method.categoryName }}</span>
                <span class="meta-time">
                  <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  {{ method.duration }}分钟
                </span>
              </div>
            </div>
            <div class="recommend-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <button class="btn btn-outline btn-full" @click="resetAndBack">
          返回首页
        </button>
      </div>
    </div>

    <div v-if="showEndModal" class="modal-overlay" @click="showEndModal = false">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">确认结束训练？</h3>
        <p class="modal-desc">结束后将记录本次训练并推荐拉伸放松课程</p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="showEndModal = false">
            取消
          </button>
          <button class="btn btn-primary" @click="endTraining">
            确认结束
          </button>
        </div>
      </div>
    </div>

    <div v-if="showTimeUpModal" class="modal-overlay" @click="showTimeUpModal = false">
      <div class="modal-content" @click.stop>
        <svg class="timeup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
          <path d="M16.5 3.5l2-2"></path>
          <path d="M7.5 3.5l-2-2"></path>
        </svg>
        <h3 class="modal-title">训练时间到！</h3>
        <p class="modal-desc">是否结束本次训练？</p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="addMoreTime">
            加时10分钟
          </button>
          <button class="btn btn-primary" @click="endTraining">
            结束训练
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { muscleGroups } from '../data/relaxMethods'
import { useJournalStore } from '../stores/journalStore'

const router = useRouter()
const journalStore = useJournalStore()

const step = ref(1)
const selectedMuscle = ref(null)
const selectedDuration = ref(null)
const customDuration = ref(null)
const isPaused = ref(false)
const showEndModal = ref(false)
const showTimeUpModal = ref(false)
const remainingTime = ref(0)
const totalTime = ref(0)
let timerInterval = null

const durationOptions = [
  { label: '15分钟', value: 15 },
  { label: '30分钟', value: 30 },
  { label: '45分钟', value: 45 },
  { label: '60分钟', value: 60 }
]

const canStart = computed(() => {
  return selectedMuscle.value && (selectedDuration.value || customDuration.value)
})

const currentMuscleName = computed(() => {
  const muscle = muscleGroups.find(m => m.id === selectedMuscle.value)
  return muscle ? muscle.name : ''
})

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const progressStyle = computed(() => {
  const progress = ((totalTime.value - remainingTime.value) / totalTime.value) * 100
  return {
    background: `conic-gradient(var(--primary-color) ${progress}%, #e8e8e8 0%)`
  }
})

const recommendedMethods = computed(() => {
  return journalStore.getRecommendedRelaxMethods(selectedMuscle.value)
})

const goBack = () => {
  if (step.value === 2) {
    showEndModal.value = true
  } else {
    router.back()
  }
}

const startTraining = () => {
  const duration = selectedDuration.value || customDuration.value
  totalTime.value = duration * 60
  remainingTime.value = totalTime.value
  step.value = 2
  isPaused.value = false
  startTimer()
}

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    if (!isPaused.value) {
      if (remainingTime.value > 0) {
        remainingTime.value--
      } else {
        clearInterval(timerInterval)
        showTimeUpModal.value = true
      }
    }
  }, 1000)
}

const pauseTraining = () => {
  isPaused.value = !isPaused.value
}

const showEndConfirm = () => {
  showEndModal.value = true
}

const endTraining = () => {
  showEndModal.value = false
  showTimeUpModal.value = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  
  const duration = selectedDuration.value || customDuration.value
  const elapsedTime = totalTime.value - remainingTime.value
  const actualDuration = Math.ceil(elapsedTime / 60)
  
  journalStore.endTraining(selectedMuscle.value, actualDuration > 0 ? actualDuration : duration)
  
  step.value = 3
}

const addMoreTime = () => {
  showTimeUpModal.value = false
  totalTime.value += 600
  remainingTime.value += 600
  startTimer()
}

const resetAndBack = () => {
  step.value = 1
  selectedMuscle.value = null
  selectedDuration.value = null
  customDuration.value = null
  router.push('/home')
}

const goToRelaxDetail = (id) => {
  router.push(`/relax/${id}`)
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.training-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.training-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--bg-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.header-placeholder {
  width: 60px;
}

.step-content {
  flex: 1;
  padding: 20px 16px;
  padding-bottom: 100px;
}

.form-section {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.muscle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.muscle-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.muscle-item.active {
  border-color: var(--primary-color);
  background-color: rgba(74, 144, 217, 0.05);
}

.muscle-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  stroke: var(--text-light);
}

.muscle-item.active .muscle-icon {
  stroke: var(--primary-color);
}

.muscle-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
}

.muscle-item.active .muscle-name {
  color: var(--primary-color);
}

.duration-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.duration-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.duration-option.active {
  border-color: var(--primary-color);
  background-color: rgba(74, 144, 217, 0.05);
}

.duration-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.duration-option.active .duration-number {
  color: var(--primary-color);
}

.duration-unit {
  font-size: 12px;
  color: var(--text-light);
}

.custom-duration {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--bg-primary);
  border-radius: 12px;
}

.custom-input {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: var(--primary-color);
}

.custom-unit {
  font-size: 14px;
  color: var(--text-secondary);
}

.action-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  background-color: var(--bg-primary);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding-bottom: calc(16px + var(--safe-area-bottom));
}

.btn-full {
  width: 100%;
  padding: 16px 24px;
  font-size: 18px;
  border-radius: 12px;
}

.btn-full:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.timer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.timer-display {
  margin-bottom: 40px;
}

.timer-circle {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-progress {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.timer-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 220px;
  background-color: var(--bg-primary);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.timer-time {
  font-size: 56px;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.timer-label {
  font-size: 16px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.timer-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.control-btn {
  min-width: 120px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn-secondary {
  background-color: var(--bg-primary);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.control-btn-secondary:active {
  background-color: rgba(74, 144, 217, 0.1);
}

.control-btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.control-btn-danger:active {
  background-color: #e63940;
}

.timer-tips {
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}

.timer-tips p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.tip-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.result-section {
  flex: 1;
  padding: 40px 20px;
  text-align: center;
}

.result-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  stroke: var(--primary-color);
}

.result-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.result-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.result-highlight {
  color: var(--primary-color);
  font-weight: 600;
}

.recommend-section {
  margin-top: 32px;
  text-align: left;
}

.recommend-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid var(--primary-color);
}

.recommend-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommend-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s ease;
}

.recommend-card:active {
  transform: scale(0.98);
}

.recommend-img {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
}

.recommend-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommend-info {
  flex: 1;
  padding: 0 12px;
}

.recommend-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.recommend-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta-tag {
  font-size: 12px;
  padding: 2px 8px;
  background-color: rgba(74, 144, 217, 0.1);
  color: var(--primary-color);
  border-radius: 10px;
}

.meta-time {
  font-size: 12px;
  color: var(--text-light);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.time-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
}

.recommend-arrow {
  color: var(--text-light);
}

.recommend-arrow svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.result-actions {
  margin-top: 32px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 360px;
  background-color: var(--bg-primary);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
}

.timeup-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  stroke: var(--warning-color);
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.modal-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions .btn {
  flex: 1;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 15px;
}
</style>
