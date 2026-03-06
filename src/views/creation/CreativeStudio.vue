<template>
  <div class="creative-studio-page">
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
          <!-- 即将开放标签 -->
          <div class="coming-soon-tag">
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
              <span class="feature-icon purple">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2V9h-2V7h2zM4 19V5h14v14H4zm2-2h8v-6H6v6zm2-4h4v2H8v-2z"/>
                </svg>
              </span>
              多样化创意模板
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                覆盖电商、教育、娱乐等多个行业场景
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持一键套用，快速生成专业级视频
              </p>
            </div>
          </div>
          
          <!-- 功能区块2 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon orange">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                </svg>
              </span>
              灵活编辑工具
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                可视化时间轴编辑，精准控制每个元素
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持文字、图片、音频、视频混合编排
              </p>
            </div>
          </div>
          
          <!-- 功能区块3 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon green">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
              AI智能辅助
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                AI自动生成字幕、配音、背景音乐
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                智能推荐最佳转场和特效组合
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
            <div class="placeholder-visual">
              <!-- 创意工坊图标展示 -->
              <div class="studio-icon-grid">
                <div class="icon-item icon-1">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div class="icon-item icon-2">
                  <svg viewBox="0 0 24 24" width="36" height="36">
                    <path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                  </svg>
                </div>
                <div class="icon-item icon-3">
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <div class="icon-item icon-4">
                  <svg viewBox="0 0 24 24" width="38" height="38">
                    <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 15l5.5-4-5.5-4v8z"/>
                  </svg>
                </div>
              </div>
              <!-- 时间轴装饰 -->
              <div class="timeline-decoration">
                <div class="timeline-track"></div>
                <div class="timeline-marker marker-1"></div>
                <div class="timeline-marker marker-2"></div>
                <div class="timeline-marker marker-3"></div>
              </div>
            </div>
            
            <!-- 悬浮装饰元素 -->
            <div class="float-element float-1">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
              </svg>
            </div>
            <div class="float-element float-2">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div class="float-element float-3">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 15l5.5-4-5.5-4v8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部装饰波浪 -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z" fill="rgba(124, 58, 237, 0.03)"/>
        <path d="M0,32 C360,120 720,0 1080,80 C1260,120 1380,80 1440,64 L1440,120 L0,120 Z" fill="rgba(245, 158, 11, 0.02)"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const titles = ['创意工坊', '释放无限创意可能']
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
  alert('感谢您的关注！功能开放时我们会第一时间通知您。')
}
</script>

<style scoped>
.creative-studio-page {
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
  width: 450px;
  height: 450px;
  top: -80px;
  left: -80px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 70%);
  animation: float 22s ease-in-out infinite;
}

.light-2 {
  width: 380px;
  height: 380px;
  bottom: -100px;
  right: 5%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
  animation: float 28s ease-in-out infinite reverse;
}

.light-3 {
  width: 320px;
  height: 320px;
  top: 35%;
  right: 15%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  animation: pulse 18s ease-in-out infinite;
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
  background-size: 60px 60px;
  animation: gridMove 30s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
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
  gap: 20px;
}

/* 即将开放标签 */
.coming-soon-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 20px;
  width: fit-content;
  animation: tagGlow 3s ease-in-out infinite;
}

.tag-icon {
  color: #a78bfa;
}

.coming-soon-tag span {
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #a78bfa 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes tagGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.1); }
  50% { box-shadow: 0 0 30px rgba(124, 58, 237, 0.2); }
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
  padding: 18px 24px;
  transition: all 0.3s ease;
}

.feature-block:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(124, 58, 237, 0.2);
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

.feature-icon.purple {
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
}

.feature-icon.orange {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.feature-icon.green {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
  color: #a78bfa;
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
  background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 4px;
}

.notify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.35);
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
  background: radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, transparent 60%);
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
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 占位视觉元素 */
.placeholder-visual {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
}

.studio-icon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 20px;
}

.icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 16px;
  color: #a78bfa;
  transition: all 0.3s ease;
}

.icon-item:hover {
  background: rgba(124, 58, 237, 0.15);
  transform: scale(1.05);
}

.icon-1, .icon-4 {
  animation: iconFloat 4s ease-in-out infinite;
}

.icon-2, .icon-3 {
  animation: iconFloat 4s ease-in-out infinite 1s;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.timeline-decoration {
  width: 100%;
  max-width: 300px;
  position: relative;
  padding: 20px 0;
}

.timeline-track {
  height: 8px;
  background: rgba(124, 58, 237, 0.2);
  border-radius: 4px;
  position: relative;
}

.timeline-marker {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #7c3aed;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
}

.marker-1 { left: 10%; animation: markerPulse 2s ease-in-out infinite; }
.marker-2 { left: 50%; animation: markerPulse 2s ease-in-out infinite 0.5s; }
.marker-3 { left: 90%; animation: markerPulse 2s ease-in-out infinite 1s; }

@keyframes markerPulse {
  0%, 100% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.3); }
}

/* 悬浮装饰元素 */
.float-element {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(124, 58, 237, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 12px;
  color: #a78bfa;
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
  
  .image-frame {
    min-height: 300px;
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
  
  .studio-icon-grid {
    gap: 16px;
  }
  
  .float-element {
    display: none;
  }
}
</style>
