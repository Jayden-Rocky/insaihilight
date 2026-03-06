<template>
  <div class="scene-layout">
    <div class="scene-wrap-outer">
      <!-- 标题行：返回按钮 + 标题 -->
      <div class="header-row">
        <button class="back-button" @click="handleBack">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>返回</span>
        </button>
        
        <h1 class="scene-title">{{ title }}</h1>
      </div>
      
      <form class="scene-form" @submit.prevent="handleSubmit">
        <!-- 默认插槽：放置各场景特有的内容 -->
        <slot></slot>
        
        <!-- 底部操作区域 -->
        <div class="scene-footer">
          <slot name="footer">
            <button 
              type="submit" 
              class="submit-btn" 
              :disabled="!isValid"
            >
              {{ submitText }}
            </button>
          </slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  submitText: {
    type: String,
    default: '开始创建'
  },
  isValid: {
    type: Boolean,
    default: true
  },
  backPath: {
    type: String,
    default: '/creation/video-generator'
  }
})

const emit = defineEmits(['submit'])
const router = useRouter()

const handleSubmit = () => {
  emit('submit')
}

const handleBack = () => {
  if (props.backPath) {
    router.push(props.backPath)
  } else {
    router.back()
  }
}
</script>

<style scoped>
.scene-layout {
  min-height: 100vh;
  background: #0e0e11;
  padding: 40px;
  display: flex;
  justify-content: center;
}

.scene-wrap-outer {
  width: 100%;
  max-width: 800px;
}

/* 标题行：使用 flex 布局让返回按钮和标题在同一水平线 */
.header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  position: relative;
}

/* 返回按钮 */
.back-button {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.85);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
  transform: translateX(-2px);
}

.scene-title {
  font-size: 32px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
  text-align: center;
  margin: 0;
}

.scene-form {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
}

.scene-footer {
  margin-top: 40px;
  text-align: center;
}

.submit-btn {
  padding: 14px 48px;
  background: rgb(43, 209, 215);
  border: none;
  border-radius: 8px;
  color: rgb(9, 12, 20);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .scene-layout {
    padding: 20px;
  }
  
  .scene-form {
    padding: 24px;
  }
}
</style>
