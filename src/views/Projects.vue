<template>
  <div class="projects-page">
    <div class="projects-wrap">
      <h3 class="page-title">创意项目</h3>
      
      <div class="content">
        <!-- 顶部菜单栏 -->
        <div class="menu">
          <div class="menu-inner">
            <div 
              class="menu-item" 
              :class="{ active: currentFilter === 'all' }"
              @click="setFilter('all')"
            >
              全部
              <div v-if="currentFilter === 'all'" class="menu-selected-label"></div>
            </div>
            <div 
              class="menu-item" 
              :class="{ active: currentFilter === 'completed' }"
              @click="setFilter('completed')"
            >
              完成
              <div v-if="currentFilter === 'completed'" class="menu-selected-label"></div>
            </div>
            <div 
              class="menu-item" 
              :class="{ active: currentFilter === 'draft' }"
              @click="setFilter('draft')"
            >
              草稿
              <div v-if="currentFilter === 'draft'" class="menu-selected-label"></div>
            </div>
          </div>
        </div>
        
        <!-- 工具栏 -->
        <div class="tools-bar">
          <div class="tools-bar-wrap">
            <!-- 搜索框 -->
            <div class="search-input-wrap">
              <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input 
                type="text" 
                class="search-input" 
                placeholder="请输入" 
                v-model="searchKeyword"
              />
            </div>
            
            <!-- 来源选择器 -->
            <div class="select-wrap">
              <div class="custom-select" @click.stop="toggleSourceDropdown">
                <span>{{ selectedSource }}</span>
                <svg class="select-arrow" :class="{ open: showSourceDropdown }" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4">
                  <path d="M39.6 17.443 24.043 33 8.487 17.443"/>
                </svg>
              </div>
              <div class="dropdown-menu" v-show="showSourceDropdown">
                <div 
                  class="dropdown-item" 
                  v-for="source in sourceOptions" 
                  :key="source"
                  :class="{ active: selectedSource === source }"
                  @click.stop="selectSource(source)"
                >
                  {{ source }}
                </div>
              </div>
            </div>
            
            <!-- 排序按钮 -->
            <div class="sort-wrap">
              <button class="sort-btn" @click.stop="toggleSortDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                </svg>
              </button>
              <div class="dropdown-menu sort-dropdown" v-show="showSortDropdown">
                <div 
                  class="dropdown-item" 
                  v-for="sort in sortOptions" 
                  :key="sort.value"
                  :class="{ active: selectedSort === sort.value }"
                  @click.stop="selectSort(sort.value)"
                >
                  {{ sort.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 项目列表 -->
      <div class="project-list-container">
        <div class="project-list-wrap">
          <div v-if="filteredProjects.length === 0" class="empty-state">
            暂无项目
          </div>
          <div v-else class="project-list-content">
            <div 
              class="list-item" 
              v-for="project in filteredProjects" 
              :key="project.id"
              @click="openProject(project)"
            >
              <!-- 封面 -->
              <div class="cover-img-wrap">
                <div class="cover-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" class="video-icon">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              </div>
              
              <!-- 信息 -->
              <div class="footer">
                <h4 class="title">{{ project.title }}</h4>
                <div class="meta">
                  <span class="status" :class="project.status">{{ getStatusText(project.status) }}</span>
                  <span class="source">{{ project.source }}</span>
                  <span class="date">{{ project.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 筛选状态
const currentFilter = ref('all')
const searchKeyword = ref('')
const selectedSource = ref('全部来源')
const selectedSort = ref('recent')

// 下拉菜单状态
const showSourceDropdown = ref(false)
const showSortDropdown = ref(false)

// 选项数据
const sourceOptions = ['全部来源', '一键成片', '智能成片', '数字分身']
const sortOptions = [
  { label: '最近创建', value: 'recent' },
  { label: '最早创建', value: 'oldest' },
  { label: '名称 A-Z', value: 'nameAsc' },
  { label: '名称 Z-A', value: 'nameDesc' }
]

// 项目数据
const projects = ref([
  { id: '1', title: '新建项目_69a96e18', status: 'draft', source: '一键成片', date: '2026-03-06 16:37' },
  { id: '2', title: '新建项目_69a90e4e', status: 'draft', source: '一键成片', date: '2026-03-05 13:03' },
  { id: '3', title: '品牌宣传片_V2', status: 'draft', source: '数字分身', date: '2026-03-03 15:20' },
  { id: '4', title: '新品发布会视频', status: 'completed', source: '一键成片', date: '2026-03-02 10:45' },
  { id: '5', title: '社交媒体短视频合集', status: 'draft', source: '智能成片', date: '2026-03-01 09:15' },
  { id: '6', title: '企业宣传片_2026版', status: 'completed', source: '数字分身', date: '2026-02-28 16:50' }
])

// 计算属性
const filteredProjects = computed(() => {
  let result = [...projects.value]
  
  if (currentFilter.value === 'completed') {
    result = result.filter(p => p.status === 'completed')
  } else if (currentFilter.value === 'draft') {
    result = result.filter(p => p.status === 'draft')
  }
  
  if (selectedSource.value !== '全部来源') {
    result = result.filter(p => p.source === selectedSource.value)
  }
  
  if (searchKeyword.value) {
    result = result.filter(p => p.title.toLowerCase().includes(searchKeyword.value.toLowerCase()))
  }
  
  if (selectedSort.value === 'recent') result.sort((a, b) => new Date(b.date) - new Date(a.date))
  else if (selectedSort.value === 'oldest') result.sort((a, b) => new Date(a.date) - new Date(b.date))
  else if (selectedSort.value === 'nameAsc') result.sort((a, b) => a.title.localeCompare(b.title))
  else if (selectedSort.value === 'nameDesc') result.sort((a, b) => b.title.localeCompare(a.title))
  
  return result
})

// 方法
const setFilter = (filter) => currentFilter.value = filter
const toggleSourceDropdown = () => { showSourceDropdown.value = !showSourceDropdown.value; showSortDropdown.value = false }
const selectSource = (source) => { selectedSource.value = source; showSourceDropdown.value = false }
const toggleSortDropdown = () => { showSortDropdown.value = !showSortDropdown.value; showSourceDropdown.value = false }
const selectSort = (sort) => { selectedSort.value = sort; showSortDropdown.value = false }
const getStatusText = (status) => ({ draft: '草稿', completed: '完成', processing: '处理中' }[status] || status)
const openProject = (project) => console.log('打开项目:', project.id)

const handleClickOutside = (e) => {
  if (!e.target.closest('.select-wrap') && !e.target.closest('.sort-wrap')) {
    showSourceDropdown.value = false
    showSortDropdown.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.projects-page {
  padding: 24px 32px;
  height: 100%;
}

.projects-wrap {
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #fafbff;
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.menu-inner {
  display: flex;
  gap: 4px;
}

.menu-item {
  position: relative;
  padding: 8px 16px;
  font-size: 14px;
  color: rgba(237, 240, 253, 0.7);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.menu-item:hover {
  color: #fafbff;
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item.active {
  color: #fafbff;
}

.menu-selected-label {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: #2bd1d7;
  border-radius: 1px;
}

.tools-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  width: 200px;
}

.search-icon {
  color: rgba(237, 240, 253, 0.5);
  margin-right: 8px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #fafbff;
}

.search-input::placeholder {
  color: rgba(237, 240, 253, 0.4);
}

.select-wrap,
.sort-wrap {
  position: relative;
}

.custom-select {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  min-width: 120px;
  cursor: pointer;
  font-size: 14px;
  color: #fafbff;
  gap: 8px;
}

.custom-select:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.select-arrow {
  width: 16px;
  height: 16px;
  color: rgba(237, 240, 253, 0.5);
  transition: transform 0.2s;
}

.select-arrow.open {
  transform: rotate(180deg);
}

.sort-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(237, 240, 253, 0.7);
  cursor: pointer;
}

.sort-btn svg {
  width: 18px;
  height: 18px;
  display: block;
  min-width: 18px;
  flex-shrink: 0;
}
.sort-btn:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #fafbff;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: #1f1f23;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px;
  min-width: 140px;
  z-index: 100;
}

.sort-dropdown {
  right: 0;
  left: auto;
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  color: rgba(237, 240, 253, 0.8);
  cursor: pointer;
  border-radius: 4px;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fafbff;
}

.dropdown-item.active {
  color: #2bd1d7;
  background-color: rgba(43, 209, 215, 0.1);
}

.project-list-container {
  height: calc(100vh - 204px);
  overflow-y: auto;
}

.project-list-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.list-item {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.cover-img-wrap {
  background-color: #0e0e11;
  border-radius: 8px;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-icon {
  color: rgba(237, 240, 253, 0.3);
}

.footer {
  margin-top: 8px;
  padding: 0 4px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #fafbff;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(237, 240, 253, 0.5);
}

.status {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  color: rgba(246, 247, 255, 0.7);
}

.status.completed {
  background-color: rgba(22, 93, 255, 0.15);
  color: #165dff;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgba(237, 240, 253, 0.5);
}

@media (max-width: 768px) {
  .projects-page {
    padding: 16px;
  }
  
  .content {
    flex-direction: column;
    gap: 12px;
  }
  
  .tools-bar-wrap {
    flex-wrap: wrap;
  }
  
  .project-list-content {
    grid-template-columns: 1fr;
  }
}
</style>
