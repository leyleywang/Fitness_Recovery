<template>
  <div class="detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
    </div>

    <div v-if="method" class="detail-content fade-in">
      <div class="detail-image">
        <img :src="method.image" :alt="method.title" />
        <div class="duration-badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
          {{ method.duration }}分钟
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-meta">
          <span class="category-tag">{{ method.categoryName }}</span>
          <span class="muscle-tag">{{ method.muscleGroupName }}</span>
        </div>

        <h1 class="detail-title">{{ method.title }}</h1>

        <p class="detail-desc">{{ method.description }}</p>

        <div class="steps-section">
          <h2 class="section-title">操作步骤</h2>
          <div class="steps-list">
            <div
              v-for="(step, index) in method.steps"
              :key="index"
              class="step-item"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-desc">{{ step.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tips-section">
          <svg class="tips-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.66 3.74A7 7 0 0 1 19 11c0 2.48-1.21 4.68-3 6.17V21a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3.83C6.21 15.68 5 13.48 5 11a7 7 0 0 1 4.66-7.26"></path>
            <path d="M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2H9v2z"></path>
            <path d="M9 18h6"></path>
          </svg>
          <div class="tips-content">
            <h3 class="tips-title">温馨提示</h3>
            <p class="tips-text">
              放松时保持深呼吸，每个动作都要缓慢进行，找到肌肉紧张点后停留深呼吸放松。如果感到疼痛，请立即停止。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-state">
      <svg class="loading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23,4 23,10 17,10"></polyline>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
      </svg>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRelaxMethodById } from '../data/relaxMethods'

const route = useRoute()
const router = useRouter()

const method = ref(null)

const goBack = () => {
  router.back()
}

onMounted(() => {
  const id = route.params.id
  method.value = getRelaxMethodById(id)
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background-color: var(--bg-secondary);
  position: relative;
}

.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke: var(--text-primary);
}

.detail-content {
  padding-bottom: 100px;
}

.detail-image {
  position: relative;
  width: 100%;
  height: 300px;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.badge-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.detail-body {
  padding: 20px 16px;
}

.detail-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.category-tag,
.muscle-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: rgba(74, 144, 217, 0.1);
  color: var(--primary-color);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.detail-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.detail-desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.steps-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid var(--primary-color);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-item {
  display: flex;
  gap: 12px;
  background-color: var(--bg-primary);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--primary-color), #5fa8e5);
  color: white;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.step-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.tips-section {
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: rgba(250, 173, 20, 0.1);
  border-radius: 12px;
  border-left: 4px solid var(--warning-color);
}

.tips-icon {
  width: 28px;
  height: 28px;
  stroke: var(--warning-color);
  flex-shrink: 0;
}

.tips-content {
  flex: 1;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--warning-color);
  margin-bottom: 6px;
}

.tips-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: var(--text-light);
}

.loading-icon {
  width: 48px;
  height: 48px;
  stroke: var(--text-light);
  margin-bottom: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
