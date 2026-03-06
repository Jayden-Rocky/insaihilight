<template>
  <div class="product-management-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
      <div class="grid-pattern"></div>
    </div>
    
    <div class="content-container">
      <!-- 左侧内容 -->
      <div class="left-part">
        <div class="inner">
          <!-- 功能标签 -->
          <div class="feature-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" class="tag-icon">
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            <span>即将开放</span>
          </div>
          
          <!-- 动态标题 -->
          <div class="title-wrap">
            <h1 class="main-title" :key="currentTitleIndex">
              {{ titles[currentTitleIndex] }}
            </h1>
          </div>
          
          <!-- 功能区块1 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon blue">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
                </svg>
              </span>
              商品信息管理
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持批量导入和管理商品信息
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                智能识别商品属性，自动填充信息
              </p>
            </div>
          </div>
          
          <!-- 功能区块2 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon purple">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </span>
              素材资源库
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                统一管理商品图片、视频等素材
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持一键生成商品展示视频
              </p>
            </div>
          </div>
          
          <!-- 功能区块3 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon orange">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </span>
              智能分析
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                自动分析商品卖点，生成营销文案
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                追踪商品视频表现数据
              </p>
            </div>
          </div>
          
          <!-- 添加商品按钮 -->
          <button class="add-product-btn" @click="handleAddProduct">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span>添加商品</span>
          </button>
        </div>
      </div>
      
      <!-- 右侧展示区 -->
      <div class="right-part">
        <div class="image-container">
          <div class="image-glow"></div>
          <div class="image-frame">
            <!-- 商品列表预览 -->
            <div class="product-preview">
              <div class="preview-header">
                <h4>我的商品</h4>
                <span class="product-count">共 12 件</span>
              </div>
              
              <div class="product-list">
                <div class="product-item" v-for="item in sampleProducts" :key="item.id">
                  <div class="product-image">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                  <div class="product-info">
                    <span class="product-name">{{ item.name }}</span>
                    <span class="product-category">{{ item.category }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 悬浮装饰元素 -->
            <div class="float-element float-1">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"/>
              </svg>
            </div>
            <div class="float-element float-2">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            </div>
            <div class="float-element float-3">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部装饰波浪 -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#waveGradient)"/>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stop-color="rgba(16, 185, 129, 0.1)"/>
            <stop offset="50%" stop-color="rgba(124, 58, 237, 0.1)"/>
            <stop offset="100%" stop-color="rgba(245, 158, 11, 0.1)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 动态标题
const titles = ['商品管理中心', '一站式商品管理', '智能商品分析']
const currentTitleIndex = ref(0)

// 示例商品数据
const sampleProducts = ref([
  { id: 1, name: '智能手表 Pro', category: '电子产品' },
  { id: 2, name: '无线蓝牙耳机', category: '电子产品' },
  { id: 3, name: '时尚运动鞋', category: '服饰鞋包' },
  { id: 4, name: '护肤精华液', category: '美妆护肤' },
  { id: 5, name: '家用咖啡机', category: '家用电器' }
])

// 标题轮播
let titleInterval = null
onMounted(() => {
  titleInterval = setInterval(() => {
    currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
  }, 3000)
})

onUnmounted(() => {
  if (titleInterval) clearInterval(titleInterval)
})

// 方法
const handleAddProduct = () => {
  console.log('添加商品')
}
</script>

<style scoped>
.product-management-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f12 0%, #1a1a1f 50%, #0f0f12 100%);
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.light {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.light-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #10b981 0%, transparent 70%);
  top: -200px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.light-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
  bottom: -150px;
  left: -100px;
  animation: float 25s ease-in-out infinite reverse;
}

.light-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 15s ease-in-out infinite;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, -40px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.15); }
}

/* 内容容器 */
.content-container {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px;
  gap: 60px;
  min-height: calc(100vh - 120px);
}

/* 左侧内容 */
.left-part {
  flex: 1;
  max-width: 540px;
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 功能标签 */
.feature-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  width: fit-content;
  animation: tagGlow 3s ease-in-out infinite;
}

.tag-icon {
  color: #10b981;
}

.feature-tag span {
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes tagGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.1); }
  50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); }
}

/* 动态标题 */
.title-wrap {
  position: relative;
  height: 56px;
  overflow: hidden;
}

.main-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.85) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleSlide 0.6s ease-out;
}

@keyframes titleSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 功能区块 */
.feature-block {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px 24px;
  transition: all 0.3s ease;
}

.feature-block:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(16, 185, 129, 0.2);
  transform: translateX(8px);
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 14px 0;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #fff;
}

.feature-icon.blue {
  background: linear-gradient(135deg, #165dff 0%, #0d47a1 100%);
}

.feature-icon.purple {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
}

.feature-icon.orange {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 48px;
}

.feature-desc {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: rgba(229, 233, 250, 0.7);
  margin: 0;
  line-height: 1.6;
}

.desc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

/* 添加商品按钮 */
.add-product-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.add-product-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.35);
}

.add-product-btn:active {
  transform: translateY(0);
}

/* 右侧展示区 */
.right-part {
  flex: 1;
  max-width: 500px;
}

.image-container {
  position: relative;
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%);
  filter: blur(40px);
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
}

.image-frame {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 商品预览 */
.product-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.product-count {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 320px;
  overflow-y: auto;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: all 0.2s;
}

.product-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(16, 185, 129, 0.2);
}

.product-image {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.product-category {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 悬浮装饰元素 */
.float-element {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  color: #10b981;
  animation: floatElement 6s ease-in-out infinite;
}

.float-1 {
  top: -20px;
  right: 40px;
  width: 52px;
  height: 52px;
  animation-delay: 0s;
}

.float-2 {
  bottom: 80px;
  left: -30px;
  width: 44px;
  height: 44px;
  animation-delay: 1.5s;
}

.float-3 {
  bottom: 30px;
  right: 60px;
  width: 40px;
  height: 40px;
  animation-delay: 3s;
}

@keyframes floatElement {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

/* 底部波浪装饰 */
.wave-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  pointer-events: none;
}

.wave-decoration svg {
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
    padding: 40px 30px;
    gap: 40px;
  }
  
  .left-part,
  .right-part {
    max-width: 100%;
  }
  
  .main-title {
    font-size: 36px;
  }
}

@media (max-width: 640px) {
  .content-container {
    padding: 30px 20px;
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .title-wrap {
    height: 42px;
  }
  
  .feature-content {
    padding-left: 0;
  }
  
  .feature-block {
    padding: 16px 20px;
  }
  
  .float-element {
    display: none;
  }
}
</style>
