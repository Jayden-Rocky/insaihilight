# InSaiHiLight 接口文档

## 概述

本文档定义了 InSaiHiLight 智能视频创作平台的核心接口规范，基于 Spring Boot + MySQL 技术栈实现。

**基础信息：**
- 基础路径：`/api/v1`
- 数据格式：JSON
- 字符编码：UTF-8
- 认证方式：Bearer Token (JWT)

---

## 一、数据库设计

### 1.1 用户表 (user)

```sql
CREATE TABLE `user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `email` VARCHAR(100) COMMENT '邮箱',
  `phone` VARCHAR(20) COMMENT '手机号',
  `avatar` VARCHAR(255) COMMENT '头像URL',
  `password_hash` VARCHAR(255) NOT NULL COMMENT '密码',
  `status` TINYINT DEFAULT 1 COMMENT '状态: 0-禁用, 1-正常',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY `uk_username` (`username`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

### 1.2 素材表 (asset)

```sql
CREATE TABLE `asset` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '素材ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `folder_id` BIGINT DEFAULT NULL COMMENT '文件夹ID',
  `name` VARCHAR(255) NOT NULL COMMENT '素材名称',
  `type` VARCHAR(20) NOT NULL COMMENT '类型: 0-image，1-video，2-audio',
  `file_url` VARCHAR(500) NOT NULL COMMENT '文件URL',
  `thumbnail_url` VARCHAR(500) COMMENT '缩略图URL',
  `file_size` BIGINT COMMENT '文件大小(字节)',
  `duration` INT COMMENT '时长(秒, 视频/音频)',
  `width` INT COMMENT '宽度(像素)',
  `height` INT COMMENT '高度(像素)',
  `format` VARCHAR(20) COMMENT '格式: jpg/png/mp4/mp3等',
  `is_deleted` TINYINT DEFAULT 1 COMMENT '状态: 0-未删除, 1-已删除',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_folder_id` (`folder_id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='素材表';
```

### 1.3 素材文件夹表 (asset_folder)

```sql
CREATE TABLE `asset_folder` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '文件夹ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `parent_id` BIGINT DEFAULT NULL COMMENT '父文件夹ID，文件夹ID = 用户ID，则为最顶层文件夹',
  `name` VARCHAR(100) NOT NULL COMMENT '文件夹名称',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='素材文件夹表';
```

### 1.4 创意项目表 (project)

```sql
CREATE TABLE `project` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '项目ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `cover_url` VARCHAR(500) COMMENT '封面图URL',
  `status` VARCHAR(20) DEFAULT 'draft' COMMENT '状态: 1-draft，2-processing，3-completed',
  `source` VARCHAR(50) COMMENT '来源: 1-智能成片，2-创意工坊，3-数字分身',
  `scene_type` VARCHAR(50) NOT NULL COMMENT '场景类型: 1-general，2-tiktok，3-ai_ad，4-product_display，5-promotional',
  
  -- 通用字段
  `product_name` VARCHAR(200) COMMENT '产品名称',
  `product_desc` TEXT COMMENT '产品描述',
  `selling_points` TEXT COMMENT '产品卖点',
  `target_audience` TEXT COMMENT '目标受众',
  `language` VARCHAR(20) DEFAULT 'zh' COMMENT '语言',
  
  -- 场景特有配置(JSON格式存储)
  `scene_config` JSON COMMENT '场景特有配置',
  
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_scene_type` (`scene_type`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='创意项目表';
```

**scene_config 字段说明：**

不同场景存储不同的配置项：

```json
// general 场景
{
  "videoDuration": "创作视频时长",
  "videoRatio": "9:16",
  "enableWatermark": false,
  "otherIdeas": "其他创作想法"
}

// tiktok 场景
{
  "otherIdeas": "其他创作想法"
}

// ai_ad 场景
{
  "placement": "投放版位",
  "scriptStyle": "脚本风格"
}

// product_display 场景
{
  "placement": "投放版位"
}

// promotional 场景
{
  "originalPrice": "99.00",
  "promotionPrice": "79.00",
  "startDate": "2024-03-01",
  "endDate": "2024-03-15",
  "promotionDesc": "促销方案描述",
  "marketingNode": "情人节",
   "placement": "投放版位"
}
```

### 1.5 项目素材关联表 (project_asset)

```sql
CREATE TABLE `project_asset` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `project_id` BIGINT NOT NULL COMMENT '项目ID',
  `asset_id` BIGINT NOT NULL COMMENT '素材ID',
  `sort_order` INT DEFAULT 0 COMMENT '排序',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  UNIQUE KEY `uk_project_asset` (`project_id`, `asset_id`),
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_asset_id` (`asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目素材关联表';
```

### 1.6 视频生成任务表 (video_task)

```sql
CREATE TABLE `video_task` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '任务ID',
  `project_id` BIGINT NOT NULL COMMENT '项目ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `status` VARCHAR(20) DEFAULT 'pending' COMMENT '状态: 1-processing,2-completed,3-failed',
  `progress` INT DEFAULT 0 COMMENT '进度(0-100)',
  `result_url` VARCHAR(500) COMMENT '生成结果URL',
  `error_message` TEXT COMMENT '错误信息',
  `started_at` DATETIME COMMENT '开始时间',
  `completed_at` DATETIME COMMENT '完成时间',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='视频生成任务表';
```

---

## 二、通用响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

**状态码说明：**

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 三、素材管理接口

### 3.1 获取素材列表

**GET** `/api/v1/assets`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | String | 否 | 类型: all/image/video/audio，默认all |
| folderId | Long | 否 | 文件夹ID |
| keyword | String | 否 | 搜索关键词 |
| page | Integer | 否 | 页码，默认1 |
| size | Integer | 否 | 每页数量，默认20 |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 100,
    "page": 1,
    "size": 20,
    "list": [
      {
        "id": 1,
        "name": "产品图1.jpg",
        "type": "image",
        "fileUrl": "https://xxx.com/assets/1.jpg",
        "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
        "fileSize": 1024000,
        "width": 1920,
        "height": 1080,
        "format": "jpg",
        "folderId": null,
        "createdAt": "2024-03-06 10:00:00"
      }
    ],
    "stats": {
      "totalCount": 100,
      "imageCount": 50,
      "videoCount": 30,
      "audioCount": 20
    }
  }
}
```

### 3.2 上传素材

**POST** `/api/v1/assets/upload`

**请求方式：** multipart/form-data

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 文件 |
| folderId | Long | 否 | 文件夹ID |
| name | String | 否 | 自定义名称 |

**响应示例：**

```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "id": 1,
    "name": "产品图1.jpg",
    "type": "image",
    "fileUrl": "https://xxx.com/assets/1.jpg",
    "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
    "fileSize": 1024000,
    "width": 1920,
    "height": 1080,
    "format": "jpg"
  }
}
```

### 3.3 创建文件夹

**POST** `/api/v1/assets/folders`

**请求参数：**

```json
{
  "name": "产品图片",
  "parentId": null
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": 1,
    "name": "产品图片",
    "parentId": null
  }
}
```

### 3.4 获取文件夹列表

**GET** `/api/v1/assets/folders`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "产品图片",
      "parentId": null,
      "count": 10
    }
  ]
}
```

### 3.5 移动素材到文件夹

**PUT** `/api/v1/assets/{id}/move`

**请求参数：**

```json
{
  "folderId": 1
}
```

### 3.6 删除素材（移入回收站）

**DELETE** `/api/v1/assets/{id}`

### 3.7 批量删除素材

**POST** `/api/v1/assets/batch-delete`

**请求参数：**

```json
{
  "ids": [1, 2, 3]
}
```

### 3.8 获取回收站素材

**GET** `/api/v1/assets/trash`

### 3.9 恢复素材

**PUT** `/api/v1/assets/{id}/restore`

### 3.10 彻底删除素材

**DELETE** `/api/v1/assets/{id}/permanent`

---

## 四、创意项目接口

### 4.1 获取项目列表

**GET** `/api/v1/projects`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | String | 否 | 状态: all/completed/draft/processing，默认all |
| source | String | 否 | 来源 |
| keyword | String | 否 | 搜索关键词 |
| sort | String | 否 | 排序: recent/oldest/nameAsc/nameDesc |
| page | Integer | 否 | 页码 |
| size | Integer | 否 | 每页数量 |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 50,
    "page": 1,
    "size": 12,
    "list": [
      {
        "id": 1,
        "title": "智能耳机推广视频",
        "coverUrl": "https://xxx.com/covers/1.jpg",
        "status": "completed",
        "source": "智能成片",
        "sceneType": "general",
        "createdAt": "2024-03-06 10:00:00",
        "updatedAt": "2024-03-06 12:00:00"
      }
    ]
  }
}
```

