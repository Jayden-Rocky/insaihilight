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
            <!-- 搜索输入框 -->
            <div class="search-input-wrap">
              <span class="search-icon">
                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </span>
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
                <span class="select-value">{{ selectedSource }}</span>
                <span class="select-arrow" :class="{ open: showSourceDropdown }">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter">
                    <path d="M39.6 17.443 24.043 33 8.487 17.443"/>
                  </svg>
                </span>
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
            <button class="sort-btn" @click.stop="toggleSortDropdown">
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="sort-icon">
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
      
      <!-- 项目列表 -->
      <div class="project-list-scrollbar-container">
        <div class="project-list-wrap">
          <div v-if="filteredProjects.length === 0" class="empty-state">
            暂无项目
          </div>
          <div v-else class="project-list-content">
            <div 
              class="list-item" 
              v-for="project in filteredProjects" 
              :key="project.id"
              :id="'project-' + project.id"
              @click="openProject(project)"
            >
              <div class="cover-img-wrap">
                <div class="draft" v-if="project.status === 'draft'">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" class="video-default">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
                <img 
                  v-else-if="project.cover" 
                  :src="project.cover" 
                  class="cover-img" 
                  alt="project cover"
                />
                <div class="draft" v-else>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" class="video-default">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              </div>
              
              <div class="footer">
                <div class="title-wrap">
                  <h4 class="title">{{ project.title }}</h4>
                </div>
                <div class="bottom-wrap">
                  <div class="left">
                    <div class="top">
                      <div class="status" :class="project.status">{{ getStatusText(project.status) }}</div>
                    </div>
                    <div class="source">{{ project.source }}</div>
                    <div class="date">{{ project.date }}</div>
                  </div>
                  <div class="right">
                    <button 
                      class="more-btn" 
                      @click.stop="showMoreMenu(project, $event)"
                    >
                      <img 
                        class="more-icon" 
                        src="https://static8.yingsaidata.com/wise-cut/img/custom/more-icon.webp" 
                        alt="more"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 更多操作菜单 -->
    <Teleport to="body">
      <div 
        class="more-menu" 
        v-if="activeMoreMenu" 
        :style="moreMenuStyle"
        v-click-outside="hideMoreMenu"
      >
        <div class="more-menu-item" @click="editProject(activeProject)">编辑</div>
        <div class="more-menu-item" @click="deleteProject(activeProject)">删除</div>
        <div class="more-menu-item" @click="duplicateProject(activeProject)">复制</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ============ 状态管理 ============
const searchKeyword = ref('')
const currentFilter = ref('all') // 'all' | 'completed' | 'draft'
const selectedSource = ref('全部来源')
const showSourceDropdown = ref(false)
const selectedSort = ref('recent')
const showSortDropdown = ref(false)
const activeMoreMenu = ref(false)
const activeProject = ref(null)
const moreMenuPosition = ref({ top: 0, left: 0 })

// ============ 常量数据 ============
const sourceOptions = ['全部来源', '一键成片', '智能成片', '数字分身']
const sortOptions = [
  { label: '最近创建', value: 'recent' },
  { label: '最早创建', value: 'oldest' },
  { label: '名称 A-Z', value: 'name_asc' },
  { label: '名称 Z-A', value: 'name_desc' }
]

// ============ 模拟项目数据 ============
const projects = ref([
  {
    id: '_____69a96e18-281166840360960',
    title: '新建项目_69a96e18',
    status: 'draft',
    source: '一键成片',
    date: '2026-03-05 22:18',
    cover: null
  },
  {
    id: '_____69a90e4e-281066398412800',
    title: '产品展示广告_春季促销',
    status: 'completed',
    source: '智能成片',
    date: '2026-03-04 18:30',
    cover: null
  },
  {
    id: '_____69a85d21-280955123456789',
    title: '品牌宣传片_V2',
    status: 'draft',
    source: '数字分身',
    date: '2026-03-03 15:20',
    cover: null
  },
  {
    id: '_____69a72c15-280844987654321',
    title: '新品发布会视频',
    status: 'completed',
    source: '一键成片',
    date: '2026-03-02 10:45',
    cover: null
  },
  {
    id: '_____69a61b09-280733876543210',
    title: '社交媒体短视频合集',
    status: 'draft',
    source: '智能成片',
    date: '2026-03-01 09:15',
    cover: null
  },
  {
    id: '_____69a50a03-280622765432109',
    title: '企业宣传片_2026版',
    status: 'completed',
    source: '数字分身',
    date: '2026-02-28 16:50',
    cover: null
  }
])

