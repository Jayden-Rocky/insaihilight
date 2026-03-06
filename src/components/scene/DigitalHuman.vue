<template>
  <div class="digital-human">
    <div class="section-title">
      <span class="title-text">数字人和声音</span>
    </div>
    
    <div class="digital-human-content">
      <!-- 数字人选择 -->
      <div class="digital-human-select">
        <label class="field-label">数字人</label>
        <div class="select-display" @click="showDigitalHumanPicker = true">
          <img 
            :src="selectedHuman?.avatar || defaultAvatar" 
            class="human-avatar"
            :alt="selectedHuman?.name || '不使用数字人'"
          >
          <span class="human-name">{{ selectedHuman?.name || '不使用数字人' }}</span>
          <svg class="select-arrow" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
      
      <!-- 声音选择 -->
      <div class="voice-select">
        <label class="field-label">音色</label>
        <div class="voice-display" @click="showVoicePicker = true">
          <svg class="voice-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
          </svg>
          <span class="voice-name">{{ selectedVoice?.name || '智能匹配音色' }}</span>
          <svg class="select-arrow" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  humanId: {
    type: String,
    default: ''
  },
  voiceId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:humanId', 'update:voiceId'])

const defaultAvatar = 'https://static8.yingsaidata.com/wise-cut/img/4415774-no-avator.png'

const digitalHumans = [
  { id: '', name: '不使用数字人', avatar: defaultAvatar },
  { id: '1', name: '智能匹配数字人', avatar: 'https://static8.yingsaidata.com/wise-cut/img/avatar1.png' },
  { id: '2', name: '专业女主持', avatar: 'https://static8.yingsaidata.com/wise-cut/img/avatar2.png' },
  { id: '3', name: '时尚男主播', avatar: 'https://static8.yingsaidata.com/wise-cut/img/avatar3.png' }
]

const voices = [
  { id: '', name: '智能匹配音色' },
  { id: '1', name: '温柔女声' },
  { id: '2', name: '活力男声' },
  { id: '3', name: '专业旁白' }
]

const showDigitalHumanPicker = ref(false)
const showVoicePicker = ref(false)

const selectedHuman = computed(() => {
  return digitalHumans.find(h => h.id === props.humanId) || digitalHumans[0]
})

const selectedVoice = computed(() => {
  return voices.find(v => v.id === props.voiceId) || voices[0]
})
</script>

<style scoped>
.digital-human {
  margin-bottom: 32px;
}

.section-title {
  margin-bottom: 16px;
}

.title-text {
  font-size: 20px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
}

.digital-human-content {
  display: flex;
  gap: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.digital-human-select,
.voice-select {
  flex: 1;
}

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.85);
  margin-bottom: 10px;
}

.select-display,
.voice-display {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-display:hover,
.voice-display:hover {
  border-color: rgba(43, 209, 215, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.human-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.human-name,
.voice-name {
  flex: 1;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.95);
}

.select-arrow {
  color: rgba(250, 251, 255, 0.5);
}

.voice-icon {
  color: #2bd1d7;
}

@media (max-width: 640px) {
  .digital-human-content {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
