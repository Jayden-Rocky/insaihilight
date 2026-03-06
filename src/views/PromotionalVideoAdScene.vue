<template>
  <div class="promotional-video-ad-scene-wrap">
    <div class="scene-wrap-outer">
      <!-- 页面标题 -->
      <div class="title">促销视频广告</div>
      
      <form class="scene-wrap" @submit.prevent="handleSubmit">
        <!-- 产品信息 -->
        <div class="form-group form-group-row">
          <div class="section-title font-title-h4">
            产品信息
            <span class="import-url">
              <button type="button" class="btn m-cover btn-secondary" @click="handleImportFromUrl">
                <svg aria-hidden="true" class="svg-icon icon" width="1em" height="1em">
                  <use xlink:href="#icon-attachment"></use>
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
                  class="input m-cover input" 
                  placeholder="本次视频的产品或品牌名称，如防晒霜"
                >
              </div>
              <div class="desc-row">
                <span style="cursor: pointer;">
                  产品核心描述，例如夏季男士防晒霜，主打清爽不油腻，快速成膜，适合通勤、户外和运动场景
                  <svg aria-hidden="true" class="svg-icon" width="1em" height="1em" style="margin-top: -4px;">
                    <use xlink:href="#icon-edit"></use>
                  </svg>
                </span>
              </div>
              <button type="button" class="edit-btn product-info-edit-btn">
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
                  <button type="button" class="upload-btn horizontal-btn m-cover horizontal-btn" @click="handleUploadLocal">
                    <svg aria-hidden="true" class="svg-icon" width="16" height="16">
                      <use xlink:href="#icon-upload-local-file"></use>
                    </svg>
                    <span class="horizontal-btn-text">点击/拖拽上传</span>
                  </button>
                  <button type="button" class="upload-btn horizontal-btn m-cover horizontal-btn" @click="handleSelectFromCloud">
                    <svg aria-hidden="true" class="svg-icon" width="16" height="16">
                      <use xlink:href="#icon-import-cloud-file"></use>
                    </svg>
                    <span class="horizontal-btn-text">从素材中心选择</span>
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
        
        <!-- 产品卖点（可移除） -->
        <div class="form-group form-group-row" v-if="showSellingPoints">
          <div class="row-title">
            <div class="label font-title-h5">
              产品卖点 <span class="desc"></span>
            </div>
            <div class="right-placement" @click="showSellingPoints = false">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="textarea-container" component_name="2">
            <div class="textarea-with-tags">
              <textarea 
                v-model="formData.sellingPoints"
                class="arco-textarea" 
                placeholder="请输入产品卖点，例如：主动降噪效果明显，续航时间长，可连续使用 30 小时，佩戴舒适不夹耳"
                style="height: 44px; resize: none; overflow: hidden;"
              ></textarea>
              <div class="tags-wrap"></div>
            </div>
          </div>
        </div>
        
        <!-- 目标受众（可移除） -->
        <div class="form-group form-group-row" v-if="showTargetAudience">
          <div class="row-title">
            <div class="label font-title-h5">
              目标受众 <span class="desc"></span>
            </div>
            <div class="right-placement" @click="showTargetAudience = false">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="textarea-container" component_name="3">
            <div class="textarea-with-tags">
              <textarea 
                v-model="formData.targetAudience"
                class="arco-textarea" 
                placeholder="请输入目标受众，例如TikTok 用户，18–30 岁年轻人，偏好真实测评和快节奏内容"
                style="height: 44px; resize: none; overflow: hidden;"
              ></textarea>
              <div class="tags-wrap"></div>
            </div>
          </div>
        </div>
        
        <!-- 促销优惠 -->
        <div class="form-group form-group-row">
          <div class="row-title">
            <div class="label font-title-h5">
              促销优惠 <span class="desc"></span>
            </div>
            <div class="right-placement" @click="handleRemovePromotion">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="promotion-discount" component_name="4">
            <div class="price-row">
              <div class="originprice-col">
                <div class="label font-title-h6">
                  <span class="required">*</span> 原价
                </div>
                <div class="input-with-prefix m-cover">
                  <span class="prefix">$</span>
                  <input 
                    v-model="formData.originalPrice"
                    type="text" 
                    class="input" 
                  >
                </div>
              </div>
              <div class="promotionprice-col">
                <div class="label font-title-h6">
                  <span class="required">*</span> 促销价
                </div>
                <div class="input-with-prefix m-cover">
                  <span class="prefix">$</span>
                  <input 
                    v-model="formData.promotionPrice"
                    type="text" 
                    class="input" 
                  >
                </div>
              </div>
              <div class="date-col">
                <div class="label font-title-h6">促销日期</div>
                <div class="date-picker m-cover">
                  <input placeholder="开始日期" class="date-input">
                  <span class="separator">-</span>
                  <input placeholder="结束日期" class="date-input">
                </div>
              </div>
            </div>
            <div class="case">
              <div class="label font-title-h6">促销优惠方案描述</div>
              <div class="textarea-with-tags">
                <textarea 
                  v-model="formData.promotionDesc"
                  class="arco-textarea no-padding" 
                  placeholder="填写本次促销的主要优惠亮点，例如限时 15% 折扣，活动期间包邮，新用户可叠加使用"
                  style="height: 44px; resize: none; overflow: hidden;"
                ></textarea>
                <div class="tags-wrap">
                  <div class="tag" @click="addTag('Free shipping')">
                    <svg aria-hidden="true" class="svg-icon plus-bold" width="1em" height="1em">
                      <use xlink:href="#icon-plus-bold"></use>
                    </svg>
                    <span class="font-caption tag-text">Free shipping</span>
                  </div>
                  <div class="tag" @click="addTag('New users:15% off')">
                    <svg aria-hidden="true" class="svg-icon plus-bold" width="1em" height="1em">
                      <use xlink:href="#icon-plus-bold"></use>
                    </svg>
                    <span class="font-caption tag-text">New users:15% off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 营销节点 -->
        <div class="form-group form-group-row">
          <div class="row-title">
            <div class="label font-title-h5">
              营销节点 <span class="desc"></span>
            </div>
            <div class="right-placement" @click="handleRemoveMarketingNode">
              <svg aria-hidden="true" class="svg-icon close" width="1em" height="1em">
                <use xlink:href="#icon-close"></use>
              </svg>
              <span class="remove-text font-body-3">移除</span>
            </div>
          </div>
          <div class="marketing-festival" component_name="5">
            <div class="festival-selector" @click.stop="toggleFestivalDropdown">
              <span class="festival-text">{{ formData.marketingNode || '💘 情人节' }}</span>
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-down" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
                <path d="M39.6 17.557 24.043 33.114 8.486 17.557"></path>
              </svg>
            </div>
            <div v-if="showFestivalDropdown" class="dropdown-menu festival-dropdown">
              <div 
                v-for="(festival, index) in festivalOptions" 
                :key="index"
                class="dropdown-item"
                :class="{ 'active': formData.marketingNode === festival }"
                @click="selectFestival(festival)"
              >
                {{ festival }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 更多信息 -->
        <div class="form-group form-group-row">
          <div class="more-info-section">
            <div class="section-label font-title-h5">更多信息</div>
            <div class="info-tags">
              <div class="tag-item" @click="showSellingPoints = true" v-if="!showSellingPoints">
                <svg aria-hidden="true" class="svg-icon plus-icon" width="1em" height="1em">
                  <use xlink:href="#icon-plus-bold"></use>
                </svg>
                <span class="text font-title-h5">产品卖点</span>
              </div>
              <div class="tag-item" @click="showTargetAudience = true" v-if="!showTargetAudience">
                <svg aria-hidden="true" class="svg-icon plus-icon" width="1em" height="1em">
                  <use xlink:href="#icon-plus-bold"></use>
                </svg>
                <span class="text font-title-h5">目标受众</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 投放版位 -->
        <div class="form-group form-group-row">
          <div class="section-title font-title-h5">投放版位</div>
          <div class="placement-options">
            <div 
              v-for="(option, index) in placementOptions" 
              :key="index"
              class="col"
              :class="{ 'actived': formData.placement.includes(option) }"
              @click="togglePlacement(option)"
            >
              <span class="text font-title-h5">{{ option }}</span>
            </div>
          </div>
        </div>
        
        <!-- 视频设置 -->
        <div class="form-group form-group-row">
          <div class="video-setting" component_name="6">
            <div class="section-title font-title-h4">视频设置</div>
            <div class="content">
              <div class="select-wrapper" @click.stop="toggleLanguageDropdown">
                <span class="select-label">{{ formData.language }}</span>
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="arco-icon arco-icon-down" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
                  <path d="M39.6 17.557 24.043 33.114 8.486 17.557"></path>
                </svg>
                <div v-if="showLanguageDropdown" class="dropdown-menu">
                  <div 
                    v-for="(lang, index) in languageOptions" 
                    :key="index"
                    class="dropdown-item"
                    :class="{ 'active': formData.language === lang }"
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
    </div>
    
    <!-- 底部按钮区域 -->
    <div class="create-btn-wrap">
      <button type="button" class="star-points-btn m-cover" @click="handleSubmit">
        <span class="icon">
          <svg aria-hidden="true" class="svg-icon" width="16" height="16">
            <use xlink:href="#icon-magic-wand"></use>
          </svg>
        </span>
        <span class="text">一键成片</span>
        <span class="points">488</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 表单数据
const formData = reactive({
  productName: '',
  productDesc: '',
  sellingPoints: '',
  targetAudience: '',
  originalPrice: '',
  promotionPrice: '',
  promotionStartDate: '',
  promotionEndDate: '',
  promotionDesc: '',
  marketingNode: '💘 情人节',
  placement: ['YouTube Shorts'],
  language: '英语'
})

// 显示控制
const showSellingPoints = ref(false)
const showTargetAudience = ref(false)

// 媒体文件
const mediaFiles = ref<string[]>([])

// 下拉菜单显示状态
const showLanguageDropdown = ref(false)
const showFestivalDropdown = ref(false)

// 选项数据
const placementOptions = ['YouTube Shorts', 'TikTok Ads', 'Meta Feeds', 'Meta Reels', '其他']
const languageOptions = ['英语', '中文', '日语', '韩语', '法语', '德语', '西班牙语']
const festivalOptions = ['💘 情人节', '🎄 圣诞节', '🎃 万圣节', '🛍️ 黑色星期五', '🎁 双十一', '🎉 新年']

// 切换语言下拉
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
  showFestivalDropdown.value = false
}

