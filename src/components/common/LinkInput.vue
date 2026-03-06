<template>
  <div class="link-input-wrapper">
    <div class="input-group">
      <svg class="link-icon" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
      <input 
        v-model="linkUrl"
        type="url" 
        placeholder="粘贴商品链接或网页地址..."
        @keyup.enter="handleSubmit"
      />
      <button class="submit-btn" @click="handleSubmit" :disabled="!linkUrl">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
    <div class="supported-platforms">
      <span>支持平台：</span>
      <span class="platform-tag">淘宝</span>
      <span class="platform-tag">京东</span>
      <span class="platform-tag">拼多多</span>
      <span class="platform-tag">Shopify</span>
      <span class="platform-tag">Amazon</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['link-submitted'])
const linkUrl = ref('')

const handleSubmit = () => {
  if (linkUrl.value.trim()) {
    emit('link-submitted', linkUrl.value.trim())
  }
}
</script>

<style scoped>
.link-input-wrapper {
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s;
}

.input-group:focus-within {
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.link-icon {
  color: rgba(229, 233, 250, 0.5);
  flex-shrink: 0;
}

.input-group input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(229, 233, 250, 0.9);
  font-size: 15px;
}

.input-group input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.supported-platforms {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 13px;
  color: rgba(229, 233, 250, 0.5);
}

.platform-tag {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.7);
}
</style>