// ============ 计算属性 ============
const filteredProjects = computed(() => {
  let result = [...projects.value]
  
  // 状态过滤
  if (currentFilter.value !== 'all') {
    result = result.filter(p => p.status === currentFilter.value)
  }
  
  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(keyword))
  }
  
  // 来源过滤
  if (selectedSource.value !== '全部来源') {
    result = result.filter(p => p.source === selectedSource.value)
  }
  
  // 排序
  switch (selectedSort.value) {
    case 'recent':
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'oldest':
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'name_asc':
      result.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
      break
    case 'name_desc':
      result.sort((a, b) => b.title.localeCompare(a.title, 'zh-CN'))
      break
  }
  
  return result
})

const moreMenuStyle = computed(() => ({
  top: `${moreMenuPosition.value.top}px`,
  left: `${moreMenuPosition.value.left}px`
}))

// ============ 方法 ============
const setFilter = (filter) => {
  currentFilter.value = filter
}

const toggleSourceDropdown = () => {
  showSourceDropdown.value = !showSourceDropdown.value
  showSortDropdown.value = false
}

const selectSource = (source) => {
  selectedSource.value = source
  showSourceDropdown.value = false
}

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value
  showSourceDropdown.value = false
}

const selectSort = (sort) => {
  selectedSort.value = sort
  showSortDropdown.value = false
}

const getStatusText = (status) => {
  const statusMap = {
    draft: '草稿',
    completed: '完成',
    processing: '处理中'
  }
  return statusMap[status] || status
}

const openProject = (project) => {
  console.log('打开项目:', project)
  // TODO: 路由跳转到项目详情/编辑页
  // router.push(`/project/${project.id}`)
}

const showMoreMenu = (project, event) => {
  activeProject.value = project
  activeMoreMenu.value = true
  
  // 计算菜单位置（相对于视口）
  const rect = event.currentTarget.getBoundingClientRect()
  moreMenuPosition.value = {
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX - 80
  }
}

const hideMoreMenu = () => {
  activeMoreMenu.value = false
  activeProject.value = null
}

const editProject = (project) => {
  if (!project) return
  console.log('编辑项目:', project)
  hideMoreMenu()
  openProject(project)
}

const deleteProject = (project) => {
  if (!project) return
  const index = projects.value.findIndex(p => p.id === project.id)
  if (index > -1) {
    projects.value.splice(index, 1)
  }
  hideMoreMenu()
}

