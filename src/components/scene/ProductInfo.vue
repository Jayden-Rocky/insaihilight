<template>
  <div class="product-info">
    <!-- 标题行：左侧标题，右侧导入按钮 -->
    <div class="title-row">
      <h3 class="section-title">产品信息</h3>
      <button 
        v-if="showImportUrl" 
        type="button" 
        class="import-url-btn"
        @click="handleImportUrl"
      >
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
        <span>从链接导入</span>
      </button>
    </div>
    
    <div class="product-container">
      <!-- 产品名称 -->
      <div class="product-field">
        <label class="field-label">
          <span class="required-mark">*</span>
          <span class="label-text">产品名称</span>
        </label>
        <input
          :value="productName"
          @input="$emit('update:productName', $event.target.value)"
          type="text"
          class="input-field"
          :placeholder="productPlaceholder"
        >
      </div>
      
      <!-- 产品描述（可选） -->
      <div class="product-field" v-if="showDescription">
        <label class="field-label">
          <span class="required-mark" v-if="descriptionRequired">*</span>
          <span class="label-text">产品描述</span>
        </label>
        <div class="textarea-wrapper">
          <textarea
            :value="productDesc"
            @input="$emit('update:productDesc', $event.target.value)"
            class="textarea-field"
            :placeholder="descPlaceholder"
            rows="2"
          ></textarea>
          <button type="button" class="edit-icon" aria-label="编辑">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 素材上传 -->
      <div class="product-field" v-if="showMediaUpload">
        <label class="field-label">
          <span class="required-mark">*</span>
          <span class="label-text">素材({{ mediaFiles.length }})</span>
        </label>
        
        <div class="upload-zone">
          <!-- 上传按钮区域 - 精致的左右布局 -->
          <div class="upload-actions">
            <button 
              type="button" 
              class="upload-action-btn primary"
              @click="triggerFileInput"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <span class="btn-text">点击/拖拽上传</span>
            </button>
            
            <button 
              type="button" 
              class="upload-action-btn secondary"
              @click="handleSelectFromCloud"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
              </svg>
              <span class="btn-text">从素材中心选择</span>
            </button>
          </div>
          
          <!-- 居中的提示信息和案例图片 -->
          <div class="upload-hints" v-if="showMediaTips">
            <p class="hint-text">图片素材请使用不同角度、多场景、清晰的产品图，请避免：</p>
            <div class="example-gallery">
              <div class="example-item" v-for="tip in mediaTips" :key="tip.text">
                <img :src="tip.image" :alt="tip.text" class="example-image">
                <span class="example-label">{{ tip.text }}</span>
              </div>
            </div>
          </div>
          
          <!-- 已上传文件预览 -->
          <div v-if="mediaFiles.length > 0" class="uploaded-preview">
            <div v-for="(file, index) in mediaFiles" :key="index" class="preview-item">
              <img v-if="file.url" :src="file.url" class="preview-thumbnail">
              <span class="preview-name">{{ file.name }}</span>
              <button 
                type="button" 
                class="preview-remove"
                @click="removeFile(index)"
                aria-label="移除"
              >
                <svg viewBox="0 0 24 24" width="12" height="12">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <input
          ref="fileInput"
          type="file"
          :accept="mediaAccept"
          multiple
          style="display: none;"
          @change="handleFileChange"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MediaUpload from './MediaUpload.vue'

const props = defineProps({
  productName: {
    type: String,
    default: ''
  },
  productDesc: {
    type: String,
    default: ''
  },
  mediaFiles: {
    type: Array,
    default: () => []
  },
  showImportUrl: {
    type: Boolean,
    default: true
  },
  showDescription: {
    type: Boolean,
    default: false
  },
  descriptionRequired: {
    type: Boolean,
    default: false
  },
  showMediaUpload: {
    type: Boolean,
    default: true
  },
  mediaRequired: {
    type: Boolean,
    default: true
  },
  mediaAccept: {
    type: String,
    default: 'image/*,video/*'
  },
  showMediaTips: {
    type: Boolean,
    default: true
  },
  mediaTips: {
    type: Array,
    default: () => [
      { image: 'https://static8.yingsaidata.com/wise-cut/img/8607196-example1.png', text: '包含水印' },
      { image: 'https://static8.yingsaidata.com/wise-cut/img/522793-example2.png', text: '包含文字' },
      { image: 'https://static8.yingsaidata.com/wise-cut/img/8273735-example3.png', text: '多个产品' }
    ]
  },
  productPlaceholder: {
    type: String,
    default: '本次视频的产品或品牌名称，如防晒霜'
  },
  descPlaceholder: {
    type: String,
    default: '产品核心描述，例如夏季男士防晒霜，主打清爽不油腻，快速成膜'
  }
})

