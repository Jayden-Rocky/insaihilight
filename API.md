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
  `type` TINYINT NOT NULL COMMENT '类型: 1-图片, 2-视频, 3-音频',
  `file_url` VARCHAR(500) NOT NULL COMMENT '文件URL',
  `thumbnail_url` VARCHAR(500) COMMENT '缩略图URL',
  `file_size` BIGINT COMMENT '文件大小(字节)',
  `duration` INT COMMENT '时长(秒, 视频/音频)',
  `width` INT COMMENT '宽度(像素)',
  `height` INT COMMENT '高度(像素)',
  `format` VARCHAR(20) COMMENT '格式: jpg/png/mp4/mp3等',
  `is_deleted` TINYINT DEFAULT 0 COMMENT '删除状态: 0-未删除, 1-已删除',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_folder_id` (`folder_id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_is_deleted` (`is_deleted`)
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
  `status` TINYINT DEFAULT 1 COMMENT '状态: 1-草稿, 2-生成中, 3-已完成',
  `source` TINYINT COMMENT '来源: 1-智能成片, 2-创意工坊, 3-数字分身',
  `scene_type` TINYINT NOT NULL COMMENT '场景类型: 1-通用场景, 2-TikTok, 3-AI原生广告, 4-商品展示, 5-促销视频',
  
  -- 通用字段
  `product_name` VARCHAR(200) COMMENT '产品名称',
  `product_desc` TEXT COMMENT '产品描述',
  `selling_points` TEXT COMMENT '产品卖点',
  `target_audience` TEXT COMMENT '目标受众',
  `language` TINYINT DEFAULT 1 COMMENT '语言: 1-中文, 2-英语, 3-日语, 4-德语, 5-西班牙语, 6-法语, 7-葡萄牙语, 8-俄语',
  
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
// 通用场景 (scene_type=1)
{
  "videoDuration": 30,
  "videoRatio": "9:16",
  "enableWatermark": false,
  "otherIdeas": "其他创作想法"
}

// TikTok场景 (scene_type=2)
{
  "otherIdeas": "其他创作想法"
}

// AI原生广告 (scene_type=3)
{
  "placement": 1,
  "scriptStyle": 1
}

// 商品展示 (scene_type=4)
{
  "placement": 1
}

// 促销视频 (scene_type=5)
{
  "originalPrice": "99.00",
  "promotionPrice": "79.00",
  "startDate": "2024-03-01",
  "endDate": "2024-03-15",
  "promotionDesc": "促销方案描述",
  "marketingNode": "情人节",
  "placement": 1
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
  `status` TINYINT DEFAULT 1 COMMENT '状态: 1-等待中, 2-处理中, 3-已完成, 4-失败',
  `progress` INT DEFAULT 0 COMMENT '进度(0-100)',
  `result_url` VARCHAR(500) COMMENT '生成结果URL',
  `error_message` TEXT COMMENT '错误信息',
  `started_at` DATETIME COMMENT '开始时间',
  `completed_at` DATETIME COMMENT '完成时间',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='视频生成任务表';
```

---

## 二、枚举定义

### 2.1 素材类型 (AssetType)

| 值 | 说明 |
|----|------|
| 1 | 图片 |
| 2 | 视频 |
| 3 | 音频 |

### 2.2 项目状态 (ProjectStatus)

| 值 | 说明 |
|----|------|
| 1 | 草稿 |
| 2 | 生成中 |
| 3 | 已完成 |

### 2.3 项目来源 (ProjectSource)

| 值 | 说明 |
|----|------|
| 1 | 智能成片 |
| 2 | 创意工坊 |
| 3 | 数字分身 |

### 2.4 场景类型 (SceneType)

| 值 | 说明 |
|----|------|
| 1 | 通用场景 |
| 2 | TikTok |
| 3 | AI原生广告 |
| 4 | 商品展示 |
| 5 | 促销视频 |

### 2.5 任务状态 (TaskStatus)