// 选择语言
const selectLanguage = (lang: string) => {
  formData.language = lang
  showLanguageDropdown.value = false
}

// 切换节日下拉
const toggleFestivalDropdown = () => {
  showFestivalDropdown.value = !showFestivalDropdown.value
  showLanguageDropdown.value = false
}

// 选择节日
const selectFestival = (festival: string) => {
  formData.marketingNode = festival
  showFestivalDropdown.value = false
}

// 切换投放版位
const togglePlacement = (option: string) => {
  const index = formData.placement.indexOf(option)
  if (index > -1) {
    formData.placement.splice(index, 1)
  } else {
    formData.placement.push(option)
  }
}

// 添加标签到促销描述
const addTag = (tag: string) => {
  if (formData.promotionDesc) {
    formData.promotionDesc += '，' + tag
  } else {
    formData.promotionDesc = tag
  }
}

// 处理从链接导入
const handleImportFromUrl = () => {
  console.log('从链接导入')
}

// 处理本地上传
const handleUploadLocal = () => {
  console.log('本地上传')
}

// 处理从素材中心选择
const handleSelectFromCloud = () => {
  console.log('从素材中心选择')
}

// 处理移除促销优惠
const handleRemovePromotion = () => {
  console.log('移除促销优惠')
}

// 处理移除营销节点
const handleRemoveMarketingNode = () => {
  console.log('移除营销节点')
}

