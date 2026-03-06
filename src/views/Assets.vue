<template>
  <div class="assets-page">
    <!-- 左侧边栏 -->
    <aside class="sider">
      <div class="sider-header">
        <h1 class="sider-title">素材资产</h1>
      </div>
      
      <div class="sider-content">
        <!-- 分类统计 -->
        <div class="category-section">
          <div 
            class="category-item" 
            :class="{ active: currentCategory === 'all' }"
            @click="currentCategory = 'all'"
          >
            <span class="category-name">
              <svg class="category-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4 6h4v2H4zm0 5h4v2H4zm0 5h4v2H4zm6-10h10v2H10zm0 5h10v2H10zm0 5h10v2H10z"/>
              </svg>
              <span>全部</span>
            </span>
            <span class="category-count">{{ totalCount }}</span>
          </div>
          
          <div 
            class="category-item" 
            :class="{ active: currentCategory === 'image' }"
            @click="currentCategory = 'image'"
          >
            <span class="category-name">
              <svg class="category-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>图片</span>
            </span>
            <span class="category-count">{{ imageCount }}</span>
          </div>
          
          <div 
            class="category-item" 
            :class="{ active: currentCategory === 'video' }"
            @click="currentCategory = 'video'"
          >
            <span class="category-name">
              <svg class="category-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              <span>视频</span>
            </span>
            <span class="category-count">{{ videoCount }}</span>
          </div>
          
          <div 
            class="category-item" 
            :class="{ active: currentCategory === 'audio' }"
            @click="currentCategory = 'audio'"
          >
            <span class="category-name">
              <svg class="category-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
              </svg>
              <span>音频</span>
            </span>
            <span class="category-count">{{ audioCount }}</span>
          </div>
        </div>
        
        <!-- 回收站 -->
        <div class="trash-section">
          <div class="category-item trash-item">
            <span class="category-name">
              <svg class="category-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4zm-7 13c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5zM6 8v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8H6z"/>
              </svg>
              <span>回收站</span>
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <main class="content-area">
      <!-- 标题栏 -->
      <header class="content-header">
        <h2 class="content-title">{{ currentTitle }}</h2>
      </header>

      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" @click="handleUpload">
            <svg class="btn-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
            </svg>
            <span>上传素材</span>
          </button>
          <button class="btn btn-secondary" @click="handleCreateFolder">
            <svg class="btn-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H5V6h4.17l2 2H19v10zm-9-7h6v2h-6z"/>
            </svg>
            <span>新建文件夹</span>
          </button>
        </div>
        
        <div class="toolbar-right">
          <button class="btn btn-ghost manage-btn">管理</button>
          
          <div class="toolbar-divider"></div>
          
          <button class="btn btn-icon-only" title="排序">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
            </svg>
          </button>
          <button class="btn btn-icon-only" title="视图">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 素材列表 -->
      <div class="asset-grid-container">
        <div v-for="group in assetGroups" :key="group.title" class="asset-group">
          <h3 class="group-title">{{ group.title }}</h3>
          <div class="asset-grid">
            <div 
              v-for="asset in group.items" 
              :key="asset.id"
              class="asset-card"
              :class="{ selected: selectedAssets.includes(asset.id) }"
              @click="toggleSelect(asset.id)"
            >
              <div class="asset-preview">
                <img 
                  v-if="asset.type === 'image'" 
                  :src="asset.thumbnail" 
                  :alt="asset.name"
                  class="preview-image"
                >
                <div v-else-if="asset.type === 'video'" class="preview-video">
                  <svg class="play-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M8 5v14l11-7z"/>
                  </svg>
                  <span class="duration">{{ asset.duration }}</span>
                </div>
                <div v-else class="preview-audio">
                  <svg class="audio-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.49 0 4.5-2.01 4.5-4.5 0-.93-.28-1.79-.77-2.5H15V3h-3z"/>
                  </svg>
                </div>
                
                <!-- 选中复选框 -->
                <div class="checkbox-indicator">
                  <svg v-if="selectedAssets.includes(asset.id)" class="check-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                
                <!-- 悬停操作 -->
                <div class="hover-overlay">
                  <button class="overlay-btn" @click.stop="handleMenu(asset)">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="asset-info">
                <span class="asset-name">{{ asset.name }}</span>
                <span class="asset-meta">{{ asset.size }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentCategory = ref('all')
const selectedAssets = ref<string[]>([])

// 模拟数据
const assets = ref([
  { id: '1', name: '产品展示图.jpg', type: 'image', thumbnail: 'https://picsum.photos/seed/1/200/200', size: '2.4 MB', source: '用户上传' },
  { id: '2', name: '宣传视频.mp4', type: 'video', thumbnail: '', duration: '00:32', size: '15.8 MB', source: 'AI生成' },
  { id: '3', name: '背景音乐.mp3', type: 'audio', thumbnail: '', size: '3.2 MB', source: '系统音乐库' },
  { id: '4', name: '模特照片.jpg', type: 'image', thumbnail: 'https://picsum.photos/seed/4/200/200', size: '1.8 MB', source: '用户上传' },
  { id: '5', name: '广告片段.mp4', type: 'video', thumbnail: '', duration: '00:15', size: '8.5 MB', source: '视频生成' },
  { id: '6', name: '产品特写.jpg', type: 'image', thumbnail: 'https://picsum.photos/seed/6/200/200', size: '3.1 MB', source: 'AI生成' },
  { id: '7', name: '品牌宣传.mp4', type: 'video', thumbnail: '', duration: '01:20', size: '25.6 MB', source: '用户上传' },
  { id: '8', name: '产品展示图2.jpg', type: 'image', thumbnail: 'https://picsum.photos/seed/8/200/200', size: '2.1 MB', source: '用户上传' },
])

const totalCount = computed(() => assets.value.length)
const imageCount = computed(() => assets.value.filter(a => a.type === 'image').length)
const videoCount = computed(() => assets.value.filter(a => a.type === 'video').length)
const audioCount = computed(() => assets.value.filter(a => a.type === 'audio').length)

const currentTitle = computed(() => {
  const titles: Record<string, string> = {
    all: '全部素材',
    image: '图片',
    video: '视频',
    audio: '音频'
  }
  return titles[currentCategory.value] || '全部素材'
})

const assetGroups = computed(() => {
  const filtered = currentCategory.value === 'all' 
    ? assets.value 
    : assets.value.filter(a => a.type === currentCategory.value)
  
  return [
    { title: '今天', items: filtered.slice(0, 4) },
    { title: '昨天', items: filtered.slice(4) }
  ]
})

function toggleSelect(id: string) {
  const index = selectedAssets.value.indexOf(id)
  if (index > -1) {
    selectedAssets.value.splice(index, 1)
  } else {
    selectedAssets.value.push(id)
  }
}

function handleUpload() {
  console.log('上传素材')
}

function handleCreateFolder() {
  console.log('新建文件夹')
}

function handleMenu(asset: any) {
  console.log('菜单操作', asset)
}
</script>

<style scoped>
/* ========================================
   设计系统：与项目整体风格统一
   - 深色主题 #0e0e11
   - 青色强调色 #2bd1d7
   - 半透明卡片背景
   - 12px 圆角
   ======================================== */

.assets-page {
  display: flex;
  height: 100vh;
  background-color: #0e0e11;
  color: #fafbff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* ========================================
   左侧边栏
   ======================================== */
.sider {
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #0e0e11;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.sider-header {
  padding: 24px 20px;
}

.sider-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #fafbff;
}

.sider-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
}