| 值 | 说明 |
|----|------|
| 1 | 等待中 |
| 2 | 处理中 |
| 3 | 已完成 |
| 4 | 失败 |

### 2.6 语言类型 (Language)

| 值 | 说明 |
|----|------|
| 1 | 中文 |
| 2 | 英语 |
| 3 | 日语 |
| 4 | 德语 |
| 5 | 西班牙语 |
| 6 | 法语 |
| 7 | 葡萄牙语 |
| 8 | 俄语 |

### 2.7 投放版位 (Placement)

| 值 | 说明 |
|----|------|
| 1 | 抖音 |
| 2 | 快手 |
| 3 | 小红书 |
| 4 | 微信视频号 |
| 5 | B站 |

### 2.8 脚本风格 (ScriptStyle)

| 值 | 说明 |
|----|------|
| 1 | 专业严谨 |
| 2 | 亲切自然 |
| 3 | 活泼幽默 |

---

## 三、通用响应格式

### 3.1 成功响应

```json
{
  "code": 200,
  "message": "success",
  "data": { ... }
}
```

### 3.2 错误响应

```json
{
  "code": 10001,
  "message": "参数错误",
  "data": null
}
```

### 3.3 分页响应

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [ ... ],
    "total": 100,
    "page": 1,
    "pageSize": 20
  }
}
```

---

## 四、素材管理接口

### 4.1 获取素材列表

**GET** `/api/v1/assets`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| folderId | Long | 否 | 文件夹ID，不传则获取全部 |
| type | Integer | 否 | 类型: 1-图片, 2-视频, 3-音频 |
| keyword | String | 否 | 搜索关键词 |
| page | Integer | 否 | 页码，默认1 |
| pageSize | Integer | 否 | 每页数量，默认20 |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "产品图1.jpg",
        "type": 1,
        "fileUrl": "https://xxx.com/assets/1.jpg",
        "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
        "fileSize": 1024000,
        "width": 1920,
        "height": 1080,
        "format": "jpg",
        "folderId": 1,
        "folderName": "产品图片",
        "createdAt": "2024-03-06 10:00:00"
      },
      {
        "id": 2,
        "name": "宣传视频.mp4",
        "type": 2,
        "fileUrl": "https://xxx.com/assets/2.mp4",
        "thumbnailUrl": "https://xxx.com/assets/2_thumb.jpg",
        "fileSize": 10240000,
        "duration": 30,
        "width": 1920,
        "height": 1080,
        "format": "mp4",
        "folderId": 2,
        "folderName": "视频素材",
        "createdAt": "2024-03-06 11:00:00"
      }
    ],
    "total": 50,
    "page": 1,
    "pageSize": 20
  }
}
```

### 4.2 获取素材详情

**GET** `/api/v1/assets/{id}`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "产品图1.jpg",
    "type": 1,
    "fileUrl": "https://xxx.com/assets/1.jpg",
    "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
    "fileSize": 1024000,
    "width": 1920,
    "height": 1080,
    "format": "jpg",
    "folderId": 1,
    "folder": {
      "id": 1,
      "name": "产品图片",
      "parentId": null
    },
    "createdAt": "2024-03-06 10:00:00",
    "updatedAt": "2024-03-06 10:00:00"
  }
}
```

### 4.3 上传素材

**POST** `/api/v1/assets`

**请求参数：**

```json
{
  "name": "产品图1.jpg",
  "type": 1,
  "fileUrl": "https://xxx.com/assets/1.jpg",
  "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
  "fileSize": 1024000,
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "folderId": 1,
  "duration": null
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "id": 1,
    "name": "产品图1.jpg",
    "type": 1,
    "fileUrl": "https://xxx.com/assets/1.jpg"
  }
}
```

### 4.4 更新素材信息

**PUT** `/api/v1/assets/{id}`

**请求参数：**

```json
{
  "name": "新产品图.jpg",
  "folderId": 2
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "name": "新产品图.jpg",
    "folderId": 2
  }
}
```

### 4.5 批量移动素材

**POST** `/api/v1/assets/move`

**请求参数：**

```json
{
  "assetIds": [1, 2, 3],
  "targetFolderId": 5
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "移动成功",
  "data": {
    "successCount": 3
  }
}
```

### 4.6 批量删除素材

**POST** `/api/v1/assets/batch-delete`

**请求参数：**

```json
{
  "assetIds": [1, 2, 3]
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "删除成功",
  "data": {
    "successCount": 3
  }
}
```

### 4.7 获取素材统计

**GET** `/api/v1/assets/statistics`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalCount": 150,
    "totalSize": 1073741824,
    "typeCount": {
      "1": 80,
      "2": 50,
      "3": 20
    },
    "typeSize": {
      "1": 214748364,
      "2": 751619276,
      "3": 107374182
    }
  }
}
```

