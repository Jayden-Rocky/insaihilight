<template>
  <div class="tiktok-scene-wrap">
    <div class="scene-wrap-outer">
      <!-- 页面标题 -->
      <div class="title">TIKTOK带货视频</div>
      
      <form class="scene-wrap" @submit.prevent="handleSubmit">
        <!-- 产品信息 -->
        <div class="form-group form-group-row">
          <div class="section-title font-title-h4">产品信息</div>
          
          <div class="container">
            <!-- 产品图上传 -->
            <div class="m-import-media left">
              <span class="media-title">
                <span class="required">*</span>产品图 ({{ mediaFiles.length }}/9)
              </span>
              <div class="content">
                <div class="assets-wrap">
                  <div class="horizontal-asset-select" @click="handleUploadClick">
                    <svg aria-hidden="true" class="svg-icon icon" width="32" height="32">
                      <use xlink:href="#icon-menu-icon-image-studio"></use>
                    </svg>
                    <div class="horizontal-btn">
                      <span>点击/拖拽上传</span>
                    </div>
                    <div class="upload-asset-library">
                      从 <span class="upload-asset-library-special">素材库</span> 选择
                    </div>
                    <div class="example">
                      <div class="box">
                        <div class="item"><img src="https://static8.yingsaidata.com/wise-cut/img/6680846-1.png"></div>
                        <div class="item"><img src="https://static8.yingsaidata.com/wise-cut/img/9418984-2.png"></div>
                        <div class="item"><img src="https://static8.yingsaidata.com/wise-cut/img/7905430-3.png"></div>
                      </div>
                      <span>请上传同一产品的多角度图，角度越全效果越稳定</span>
                    </div>
                  </div>
                  
                  <!-- 已上传文件列表 -->
                  <div v-if="mediaFiles.length > 0" class="uploaded-files">
                    <div v-for="(file, index) in mediaFiles" :key="index" class="file-item">
                      <img v-if="file.type.startsWith('image/')" :src="file.url" class="preview-img">
                      <span class="file-name">{{ file.name }}</span>
                      <button type="button" class="remove-btn" @click.stop="removeFile(index)">×</button>
                    </div>
                  </div>
                </div>
              </div>
              <input 
                ref="fileInput"
                type="file" 
                accept="image/*" 
                multiple 
                style="display: none;"
                @change="handleFileChange"
              >
            </div>
            
            <!-- 产品名称和介绍 -->
            <div class="product-info-inputs">
              <div class="input-row">
                <span class="common-text">
                  <span class="required">*</span> 产品名称
                </span>
                <input 
                  v-model="formData.productName"
                  type="text" 
                  class="input m-cover" 
                  placeholder="请输入产品名称"
                >
              </div>
              <div class="textarea-row">
                <span class="common-text">
                  <span class="required">*</span>产品介绍
                </span>
                <textarea 
                  v-model="formData.productDesc"
                  class="textarea" 
                  rows="2" 
                  placeholder="请输入产品介绍"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 产品卖点 -->
        <div class="form-group form-group-row expandable-section" v-if="showSellingPoints">
          <div class="row-title">
            <div class="label font-title-h5">
              产品卖点 <span class="desc">（选填）</span>
            </div>
            <div class="right-placement" @click="showSellingPoints = false">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="textarea-container">
            <div class="textarea-with-tags">
              <textarea 
                v-model="formData.sellingPoints"
                class="arco-textarea" 
                placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
              ></textarea>
              <div class="tags-wrap"></div>
            </div>
          </div>
        </div>
        
        <!-- 目标受众 -->
        <div class="form-group form-group-row expandable-section" v-if="showTargetAudience">
          <div class="row-title">
            <div class="label font-title-h5">
              目标受众 <span class="desc">（选填）</span>
            </div>
            <div class="right-placement" @click="showTargetAudience = false">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="textarea-container">
            <div class="textarea-with-tags">
              <textarea 
                v-model="formData.targetAudience"
                class="arco-textarea" 
                placeholder="请输入目标受众，例如TikTok 用户，18–30 岁年轻人，偏好真实测评和快节奏内容"
              ></textarea>
              <div class="tags-wrap"></div>
            </div>
          </div>
        </div>
        
        <!-- 添加更多信息按钮 -->
        <div class="form-group form-group-row" v-if="!showSellingPoints || !showTargetAudience">
          <div class="sale-btn-group">
            <div v-if="!showSellingPoints" class="col" @click="showSellingPoints = true">
              <svg aria-hidden="true" class="svg-icon plus-icon" width="1em" height="1em">
                <use xlink:href="#icon-plus-bold"></use>
              </svg>
              <span class="text font-title-h5">产品卖点</span>
            </div>
            <div v-if="!showTargetAudience" class="col" @click="showTargetAudience = true">
              <svg aria-hidden="true" class="svg-icon plus-icon" width="1em" height="1em">
                <use xlink:href="#icon-plus-bold"></use>
              </svg>
              <span class="text font-title-h5">目标受众</span>
            </div>
          </div>
        </div>
        
        <!-- 其他创作想法 -->
        <div class="form-group form-group-row">
          <div class="row-title">
            <div class="label font-title-h5">
              其他创作想法 <span class="desc">（选填）</span>
            </div>
          </div>
          <div class="video-requirements">
            <div class="content">
              <div class="m-cover arco-textarea-wrapper">
                <textarea 
                  v-model="formData.otherIdeas"
                  class="arco-textarea" 
                  placeholder="可补充你对视频的其他想法，如风格偏好、节奏要求或需要避免的内容，例如：希望整体节奏偏快，画面真实一点，不要太广告感，避免夸张用语"
                ></textarea>
                <div class="arco-textarea-word-limit">{{ formData.otherIdeas.length }}/1000</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gap"></div>
      </form>
      
      <!-- 底部生成按钮区域 -->
      <div class="create-btn-wrap">
        <div class="form-group form-group-row">
          <div class="video-setting">
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
                    :class="{ active: selectedLanguage === lang }"
                    @click="selectLanguage(lang)"
                  >
                    {{ lang }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="select-wrapper" @click="toggleCountDropdown">
                  <span class="select-label">{{ selectedCount }}</span>
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-down" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
                    <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
                  </svg>
                </div>
                <div v-if="showCountDropdown" class="dropdown-menu">
                  <div 
                    v-for="count in counts" 
                    :key="count" 
                    class="dropdown-item"
                    :class="{ active: selectedCount === count }"
                    @click="selectCount(count)"
                  >
                    {{ count }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button type="button" class="star-points-btn" @click="handleSubmit">
          <span class="text">立即生成</span>
          <svg aria-hidden="true" class="svg-icon icon" width="14" height="14">
            <use xlink:href="#icon-cost-points"></use>
          </svg>
          <span class="points">188</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)

// 表单数据
const formData = reactive({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: '',
  otherIdeas: ''
})

// 显示控制
const showSellingPoints = ref(true)
const showTargetAudience = ref(true)

// 媒体文件
const mediaFiles = ref([])

// 语言选择
const languages = ['英语', '德语', '西班牙语', '法语', '日语', '葡萄牙语', '俄语', '中文']
const selectedLanguage = ref('英语')
const showLanguageDropdown = ref(false)

// 数量选择
const counts = ['1 个', '2 个', '3 个', '4 个']
const selectedCount = ref('1 个')
const showCountDropdown = ref(false)

// 切换下拉菜单
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
  showCountDropdown.value = false
}

