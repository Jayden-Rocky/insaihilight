<template>
  <header class="navbar">
    <div class="left-side">
      <button class="back-btn" v-if="showBack" @click="goBack">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <span>返回</span>
      </button>
    </div>
    <div class="right-side">
      <!-- 限时优惠提示 -->
      <div class="promo-box">
        <div class="promo-content">
          <img src="https://static8.yingsaidata.com/wise-cut/img/3145059-time.png" class="time-icon" />
          <span class="promo-text">限时三折优惠</span>
          <img src="https://static8.yingsaidata.com/wise-cut/img/3037310-right.png" class="right-icon" />
        </div>
        <div class="promo-stats">
          <svg class="star-icon" viewBox="0 0 24 24" width="12" height="12">
            <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span class="stats-num">12,476</span>
        </div>
      </div>
      
      <!-- 消息中心 -->
      <div class="message-center">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
        <span class="badge">2</span>
      </div>
      
      <!-- 用户头像 -->
      <div class="user-avatar">
        <img src="https://static5.yingsaidata.com/ba8acc1749b3c18149ad109f5c60a12e.png" alt="avatar" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showBack = computed(() => {
  return route.path !== '/'
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  height: 72px;
  background: #0e0e11;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
}

.left-side {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: rgba(250, 251, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.back-btn:hover {
  color: #2bd1d7;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 24px;
}

.promo-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
  border-radius: 20px;
}

.promo-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-icon, .right-icon {
  width: 16px;
  height: 16px;
}

.promo-text {
  font-size: 14px;
  color: #f59e0b;
  font-weight: 500;
}

.promo-stats {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  color: #f59e0b;
}

.stats-num {
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.message-center {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(250, 251, 255, 0.8);
}

.message-center:hover {
  background: rgba(255, 255, 255, 0.1);
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  background: #ef4444;
  border-radius: 9px;
  font-size: 11px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
