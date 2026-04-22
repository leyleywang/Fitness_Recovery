<template>
  <div id="app" class="app-container">
    <router-view />
    <TabBar v-if="!isTrainingPage" />
    <NewJournalButton v-if="!isTrainingPage && !isRelaxDetailPage" @click="openNewJournal" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'
import NewJournalButton from './components/NewJournalButton.vue'

const route = useRoute()

const isTrainingPage = computed(() => {
  return route.name === 'training'
})

const isRelaxDetailPage = computed(() => {
  return route.name === 'relax-detail'
})

const openNewJournal = () => {
  window.location.href = '#/training'
}
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--bg-secondary);
}
</style>
