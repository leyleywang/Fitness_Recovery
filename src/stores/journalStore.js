import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { muscleGroups, getRelaxMethodsByMuscleGroup } from '../data/relaxMethods'

const FATIGUE_THRESHOLDS = {
  maxDailyMinutes: 120,
  maxSameMuscleGroup: 2,
  warningMinutes: 90
}

export const useJournalStore = defineStore('journal', () => {
  const journals = ref([])
  const currentTraining = ref(null)

  const initFromStorage = () => {
    const stored = localStorage.getItem('fitness_journals')
    if (stored) {
      journals.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('fitness_journals', JSON.stringify(journals.value))
  }

  const addJournal = (journal) => {
    const newJournal = {
      id: Date.now().toString(),
      ...journal,
      createdAt: new Date().toISOString(),
      isStretched: false
    }
    journals.value.unshift(newJournal)
    saveToStorage()
    return newJournal
  }

  const updateJournal = (id, updates) => {
    const index = journals.value.findIndex(j => j.id === id)
    if (index !== -1) {
      journals.value[index] = { ...journals.value[index], ...updates }
      saveToStorage()
    }
  }

  const markAsStretched = (id) => {
    updateJournal(id, { isStretched: true })
  }

  const getJournalsByDate = () => {
    const grouped = {}
    journals.value.forEach(journal => {
      const date = new Date(journal.createdAt).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(journal)
    })
    return grouped
  }

  const getTodayStats = computed(() => {
    const today = new Date().toLocaleDateString()
    const todayJournals = journals.value.filter(j => {
      const journalDate = new Date(j.createdAt).toLocaleDateString()
      return journalDate === today
    })

    const stats = {
      totalMinutes: 0,
      muscleGroups: {},
      isOverFatigue: false,
      fatigueMessage: ''
    }

    todayJournals.forEach(journal => {
      stats.totalMinutes += journal.duration
      if (!stats.muscleGroups[journal.muscleGroup]) {
        stats.muscleGroups[journal.muscleGroup] = {
          count: 0,
          duration: 0
        }
      }
      stats.muscleGroups[journal.muscleGroup].count++
      stats.muscleGroups[journal.muscleGroup].duration += journal.duration
    })

    if (stats.totalMinutes > FATIGUE_THRESHOLDS.maxDailyMinutes) {
      stats.isOverFatigue = true
      stats.fatigueMessage = `今日训练时长已超过${FATIGUE_THRESHOLDS.maxDailyMinutes}分钟，建议休息！`
    } else if (stats.totalMinutes > FATIGUE_THRESHOLDS.warningMinutes) {
      stats.isOverFatigue = true
      stats.fatigueMessage = `今日训练时长已超过${FATIGUE_THRESHOLDS.warningMinutes}分钟，请注意休息！`
    }

    for (const [muscleGroup, data] of Object.entries(stats.muscleGroups)) {
      if (data.count > FATIGUE_THRESHOLDS.maxSameMuscleGroup) {
        const muscleName = muscleGroups.find(m => m.id === muscleGroup)?.name || muscleGroup
        stats.isOverFatigue = true
        stats.fatigueMessage = `同一部位(${muscleName})今日训练次数过多，建议更换训练部位或休息！`
        break
      }
    }

    return stats
  })

  const getRecommendedRelaxMethods = (muscleGroupId) => {
    return getRelaxMethodsByMuscleGroup(muscleGroupId)
  }

  const startTraining = (muscleGroup, duration) => {
    currentTraining.value = {
      muscleGroup,
      duration,
      startTime: Date.now()
    }
  }

  const endTraining = (muscleGroup, duration) => {
    const journal = addJournal({
      muscleGroup,
      duration,
      muscleGroupName: muscleGroups.find(m => m.id === muscleGroup)?.name || muscleGroup
    })
    currentTraining.value = null
    return journal
  }

  initFromStorage()

  return {
    journals,
    currentTraining,
    addJournal,
    updateJournal,
    markAsStretched,
    getJournalsByDate,
    getTodayStats,
    getRecommendedRelaxMethods,
    startTraining,
    endTraining
  }
})
