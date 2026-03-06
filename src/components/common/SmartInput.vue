<template>
  <div class="smart-input-wrapper">
    <div class="input-box" :class="{ 'has-content': inputValue }">
      <div class="input-area">
        <textarea 
          v-model="inputValue"
          placeholder="你可以从脚本、需求Brief或商品链接开始创作视频"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
          rows="1"
          ref="textareaRef"
        ></textarea>
      </div>
      <button 
        class="parse-btn" 
        :class="{ 'active': inputValue || isLoading }"
        :disabled="!inputValue && !isLoading"
        @click="handleParse"
      >
        <img 
          :src="isLoading ? loadingIcon : defaultIcon" 
          class="icon" 
          :class="{ 'loading': isLoading }"
        />
        <span>智能解析</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const emit = defineEmits(['parse', 'update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const inputValue = ref(props.modelValue)
const isFocused = ref(false)
const isLoading = ref(false)
const textareaRef = ref(null)

const defaultIcon = 'https://static8.yingsaidata.com/static/img/default-loading-ligt.png'
const loadingIcon = 'https://static8.yingsaidata.com/static/img/loading-light.gif'

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
  // 自动调整高度
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
    }
  })
}

const handleParse = () => {
  if (inputValue.value.trim() && !isLoading.value) {
    isLoading.value = true
    emit('parse', inputValue.value)
    // 模拟解析完成
    setTimeout(() => {
      isLoading.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.smart-input-wrapper {
  width: 100%;
}

.input-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s;
}

.input-box:hover {
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.input-box.has-content {
  border-color: rgba(43, 209, 215, 0.3);
}

.input-area {
  flex: 1;
}

.input-area textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: rgba(229, 233, 250, 0.9);
  font-size: 16px;
  line-height: 1.5;
  min-height: 24px;
  max-height: 120px;
}

.input-area textarea::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.parse-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(43, 209, 215, 0.1);
  border: 1px solid rgba(43, 209, 215, 0.3);
  border-radius: 8px;
  color: #2bd1d7;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.parse-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.parse-btn.active {
  background: linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%);
  border-color: transparent;
  color: #fff;
}

.parse-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(43, 209, 215, 0.3);
}

.parse-btn .icon {
  width: 18px;
  height: 18px;
}

.parse-btn .icon.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
