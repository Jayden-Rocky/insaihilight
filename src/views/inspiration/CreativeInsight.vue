<template>
  <div class="creative-insight-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
    </div>
    
    <div class="content-container">
      <!-- 左侧内容 -->
      <div class="left-part">
        <div class="inner">
          <!-- 即将开放标签 -->
          <div class="coming-soon-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" class="tag-icon">
              <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
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
              <span class="feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
                </svg>
              </span>
              丰富的标签筛选
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                创意收集后模型智能识别生成标签
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持通过标签筛选创意进行查看分析
              </p>
            </div>
          </div>
          
          <!-- 功能区块2 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </span>
              创意解构与分析
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                对单个创意的视频内容进行切片和内容理解
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                详细拆解创意的组成和玩法
              </p>
            </div>
          </div>
          
          <!-- 订阅提醒按钮 -->
          <button class="notify-btn" @click="handleNotify">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <span>开放时通知我</span>
          </button>
        </div>
      </div>
      
      <!-- 右侧展示图 -->
      <div class="right-part">
        <div class="image-container">
          <div class="image-glow"></div>
          <div class="image-frame">
            <img 
              src="https://static8.yingsaidata.com/wise-cut/img/custom/cover-creative-insight.webp" 
              alt="创意洞察"
              class="cover-image"
            />
            <!-- 悬浮装饰元素 -->
            <div class="float-element float-1">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="currentColor" d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
              </svg>
            </div>
            <div class="float-element float-2">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <div class="float-element float-3">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部装饰波浪 -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z" fill="rgba(43, 209, 215, 0.03)"/>
        <path d="M0,32 C360,120 720,0 1080,80 C1260,120 1380,80 1440,64 L1440,120 L0,120 Z" fill="rgba(124, 58, 237, 0.02)"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const titles = ['汇聚优秀创意', '激发你的创作灵感']
const currentTitleIndex = ref(0)
let titleInterval = null

onMounted(() => {
  titleInterval = setInterval(() => {
    currentTitleIndex.value = (currentTitleIndex.value + 1) % titles.length
  }, 3000)
})

onUnmounted(() => {
  if (titleInterval) {
    clearInterval(titleInterval)
  }
})

const handleNotify = () => {
  // 这里可以添加订阅通知的逻辑
  alert('感谢您的关注！功能开放时我们会第一时间通知您。')
}
</script>

<style scoped>
.creative-insight-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0e0e11;
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
  filter: blur(100px);
}

.light-1 {
  width: 500px;
  height: 500px;
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(43, 209, 215, 0.15) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.light-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: 10%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.light-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: 20%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
  animation: pulse 15s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, -40px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.15); }
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
  padding: 40px 60px;
  gap: 60px;
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

/* 即将开放标签 */
.coming-soon-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(43, 209, 215, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
  border: 1px solid rgba(43, 209, 215, 0.3);
  border-radius: 20px;
  width: fit-content;
  animation: tagGlow 3s ease-in-out infinite;
}

.tag-icon {
  color: #2bd1d7;
}

.coming-soon-tag span {
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #2bd1d7 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes tagGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(43, 209, 215, 0.1); }
  50% { box-shadow: 0 0 30px rgba(43, 209, 215, 0.2); }
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
  border-color: rgba(43, 209, 215, 0.2);
  transform: translateX(8px);
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 16px 0;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%);
  border-radius: 10px;
  color: #fff;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  color: #2bd1d7;
  flex-shrink: 0;
  margin-top: 2px;
}

/* 通知按钮 */
.notify-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.notify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(43, 209, 215, 0.35);
}

.notify-btn:active {
  transform: translateY(0);
}

/* 右侧展示图 */
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
  background: radial-gradient(circle, rgba(43, 209, 215, 0.15) 0%, transparent 60%);
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
  padding: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.cover-image {
  width: 100%;
  height: auto;
  border-radius: 16px;
  display: block;
}

/* 悬浮装饰元素 */
.float-element {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(43, 209, 215, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(43, 209, 215, 0.3);
  border-radius: 12px;
  color: #2bd1d7;
  animation: floatElement 6s ease-in-out infinite;
}

.float-1 {
  top: -20px;
  right: 40px;
  width: 56px;
  height: 56px;
  animation-delay: 0s;
}

.float-2 {
  bottom: 60px;
  left: -30px;
  width: 48px;
  height: 48px;
  animation-delay: 1s;
}

.float-3 {
  bottom: -10px;
  right: 80px;
  width: 40px;
  height: 40px;
  animation-delay: 2s;
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