const emit = defineEmits(['update:productName', 'update:productDesc', 'update:mediaFiles'])

const fileInput = ref(null)

const handleImportUrl = () => {
  const url = prompt('请输入产品链接:')
  if (url) {
    console.log('导入链接:', url)
    alert('链接导入功能开发中...')
  }
}

const triggerFileInput = () => {
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
  emit('update:mediaFiles', [...props.mediaFiles, ...newFiles])
}

const removeFile = (index) => {
  const newFiles = [...props.mediaFiles]
  newFiles.splice(index, 1)
  emit('update:mediaFiles', newFiles)
}
</script>

<style scoped>
.product-info {
  margin-bottom: 40px;
}

/* 标题行：左右布局 */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
  letter-spacing: -0.01em;
  margin: 0;
}

.import-url-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(43, 209, 215, 0.08);
  border: 1px solid rgba(43, 209, 215, 0.2);
  border-radius: 8px;
  color: #2bd1d7;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.import-url-btn:hover {
  background: rgba(43, 209, 215, 0.15);
  border-color: rgba(43, 209, 215, 0.4);
  transform: translateY(-1px);
}

.product-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.product-field {
  margin-bottom: 24px;
}

.product-field:last-child {
  margin-bottom: 0;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.85);
  letter-spacing: 0.02em;
}

.required-mark {
  color: #f43f5e;
  font-size: 14px;
}

.input-field {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-field:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(43, 209, 215, 0.1);
}

.input-field::placeholder {
  color: rgba(229, 233, 250, 0.35);
}

.textarea-wrapper {
  position: relative;
}

.textarea-field {
  width: 100%;
  min-height: 72px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.textarea-field:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(43, 209, 215, 0.1);
}

.textarea-field::placeholder {
  color: rgba(229, 233, 250, 0.35);
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 6px;
  color: rgba(250, 251, 255, 0.5);
  cursor: pointer;
  transition: all 0.25s;
}

.edit-icon:hover {
  background: rgba(43, 209, 215, 0.15);
  color: #2bd1d7;
}

/* 上传区域 */
.upload-zone {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 24px;
}

.upload-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.upload-action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(250, 251, 255, 0.85);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.upload-action-btn:hover {
  background: rgba(43, 209, 215, 0.08);
  border-color: rgba(43, 209, 215, 0.25);
  color: #2bd1d7;
  transform: translateY(-2px);
}

.upload-action-btn.primary {
  background: rgba(43, 209, 215, 0.06);
  border-color: rgba(43, 209, 215, 0.15);
}

.upload-action-btn.primary:hover {
  background: rgba(43, 209, 215, 0.12);
  border-color: rgba(43, 209, 215, 0.35);
}

.btn-text {
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* 居中的提示信息 */
.upload-hints {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.hint-text {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.5);
  margin: 0 0 16px 0;
  letter-spacing: 0.01em;
}

.example-gallery {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.example-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.example-image {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  opacity: 0.4;
  filter: grayscale(20%);
  transition: all 0.3s;
}

.example-item:hover .example-image {
  opacity: 0.6;
  filter: grayscale(0);
}

.example-label {
  font-size: 11px;
  color: rgba(229, 233, 250, 0.45);
  letter-spacing: 0.02em;
}

/* 已上传文件预览 */
.uploaded-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.preview-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  font-size: 10px;
  color: rgba(250, 251, 255, 0.85);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-remove {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.25s;
}

.preview-item:hover .preview-remove {
  opacity: 1;
}

.preview-remove:hover {
  background: rgba(244, 63, 94, 0.9);
}

@media (max-width: 640px) {
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .upload-actions {
    flex-direction: column;
  }
  
  .example-gallery {
    gap: 16px;
  }
}
</style>