---

## 五、素材文件夹接口

### 5.1 获取文件夹树

**GET** `/api/v1/asset-folders/tree`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "全部素材",
      "parentId": null,
      "assetCount": 150,
      "children": [
        {
          "id": 2,
          "name": "产品图片",
          "parentId": 1,
          "assetCount": 50,
          "children": []
        },
        {
          "id": 3,
          "name": "视频素材",
          "parentId": 1,
          "assetCount": 30,
          "children": []
        }
      ]
    }
  ]
}
```

### 5.2 获取文件夹列表

**GET** `/api/v1/asset-folders`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| parentId | Long | 否 | 父文件夹ID，不传获取根目录 |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 2,
      "name": "产品图片",
      "parentId": 1,
      "assetCount": 50,
      "createdAt": "2024-03-06 10:00:00"
    },
    {
      "id": 3,
      "name": "视频素材",
      "parentId": 1,
      "assetCount": 30,
      "createdAt": "2024-03-06 10:00:00"
    }
  ]
}
```

### 5.3 创建文件夹

**POST** `/api/v1/asset-folders`

**请求参数：**

```json
{
  "name": "新产品图片",
  "parentId": 1
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": 10,
    "name": "新产品图片",
    "parentId": 1
  }
}
```

### 5.4 更新文件夹

**PUT** `/api/v1/asset-folders/{id}`

**请求参数：**

```json
{
  "name": "更新后的文件夹名"
}
```

### 5.5 删除文件夹

**DELETE** `/api/v1/asset-folders/{id}`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| force | Boolean | 否 | 是否强制删除（包含子素材），默认false |

**响应示例：**

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

**错误情况：**

```json
{
  "code": 30003,
  "message": "文件夹内存在素材，无法删除",
  "data": {
    "assetCount": 10
  }
}
```

---

## 六、创意项目接口

### 6.1 获取项目列表

