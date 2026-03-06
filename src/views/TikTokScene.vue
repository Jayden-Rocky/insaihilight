<template>
  <SceneLayout 
    title="TIKTOK带货视频"
    submit-text="开始创建"
    :is-valid="isFormValid"
    @submit="handleSubmit"
  >
    <!-- 产品信息 -->
    <ProductInfo
      v-model:productName="formData.productName"
      v-model:productDesc="formData.productDesc"
      v-model:mediaFiles="mediaFiles"
      :show-description="true"
      :description-required="true"
      product-placeholder="请输入产品名称"
      desc-placeholder="请输入产品介绍"
    />
    
    <!-- 产品卖点（可展开） -->
    <ExpandableField
      title="产品卖点"
      v-if="showSellingPoints"
      @remove="showSellingPoints = false"
    >
      <textarea
        v-model="formData.sellingPoints"
        class="textarea"
        placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
      ></textarea>
    </ExpandableField>
    
    <!-- 目标受众（可展开） -->
    <ExpandableField
      title="目标受众"
      v-if="showTargetAudience"
      @remove="showTargetAudience = false"
    >
      <textarea
        v-model="formData.targetAudience"
        class="textarea"
        placeholder="请输入目标受众，例如TikTok 用户，18–30 岁年轻人，偏好真实测评和快节奏内容"
      ></textarea>
    </ExpandableField>
    
    <!-- 添加更多信息按钮 -->
    <div class="add-more-fields" v-if="!showSellingPoints || !showTargetAudience">
      <button 
        type="button" 
        class="add-field-btn" 
        v-if="!showSellingPoints"
        @click="showSellingPoints = true"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <span>产品卖点</span>
      </button>
      <button 
        type="button" 
        class="add-field-btn" 
        v-if="!showTargetAudience"
        @click="showTargetAudience = true"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <span>目标受众</span>
      </button>
    </div>
    
    <!-- 其他创作想法 -->
    <FormField title="其他创作想法">
      <div class="textarea-wrapper">
        <textarea
          v-model="formData.otherIdeas"
          class="textarea"
          placeholder="可补充你对视频的其他想法，如风格偏好、节奏要求或需要避免的内容"
          maxlength="1000"
        ></textarea>
        <div class="word-count">{{ formData.otherIdeas.length }}/1000</div>
      </div>
    </FormField>
    
    <!-- 视频设置 -->
    <div class="video-settings">
      <div class="section-title">视频设置</div>
      <div class="settings-row">
        <div class="setting-item">
          <div class="setting-label">语言</div>
          <select v-model="formData.language" class="select">
            <option value="中文">中文</option>
            <option value="英文">英文</option>
            <option value="日语">日语</option>
          </select>
        </div>
        <div class="setting-item">
          <div class="setting-label">视频时长</div>
          <select v-model="formData.duration" class="select">
            <option value="15s">15秒</option>
            <option value="30s">30秒</option>
            <option value="60s">60秒</option>
          </select>
        </div>
      </div>
    </div>
  </SceneLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import SceneLayout from '../components/scene/SceneLayout.vue'
import ProductInfo from '../components/scene/ProductInfo.vue'
import FormField from '../components/scene/FormField.vue'
import ExpandableField from '../components/scene/ExpandableField.vue'

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: '',
  otherIdeas: '',
  language: '中文',
  duration: '30s'
})

const mediaFiles = ref([])
const showSellingPoints = ref(false)
const showTargetAudience = ref(false)

const isFormValid = computed(() => {
  return formData.value.productName.trim() && 
         formData.value.productDesc.trim() &&
         mediaFiles.value.length > 0
})

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
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 16px;
}

.textarea {
  width: 100%;
  min-height: 80px;
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

.textarea-wrapper {
  position: relative;
}

.word-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.4);
}

.add-more-fields {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.add-field-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-field-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

.video-settings {
  margin-top: 32px;
}

.settings-row {
  display: flex;
  gap: 20px;
}

.setting-item {
  flex: 1;
}

.setting-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 8px;
}

.select {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 16px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.select:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
}
</style>