const duplicateProject = (project) => {
  if (!project) return
  const newProject = {
    ...project,
    id: `_____${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: `${project.title}_副本`,
    status: 'draft',
    date: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/\//g, '-')
  }
  projects.value.unshift(newProject)
  hideMoreMenu()
}

// ============ 生命周期 ============
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

const handleDocumentClick = (e) => {
  // 关闭下拉菜单
  if (!e.target.closest('.select-wrap')) {
    showSourceDropdown.value = false
  }
  if (!e.target.closest('.sort-btn') && !e.target.closest('.sort-dropdown')) {
    showSortDropdown.value = false
  }
}
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background-color: #0e0e11;
  color: #fafbff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.projects-wrap {
  padding: 8px 40px 0;
  max-width: 1272px;
  margin: 0 auto;
}

.page-title {
  font-size: 26px;
  font-weight: 600;
  color: #fafbff;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

/* 菜单样式 */
.menu {
  background-color: #0e0e11;
  margin-left: -24px;
  padding: 0;
}

.menu-inner {
  display: flex;
  align-items: center;
  gap: 0;
}

.menu-item {
  position: relative;
  padding: 12px 16px;
  font-size: 14px;
  color: rgba(237, 240, 253, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.menu-item:hover {
  color: #fafbff;
}

.menu-item.active {
  color: #fafbff;
}

.menu-selected-label {
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background-color: #165dff;
  border-radius: 2px;
}

/* 工具栏样式 */
.tools-bar {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.tools-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 搜索输入框 */
.search-input-wrap {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  min-width: 200px;
  transition: all 0.2s ease;
}

.search-input-wrap:focus-within {
  border-color: #165dff;
  background-color: rgba(255, 255, 255, 0.12);
}

.search-icon {
  display: flex;
  align-items: center;
  color: rgba(237, 240, 253, 0.5);
  margin-right: 8px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fafbff;
  font-size: 14px;
  height: 100%;
}

.search-input::placeholder {
  color: rgba(237, 240, 253, 0.4);
}

/* 来源选择器 */
.select-wrap {
  position: relative;
}

.custom-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-select:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.select-value {
  font-size: 14px;
  color: #fafbff;
}

.select-arrow {
  display: flex;
  align-items: center;
  color: rgba(237, 240, 253, 0.5);
  margin-left: 8px;
  transition: transform 0.2s ease;
}

.select-arrow.open {
  transform: rotate(180deg);
}

.select-arrow svg {
  width: 16px;
  height: 16px;
}

/* 下拉菜单 */
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 14px;
  color: rgba(237, 240, 253, 0.8);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fafbff;
}

.dropdown-item.active {
  color: #165dff;
  background-color: rgba(22, 93, 255, 0.1);
}

.sort-dropdown {
  right: 0;
  left: auto;
}

/* 排序按钮 */
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
  transition: all 0.2s ease;
}

.sort-btn:hover {
  background-color: rgba(255, 255, 255, 0.12);
  color: #fafbff;
}

.sort-icon {
  width: 18px;
  height: 18px;
}

/* 项目列表容器 */
.project-list-scrollbar-container {
  height: calc(100vh - 204px);
  overflow-y: auto;
  padding-right: 12px;
}

.project-list-scrollbar-container::-webkit-scrollbar {
  width: 6px;
}

.project-list-scrollbar-container::-webkit-scrollbar-track {
  background: transparent;
}

.project-list-scrollbar-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.project-list-scrollbar-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.project-list-wrap {
  padding: 8px 0;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgba(237, 240, 253, 0.5);
  font-size: 14px;
}

.project-list-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

/* 项目卡片 */
.list-item {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.cover-img-wrap {
  background-color: #0e0e11;
  border-radius: 8px;
  height: 148.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.draft {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.video-default {
  color: rgba(237, 240, 253, 0.3);
  width: 48px;
  height: 48px;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer {
  margin-top: 8px;
  padding: 0 4px;
}

.title-wrap {
  margin-bottom: 8px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  color: #fafbff;
  margin: 0;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left {
  flex: 1;
  min-width: 0;
}

.top {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.status {
  display: inline-block;
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
  margin-right: 6px;
}

.status.draft {
  background-color: rgba(255, 255, 255, 0.08);
  color: rgba(246, 247, 255, 0.7);
}

.status.completed {
  background-color: rgba(22, 93, 255, 0.15);
  color: #165dff;
}

.status.processing {
  background-color: rgba(255, 165, 0, 0.15);
  color: #ffa500;
}

.source {
  font-size: 12px;
  color: rgba(237, 240, 253, 0.5);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 12px;
  color: rgba(237, 240, 253, 0.5);
}

.right {
  display: flex;
  align-items: center;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.more-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.more-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.more-btn:hover .more-icon {
  opacity: 1;
}

/* 更多操作菜单 */
.more-menu {
  position: fixed;
  background-color: #1f1f23;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px;
  min-width: 120px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.more-menu-item {
  padding: 8px 12px;
  font-size: 14px;
  color: rgba(237, 240, 253, 0.8);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.more-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fafbff;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .projects-wrap {
    padding: 8px 16px 0;
  }
  
  .content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .menu {
    margin-left: 0;
    overflow-x: auto;
  }
  
  .menu-inner {
    flex-wrap: nowrap;
  }
  
  .tools-bar {
    margin-right: 0;
  }
  
  .tools-bar-wrap {
    flex-wrap: wrap;
  }
  
  .project-list-content {
    grid-template-columns: 1fr;
  }
}
</style>