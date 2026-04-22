<template>
  <div class="page-container">
    <div class="page-content">
      <div class="header-section">
        <h1 class="page-title">放松方法</h1>
        <p class="page-subtitle">选择合适的放松方式，帮助肌肉恢复</p>
      </div>

      <div class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category.value"
          class="filter-tab"
          :class="{ active: activeCategory === category.value }"
          @click="activeCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="muscle-filter">
        <div class="filter-label">按部位筛选:</div>
        <div class="muscle-chips">
          <span
            v-for="muscle in muscleGroups"
            :key="muscle.id"
            class="muscle-chip"
            :class="{ active: activeMuscle === muscle.id }"
            @click="activeMuscle = activeMuscle === muscle.id ? null : muscle.id"
          >
            {{ muscle.icon }} {{ muscle.name }}
          </span>
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
                <span class="meta-icon">⏱️</span>
                {{ method.duration }}分钟
              </span>
              <span class="meta-item">
                <span class="meta-icon">🎯</span>
                {{ method.muscleGroupName }}
              </span>
            </div>
          </div>
          <div class="card-arrow">→</div>
        </div>
      </div>

      <div v-if="filteredMethods.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
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

.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-tab {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.muscle-filter {
  margin-bottom: 20px;
}

.filter-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.muscle-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.muscle-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.muscle-chip.active {
  background-color: rgba(74, 144, 217, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
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
  margin-right: 4px;
  font-size: 14px;
}

.card-arrow {
  display: flex;
  align-items: center;
  padding-right: 12px;
  color: var(--text-light);
  font-size: 20px;
  font-weight: 300;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  color: var(--text-light);
}
</style>
