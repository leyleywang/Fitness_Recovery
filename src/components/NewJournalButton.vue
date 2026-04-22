<template>
  <div class="new-journal-btn" @click="$emit('click')">
    <span class="btn-icon">+</span>
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
  font-size: 24px;
  font-weight: 300;
  color: white;
  margin-right: 8px;
  line-height: 1;
}

.btn-text {
  font-size: 16px;
  font-weight: 500;
  color: white;
}
</style>