const toggleCountDropdown = () => {
  showCountDropdown.value = !showCountDropdown.value
  showLanguageDropdown.value = false
}

const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  showLanguageDropdown.value = false
}

const selectCount = (count) => {
  selectedCount.value = count
  showCountDropdown.value = false
}

// 文件上传处理
const handleUploadClick = () => {
  fileInput.value?.click()
}

const handleFileChange = (e) => {
  const files = Array.from(e.target.files)
  files.forEach(file => {
    if (mediaFiles.value.length >= 9) return
    const url = URL.createObjectURL(file)
    mediaFiles.value.push({
      name: file.name,
      type: file.type,
      url: url,
      file: file
    })
  })
  // 清空input以便可以重复选择相同文件
  e.target.value = ''
}

const removeFile = (index) => {
  URL.revokeObjectURL(mediaFiles.value[index].url)
  mediaFiles.value.splice(index, 1)
}

// 提交处理
const handleSubmit = () => {
  if (!formData.productName.trim()) {
    alert('请输入产品名称')
    return
  }
  if (!formData.productDesc.trim()) {
    alert('请输入产品介绍')
    return
  }
  if (mediaFiles.value.length === 0) {
    alert('请上传至少一张产品图')
    return
  }
  
  console.log('提交表单:', {
    ...formData,
    mediaFiles: mediaFiles.value.map(f => f.name),
    language: selectedLanguage.value,
    count: selectedCount.value
  })
  alert('提交成功！正在生成视频...')
}

