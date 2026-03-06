<template>
  <SceneLayout 
    title="确认你的创作需求"
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
    <FormField title="产品卖点" required>
      <textarea
        v-model="formData.sellingPoints"
        class="textarea"
        placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
      ></textarea>
    </FormField>
    
    <!-- 目标受众 -->
    <FormField title="目标受众" required>
      <textarea
        v-model="formData.targetAudience"
        class="textarea"
        placeholder="请输入目标受众，例如TikTok 用户，18–30 岁年轻人，偏好真实测评和快节奏内容"
      ></textarea>
    </FormField>
    
    <!-- 视频时长 -->
    <FormField title="视频时长" required>
      <ButtonGroup
        v-model="formData.videoDuration"
        :options="durationOptions"
      />
    </FormField>
    
    <!-- 视频尺寸 -->
    <FormField title="视频尺寸" required>
      <ButtonGroup
        v-model="formData.videoRatio"
        :options="ratioOptions"
      />
    </FormField>
    
    <!-- 语言设置 -->
    <FormField title="语言" required>
      <SelectField
        v-model="formData.language"
        :options="languageOptions"
      />
    </FormField>
    
    <!-- 镜头和水印 - 独立表单项 -->
    <SwitchField
      v-model="formData.enableWatermark"
      title="镜头和水印"
      hint="开启后将在视频中添加品牌水印"
    />
    
    <!-- 其他创作想法 -->
    <FormField title="其他创作想法">
      <textarea
        v-model="formData.additionalIdeas"
        class="textarea"
        placeholder="可补充你对视频的其他想法，如风格偏好、节奏要求或需要避免的内容，例如：希望整体节奏偏快，画面真实一点，不要太广告感，避免夸张用语"
        rows="4"
      ></textarea>
    </FormField>
  </SceneLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SceneLayout from '../components/scene/SceneLayout.vue'
import ProductInfo from '../components/scene/ProductInfo.vue'
import FormField from '../components/scene/FormField.vue'
import ButtonGroup from '../components/scene/ButtonGroup.vue'
import SelectField from '../components/scene/SelectField.vue'
import SwitchField from '../components/scene/SwitchField.vue'

const router = useRouter()

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: '',
  videoDuration: '30',
  videoRatio: '9:16',
  language: 'zh-CN',
  enableWatermark: false,
  additionalIdeas: ''
})

const mediaFiles = ref([])

// 视频时长选项
const durationOptions = [
  { value: '15', label: '15秒' },
  { value: '30', label: '30秒' },
  { value: '60', label: '60秒' }
]

// 视频尺寸选项
const ratioOptions = [
  { value: '9:16', label: '竖屏 9:16' },
  { value: '16:9', label: '横屏 16:9' },
  { value: '1:1', label: '方形 1:1' }
]

// 语言选项
const languageOptions = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en-US', label: '英语' },
  { value: 'es-ES', label: '西班牙语' },
  { value: 'fr-FR', label: '法语' },
  { value: 'ja-JP', label: '日语' },
  { value: 'pt-BR', label: '葡萄牙语' },
  { value: 'ru-RU', label: '俄语' }
]

const isFormValid = computed(() => {
  return formData.value.productName.trim() && 
         mediaFiles.value.length > 0 &&
         formData.value.sellingPoints.trim() &&
         formData.value.targetAudience.trim()
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
</style>
