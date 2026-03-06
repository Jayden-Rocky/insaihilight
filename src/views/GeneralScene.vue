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
      :show-description="false"
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
  </SceneLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SceneLayout from '../components/scene/SceneLayout.vue'
import ProductInfo from '../components/scene/ProductInfo.vue'
import FormField from '../components/scene/FormField.vue'

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
