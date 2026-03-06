<template>
  <div class="date-picker-wrapper" ref="wrapperRef">
    <div class="date-input-display" @click="toggleCalendar">
      <svg class="calendar-icon" viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
      </svg>
      <span class="date-text" :class="{ 'placeholder': !displayDate }">
        {{ displayDate || placeholder }}
      </span>
      <svg v-if="modelValue" class="clear-icon" viewBox="0 0 24 24" width="14" height="14" @click.stop="clearDate">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </div>
    
    <transition name="calendar-fade">
      <div v-if="showCalendar" class="calendar-dropdown">
        <div class="calendar-header">
          <button type="button" class="nav-btn" @click="prevMonth">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <span class="month-year">{{ currentMonthYear }}</span>
          <button type="button" class="nav-btn" @click="nextMonth">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
        
        <div class="calendar-weekdays">
          <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
        </div>
        
        <div class="calendar-days">
          <button
            v-for="day in calendarDays"
            :key="day.date"
            type="button"
            class="day-btn"
            :class="{
              'other-month': day.otherMonth,
              'today': day.isToday,
              'selected': day.isSelected,
              'disabled': day.disabled
            }"
            :disabled="day.disabled || day.otherMonth"
            @click="selectDate(day)"
          >
            {{ day.day }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '选择日期'
  },
  minDate: {
    type: String,
    default: ''
  },
  maxDate: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const wrapperRef = ref(null)
const showCalendar = ref(false)
const currentViewDate = ref(new Date())

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const displayDate = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

const currentMonthYear = computed(() => {
  const year = currentViewDate.value.getFullYear()
  const month = currentViewDate.value.getMonth() + 1
  return `${year}年${month}月`
})

const calendarDays = computed(() => {
  const year = currentViewDate.value.getFullYear()
  const month = currentViewDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)
    
    const dateStr = currentDate.toISOString().split('T')[0]
    const isOtherMonth = currentDate.getMonth() !== month
    const isToday = currentDate.getTime() === today.getTime()
    const isSelected = props.modelValue === dateStr
    const isDisabled = 
      (props.minDate && dateStr < props.minDate) ||
      (props.maxDate && dateStr > props.maxDate) ||
      props.disabled
    
    days.push({
      date: dateStr,
      day: currentDate.getDate(),
      otherMonth: isOtherMonth,
      isToday: isToday,
      isSelected: isSelected,
      disabled: isDisabled
    })
  }
  
  return days
})

const toggleCalendar = () => {
  if (!props.disabled) {
    showCalendar.value = !showCalendar.value
    if (showCalendar.value && props.modelValue) {
      currentViewDate.value = new Date(props.modelValue)
    }
  }
}

const selectDate = (day) => {
  if (!day.disabled && !day.otherMonth) {
    emit('update:modelValue', day.date)
    showCalendar.value = false
  }
}

const clearDate = () => {
  emit('update:modelValue', '')
}

const prevMonth = () => {
  currentViewDate.value.setMonth(currentViewDate.value.getMonth() - 1)
  currentViewDate.value = new Date(currentViewDate.value)
}

const nextMonth = () => {
  currentViewDate.value.setMonth(currentViewDate.value.getMonth() + 1)
  currentViewDate.value = new Date(currentViewDate.value)
}

const handleClickOutside = (event) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
    showCalendar.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.date-picker-wrapper {
  position: relative;
  width: 100%;
}

.date-input-display {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-input-display:hover {
  border-color: rgba(43, 209, 215, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.calendar-icon {
  color: rgba(229, 233, 250, 0.5);
  flex-shrink: 0;
}

.date-text {
  flex: 1;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  color: rgba(250, 251, 255, 0.95);
}

.date-text.placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.clear-icon {
  color: rgba(229, 233, 250, 0.4);
  cursor: pointer;
  transition: color 0.2s;
}

.clear-icon:hover {
  color: rgba(229, 233, 250, 0.8);
}

.calendar-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  min-width: 280px;
  background: rgba(14, 14, 17, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.month-year {
  font-size: 15px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(229, 233, 250, 0.8);
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: rgba(229, 233, 250, 0.5);
  padding: 8px 0;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-btn {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.day-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.2);
}

.day-btn.other-month {
  color: rgba(229, 233, 250, 0.25);
}

.day-btn.today {
  border-color: rgba(43, 209, 215, 0.3);
  background: rgba(43, 209, 215, 0.1);
}

.day-btn.selected {
  background: rgba(43, 209, 215, 0.2);
  border-color: rgba(43, 209, 215, 0.6);
  color: #2bd1d7;
  font-weight: 600;
}

.day-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* 动画 */
.calendar-fade-enter-active,
.calendar-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.calendar-fade-enter-from,
.calendar-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