### 4.2 创建项目

**POST** `/api/v1/projects`

**请求参数：**

```json
{
  "title": "智能耳机推广视频",
  "source": "智能成片",
  "sceneType": "general",
  "productName": "智能降噪耳机",
  "productDesc": "高品质蓝牙耳机",
  "sellingPoints": "主动降噪效果明显",
  "targetAudience": "18-30岁年轻人",
  "videoDuration": 30,
  "language": "zh",
  "sceneConfig": {
    "videoRatio": "9:16",
    "enableWatermark": false,
    "additionalIdeas": "希望整体节奏偏快"
  }
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": 1,
    "title": "智能耳机推广视频",
    "status": "draft"
  }
}
```

### 4.3 获取项目详情

**GET** `/api/v1/projects/{id}`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "title": "智能耳机推广视频",
    "coverUrl": "https://xxx.com/covers/1.jpg",
    "status": "completed",
    "source": "智能成片",
    "sceneType": "general",
    "productName": "智能降噪耳机",
    "productDesc": "高品质蓝牙耳机",
    "sellingPoints": "主动降噪效果明显",
    "targetAudience": "18-30岁年轻人",
    "videoDuration": 30,
    "language": "zh",
    "sceneConfig": {
      "videoRatio": "9:16",
      "enableWatermark": false,
      "additionalIdeas": "希望整体节奏偏快"
    },
    "assets": [
      {
        "id": 1,
        "name": "产品图1.jpg",
        "type": "image",
        "fileUrl": "https://xxx.com/assets/1.jpg",
        "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg"
      }
    ],
    "createdAt": "2024-03-06 10:00:00",
    "updatedAt": "2024-03-06 12:00:00"
  }
}
```

### 4.4 更新项目

**PUT** `/api/v1/projects/{id}`

**请求参数：**

```json
{
  "title": "新标题",
  "productName": "智能降噪耳机Pro",
  "sellingPoints": "主动降噪, 续航30小时",
  "sceneConfig": {
    "videoRatio": "16:9",
    "enableWatermark": true
  }
}
```

### 4.5 添加项目素材

**POST** `/api/v1/projects/{id}/assets`

**请求参数：**

```json
{
  "assetIds": [1, 2, 3]
}
```

### 4.6 移除项目素材

**DELETE** `/api/v1/projects/{id}/assets/{assetId}`

### 4.7 删除项目

**DELETE** `/api/v1/projects/{id}`

---

## 五、智能成片接口

### 5.1 智能解析需求

**POST** `/api/v1/video/parse`

**请求参数：**

```json
{
  "content": "我需要为智能降噪耳机制作一个TikTok推广视频"
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "解析成功",
  "data": {
    "productName": "智能降噪耳机",
    "productDesc": "高品质蓝牙耳机",
    "sellingPoints": "主动降噪, 长续航",
    "targetAudience": "TikTok用户",
    "suggestedScene": "tiktok",
    "suggestedDuration": 30
  }
}
```

### 5.2 创建视频生成任务

**POST** `/api/v1/video/tasks`

**请求参数：**

```json
{
  "projectId": 1
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "任务创建成功",
  "data": {
    "taskId": "task_123456",
    "projectId": 1,
    "status": "pending"
  }
}
```

### 5.3 查询任务状态

**GET** `/api/v1/video/tasks/{taskId}`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "taskId": "task_123456",
    "projectId": 1,
    "status": "processing",
    "progress": 45,
    "resultUrl": null,
    "errorMessage": null,
    "startedAt": "2024-03-06 10:00:00",
    "completedAt": null
  }
}
```

