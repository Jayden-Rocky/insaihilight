<template>
  <div class="avatar-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
      <div class="mesh-gradient"></div>
    </div>
    
    <div class="content-container">
      <!-- 左侧内容 -->
      <div class="left-part">
        <div class="inner">
          <!-- 即将开放标签 -->
          <div class="coming-soon-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" class="tag-icon">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
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
              <span class="feature-icon coral">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </span>
              真人克隆复刻
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                仅需3分钟视频即可生成数字分身
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持多角度、多表情精准还原
              </p>
            </div>
          </div>
          
          <!-- 功能区块2 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon amber">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
              </span>
              语音驱动口型
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                AI自动匹配口型与表情，自然流畅
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持多语言、多音色合成配音
              </p>
            </div>
          </div>
          
          <!-- 功能区块3 -->
          <div class="feature-block">
            <h3 class="feature-title">
              <span class="feature-icon rose">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
              </span>
              一键批量生成
            </h3>
            <div class="feature-content">
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                输入文案即可批量生成数字人视频
              </p>
              <p class="feature-desc">
                <span class="desc-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
                支持自定义背景、服装、动作
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
            <div class="avatar-visual">
              <!-- 数字人形象装饰 -->
              <div class="avatar-silhouette">
                <svg viewBox="0 0 200 260" width="200" height="260">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#f97316;stop-opacity:0.8" />
                      <stop offset="50%" style="stop-color:#ec4899;stop-opacity:0.6" />
                      <stop offset="100%" style="stop-color:#f43f5e;stop-opacity:0.4" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <ellipse cx="100" cy="60" rx="45" ry="50" fill="url(#avatarGrad)" filter="url(#glow)"/>
                  <path d="M30 260 Q30 140 100 120 Q170 140 170 260" fill="url(#avatarGrad)" opacity="0.6"/>
                </svg>
              </div>
              <!-- 扫描线动画 -->
              <div class="scan-line"></div>
              <!-- 数据节点 -->
              <div class="data-nodes">
                <div class="node node-1">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93V19h4v2H8v-2h4v-3.07z"/>
                  </svg>
                </div>
                <div class="node node-2">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div class="node node-3">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12z"/>
                  </svg>
                </div>
              </div>
            </div>
            <!-- 悬浮装饰元素 -->
            <div class="float-element float-1">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="float-element float-2">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
            </div>
            <div class="float-element float-3">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6s6-2.69 6-6h2c0 4.08-3.06 7.44-7 7.93V19h4v2H8v-2h4v-3.07z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部装饰波浪 -->
    <div class="wave-decoration">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 80C1248 70 1344 50 1392 40L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="rgba(249, 115, 22, 0.03)"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const titles = ['AI数字人', '虚拟形象', '智能分身']
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
  // TODO: 实现通知订阅逻辑
  console.log('订阅通知')
}
</script>

<style scoped>
/* 页面容器 */
.avatar-page {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
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
  top: -10%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.light-2 {
  top: 50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.light-3 {
  bottom: -20%;
  left: 30%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%);
  animation: pulse 15s ease-in-out infinite;
}

.mesh-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(at 40% 20%, rgba(249, 115, 22, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.06) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(244, 63, 94, 0.05) 0px, transparent 50%);
  animation: meshMove 30s ease-in-out infinite;
}

@keyframes meshMove {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(50px, -50px); }
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
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 20px;
  width: fit-content;
  animation: tagGlow 3s ease-in-out infinite;
}

.tag-icon {
  color: #f97316;
}

.coming-soon-tag span {
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes tagGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.1); }
  50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.2); }
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
  border-color: rgba(249, 115, 22, 0.2);
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

.feature-icon.coral {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
}

.feature-icon.amber {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.feature-icon.rose {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
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
  color: #fb923c;
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
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 4px;
}

.notify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(249, 115, 22, 0.35);
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
  background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(236, 72, 153, 0.1) 40%, transparent 60%);
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
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 数字人视觉元素 */
.avatar-visual {
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-silhouette {
  animation: avatarPulse 4s ease-in-out infinite;
}

@keyframes avatarPulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.03); opacity: 1; }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.8), transparent);
  animation: scanMove 3s linear infinite;
}

@keyframes scanMove {
  0% { top: 10%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}

.data-nodes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.node {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(249, 115, 22, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 50%;
  color: #fb923c;
  animation: nodeFloat 5s ease-in-out infinite;
}

.node-1 { top: 20%; left: 10%; animation-delay: 0s; }
.node-2 { top: 50%; right: 5%; animation-delay: 1.5s; }
.node-3 { bottom: 15%; left: 15%; animation-delay: 3s; }

@keyframes nodeFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.05); }
}

/* 悬浮装饰元素 */
.float-element {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(249, 115, 22, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
  color: #fb923c;
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
  
  .avatar-visual {
    min-height: 280px;
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
  
  .avatar-silhouette svg {
    width: 150px;
    height: 200px;
  }
}
</style>
