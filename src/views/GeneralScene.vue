<template>
  <div class="general-scene-wrap">
    <div class="scene-wrap-outer">
      <form class="scene-wrap" @submit.prevent="handleSubmit">
        <!-- 页面标题 -->
        <div class="title font-title-display">确认你的创作需求</div>
        
        <!-- 产品信息 -->
        <div class="form-group product-info">
          <div class="title font-title-h4">产品信息</div>
          
          <!-- 从链接导入 -->
          <button type="button" class="import-url-btn" @click="handleImportUrl">
            <svg aria-hidden="true" class="svg-icon icon" width="1em" height="1em">
              <use xlink:href="#icon-attachment"></use>
            </svg>
            <span>从链接导入</span>
          </button>
          
          <div class="container">
            <div class="wrap">
              <div class="box">
                <div class="field-row">
                  <span class="required">*</span>
                  <input 
                    v-model="formData.productName"
                    type="text" 
                    class="input" 
                    placeholder="本次视频的产品或品牌名称，如防晒霜"
                  >
                </div>
                <div class="desc-row">
                  <span style="cursor: pointer;">
                    产品核心描述，例如夏季男士防晒霜，主打清爽不油腻，快速成膜，适合通勤、户外和运动场景
                    <svg aria-hidden="true" class="svg-icon" width="1em" height="1em">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </span>
                </div>
                <button type="button" class="edit-btn">
                  <svg aria-hidden="true" class="svg-icon" width="1em" height="1em">
                    <use xlink:href="#icon-edit"></use>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- 素材上传 -->
            <div class="media-upload">
              <div class="required-row">
                <span class="required">*</span>
                <span>素材({{ mediaFiles.length }})</span>
              </div>
              <div class="upload-area">
                <div class="horizontal-buttons">
                  <button type="button" class="upload-btn" @click="handleUploadLocal">
                    <svg aria-hidden="true" class="svg-icon" width="16" height="16">
                      <use xlink:href="#icon-upload-local-file"></use>
                    </svg>
                    <span>点击/拖拽上传</span>
                  </button>
                  <button type="button" class="upload-btn" @click="handleSelectFromCloud">
                    <svg aria-hidden="true" class="svg-icon" width="16" height="16">
                      <use xlink:href="#icon-import-cloud-file"></use>
                    </svg>
                    <span>从素材中心选择</span>
                  </button>
                </div>
                <div class="example-area">
                  <span class="desc">图片素材请使用的不同角度、多场景、清晰的产品图，请避免：</span>
                  <div class="example-items">
                    <div class="example-item">
                      <img src="https://static8.yingsaidata.com/wise-cut/img/8607196-example1.png">
                      <span>包含水印</span>
                    </div>
                    <div class="example-item">
                      <img src="https://static8.yingsaidata.com/wise-cut/img/522793-example2.png">
                      <span>包含文字</span>
                    </div>
                    <div class="example-item">
                      <img src="https://static8.yingsaidata.com/wise-cut/img/8273735-example3.png">
                      <span>多个产品</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 产品卖点 -->
        <div class="form-group">
          <div class="group-title">
            <span class="required">*</span>
            <span class="label">产品卖点</span>
          </div>
          <textarea 
            v-model="formData.sellingPoints"
            class="textarea" 
            placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
          ></textarea>
        </div>
        
        <!-- 目标受众 -->
        <div class="form-group">
          <div class="group-title">
            <span class="required">*</span>
            <span class="label">目标受众</span>
          </div>
          <textarea 
            v-model="formData.targetAudience"
            class="textarea" 
            placeholder="请输入目标受众，例如TikTok 用户，18–30 岁年轻人，偏好真实测评和快节奏内容"
          ></textarea>
        </div>
        
        <!-- 提交按钮 -->
        <div class="submit-area">
          <button type="submit" class="submit-btn" :disabled="!isFormValid">
            开始创建
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: ''
})

const mediaFiles = ref([])

const isFormValid = computed(() => {
  return formData.value.productName.trim() && 
         mediaFiles.value.length > 0 &&
         formData.value.sellingPoints.trim() &&
         formData.value.targetAudience.trim()
})

const handleImportUrl = () => {
  const url = prompt('请输入产品链接:')
  if (url) {
    console.log('导入链接:', url)
    alert('链接导入功能开发中...')
  }
}

const handleUploadLocal = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = 'image/*,video/*'
  input.onchange = (e) => {
    const files = Array.from(e.target.files)
    mediaFiles.value.push(...files)
    console.log('上传文件:', files.map(f => f.name))
  }
  input.click()
}

const handleSelectFromCloud = () => {
  alert('素材中心功能开发中...')
}

const handleSubmit = () => {
  if (!isFormValid.value) {
    alert('请填写所有必填项')
    return
  }
  
  console.log('提交表单:', formData.value)
  console.log('素材文件:', mediaFiles.value)
  alert('提交成功！功能开发中...')
}
</script>

<style scoped>
.general-scene-wrap {
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

.scene-wrap {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
}

.title.font-title-display {
  font-size: 32px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 32px;
  text-align: center;
}

.form-group {
  margin-bottom: 32px;
}

.form-group .title.font-title-h4 {
  font-size: 20px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 16px;
}

.import-url-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s;
}

.import-url-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

.container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

.wrap {
  margin-bottom: 20px;
}

.box {
  position: relative;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.required {
  color: #ef4444;
  font-size: 14px;
}

.input {
  flex: 1;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  transition: all 0.3s;
}

.input:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.desc-row {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
  margin-bottom: 12px;
}

.edit-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  background: transparent;
  border: none;
  color: rgba(250, 251, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn:hover {
  color: #2bd1d7;
}

.media-upload {
  margin-top: 20px;
}

.required-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(250, 251, 255, 0.9);
}

.upload-area {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 24px;
}

.horizontal-buttons {
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

.example-area {
  margin-top: 20px;
}

.example-area .desc {
  display: block;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.6);
  margin-bottom: 12px;
}

.example-items {
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

.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.label {
  font-size: 16px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
}

.textarea {
  width: 100%;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;
}

.textarea:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.textarea::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.submit-area {
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
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(43, 209, 215, 0.4);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .general-scene-wrap {
    padding: 20px;
  }
  
  .scene-wrap {
    padding: 24px;
  }
  
  .horizontal-buttons {
    flex-direction: column;
  }
}
</style>
