<template>
  <div class="page-container">
    <div class="page-content">
      <div class="header-section">
        <h1 class="page-title">放松方法</h1>
        <p class="page-subtitle">选择合适的放松方式，帮助肌肉恢复</p>
      </div>

      <div class="filter-row">
        <div class="filter-select-wrapper">
          <label class="filter-label">类型</label>
          <select class="filter-select" v-model="activeCategory">
            <option :value="null">全部</option>
            <option value="foam-roller">泡沫轴</option>
            <option value="massage-gun">筋膜枪</option>
          </select>
        </div>
        <div class="filter-select-wrapper">
          <label class="filter-label">部位</label>
          <select class="filter-select" v-model="activeMuscle">
            <option :value="null">全部部位</option>
            <option v-for="muscle in muscleGroups" :key="muscle.id" :value="muscle.id">
              {{ muscle.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="relax-list">
        <div
          v-for="method in filteredMethods"
          :key="method.id"
          class="relax-card"
          @click="goToDetail(method.id)"
        >
          <div class="card-image">
            <img :src="method.image" :alt="method.title" />
            <div class="card-badge">{{ method.categoryName }}</div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ method.title }}</h3>
            <p class="card-desc">{{ method.description }}</p>
            <div class="card-meta">
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                {{ method.duration }}分钟
              </span>
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                  <path d="M12 2a10 10 0 0 1 10 10"></path>
                </svg>
                {{ method.muscleGroupName }}
              </span>
            </div>
          </div>
          <div class="card-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div v-if="filteredMethods.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p class="empty-text">暂无相关放松方法</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { relaxMethods, muscleGroups } from '../data/relaxMethods'

const router = useRouter()

const categories = [
  { label: '全部', value: null },
  { label: '泡沫轴', value: 'foam-roller' },
  { label: '筋膜枪', value: 'massage-gun' }
]

const activeCategory = ref(null)
const activeMuscle = ref(null)

const filteredMethods = computed(() => {
  return relaxMethods.filter(method => {
    const matchCategory = !activeCategory.value || method.category === activeCategory.value
    const matchMuscle = !activeMuscle.value || method.muscleGroup === activeMuscle.value
    return matchCategory && matchMuscle
  })
})

const goToDetail = (id) => {
  router.push(`/relax/${id}`)
}
</script>

<style scoped>
.header-section {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.filter-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.filter-select-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-select {
  padding: 10px 32px 10px 12px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.relax-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relax-card {
  display: flex;
  background-color: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.relax-card:active {
  transform: scale(0.98);
}

.card-image {
  position: relative;
  width: 120px;
  flex-shrink: 0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  background-color: rgba(74, 144, 217, 0.9);
  color: white;
  font-size: 12px;
  border-radius: 12px;
}

.card-content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: var(--text-light);
}

.meta-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
  stroke: currentColor;
}

.card-arrow {
  display: flex;
  align-items: center;
  padding-right: 12px;
  color: var(--text-light);
}

.card-arrow svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  stroke: var(--text-light);
}

.empty-text {
  font-size: 14px;
  color: var(--text-light);
}
</style>
