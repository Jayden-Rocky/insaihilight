<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo" @click="$router.push('/')">
        <img src="https://static8.yingsaidata.com/wise-cut/img/2744442-logo.svg" alt="inSai Hilight" />
        <span class="logo-text">inSai Hilight</span>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <!-- 灵感菜单 -->
      <div class="menu-group">
        <div class="menu-header" @click="toggleGroup('inspiration')" :class="{ 'active': openGroups.inspiration }">
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>灵感</span>
          <svg class="arrow" :class="{ 'is-open': openGroups.inspiration }" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <transition name="slide">
          <div class="menu-items" v-show="openGroups.inspiration">
            <div class="menu-item" @click="navigateTo('/inspiration/insight')" :class="{ 'active': isCurrentRoute('/inspiration/insight') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
              </svg>
              <span>创意洞见</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- 创作菜单 -->
      <div class="menu-group">
        <div class="menu-header" @click="toggleGroup('creation')" :class="{ 'active': openGroups.creation }">
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <span>创作</span>
          <svg class="arrow" :class="{ 'is-open': openGroups.creation }" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <transition name="slide">
          <div class="menu-items" v-show="openGroups.creation">
            <div class="menu-item" @click="navigateTo('/creation/video-generator')" :class="{ 'active': isCurrentRoute('/creation/video-generator') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
              </svg>
              <span>智能成片</span>
            </div>
            <div class="menu-item" @click="navigateTo('/creation/studio')" :class="{ 'active': isCurrentRoute('/creation/studio') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2V9h-2V7h2zM4 19V5h14v14H4zm2-2h8v-6H6v6zm2-4h4v2H8v-2z"/>
              </svg>
              <span>创意工坊</span>
            </div>
            <div class="menu-item" @click="navigateTo('/creation/avatar')" :class="{ 'active': isCurrentRoute('/creation/avatar') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span>数字分身</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- 云空间菜单 -->
      <div class="menu-group">
        <div class="menu-header" @click="toggleGroup('cloud')" :class="{ 'active': openGroups.cloud }">
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
          <span>云空间</span>
          <svg class="arrow" :class="{ 'is-open': openGroups.cloud }" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <transition name="slide">
          <div class="menu-items" v-show="openGroups.cloud">
            <div class="menu-item" @click="navigateTo('/cloud/projects')" :class="{ 'active': isCurrentRoute('/cloud/projects') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"/>
              </svg>
              <span>创意项目</span>
            </div>
            <div class="menu-item" @click="navigateTo('/cloud/assets')" :class="{ 'active': isCurrentRoute('/cloud/assets') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>素材管理</span>
            </div>
            <div class="menu-item" @click="navigateTo('/cloud/products')" :class="{ 'active': isCurrentRoute('/cloud/products') }">
              <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>商品管理</span>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="avatar">
          <img src="https://static5.yingsaidata.com/ba8acc1749b3c18149ad109f5c60a12e.png" alt="avatar" />
        </div>
        <span class="username">用户名</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const openGroups = ref({
  inspiration: false,
  creation: true,
  cloud: false
})

const toggleGroup = (group) => {
  openGroups.value[group] = !openGroups.value[group]
}

const navigateTo = (path) => {
  router.push(path)
}

const isCurrentRoute = (path) => {
  return route.path === path
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background-color: #1c1d21;
  border-right: 1px solid #2e2e30;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #2e2e30;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.8;
}

.logo img {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}

.menu-group {
  margin-bottom: 8px;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  color: rgba(229, 233, 250, 0.7);
  transition: all 0.2s;
}

.menu-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-header.active {
  color: #2bd1d7;
}

.menu-header .icon {
  flex-shrink: 0;
}

.menu-header span {
  flex: 1;
  font-size: 14px;
}

.menu-header .arrow {
  transition: transform 0.2s;
}

.menu-header .arrow.is-open {
  transform: rotate(180deg);
}

.menu-items {
  padding-left: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px 10px 32px;
  cursor: pointer;
  color: rgba(229, 233, 250, 0.7);
  transition: all 0.2s;
  font-size: 14px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.menu-item.active {
  background-color: rgba(43, 209, 215, 0.1);
  color: #2bd1d7;
  border-right: 2px solid #2bd1d7;
}

.menu-item .icon {
  flex-shrink: 0;
  opacity: 0.7;
}

.menu-item.active .icon {
  opacity: 1;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid #2e2e30;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #2e2e30;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  color: rgba(229, 233, 250, 0.9);
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
