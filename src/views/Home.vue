<template>
  <div class="home">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="light light-1"></div>
      <div class="light light-2"></div>
      <div class="light light-3"></div>
    </div>
    
    <div class="content">
      <!-- Logo -->
      <div class="logo-section">
        <img src="https://static8.yingsaidata.com/wise-cut/img/2744442-logo.svg" alt="inSai Hilight" class="logo" />
        <h1 class="title">inSai Hilight</h1>
      </div>
      
      <!-- 主标题 -->
      <h2 class="subtitle">AI原生营销视频多智能体平台</h2>
      
      <!-- 特性介绍 -->
      <div class="features">
        <div class="feature-item" v-for="feature in features" :key="feature.id">
          <div class="feature-icon" :style="{ background: feature.gradient }">
            <component :is="feature.icon" />
          </div>
          <div class="feature-text">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- CTA 按钮 -->
      <div class="cta-section">
        <button class="primary-btn" @click="$router.push('/creation/video-generator')">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
          </svg>
          <span>立即开始创作</span>
        </button>
        <button class="secondary-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>了解更多</span>
        </button>
      </div>
      
      <!-- 统计数据 -->
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">10,000+</span>
          <span class="stat-label">活跃用户</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">50,000+</span>
          <span class="stat-label">视频生成</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">98%</span>
          <span class="stat-label">用户满意度</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

// 图标组件
const VideoIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' })
])

const AIIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z' })
])

const TemplateIcon = () => h('svg', { viewBox: '0 0 24 24', width: 24, height: 24 }, [
  h('path', { fill: 'currentColor', d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' })
])

const features = ref([
  {
    id: 1,
    title: '智能成片',
    description: 'AI 自动生成高质量营销视频',
    icon: VideoIcon,
    gradient: 'linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%)'
  },
  {
    id: 2,
    title: '多智能体协作',
    description: '多个 AI Agent 协同创作',
    icon: AIIcon,
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
  },
  {
    id: 3,
    title: '丰富模板',
    description: '海量行业模板一键套用',
    icon: TemplateIcon,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  }
])
</script>

<style scoped>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #0e0e11;
  overflow: hidden;
}

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
  top: -200px;
  left: -200px;
  background: radial-gradient(circle, rgba(43, 209, 215, 0.6) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.light-2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -150px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.light-3 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%);
  animation: pulse 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  max-width: 1000px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.logo {
  width: 64px;
  height: 64px;
}

.title {
  font-size: 42px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #2bd1d7 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 24px;
  color: rgba(229, 233, 250, 0.8);
  margin: 0 0 48px 0;
  font-weight: 400;
}

.features {
  display: flex;
  gap: 24px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  width: 280px;
  transition: all 0.3s;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(43, 209, 215, 0.3);
  transform: translateY(-4px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
  flex-shrink: 0;
}

.feature-text h3 {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px 0;
}

.feature-text p {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
  margin: 0;
  line-height: 1.5;
}

.cta-section {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.primary-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #2bd1d7 0%, #1a8a8f 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(43, 209, 215, 0.4);
}

.secondary-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  background: transparent;
  border: 1px solid rgba(43, 209, 215, 0.3);
  border-radius: 12px;
  color: #2bd1d7;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-btn:hover {
  background: rgba(43, 209, 215, 0.1);
  border-color: rgba(43, 209, 215, 0.5);
}

.stats {
  display: flex;
  gap: 48px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #2bd1d7 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.6);
}

@media (max-width: 768px) {
  .features {
    flex-direction: column;
    align-items: center;
  }
  
  .feature-item {
    width: 100%;
    max-width: 320px;
  }
  
  .cta-section {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
    justify-content: center;
  }
  
  .stats {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
