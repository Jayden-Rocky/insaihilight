<template>
  <SceneLayout 
    title="AI原生广告"
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
      :description-required="false"
    />
    
    <!-- 产品卖点 -->
    <FormField title="产品卖点">
      <textarea
        v-model="formData.sellingPoints"
        class="textarea"
        placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
      ></textarea>
    </FormField>
    
    <!-- 投放版位 -->
    <div class="section-group">
      <div class="section-title">投放版位</div>
      <div class="option-grid">
        <div 
          v-for="option in placementOptions" 
          :key="option"
          class="option-item"
          :class="{ 'active': formData.placement === option }"
          @click="formData.placement = option"
        >
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
    
    <!-- 脚本风格 -->
    <div class="section-group">
      <div class="section-title">脚本风格</div>
      <div class="style-grid">
        <div 
          v-for="style in scriptStyles" 
          :key="style.text"
          class="style-item"
          :class="{ 'active': formData.scriptStyle === style.text }"
          @click="formData.scriptStyle = style.text"
        >
          <span class="style-text">{{ style.text }}</span>
          <span class="style-desc">{{ style.desc }}</span>
        </div>
      </div>
    </div>
    
    <!-- 视频设置 -->
    <div class="section-group">
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

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  placement: '信息流',
  scriptStyle: '原生种草',
  language: '中文',
  duration: '30s'
})

const mediaFiles = ref([])

const placementOptions = [
  '信息流',
  '开屏',
  '激励视频',
  '原生广告',
  'Banner'
]

const scriptStyles = [
  { text: '原生种草', desc: '真实自然的种草风格' },
  { text: '剧情演绎', desc: '有故事情节的视频' },
  { text: '产品展示', desc: '突出产品特点' },
  { text: '用户证言', desc: '真实用户反馈' }
]

const isFormValid = computed(() => {
  return formData.value.productName.trim() && 
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
.section-group {
  margin-bottom: 32px;
}

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

.option-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-item {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

.option-item.active {
  background: rgba(43, 209, 215, 0.15);
  border-color: rgba(43, 209, 215, 0.5);
  color: #2bd1d7;
}

.style-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.style-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.style-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

.style-item.active {
  background: rgba(43, 209, 215, 0.15);
  border-color: rgba(43, 209, 215, 0.5);
}

.style-text {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 4px;
}

.style-desc {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.6);
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