// 处理提交
const handleSubmit = () => {
  console.log('提交表单', formData)
}

// 点击外部关闭下拉菜单
const handleClickOutside = () => {
  showLanguageDropdown.value = false
  showFestivalDropdown.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.promotional-video-ad-scene-wrap {
  width: 100%;
  min-height: 100vh;
  background: rgb(14, 14, 17);
  padding: 40px;
  box-sizing: border-box;
}

.scene-wrap-outer {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: rgb(250, 251, 255);
  margin: 24px 0 32px;
  width: 800px;
}

.scene-wrap {
  width: 800px;
  margin: 0 auto 50px;
}

.form-group {
  margin-bottom: 24px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: bold;
  color: rgb(250, 251, 255);
  margin-bottom: 16px;
}

.font-title-h4 {
  font-size: 18px;
  font-weight: bold;
}

.font-title-h5 {
  font-size: 16px;
  font-weight: bold;
}

.font-title-h6 {
  font-size: 14px;
  font-weight: bold;
}

.font-body-3 {
  font-size: 14px;
}

.font-caption {
  font-size: 12px;
}

.import-url {
  margin-left: auto;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(43, 209, 215, 0.3);
}

.btn .icon {
  width: 16px;
  height: 16px;
}

.required {
  color: rgb(249, 109, 106);
  margin-right: 4px;
}

.container {
  margin-top: 16px;
}

.box {
  position: relative;
  margin-bottom: 16px;
}

.field-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.input {
  flex: 1;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  color: rgb(250, 251, 255);
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.input:focus {
  border-color: rgba(43, 209, 215, 0.5);
}

.input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.desc-row {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.7);
  line-height: 1.6;
}

.edit-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(229, 233, 250, 0.6);
  cursor: pointer;
  padding: 4px;
}

