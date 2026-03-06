<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">手动创建</h3>
            <button class="close-btn" @click="closeModal">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="creation-options">
              <div 
                class="option-card" 
                v-for="option in creationOptions" 
                :key="option.id"
                @click="selectOption(option)"
              >
                <div class="option-icon" :style="{ background: option.gradient }">
                  <component :is="option.icon" />
                </div>
                <div class="option-info">
                  <h4 class="option-title">{{ option.title }}</h4>
                  <p class="option-desc">{{ option.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, h } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const closeModal = () => {
  emit('update:modelValue', false)
}

const selectOption = (option) => {
  emit('select', option)
  closeModal()
}

// 图标组件
const ScriptIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' })
])

const TemplateIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' })
])

const VideoIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' })
])

const creationOptions = ref([
  {
    id: 'script',
    title: '脚本创作',
    description: '从脚本开始，智能生成视频',
    icon: ScriptIcon,
    gradient: 'linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%)'
  },
  {
    id: 'template',
    title: '模板选择',
    description: '选择预设模板，快速生成视频',
    icon: TemplateIcon,
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
  },
  {
    id: 'scratch',
    title: '空白创建',
    description: '从零开始，自由创作视频',
    icon: VideoIcon,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  }
])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #1c1d21;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  color: rgba(229, 233, 250, 0.7);
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
}

.creation-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(43, 209, 215, 0.3);
  transform: translateX(4px);
}

.option-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  flex-shrink: 0;
}

.option-info {
  flex: 1;
}

.option-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.option-desc {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
  margin: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}
</style>
