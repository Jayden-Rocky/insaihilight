<template>
  <div class="video-generator-wrap">
    <!-- 背景视频 -->
    <div class="intelligent-analysis-wrapper ghost">
      <div class="main-block">ghost</div>
    </div>
    <div class="intelligent-analysis-wrapper main">
      <div class="main-block">
        <div class="background-video">
          <div class="video-box">
            <video 
              class="video" 
              loop 
              muted 
              autoplay 
              poster="https://static8.yingsaidata.com/wise-cut/img/jimeng-2025-04-12-951-%E6%B0%B4%E5%9C%A8%E7%A7%BB%E5%8A%A8.webp"
            >
              <source src="https://static8.yingsaidata.com/static/img/video.mp4" type="video/mp4">
            </video>
            <div class="video-shadow"></div>
          </div>
          <div class="light left-light"></div>
          <div class="light right-light"></div>
        </div>

        <!-- 主内容 -->
        <div class="main-content">
          <!-- 标题区域 -->
          <div class="header-wrap">
            <div class="title">
              <span class="title-text">创意无限，一键成片</span>
            </div>
          </div>

          <!-- 输入区域 -->
          <div class="main-input-box-wrap">
            <!-- 初始显示的输入框 -->
            <div class="display-input-wrap" :class="{ 'hide': isExpanded }">
              <div class="input-box">
                <span class="display-content">
                  <span class="empty">你可以从脚本、需求Brief或商品链接开始创作视频</span>
                </span>
                <button class="main-btn" @click="handleExpand">
                  <img :src="defaultIcon" class="icon default" />
                  <span>智能解析</span>
                </button>
              </div>
              <span class="or">或</span>
              <button class="add-assets-btn" @click="goToGeneralScene">
                手动创建
              </button>
            </div>

            <!-- 展开后的输入区域 -->
            <div class="main-input-wrap" :class="{ 'show': isExpanded }">
              
              <!-- 文件上传区域（暂时隐藏） -->
              <div class="header-wrap" style="display: none;">
                <div class="file-manager-wrap">
                  <div class="filelist list-wrap"></div>
                  <input 
                    type="file" 
                    ref="fileInput"
                    accept=".doc,.docx,.pdf,.txt,.xlsx,.xls"
                    style="display: none;"
                    @change="handleFileSelect"
                  />
                  <button class="upload-btn" @click="$refs.fileInput.click()">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4">
                      <path d="M14.93 17.071 24.001 8l9.071 9.071m-9.07 16.071v-25M40 35v6H8v-6"/>
                    </svg>
                    <span>点击上传</span>
                  </button>
                </div>
              </div>

              <!-- 文本输入区域 -->
              <div class="main-wrap">
                <div class="textarea-wrap">
                  <div class="textarea-box">
                    <span class="placeholder" v-if="!inputText">输入你的营销需求</span>
                    <div 
                      class="editable" 
                      contenteditable="true"
                      @input="handleInput"
                      ref="editableDiv"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- 底部按钮 -->
              <div class="footer-wrap">
                <div class="left-part">
                  <button class="add-btn add-file" @click="handleUploadDoc">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    <span>需求文档</span>
                  </button>
                  <button class="add-btn add-link" @click="handleAddLink">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                    <span>添加链接</span>
                  </button>
                </div>
                <div class="right-part">
                  <button class="main-btn" :class="{ 'loading': isLoading }" :disabled="isLoading" @click="handleParse">
                    <img :src="isLoading ? loadingIcon : defaultIcon" class="icon default" :class="{ 'run': isLoading }" />
                    <span>智能解析</span>
                  </button>
                  <button class="back-btn" @click="handleCollapse">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                    <span>返回</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 场景列表 -->
        <div class="scene-list-wrap" style="margin-top: 30px;">
          <div class="list-wrap">
            <div 
              v-for="(scene, index) in scenes" 
              :key="index" 
              class="scene-item"
              @click="handleSceneClick(scene, index)"
            >
              <div class="cover-img-box">
                <img class="cover-img" :src="scene.cover" alt="cover">
              </div>
              <div class="footer">
                <h4 class="scene-item-title">{{ scene.title }}</h4>
                <div class="scene-item-desc">{{ scene.desc }}</div>
              </div>
              <img v-if="scene.hot" class="deco" src="https://static8.yingsaidata.com/wise-cut/img/1362404-hot.png" alt="deco">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const isExpanded = ref(false)