.media-title {
  font-size: 14px;
  color: rgb(250, 251, 255);
  margin-bottom: 12px;
}

.horizontal-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  height: 40px;
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

.right-placement {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(229, 233, 250, 0.6);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  transition: all 0.3s;
}

.right-placement:hover {
  color: rgb(249, 109, 106);
}

.right-placement .close {
  width: 16px;
  height: 16px;
}

.textarea-container {
  position: relative;
}

.textarea-with-tags {
  position: relative;
}

.arco-textarea {
  width: 100%;
  min-height: 44px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 10px 12px;
  color: rgb(250, 251, 255);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;
  box-sizing: border-box;
}

.arco-textarea.no-padding {
  padding: 10px 12px;
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
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.tag {
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

.tag:hover {
  background: rgba(43, 209, 215, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
}

.tag .plus-bold {
  width: 12px;
  height: 12px;
  color: rgba(43, 209, 215, 0.8);
}

/* 促销优惠样式 */
.promotion-discount {
  width: 100%;
}

.price-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.originprice-col,
.promotionprice-col {
  flex: 1;
}

.date-col {
  flex: 1.5;
}

.price-row .label {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 8px;
}

.input-with-prefix {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  overflow: hidden;
}

.input-with-prefix .prefix {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(250, 251, 255, 0.6);
  font-size: 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.input-with-prefix .input {
  flex: 1;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: rgb(250, 251, 255);
  font-size: 14px;
  outline: none;
}

.date-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 0 12px;
}

.date-picker .date-input {
  flex: 1;
  padding: 10px 0;
  background: transparent;
  border: none;
  color: rgb(250, 251, 255);
  font-size: 14px;
  outline: none;
}

.date-picker .date-input::placeholder {
  color: rgba(229, 233, 250, 0.4);
}

.date-picker .separator {
  color: rgba(250, 251, 255, 0.5);
}

.case {
  margin-top: 16px;
}

.case .label {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
  margin-bottom: 8px;
}

/* 营销节点样式 */
.marketing-festival {
  position: relative;
}

.festival-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  min-width: 140px;
}

.festival-selector:hover {
  border-color: rgba(43, 209, 215, 0.3);
}

.festival-text {
  font-size: 14px;
  color: rgba(250, 251, 255, 0.9);
}

.arco-icon-down {
  width: 16px;
  height: 16px;
  color: rgba(250, 251, 255, 0.5);
}

.festival-dropdown {
  top: calc(100% + 4px);
  left: 0;
  min-width: 160px;
}

/* 更多信息 */
.more-info-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-label {
  font-size: 16px;
  font-weight: bold;
  color: rgb(250, 251, 255);
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

.plus-icon {
  width: 14px;
  height: 14px;
  color: rgba(43, 209, 215, 0.8);
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
  padding-bottom: 60px;
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
  .promotional-video-ad-scene-wrap {
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
  
  .price-row {
    flex-direction: column;
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