**GET** `/api/v1/projects`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | Integer | 否 | 状态: 1-草稿, 2-生成中, 3-已完成 |
| source | Integer | 否 | 来源: 1-智能成片, 2-创意工坊, 3-数字分身 |
| sceneType | Integer | 否 | 场景类型 |
| keyword | String | 否 | 搜索关键词（产品名称） |
| page | Integer | 否 | 页码，默认1 |
| pageSize | Integer | 否 | 每页数量，默认20 |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "coverUrl": "https://xxx.com/covers/1.jpg",
        "status": 3,
        "source": 1,
        "sceneType": 1,
        "productName": "智能降噪耳机",
        "createdAt": "2024-03-06 10:00:00",
        "updatedAt": "2024-03-06 12:00:00"
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 20
  }
}
```

### 6.2 创建项目

**POST** `/api/v1/projects`

**请求参数：**

```json
{
  "source": 1,
  "sceneType": 1,
  "productName": "智能降噪耳机",
  "productDesc": "高品质蓝牙耳机，主动降噪",
  "sellingPoints": "主动降噪效果明显",
  "targetAudience": "18-30岁年轻人",
  "language": 1,
  "sceneConfig": {
    "videoDuration": 30,
    "videoRatio": "9:16",
    "enableWatermark": false,
    "otherIdeas": "希望整体节奏偏快"
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
    "productName": "智能降噪耳机",
    "status": 1
  }
}
```

### 6.3 获取项目详情

**GET** `/api/v1/projects/{id}`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "coverUrl": "https://xxx.com/covers/1.jpg",
    "status": 3,
    "source": 1,
    "sceneType": 1,
    "productName": "智能降噪耳机",
    "productDesc": "高品质蓝牙耳机",
    "sellingPoints": "主动降噪效果明显",
    "targetAudience": "18-30岁年轻人",
    "language": 1,
    "sceneConfig": {
      "videoDuration": 30,
      "videoRatio": "9:16",
      "enableWatermark": false,
      "otherIdeas": "希望整体节奏偏快"
    },
    "assets": [
      {
        "id": 1,
        "name": "产品图1.jpg",
        "type": 1,
        "fileUrl": "https://xxx.com/assets/1.jpg",
        "thumbnailUrl": "https://xxx.com/assets/1_thumb.jpg",
        "sortOrder": 0
      }
    ],
    "videoTask": {
      "id": 1,
      "status": 3,
      "progress": 100,
      "resultUrl": "https://xxx.com/videos/result.mp4"
    },
    "createdAt": "2024-03-06 10:00:00",
    "updatedAt": "2024-03-06 12:00:00"
  }
}
```

### 6.4 更新项目

**PUT** `/api/v1/projects/{id}`

**请求参数：**

```json
{
  "productName": "智能降噪耳机Pro",
  "productDesc": "升级版高品质蓝牙耳机",
  "sellingPoints": "主动降噪, 续航30小时",
  "sceneConfig": {
    "videoDuration": 60,
    "videoRatio": "16:9",
    "enableWatermark": true
  }
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 1,
    "productName": "智能降噪耳机Pro"
  }
}
```

### 6.5 添加项目素材

**POST** `/api/v1/projects/{id}/assets`

**请求参数：**

```json
{
  "assetIds": [1, 2, 3]
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "添加成功",
  "data": {
    "addedCount": 3
  }
}
```

### 6.6 移除项目素材

**DELETE** `/api/v1/projects/{id}/assets/{assetId}`

**响应示例：**

```json
{
  "code": 200,
  "message": "移除成功",
  "data": null
}
```

### 6.7 调整项目素材顺序

**POST** `/api/v1/projects/{id}/assets/sort`

**请求参数：**

```json
{
  "assetOrders": [
    { "assetId": 1, "sortOrder": 0 },
    { "assetId": 2, "sortOrder": 1 },
    { "assetId": 3, "sortOrder": 2 }
  ]
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "排序成功",
  "data": null
}
```

### 6.8 删除项目

**DELETE** `/api/v1/projects/{id}`

**响应示例：**

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 6.9 复制项目

**POST** `/api/v1/projects/{id}/copy`

**响应示例：**

```json
{
  "code": 200,
  "message": "复制成功",
  "data": {
    "id": 2,
    "productName": "智能降噪耳机（副本）",
    "status": 1
  }
}
```

---

## 七、智能成片接口

### 7.1 智能解析需求

**POST** `/api/v1/smart-video/parse`

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
    "productDesc": "智能降噪耳机产品",
    "sellingPoints": "降噪效果好",
    "targetAudience": "TikTok用户",
    "suggestedScene": 2,
    "suggestedDuration": 30,
    "suggestedRatio": "9:16"
  }
}
```

### 7.2 创建视频生成任务

**POST** `/api/v1/smart-video/tasks`

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
    "status": 1
  }
}
```

### 7.3 查询任务状态

