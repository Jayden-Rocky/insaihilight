<template>
  <div class="media-upload">
    <div class="upload-title">
      <span class="required" v-if="required">*</span>
      <span class="label">素材({{ files.length }})</span>
    </div>
    
    <div class="upload-area">
      <div class="upload-buttons">
        <button type="button" class="upload-btn" @click="handleUploadLocal">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <span>点击/拖拽上传</span>
        </button>
        <button type="button" class="upload-btn" @click="handleSelectFromCloud">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
          </svg>
          <span>从素材中心选择</span>
        </button>
      </div>
      
      <div class="upload-tips" v-if="showTips">
        <span class="tips-text">图片素材请使用不同角度、多场景、清晰的产品图，请避免：</span>
        <div class="tips-examples">
          <div class="example-item" v-for="tip in tips" :key="tip.text">
            <img :src="tip.image">
            <span>{{ tip.text }}</span>
          </div>
        </div>
      </div>
      
      <!-- 已上传文件预览 -->
      <div v-if="files.length > 0" class="uploaded-files">
        <div v-for="(file, index) in files" :key="index" class="file-preview">
          <img v-if="file.url" :src="file.url" class="preview-img">
          <span class="file-name">{{ file.name }}</span>
          <button type="button" class="remove-btn" @click="removeFile(index)">×</button>
        </div>
      </div>
    </div>
    
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      style="display: none;"
      @change="handleFileChange"
    >
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: 'image/*,video/*'
  },
  multiple: {
    type: Boolean,
    default: true
  },
  showTips: {
    type: Boolean,
    default: true
  },
  tips: {
    type: Array,
    default: () => [
      { image: 'https://static8.yingsaidata.com/wise-cut/img/8607196-example1.png', text: '包含水印' },
      { image: 'https://static8.yingsaidata.com/wise-cut/img/522793-example2.png', text: '包含文字' },
      { image: 'https://static8.yingsaidata.com/wise-cut/img/8273735-example3.png', text: '多个产品' }
    ]
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const files = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleUploadLocal = () => {
  fileInput.value?.click()
}

const handleSelectFromCloud = () => {
  alert('素材中心功能开发中...')
}

const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files).map(file => ({
    file,
    name: file.name,
    url: URL.createObjectURL(file),
    type: file.type
  }))
  files.value = [...files.value, ...newFiles]
}

const removeFile = (index) => {
  const newFiles = [...files.value]
  newFiles.splice(index, 1)
  files.value = newFiles
}
</script>

<style scoped>
.media-upload {
  margin-bottom: 20px;
}

.upload-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(250, 251, 255, 0.9);
}

.required {
  color: #ef4444;
}

.upload-area {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 24px;
}

.upload-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.upload-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

.upload-tips {
  margin-top: 20px;
}

.tips-text {
  display: block;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.6);
  margin-bottom: 12px;
}

.tips-examples {
  display: flex;
  gap: 16px;
}

.example-item {
  text-align: center;
}

.example-item img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 8px;
  opacity: 0.5;
}

.example-item span {
  display: block;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.5);
}

.uploaded-files {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.file-preview {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px;
  background: rgba(0, 0, 0, 0.7);
  font-size: 10px;
  color: rgba(250, 251, 255, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.8);
}
</style>
