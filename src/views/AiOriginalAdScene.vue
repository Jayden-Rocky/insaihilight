<template>
  <div class="ai-original-ad-scene-wrap">
    <div class="scene-wrap-outer">
      <!-- 页面标题 -->
      <div class="title">AI原生广告</div>
      
      <form class="scene-wrap" @submit.prevent="handleSubmit">
        <!-- 产品信息 -->
        <div class="form-group form-group-row">
          <div class="section-title font-title-h4">产品信息</div>
          
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
        
        <!-- 脚本风格 -->
        <div class="form-group form-group-row">
          <div class="section-title">脚本风格</div>
          <div class="script-style-wrap">
            <div 
              v-for="(style, index) in scriptStyles" 
              :key="index"
              class="item"
              :class="{ 'actived': formData.scriptStyle === style.text }"
              @click="formData.scriptStyle = style.text"
            >
              <span class="text">{{ style.text }}</span>
              <div class="arco-typography sub-text">{{ style.subText }}</div>
            </div>
          </div>
        </div>
        
        <!-- 视频设置 -->
        <div class="form-group form-group-row">
          <div class="video-setting">
            <div class="title font-title-h4">视频设置</div>
            <div class="content">
              <div class="col">
                <div class="select-wrapper" @click="toggleLanguageDropdown">
                  <span class="select-label">
                    <svg aria-hidden="true" class="svg-icon language" width="1em" height="1em">
                      <use xlink:href="#icon-language"></use>
                    </svg>
                    {{ selectedLanguage }}
                  </span>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-down" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
                    <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
                  </svg>
                </div>
                <div v-if="showLanguageDropdown" class="dropdown-menu">
                  <div 
                    v-for="lang in languages" 
                    :key="lang" 
                    class="dropdown-item"
                    :class="{ 'active': selectedLanguage === lang }"
                    @click="selectLanguage(lang)"
                  >
                    {{ lang }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gap"></div>
      </form>
      
      <!-- 底部生成按钮区域 -->
      <div class="create-btn-wrap">
        <button type="button" class="star-points-btn" @click="handleSubmit">
          <span class="text">一键成片</span>
          <svg aria-hidden="true" class="svg-icon icon" width="14" height="14">
            <use xlink:href="#icon-cost-points"></use>
          </svg>
          <span class="points">488</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  placement: 'YouTube Shorts',
  scriptStyle: '开箱体验'
})

const mediaFiles = ref([])

const selectedLanguage = ref('英语')
const showLanguageDropdown = ref(false)

const languages = ['英语', '中文', '日语', '韩语', '德语', '法语', '西班牙语']

const placementOptions = [
  'YouTube Shorts',
  'TikTok Ads', 
  'Meta Feeds',
  'Meta Reels',
  '其他'
]

const scriptStyles = [
  { text: '开箱体验', subText: '真实拆箱 + 第一印象点评，突出包装细节与品牌质感。' },
  { text: '教程指南', subText: '逐步教学式脚本，边用边讲功能与使用技巧，驱动转化与...' },
  { text: '对比评测', subText: 'A/B 对照测试，同屏对比核心参数，引导理性购买。' },
  { text: '五秒抓眼', subText: '广告可跳过前精简 5 秒冲击钩子+品牌露出，抓住耐性低...' },
  { text: '购买理由', subText: '精炼列出 3–5 条核心卖点，结构化说服。' },
  { text: '案例研究', subText: '引入真实客户场景及量化收益，用数据说服 B2B/B2C ...' }
]

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  showLanguageDropdown.value = false
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
  console.log('提交表单:', formData.value)
  console.log('素材文件:', mediaFiles.value)
  alert('一键成片功能开发中...')
}
</script>

<style scoped>
.ai-original-ad-scene-wrap {
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

.title {
  font-size: 28px;
  font-weight: bold;
  line-height: 36px;
  color: rgb(250, 251, 255);
  margin-bottom: 24px;
}

.scene-wrap {
  background: transparent;
}

.form-group {
  margin-bottom: 24px;
}

.form-group-row {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: rgb(250, 251, 255);
  margin-bottom: 16px;
}

.container {
  background: transparent;
  border: none;
  padding: 0;
}

.box {
  position: relative;
  margin-bottom: 20px;
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

.media-title {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
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

.desc {
  font-size: 14px;
  font-weight: normal;
  color: rgba(229, 233, 250, 0.6);
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

/* 脚本风格 */
.script-style-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-height: 184px;
  overflow-y: auto;
}

.script-style-wrap .item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.script-style-wrap .item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

.script-style-wrap .item.actived {
  background: rgba(43, 209, 215, 0.15);
  border-color: rgba(43, 209, 215, 0.5);
}

.script-style-wrap .text {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 8px;
}

.script-style-wrap .item.actived .text {
  color: #2bd1d7;
}

.script-style-wrap .sub-text {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.5);
  line-height: 1.4;
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

@media (max-width: 768px) {
  .ai-original-ad-scene-wrap {
    padding: 20px 16px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .horizontal-buttons {
    flex-direction: column;
  }
  
  .script-style-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .placement-options {
    flex-direction: column;
  }
  
  .video-setting .content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>