**GET** `/api/v1/smart-video/tasks/{taskId}`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "taskId": "task_123456",
    "projectId": 1,
    "status": 2,
    "progress": 45,
    "resultUrl": null,
    "errorMessage": null,
    "startedAt": "2024-03-06 10:00:00",
    "completedAt": null
  }
}
```

### 7.4 获取项目的任务列表

**GET** `/api/v1/smart-video/tasks`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| projectId | Long | 是 | 项目ID |

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "taskId": "task_123456",
      "projectId": 1,
      "status": 3,
      "progress": 100,
      "resultUrl": "https://xxx.com/videos/result.mp4",
      "createdAt": "2024-03-06 10:00:00",
      "completedAt": "2024-03-06 10:05:00"
    }
  ]
}
```

### 7.5 取消任务

**DELETE** `/api/v1/smart-video/tasks/{taskId}`

**响应示例：**

```json
{
  "code": 200,
  "message": "取消成功",
  "data": null
}
```

### 7.6 重新生成视频

**POST** `/api/v1/smart-video/tasks/{taskId}/retry`

**响应示例：**

```json
{
  "code": 200,
  "message": "重新生成成功",
  "data": {
    "taskId": "task_123457",
    "status": 1
  }
}
```

---

## 八、文件上传接口

### 8.1 获取上传凭证

**GET** `/api/v1/upload/token`

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| filename | String | 是 | 文件名 |
| type | Integer | 是 | 类型: 1-图片, 2-视频, 3-音频 |

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

### 8.2 上传完成回调

**POST** `/api/v1/upload/callback`

**请求参数：**

```json
{
  "key": "assets/2024/03/xxx.jpg",
  "size": 1024000,
  "width": 1920,
  "height": 1080,
  "duration": null
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "fileUrl": "https://xxx.com/assets/xxx.jpg",
    "thumbnailUrl": "https://xxx.com/assets/xxx_thumb.jpg"
  }
}
```

---

## 九、用户认证接口

### 9.1 用户登录

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

### 9.2 用户注册

**POST** `/api/v1/auth/register`

**请求参数：**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123"
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "id": 1,
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

### 9.3 刷新Token

**POST** `/api/v1/auth/refresh`

**请求参数：**

```json
{
  "token": "old_token"
}
```

**响应示例：**

```json
{
  "code": 200,
  "message": "刷新成功",
  "data": {
    "token": "new_token",
    "expiresIn": 86400
  }
}
```

### 9.4 退出登录

**POST** `/api/v1/auth/logout`

**响应示例：**

```json
{
  "code": 200,
  "message": "退出成功",
  "data": null
}
```

### 9.5 获取当前用户信息

**GET** `/api/v1/auth/me`

**响应示例：**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "phone": "13800138000",
    "avatar": "https://xxx.com/avatars/1.jpg",
    "createdAt": "2024-03-01 10:00:00"
  }
}
```

---

## 十、WebSocket 接口

### 10.1 视频生成进度推送

**连接地址：** `ws://host/api/v1/ws`

**订阅主题：** `video.task.{taskId}`

**进度消息：**

```json
{
  "type": "progress",
  "taskId": "task_123456",
  "progress": 45,
  "status": 2
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

**失败消息：**

```json
{
  "type": "failed",
  "taskId": "task_123456",
  "errorMessage": "生成失败，请重试"
}
```

---

## 十一、错误码定义

| 错误码 | 说明 |
|--------|------|
| 10001 | 参数错误 |
| 10002 | 资源不存在 |
| 10003 | 无权限访问 |
| 20001 | 用户名或密码错误 |
| 20002 | Token过期 |
| 20003 | 用户名已存在 |
| 20004 | 邮箱已存在 |
| 30001 | 文件上传失败 |
| 30002 | 文件类型不支持 |
| 30003 | 文件夹内存在素材，无法删除 |
| 40001 | 视频生成失败 |
| 40002 | 任务不存在 |
| 40003 | 任务已取消 |
| 50001 | 服务器内部错误 |

---

**版本：** v1.0.0  
**更新日期：** 2024-03-06