// 点击外部关闭下拉菜单
const handleClickOutside = (e) => {
  if (!e.target.closest('.select-wrapper') && !e.target.closest('.dropdown-menu')) {
    showLanguageDropdown.value = false
    showCountDropdown.value = false
  }
}

// 添加全局点击监听
if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
.tiktok-scene-wrap {
  min-height: 100vh;
  background: rgb(14, 14, 17);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
}

.scene-wrap-outer {
  width: 100%;
  max-width: 800px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: rgba(250, 251, 255, 0.95);
  margin-bottom: 32px;
  text-align: center;
}

.scene-wrap {
  background: transparent;
}

.form-group {
  margin-bottom: 24px;
  background: rgba(0, 0, 0, 0);
}

.form-group-row {
  width: 100%;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: rgb(250, 251, 255);
  margin-bottom: 16px;
}

.container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

/* 产品图上传 */
.m-import-media {
  margin-bottom: 20px;
}

.media-title {
  display: block;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 12px;
}

.required {
  color: #ef4444;
  margin-right: 4px;
}

.horizontal-asset-select {
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.horizontal-asset-select:hover {
  border-color: rgba(43, 209, 215, 0.4);
  background: rgba(43, 209, 215, 0.05);
}

.icon {
  color: rgba(250, 251, 255, 0.6);
  margin-bottom: 12px;
}

.horizontal-btn {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 8px;
}

.upload-asset-library {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.5);
  margin-bottom: 16px;
}

.upload-asset-library-special {
  color: #2bd1d7;
  cursor: pointer;
}

.example {
  margin-top: 16px;
}

.example .box {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.example .item {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0.6;
}

.example .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.example span {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.4);
}

/* 已上传文件 */
.uploaded-files {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.file-item {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4px 8px;
  font-size: 11px;
  color: rgba(250, 251, 255, 0.8);
  background: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.8);
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 产品信息输入 */
.product-info-inputs {
  margin-top: 20px;
}

.input-row {
  margin-bottom: 16px;
}

.common-text {
  display: block;
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 8px;
}

.input {
  width: 100%;
  height: 44px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 6px 12px;
  color: rgb(250, 251, 255);
  font-size: 14px;
  transition: all 0.3s;
}

.input:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
}

.input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.textarea-row {
  margin-bottom: 8px;
}

.textarea {
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

.textarea:focus {
  outline: none;
  border-color: rgba(43, 209, 215, 0.5);
}

.textarea::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

/* 可展开区域 */
.expandable-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
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
  line-height: 24px;
  color: rgb(250, 251, 255);
}

.desc {
  font-size: 14px;
  font-weight: normal;
  color: rgba(229, 233, 250, 0.6);
}

.right-placement {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: rgba(229, 233, 250, 0.5);
  transition: all 0.3s;
}

.right-placement:hover {
  color: #ef4444;
}

.remove-text {
  font-size: 14px;
}

.textarea-container {
  position: relative;
}

.textarea-with-tags {
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

.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

/* 添加按钮组 */
.sale-btn-group {
  display: flex;
  gap: 16px;
}

.col {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.col:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

.plus-icon {
  color: #2bd1d7;
}

.text {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
}

/* 其他创作想法 */
.video-requirements {
  margin-top: 12px;
}

.arco-textarea-wrapper {
  position: relative;
}

.arco-textarea-word-limit {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: rgba(229, 233, 250, 0.4);
}

.gap {
  height: 40px;
}

/* 底部按钮区域 */
.create-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.video-setting {
  width: 100%;
}

.video-setting .content {
  display: flex;
  gap: 16px;
  justify-content: center;
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

/* 生成按钮 */
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
  .tiktok-scene-wrap {
    padding: 20px 16px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .container {
    padding: 16px;
  }
  
  .sale-btn-group {
    flex-direction: column;
  }
  
  .video-setting .content {
    flex-direction: column;
    align-items: center;
  }
  
  .star-points-btn {
    width: 100%;
  }
}
</style>