const inputText = ref('')
const editableDiv = ref(null)

const defaultIcon = 'https://static8.yingsaidata.com/static/img/default-loading-ligt.png'
const loadingIcon = 'https://static8.yingsaidata.com/static/img/loading-light.gif'

const scenes = [
  {
    title: 'TIKTOK带货视频',
    desc: '快节奏、聚焦卖点，提升内容的吸引力，促进带货转化效果',
    cover: 'https://static8.yingsaidata.com/wise-cut/img/9560121-TikTok.png',
    hot: true,
    path: '/scene/tiktok-scene'
  },
  {
    title: 'AI原生广告',
    desc: '生成贴合目标版位内容特性的广告视频',
    cover: 'https://static8.yingsaidata.com/wise-cut/img/1%402x.webp',
    hot: false,
    path: '/scene/ai-original-ad-scene'
  },
  {
    title: '产品使用展示广告',
    desc: '无口播内容，全方位动态展示你的商品',
    cover: 'https://static8.yingsaidata.com/wise-cut/img/3%402x.webp',
    hot: false,
    path: '/scene/product-display-ad-scene'
  },
  {
    title: '促销视频广告',
    desc: '突出商品促销信息，促进转化效果',
    cover: 'https://static8.yingsaidata.com/wise-cut/img/5%402x.webp',
    hot: false,
    path: '/scene/promotional-video-ad-scene'
  }
]

// 展开输入区域
const handleExpand = () => {
  isExpanded.value = true
  nextTick(() => {
    if (editableDiv.value) {
      editableDiv.value.focus()
    }
  })
}

const handleCollapse = () => {
  isExpanded.value = false
  inputText.value = ''
}

// 跳转到general-scene页面
const goToGeneralScene = () => {
  router.push('/scene/general-scene')
}

// 处理输入
const handleInput = (e) => {
  inputText.value = e.target.textContent
}

// 处理解析
const handleParse = () => {
  if (!inputText.value.trim()) {
    alert('请输入您的营销需求')
    return
  }
  
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('智能解析功能开发中...')
  }, 2000)
}

// 上传需求文档
const handleUploadDoc = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.doc,.docx,.pdf,.txt,.xlsx,.xls'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('上传文件:', file.name)
      alert(`已选择文件: ${file.name}`)
    }
  }
  input.click()
}

// 添加链接
const handleAddLink = () => {
  const link = prompt('请输入商品链接:')
  if (link) {
    console.log('添加链接:', link)
    alert(`已添加链接: ${link}`)
  }
}

// 选择文件
const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    console.log('选择文件:', file.name)
  }
}

// 点击场景
const handleSceneClick = (scene, index) => {
  if (scene.path) {
    router.push(scene.path)
  } else {
    alert(`已选择场景: ${scene.title}`)
  }
}

</script>

<style scoped>
.video-generator-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.intelligent-analysis-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.intelligent-analysis-wrapper.ghost {
  visibility: hidden;
}

.intelligent-analysis-wrapper.main {
  visibility: visible;
}

.main-block {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 背景视频 */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.video-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-box video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-shadow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to top, rgba(14, 14, 17, 1) 0%, rgba(14, 14, 17, 0) 100%);
  pointer-events: none;
}

.light {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  pointer-events: none;
}

.left-light {
  top: 10%;
  left: 10%;
  background: radial-gradient(circle, rgba(43, 209, 215, 0.4) 0%, transparent 70%);
}

.right-light {
  bottom: 20%;
  right: 10%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%);
}

/* 主内容 */
.main-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  max-width: 960px;
  width: 100%;
  margin-top: -60px;
}

.header-wrap {
  text-align: center;
  margin-bottom: 56px;
}

.title {
  margin-bottom: 20px;
}

