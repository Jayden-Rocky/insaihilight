<template>
  <div class="file-upload-wrapper" @click="triggerUpload" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileChange" 
      accept=".txt,.doc,.docx,.pdf,.md"
      hidden
    />
    <div class="upload-area" :class="{ 'drag-over': isDragOver }">
      <div class="upload-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
        </svg>
      </div>
      <p class="upload-text">拖拽文件到此处，或点击上传</p>
      <p class="upload-hint">支持 .txt, .doc, .docx, .pdf, .md 格式</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['file-selected'])
const fileInput = ref(null)
const isDragOver = ref(false)

const triggerUpload = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('file-selected', file)
  }
}

const onDragOver = () => {
  isDragOver.value = true
}

const onDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    emit('file-selected', file)
  }
}
</script>

<style scoped>
.file-upload-wrapper {
  width: 100%;
  cursor: pointer;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 2px dashed rgba(43, 209, 215, 0.3);
  border-radius: 12px;
  background: rgba(43, 209, 215, 0.02);
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: rgba(43, 209, 215, 0.6);
  background: rgba(43, 209, 215, 0.05);
}

.upload-area.drag-over {
  border-color: #2bd1d7;
  background: rgba(43, 209, 215, 0.1);
}

.upload-icon {
  color: #2bd1d7;
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  color: rgba(229, 233, 250, 0.9);
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 13px;
  color: rgba(229, 233, 250, 0.5);
}
</style>
