<template>
  <div class="new-journal-btn" @click="$emit('click')">
    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    <span class="btn-text">新建日记</span>
  </div>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.new-journal-btn {
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--primary-color), #5fa8e5);
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(74, 144, 217, 0.4);
  cursor: pointer;
  z-index: 99;
  transition: all 0.3s ease;
}

.new-journal-btn:active {
  transform: scale(0.95);
}

.btn-icon {
  width: 24px;
  height: 24px;
  color: white;
  stroke: currentColor;
  margin-right: 8px;
}

.btn-text {
  font-size: 16px;
  font-weight: 500;
  color: white;
}
</style>