.title-text {
  font-size: 52px;
  font-weight: 700;
  background: linear-gradient(135deg, #2bd1d7 0%, #7c3aed 50%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  text-shadow: 0 0 60px rgba(43, 209, 215, 0.3);
}

.tips {
  font-size: 18px;
  color: rgba(229, 233, 250, 0.8);
  letter-spacing: 0.02em;
}

/* 输入区域 */
.main-input-box-wrap {
  width: 100%;
  background: rgba(14, 14, 17, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 28px;
  backdrop-filter: blur(20px);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* 初始显示的输入框 */
.display-input-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.display-input-wrap.hide {
  display: none;
}

.input-box {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgb(250, 251, 255);
  border: 2px solid transparent;
  border-radius: 14px;
  padding: 0 4px 0 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-box:hover {
  border-color: rgba(43, 209, 215, 0.6);
  box-shadow: 0 4px 16px rgba(43, 209, 215, 0.15);
}

.display-content {
  flex: 1;
  color: rgb(9, 12, 20);
  font-size: 14px;
  padding: 12px 0;
}

.empty {
  color: rgba(9, 12, 20, 0.5);
}

.main-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 28px;
  height: 44px;
  background: rgb(14, 14, 17);
  border: none;
  border-radius: 10px;
  color: rgb(250, 251, 255);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.main-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.main-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.main-btn .icon {
  width: 18px;
  height: 18px;
}

.main-btn .icon.run {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.or {
  color: rgba(229, 233, 250, 0.5);
  font-size: 14px;
}

.add-assets-btn {
  padding: 0 28px;
  height: 48px;
  background: rgb(43, 209, 215);
  border: none;
  border-radius: 10px;
  color: rgb(9, 12, 20);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.add-assets-btn:hover {
  opacity: 0.85;
}

/* 展开后的输入区域 */
.main-input-wrap {
  visibility: hidden;
  position: absolute;
  z-index: -1;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.main-input-wrap.show {
  visibility: visible;
  position: relative;
  z-index: 1;
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 28px;
  height: 44px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: rgba(250, 251, 255, 0.85);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.back-btn:hover {
  opacity: 0.85;
  border-color: rgba(255, 255, 255, 0.25);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.main-wrap {
  margin-bottom: 20px;
}

.textarea-wrap {
  width: 100%;
}

.textarea-box {
  position: relative;
  min-height: 140px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.textarea-box:hover {
  border-color: rgba(43, 209, 215, 0.4);
  background: rgba(255, 255, 255, 0.1);
}

.placeholder {
  color: rgba(229, 233, 250, 0.4);
  font-size: 14px;
  pointer-events: none;
}

.editable {
  min-height: 100px;
  color: rgb(250, 251, 255);
  font-size: 14px;
  outline: none;
  word-wrap: break-word;
}

/* 底部按钮 */
.footer-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 16px;
  flex-wrap: wrap;
}

.left-part {
  display: flex;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
}

.right-part {
  display: flex;
  gap: 12px;
  align-items: center;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(250, 251, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.add-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(43, 209, 215, 0.3);
  color: #2bd1d7;
  transform: translateY(-1px);
}

.svg-icon {
  width: 18px;
  height: 18px;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(43, 209, 215, 0.1);
  border: 1px solid rgba(43, 209, 215, 0.3);
  border-radius: 8px;
  color: #2bd1d7;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  background: rgba(43, 209, 215, 0.2);
}

.upload-btn svg {
  width: 18px;
  height: 18px;
}

/* 场景列表 */
.scene-list-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: 0 40px;
  margin-top: 60px;
}

.list-wrap {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.scene-item {
  position: relative;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.scene-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border-color: rgba(43, 209, 215, 0.3);
}

.cover-img-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center 30%;
  transition: transform 0.3s;
}

.scene-item:hover .cover-img {
  transform: scale(1.05);
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
}

.scene-item-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(250, 251, 255, 0.95);
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.scene-item-desc {
  font-size: 12px;
  color: rgba(229, 233, 250, 0.6);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.deco {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: auto;
}
</style>
