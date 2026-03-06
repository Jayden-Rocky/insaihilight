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
      :description-required="true"
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
            <option v-for="lang in languageOptions" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </option>
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
  language: 'en'
})

const mediaFiles = ref([])

const languageOptions = [
  { label: '德语', value: 'de' },
  { label: '英语', value: 'en' },
  { label: '西班牙语', value: 'es' },
  { label: '法语', value: 'fr' },
  { label: '日语', value: 'ja' },
  { label: '葡萄牙语', value: 'pt' },
  { label: '俄语', value: 'ru' },
  { label: '中文', value: 'zh' }
]

const placementOptions = [
  'YouTube Shorts',
  'TikTok Ads',
  'Meta Feeds',
  'Meta Reels',
  '其他'
]

const scriptStyles = [
  { text: '开箱体验', desc: '真实拆箱 + 第一印象点评，突出包装细节与品牌质感。' },
  { text: '教程指南', desc: '逐步教学式脚本，边用边讲功能与使用技巧，驱动转化与收藏。' },
  { text: '对比评测', desc: 'A/B 对照测试，同屏对比核心参数，引导理性购买。' },
  { text: '五秒抓眼', desc: '广告可跳过前精简 5 秒冲击钩子+品牌露出，抓住耐性低的观众。' },  
  { text: '购买理由', desc: '精炼列出 3–5 条核心卖点，结构化说服。' },
  { text: '案例研究', desc: '真实用引入真实客户场景及量化收益，用数据说服 B2B/B2C 受众。户反馈' }
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