### 5.4 取消任务

**DELETE** `/api/v1/video/tasks/{taskId}`

---

## 六、文件上传接口

### 6.1 获取上传凭证

**GET** `/api/v1/upload/token`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| filename | String | 是 | 文件名 |
| type | String | 是 | 类型: image/video/audio |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "uploadUrl": "https://oss.xxx.com/upload",
    "token": "xxx",
    "key": "assets/2024/03/xxx.jpg",
    "expiresIn": 3600
  }
}
```

### 6.2 上传完成回调

**POST** `/api/v1/upload/callback`

**请求参数：**

```json
{
  "key": "assets/2024/03/xxx.jpg",
  "size": 1024000,
  "width": 1920,
  "height": 1080
}
```

---

## 七、用户认证接口

### 7.1 用户登录

**POST** `/api/v1/auth/login`

**请求参数：**

```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "user@example.com",
      "avatar": "https://xxx.com/avatars/1.jpg"
    }
  }
}
```

### 7.2 用户注册

**POST** `/api/v1/auth/register`

### 7.3 刷新Token

**POST** `/api/v1/auth/refresh`

### 7.4 退出登录

**POST** `/api/v1/auth/logout`

---

## 八、WebSocket 接口

### 8.1 视频生成进度推送

**连接地址：** `ws://host/api/v1/ws`

**订阅主题：** `video.task.{taskId}`

**进度消息：**

```json
{
  "type": "progress",
  "taskId": "task_123456",
  "progress": 45,
  "status": "processing"
}
```

**完成消息：**

```json
{
  "type": "completed",
  "taskId": "task_123456",
  "resultUrl": "https://xxx.com/videos/result.mp4"
}
```

---

## 九、错误码定义

| 错误码 | 说明 |
|--------|------|
| 10001 | 参数错误 |
| 10002 | 资源不存在 |
| 20001 | 用户名或密码错误 |
| 20002 | Token过期 |
| 30001 | 文件上传失败 |
| 30002 | 文件类型不支持 |
| 40001 | 视频生成失败 |
| 50001 | 服务器内部错误 |

---

## 附录

### A. 场景类型说明

| 场景代码 | 场景名称 | 前端文件 |
|----------|----------|----------|
| general | 通用场景 | GeneralScene.vue |
| tiktok | TikTok场景 | TikTokScene.vue |
| ai_ad | AI原生广告 | AiOriginalAdScene.vue |
| product_display | 商品展示 | ProductDisplayAdScene.vue |
| promotional | 促销视频 | PromotionalVideoAdScene.vue |

### B. 语言代码

| 代码 | 语言 |
|------|------|
| zh | 中文 |
| en | 英语 |
| ja | 日语 |
| de | 德语 |
| es | 西班牙语 |
| fr | 法语 |
| pt | 葡萄牙语 |
| ru | 俄语 |

---

**版本：** v1.0.0  
**更新日期：** 2024-03-06
