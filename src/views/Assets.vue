<template>
  <div class="assets-page">
    <!-- 左侧边栏 -->
    <aside class="sider" :class="{ collapsed: isCollapsed }">
      <div class="sider-top tools-wrap">
        <h1 class="title font-title-h1">素材资产</h1>
        <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
          <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="sider-content">
        <div class="sider-content-inner">
          <!-- 分类统计 -->
          <div class="system-stat">
            <div class="list-wrap">
              <div 
                class="item-wrap total-item-page-btn" 
                :class="{ active: currentCategory === 'all' }"
                @click="currentCategory = 'all'"
              >
                <span class="name-wrap">
                  <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M4 6h4v2H4zm0 5h4v2H4zm0 5h4v2H4zm6-10h10v2H10zm0 5h10v2H10zm0 5h10v2H10z"/>
                  </svg>
                  <span class="font-body-3">全部</span>
                </span>
                <span class="num font-caption">{{ totalCount }}</span>
              </div>
              
              <div 
                class="item-wrap" 
                :class="{ active: currentCategory === 'image' }"
                @click="currentCategory = 'image'"
              >
                <span class="name-wrap">
                  <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  <span class="font-body-3">图片</span>
                </span>
                <span class="num font-caption">{{ imageCount }}</span>
              </div>
              
              <div 
                class="item-wrap" 
                :class="{ active: currentCategory === 'video' }"
                @click="currentCategory = 'video'"
              >
                <span class="name-wrap">
                  <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                  <span class="font-body-3">视频</span>
                </span>
                <span class="num font-caption">{{ videoCount }}</span>
              </div>
              
              <div 
                class="item-wrap" 
                :class="{ active: currentCategory === 'audio' }"
                @click="currentCategory = 'audio'"
              >
                <span class="name-wrap">
                  <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
                  </svg>
                  <span class="font-body-3">音频</span>
                </span>
                <span class="num font-caption">{{ audioCount }}</span>
              </div>
            </div>
          </div>
          
          <!-- 回收站 -->
          <div class="item-wrap restore">
            <span class="name-wrap">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zm-7 13c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5zM6 8v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8H6z"/>
              </svg>
              <span class="font-body-3">回收站</span>
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <main class="asset-list-wrap">
      <!-- 标题栏 -->
      <div class="title-container">
        <div class="title-wrap pad-lr-24">
          <span class="title-inner">
            <span class="title font-title-h3">{{ currentTitle }}</span>
          </span>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="tools-bar pad-lr-24">
        <div class="left-wrap">
          <div class="upload-wrap">
            <button class="btn upload-btn" @click="handleUpload">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
              </svg>
              <span>上传素材</span>
            </button>
            <button class="btn upload-btn" @click="handleCreateFolder">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"/>
              </svg>
              <span>新建文件夹</span>
            </button>
          </div>
        </div>
        
        <div class="right-wrap">
          <button class="btn manage-btn">管理</button>
          <button class="btn sort-dropdown-btn">
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
          </button>
          <button class="btn view-mode-btn">
            <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 素材列表 -->
      <div class="asset-list">
        <div class="selection-container pad-lr-24">
          <div class="list-title font-body-3">
            <span>素材</span>
            <span>（{{ filteredAssets.length }}）</span>
          </div>
          
          <div class="list-inner">
            <label 
              v-for="asset in filteredAssets" 
              :key="asset.id"
              class="item-wrap"
              :class="{ selected: selectedAssets.includes(asset.id) }"
            >
              <input 
                type="checkbox" 
                class="checkbox-target"
                :value="asset.id"
                v-model="selectedAssets"
              >
              <span class="checkbox-icon-hover">
                <div class="checkbox-icon"></div>
              </span>
              <span class="checkbox-label">
                <div class="asset-item-wrapper" :data-id="asset.id">
                  <div class="main-content">
                    <div class="asset-item-wrap small" :data-id="asset.id">
                      <div class="inner image">
                        <img class="cover-img" :src="asset.url" :alt="asset.name">
                      </div>
                    </div>
                  </div>
                  <h5 class="asset-item-wrapper-title">{{ asset.name }}</h5>
                </div>
                <button class="menu-btn" @click.stop="handleMenuClick(asset)">
                  <svg class="more-icon" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </span>
            </label>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 状态
const isCollapsed = ref(false)
const currentCategory = ref<'all' | 'image' | 'video' | 'audio'>('all')
const selectedAssets = ref<number[]>([])

