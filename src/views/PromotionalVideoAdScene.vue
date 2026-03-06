<template>
  <SceneLayout 
    title="促销视频广告"
    submit-text="开始创作"
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
    
    <!-- 促销信息 -->
    <div class="section-group">
      <div class="section-title">促销信息</div>
      
      <!-- 价格行 -->
      <div class="price-row">
        <div class="price-field">
          <div class="field-label">
            <span class="required">*</span>
            <span>原价</span>
          </div>
          <div class="price-input">
            <span class="currency">$</span>
            <input
              v-model="formData.originalPrice"
              type="text"
              class="input"
              placeholder="0.00"
            >
          </div>
        </div>
        
        <div class="price-field">
          <div class="field-label">
            <span class="required">*</span>
            <span>促销价</span>
          </div>
          <div class="price-input">
            <span class="currency">$</span>
            <input
              v-model="formData.promotionPrice"
              type="text"
              class="input"
              placeholder="0.00"
            >
          </div>
        </div>
      </div>
      
      <!-- 促销日期 -->
      <div class="date-field">
        <div class="field-label">
          <span>促销日期</span>
        </div>
        <div class="date-range-picker">
          <DatePicker
            v-model="formData.startDate"
            placeholder="开始日期"
          />
          <span class="date-separator">—</span>
          <DatePicker
            v-model="formData.endDate"
            placeholder="结束日期"
            :min-date="formData.startDate"
          />
        </div>
      </div>
      
      <!-- 促销优惠方案描述 -->
      <div class="promotion-desc">
        <div class="field-label">促销优惠方案描述</div>
        <textarea
          v-model="formData.promotionDesc"
          class="textarea"
          placeholder="填写本次促销的主要优惠亮点，例如限时 15% 折扣，活动期间包邮，新用户可叠加使用"
        ></textarea>
        <div class="quick-tags">
          <button type="button" class="quick-tag" @click="addPromotionTag('Free shipping')">
            + Free shipping
          </button>
          <button type="button" class="quick-tag" @click="addPromotionTag('New users: 15% off')">
            + New users: 15% off
          </button>
        </div>
      </div>
    </div>
    
    <!-- 营销节点 -->
    <div class="section-group">
      <div class="section-title">营销节点</div>
      <select v-model="formData.marketingNode" class="select">
        <option v-for="festival in festivalOptions" :key="festival" :value="festival">
          {{ festival }}
        </option>
      </select>
    </div>
    
    <!-- 更多信息 -->
    <div class="section-group" v-if="!showSellingPoints || !showTargetAudience">
      <div class="section-title">更多信息</div>
      <div class="add-more-fields">
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
    </div>
    
    <!-- 投放版位 -->
    <div class="section-group">
      <div class="section-title">投放版位</div>
      <div class="option-grid">
        <div 
          v-for="option in placementOptions" 
          :key="option"
          class="option-item"
          :class="{ 'active': formData.placement.includes(option) }"
          @click="togglePlacement(option)"
        >
          <span>{{ option }}</span>
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
import ExpandableField from '../components/scene/ExpandableField.vue'
import DatePicker from '../components/common/DatePicker.vue'

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: '',
  originalPrice: '',
  promotionPrice: '',
  startDate: '',
  endDate: '',
  promotionDesc: '',
  marketingNode: '💘 情人节',
  placement: [],
  language: 'en'
})

const mediaFiles = ref([])
const showSellingPoints = ref(false)
const showTargetAudience = ref(false)

const festivalOptions = [
  '💘 情人节',
  '🎉 新年',
  '🎄 圣诞节',
  '🎃 万圣节',
  '🦃 感恩节',
  '🎊 春节',
  '🌕 中秋节',
  '🎈 其他节日'
]

const placementOptions = [
  'YouTube Shorts',
  'TikTok Ads',
  'Meta Feeds',
  'Meta Reels',
  '其他'
]

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

const isFormValid = computed(() => {
  return formData.value.productName.trim() && 
         mediaFiles.value.length > 0 &&
         formData.value.originalPrice.trim() &&
         formData.value.promotionPrice.trim()
})

const addPromotionTag = (tag) => {
  if (formData.value.promotionDesc) {
    formData.value.promotionDesc += ', ' + tag
  } else {
    formData.value.promotionDesc = tag
  }
}

const togglePlacement = (option) => {
  const index = formData.value.placement.indexOf(option)
  if (index > -1) {
    formData.value.placement.splice(index, 1)
  } else {
    formData.value.placement.push(option)
  }
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
.section-group {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 16px;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(250, 251, 255, 0.9);
}

.required {
  color: #ef4444;
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

/* 价格行布局 */
.price-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.price-field {
  flex: 0 0 160px;
}

.price-input {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.currency {
  padding: 0 14px;
  font-weight: 600;
  color: rgba(229, 233, 250, 0.6);
  font-size: 14px;
}

.input {
  flex: 1;
  height: 44px;
  background: transparent;
  border: none;
  padding: 0 14px 0 4px;
  color: rgba(250, 251, 255, 0.95);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.input:focus {
  outline: none;
}

.price-input:focus-within {
  border-color: rgba(43, 209, 215, 0.5);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(43, 209, 215, 0.1);
}

.input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

/* 日期字段 */
.date-field {
  margin-bottom: 16px;
}

.date-range-picker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-separator {
  color: rgba(229, 233, 250, 0.5);
  font-size: 14px;
  font-weight: 500;
  padding: 0 4px;
  flex-shrink: 0;
}

.promotion-desc {
  margin-top: 16px;
}

.quick-tags {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.quick-tag {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(250, 251, 255, 0.8);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
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

.add-more-fields {
  display: flex;
  gap: 16px;
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

@media (max-width: 768px) {
  .price-row {
    flex-direction: column;
  }
  
  .price-field {
    flex: 1 1 auto;
    width: 100%;
  }
  
  .date-range-picker {
    flex-direction: column;
    align-items: stretch;
  }
  
  .date-separator {
    text-align: center;
    padding: 8px 0;
  }
}
</style>
