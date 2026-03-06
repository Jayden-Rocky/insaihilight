<template>
  <div class="product-display-ad-scene-wrap">
    <div class="scene-wrap-outer">
      <!-- 页面标题 -->
      <div class="title">产品使用展示广告</div>
      
      <form class="scene-wrap" @submit.prevent="handleSubmit">
        <!-- 产品信息 -->
        <div class="form-group form-group-row">
          <div class="section-title font-title-h4">
            产品信息
            <span class="import-url">
              <button type="button" class="btn m-cover btn-secondary" @click="handleImportFromUrl">
                <svg aria-hidden="true" class="svg-icon" width="16" height="16">
                  <use xlink:href="#icon-link"></use>
                </svg>
                从链接导入
              </button>
            </span>
          </div>
          
          <div class="container">
            <!-- 产品名称 -->
            <div class="box">
              <div class="field-row">
                <span class="required">*</span>
                <input 
                  v-model="formData.productName"
                  type="text" 
                  class="input m-cover" 
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
            
            <!-- 素材上传 -->
            <div class="media-upload">
              <div class="media-title">
                <span class="required">*</span>素材({{ mediaFiles.length }})
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
                    <div class="example-item">
                      <img src="https://static8.yingsaidata.com/wise-cut/img/8822226-example4.png">
                      <span>长图素材</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 产品卖点 -->
        <div class="form-group form-group-row">
          <div class="row-title">
            <div class="label font-title-h5">
              产品卖点 <span class="desc">（选填）</span>
            </div>
            <button type="button" class="remove-btn" @click="handleRemoveSellingPoints">
              <span>移除</span>
            </button>
          </div>
          <div class="textarea-container">
            <textarea 
              v-model="formData.sellingPoints"
              class="arco-textarea" 
              placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
            ></textarea>
          </div>
        </div>
        
        <!-- 投放版位 -->
        <div class="form-group form-group-row">
          <div class="section-title">投放版位</div>
          <div class="placement-options">
            <div 
              v-for="(option, index) in placementOptions" 
              :key="index"
              class="col"
              :class="{ 'actived': formData.placement === option }"
              @click="formData.placement = option"
            >
              <span class="text font-title-h5">{{ option }}</span>
            </div>
          </div>
        </div>
        
        <!-- 视频设置 -->
        <div class="form-group form-group-row">
          <div class="video-setting">
          <div class="section-title">视频设置</div>
            <div class="content">
              <div class="select-wrapper" @click.stop="toggleLanguageDropdown">
                <div class="select-label">
                  <span class="language">语言</span>
                  <span>{{ selectedLanguageLabel }}</span>
                </div>
                <svg aria-hidden="true" class="arco-icon-down" width="16" height="16">
                  <use xlink:href="#icon-down"></use>
                </svg>
                <div v-show="showLanguageDropdown" class="dropdown-menu">
                  <div 
                    v-for="lang in languageOptions" 
                    :key="lang.value"
                    class="dropdown-item"
                    :class="{ 'active': formData.language === lang.value }"
                    @click.stop="selectLanguage(lang.value)"
                  >
                    {{ lang.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gap"></div>
        
        <!-- 底部按钮 -->
        <div class="create-btn-wrap">
          <button type="submit" class="star-points-btn">
            <span class="text">开始创作</span>
            <svg aria-hidden="true" class="icon svg-icon" width="16" height="16">
              <use xlink:href="#icon-star"></use>
            </svg>
            <span class="points">10</span>
          </button>
        </div>
      </form>
    </div>
    
    <!-- 从链接导入弹窗 -->
    <Modal v-model:visible="showImportModal" title="从链接导入" @confirm="handleImportConfirm" @cancel="showImportModal = false">
      <div class="import-modal-content">
        <input 
          v-model="importUrl"
          type="text" 
          class="input m-cover" 
          placeholder="请输入商品链接"
        >
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import Modal from '../components/common/Modal.vue'

// 表单数据
const formData = reactive({
  productName: '',
  productDescription: '',
  sellingPoints: '',
  placement: 'YouTube Shorts',
  language: 'en'
})

// 媒体文件列表
const mediaFiles = ref<string[]>([])

// 下拉菜单状态
const showLanguageDropdown = ref(false)

// 导入弹窗状态
const showImportModal = ref(false)
const importUrl = ref('')

// 更多功能显示状态
const showProductFeatures = ref(false)

// 投放版位选项
const placementOptions = [
  'YouTube Shorts',
  'TikTok Ads',
  'Meta Feeds',
  'Meta Reels',
  '其他'
]

// 语言选项
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

// 计算当前选中语言的标签
const selectedLanguageLabel = computed(() => {
  const lang = languageOptions.find(l => l.value === formData.language)
  return lang ? lang.label : '英语'
})

// 切换语言下拉菜单
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
}

// 选择语言
const selectLanguage = (value: string) => {
  formData.language = value
  showLanguageDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.select-wrapper')) {
    showLanguageDropdown.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 处理从链接导入
const handleImportFromUrl = () => {
  showImportModal.value = true
}

// 确认导入
const handleImportConfirm = () => {
  console.log('导入链接:', importUrl.value)
  showImportModal.value = false
  // TODO: 调用API解析链接
}

// 本地上传
const handleUploadLocal = () => {
  console.log('本地上传')
  // TODO: 实现文件上传逻辑
}

// 从素材中心选择
const handleSelectFromCloud = () => {
  console.log('从素材中心选择')
  // TODO: 打开素材选择器
}

// 移除产品卖点
const handleRemoveSellingPoints = () => {
  formData.sellingPoints = ''
}

// 提交表单
const handleSubmit = () => {
  console.log('提交表单:', formData)
  // TODO: 调用API提交表单
}
</script>

<style scoped>
.product-display-ad-scene-wrap {
  min-height: 100vh;
  background: transparent;
  padding: 40px 20px;
}

.scene-wrap-outer {
  max-width: 1272px;
  margin: 0 auto;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: rgb(250, 251, 255);
  margin: 16px 236px 20px;
  width: 800px;
}

.scene-wrap {
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 0 236px 100px;
}

.form-group {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: rgb(250, 251, 255);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.import-url {
  margin-top: -24px;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 4px;
  color: rgb(250, 251, 255);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.box {
  position: relative;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 16px;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.required {
  color: rgb(249, 109, 106);
  font-size: 14px;
}

.input {
  flex: 1;
  background: transparent;
  border: none;
  color: rgb(250, 251, 255);
  font-size: 16px;
  outline: none;
}

.input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.desc-row {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
  line-height: 1.5;
}

.edit-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: rgba(229, 233, 250, 0.6);
  cursor: pointer;
  padding: 4px;
}

/* 素材上传区域 */
.media-upload {
  margin-top: 16px;
}

.media-title {
  font-size: 14px;
  color: rgb(250, 251, 255);
  margin-bottom: 12px;
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

.row-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: rgb(250, 251, 255);
}

.label .desc {
  font-size: 14px;
  font-weight: normal;
  color: rgba(229, 233, 250, 0.6);
}

.remove-btn {
  background: transparent;
  border: none;
  color: rgba(229, 233, 250, 0.6);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
}

.remove-btn:hover {
  color: rgb(249, 109, 106);
}

.textarea-container {
  position: relative;
}

.arco-textarea {
  width: 100%;
  min-height: 80px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 10px 12px;
  color: rgb(250, 251, 255);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;
}

.arco-textarea:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
}

.arco-textarea::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

/* 更多信息 */
.more-info-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-label {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
}

.info-tags {
  display: flex;
  gap: 12px;
}

.tag-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(250, 251, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

/* 投放版位 */
.placement-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.placement-options .col {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.placement-options .col:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

.placement-options .col.actived {
  background: rgba(43, 209, 215, 0.15);
  border-color: rgba(43, 209, 215, 0.5);
}

.placement-options .text {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
}

.placement-options .col.actived .text {
  color: #2bd1d7;
}

/* 视频设置 */
.video-setting {
  width: 100%;
}

.video-setting .content {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}

.select-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  min-width: 140px;
  position: relative;
}

.select-wrapper:hover {
  border-color: rgba(43, 209, 215, 0.3);
}

.select-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
}

.language {
  color: rgba(250, 251, 255, 0.6);
}

.arco-icon-down {
  width: 16px;
  height: 16px;
  color: rgba(250, 251, 255, 0.5);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: rgb(30, 30, 35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: rgba(43, 209, 215, 0.1);
}

.dropdown-item.active {
  background: rgba(43, 209, 215, 0.2);
  color: #2bd1d7;
}

.gap {
  height: 40px;
}

/* 底部按钮区域 */
.create-btn-wrap {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.star-points-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 320px;
  height: 44px;
  background: rgb(43, 209, 215);
  border: 1px solid transparent;
  border-radius: 8px;
  color: rgba(246, 247, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.star-points-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(43, 209, 215, 0.4);
}

.star-points-btn .text {
  font-weight: 600;
  color: rgb(9, 12, 20);
}

.star-points-btn .icon {
  color: rgb(9, 12, 20);
}

.star-points-btn .points {
  font-weight: 600;
  color: rgb(9, 12, 20);
}

/* 导入弹窗样式 */
.import-modal-content {
  padding: 20px 0;
}

.import-modal-content .input {
  width: 100%;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgb(250, 251, 255);
  font-size: 14px;
}

.import-modal-content .input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

@media (max-width: 768px) {
  .product-display-ad-scene-wrap {
    padding: 20px 16px;
  }
  
  .title {
    font-size: 24px;
    margin: 16px 0 20px;
    width: 100%;
  }
  
  .scene-wrap {
    width: 100%;
    margin: 0 0 50px;
  }
  
  .horizontal-buttons {
    flex-direction: column;
  }
  
  .placement-options {
    flex-direction: column;
  }
  
  .video-setting .content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .example-items {
    flex-wrap: wrap;
  }
}
</style>