/* 分类项 */
.category-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: rgba(237, 240, 253, 0.7);
}

.category-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fafbff;
}

.category-item.active {
  color: #fafbff;
}

.category-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: #2bd1d7;
  border-radius: 1px;
}

.category-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.category-icon {
  width: 18px;
  height: 18px;
  color: rgba(237, 240, 253, 0.5);
}

.category-item:hover .category-icon {
  color: rgba(237, 240, 253, 0.85);
}

.category-item.active .category-icon {
  color: #2bd1d7;
}

.category-count {
  font-size: 12px;
  color: rgba(237, 240, 253, 0.4);
}

.category-item.active .category-count {
  color: rgba(43, 209, 215, 0.8);
}

.trash-section {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 16px;
}

.trash-item .category-icon {
  color: rgba(237, 240, 253, 0.35);
}

/* ========================================
   右侧内容区
   ======================================== */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #0e0e11;
}

.content-header {
  padding: 24px 32px 0;
}

.content-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #fafbff;
}

/* 工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 8px;
}

/* 按钮样式 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-primary {
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fafbff;
}

.btn-primary:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #2bd1d7;
}

.btn-secondary {
  background-color: transparent;
  color: rgba(237, 240, 253, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fafbff;
}

.btn-ghost {
  background: transparent;
  color: rgba(237, 240, 253, 0.7);
  font-size: 14px;
  padding: 0 12px;
  height: 32px;
}

.btn-ghost:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fafbff;
}

.btn-icon-only {
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(237, 240, 253, 0.7);
  border-radius: 4px;
}

.btn-icon-only svg {
  width: 18px;
  height: 18px;
}

.btn-icon-only:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #fafbff;
}

/* ========================================
   素材网格
   ======================================== */
.asset-grid-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 32px;
}

.asset-group {
  margin-bottom: 32px;
}

.group-title {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(237, 240, 253, 0.5);
}

.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

/* 素材卡片 - 与 Projects.vue 卡片风格统一 */
.asset-card {
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 8px;
}

.asset-card:hover {
  background-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.asset-preview {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #0e0e11;
}

.asset-card.selected {
  background-color: rgba(43, 209, 215, 0.1);
  box-shadow: 0 0 0 1px rgba(43, 209, 215, 0.3);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-video {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.play-icon {
  width: 40px;
  height: 40px;
  color: rgba(237, 240, 253, 0.8);
}

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 11px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 6px;
  border-radius: 4px;
}

.preview-audio {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e2f 0%, #2d1f3d 100%);
}

.audio-icon {
  width: 48px;
  height: 48px;
  color: rgba(237, 240, 253, 0.4);
}

/* 复选框 */
.checkbox-indicator {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  opacity: 0;
}

.asset-card:hover .checkbox-indicator {
  opacity: 1;
}

.asset-card.selected .checkbox-indicator {
  opacity: 1;
  background: #2bd1d7;
  border-color: #2bd1d7;
}

.check-icon {
  width: 12px;
  height: 12px;
  color: #0e0e11;
}

/* 悬停操作 */
.hover-overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.asset-card:hover .hover-overlay {
  opacity: 1;
}

.overlay-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.overlay-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.overlay-btn svg {
  width: 16px;
  height: 16px;
}

/* 素材信息 */
.asset-info {
  padding: 8px 4px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.asset-name {
  font-size: 14px;
  font-weight: 500;
  color: #fafbff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asset-meta {
  font-size: 12px;
  color: rgba(237, 240, 253, 0.5);
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