// 模拟数据
const assets = ref([
  {
    id: 104971,
    name: 'Vit Krejci(1).jpg',
    url: 'https://static9.yingsaidata.com/hilight/08a45287d938a15aeaf559e3308c00ce.jpg',
    type: 'image'
  },
  {
    id: 104970,
    name: 'Trae Young(1).jpg',
    url: 'https://static9.yingsaidata.com/hilight/0504d9e4aa2ab6af0d18835e0246c2c8.jpg',
    type: 'image'
  },
  {
    id: 104969,
    name: 'Vit Krejci.jpg',
    url: 'https://static9.yingsaidata.com/hilight/dc3dfd2eacd49b7e488c4ac375df4378.jpg',
    type: 'image'
  },
  {
    id: 104968,
    name: 'Trae Young.jpg',
    url: 'https://static9.yingsaidata.com/hilight/41d182a1888fbd2dffb4747bb12bfa91.jpg',
    type: 'image'
  }
])

// 计算属性
const totalCount = computed(() => assets.value.length)
const imageCount = computed(() => assets.value.filter(a => a.type === 'image').length)
const videoCount = computed(() => assets.value.filter(a => a.type === 'video').length)
const audioCount = computed(() => assets.value.filter(a => a.type === 'audio').length)

const currentTitle = computed(() => {
  const titles: Record<string, string> = {
    all: '全部',
    image: '图片',
    video: '视频',
    audio: '音频'
  }
  return titles[currentCategory.value]
})

const filteredAssets = computed(() => {
  if (currentCategory.value === 'all') {
    return assets.value
  }
  return assets.value.filter(asset => asset.type === currentCategory.value)
})

// 方法
const handleUpload = () => {
  console.log('上传素材')
}

const handleCreateFolder = () => {
  console.log('新建文件夹')
}

const handleMenuClick = (asset: any) => {
  console.log('菜单点击:', asset)
}
</script>

<style scoped>
/* 基础变量 */
.assets-page {
  --bg-primary: rgb(14, 14, 17);
  --bg-secondary: rgba(0, 0, 0, 0);
  --text-primary: rgb(250, 251, 255);
  --text-secondary: rgba(250, 251, 255, 0.7);
  --btn-bg: rgba(223, 223, 223, 0.08);
  --btn-hover-bg: rgba(223, 223, 223, 0.12);
  --active-bg: rgb(47, 48, 54);
  --border-radius: 4px;
  --border-radius-lg: 8px;
  
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
}

/* 左侧边栏 */
.sider {
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: width 0.3s ease;
}

.sider.collapsed {
  width: 60px;
}

.sider-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 20px 20px;
  height: 76px;
}

.title {
  font-size: 20px;
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
}

.collapse-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--border-radius-lg);
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s;
}

.collapse-btn:hover {
  background-color: var(--btn-bg);
}

.sider-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
}

.sider-content-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.system-stat {
  margin-bottom: 16px;
}

.list-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.2s;
}

.item-wrap:hover {
  background-color: var(--btn-bg);
}

.item-wrap.active {
  background-color: var(--active-bg);
}

.name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.font-body-3 {
  font-size: 14px;
  font-weight: 400;
}

.font-caption {
  font-size: 12px;
  color: var(--text-secondary);
}

.num {
  font-size: 12px;
  color: var(--text-secondary);
}

.restore {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 12px;
}

/* 右侧内容区 */
.asset-list-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  overflow: hidden;
}

.title-container {
  padding: 0 24px;
}

.title-wrap {
  padding: 16px 0;
}

.pad-lr-24 {
  padding-left: 24px;
  padding-right: 24px;
}

.font-title-h3 {
  font-size: 16px;
  font-weight: 600;
}

/* 工具栏 */
.tools-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.left-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.upload-wrap {
  display: flex;
  gap: 8px;
}

.right-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background-color: var(--btn-bg);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: var(--btn-hover-bg);
}

.upload-btn {
  height: 36px;
}

.manage-btn {
  padding: 2px 8px;
  height: 24px;
  font-size: 12px;
}

.sort-dropdown-btn,
.view-mode-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  justify-content: center;
}

/* 素材列表 */
.asset-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-title {
  display: flex;
  gap: 4px;
  color: var(--text-secondary);
  font-size: 14px;
}

.list-inner {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
}

.item-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.checkbox-target {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 16px;
  height: 16px;
  opacity: 0;
  z-index: 10;
}

.checkbox-icon-hover {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
}

.item-wrap:hover .checkbox-icon-hover,
.item-wrap.selected .checkbox-icon-hover {
  border-color: var(--text-primary);
  background-color: var(--active-bg);
}

.checkbox-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-wrap.selected .checkbox-icon::after {
  content: '';
  width: 8px;
  height: 8px;
  background-color: var(--text-primary);
  border-radius: 1px;
}

.checkbox-label {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.asset-item-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.main-content {
  position: relative;
}

.asset-item-wrap {
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background-color: var(--active-bg);
}

.asset-item-wrap.small {
  width: 120px;
  height: 120px;
}

.inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner.image {
  background-color: var(--active-bg);
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asset-item-wrapper-title {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.menu-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;
}

.asset-item-wrapper:hover .menu-btn {
  opacity: 1;
}

.menu-btn:hover {
  background-color: var(--btn-bg);
}

.more-icon {
  width: 16px;
  height: 16px;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>