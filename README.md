# Sample Essays Showcase

一个美观的样文展示网站，用于浏览和学习优秀的写作范例。

## 项目结构

```
sample-essays-showcase/
├── sample-essays-backend/          # Express.js 后端
│   ├── src/
│   │   ├── app.js                  # Express app 配置
│   │   ├── config/                 # 配置文件
│   │   ├── middleware/             # 中间件
│   │   ├── modules/
│   │   │   ├── essays/             # 样文管理模块
│   │   │   └── categories/         # 分类管理模块
│   │   └── data/                   # 示例数据
│   ├── server.js                   # 服务器入口
│   └── package.json
├── sample-essays-frontend/         # HTML/CSS/JS 前端
│   ├── src/
│   │   └── input.css               # Tailwind CSS 输入
│   ├── dist/                       # 编译后的 CSS
│   ├── index.html                  # 首页
│   ├── browse.html                 # 浏览页面
│   ├── essay.html                  # 详情页面
│   ├── script.js                   # 主要脚本
│   ├── styles.css                  # 自定义样式
│   └── package.json
├── scripts/
│   └── dev.mjs                     # 开发脚本（同时启动前后端）
└── package.json
```

## 功能特性

- ✨ **美观的现代 UI** - 使用 Tailwind CSS 设计
- 🔍 **搜索和筛选** - 按标题、作者、关键词、分类搜索
- 📂 **分类浏览** - 轻松按不同主题浏览样文
- 📊 **排序选项** - 按最新、最旧、热门排序
- 📱 **响应式设计** - 完美适配各种设备
- ⚡ **快速加载** - 轻量级前端和高效后端 API

## 技术栈

**后端**：
- Node.js + Express.js
- ES6 模块
- 模块化架构

**前端**：
- HTML5
- Tailwind CSS
- 原生 JavaScript
- 现代浏览器 API

## 快速开始

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装后端依赖
cd sample-essays-backend
npm install

# 安装前端依赖
cd ../sample-essays-frontend
npm install
```

### 开发模式

从根目录运行（同时启动前后端）：

```bash
npm run dev
```

前端将在 http://localhost:5173 或类似地址启动  
后端 API 将在 http://localhost:5001 启动

或分别启动：

**后端**：
```bash
cd sample-essays-backend
npm run dev
```

**前端**：
```bash
cd sample-essays-frontend
npm run watch:css
```

### 生产部署

后端：
```bash
cd sample-essays-backend
npm start
```

前端：
```bash
cd sample-essays-frontend
npm run build:css
```

## API 端点

### 样文 (Essays)

- `GET /api/essays` - 获取所有样文（支持查询参数：category, search, sort）
- `GET /api/essays/featured` - 获取精选样文
- `GET /api/essays/:id` - 获取单个样文详情
- `GET /api/essays/search?q=query` - 搜索样文

### 分类 (Categories)

- `GET /api/categories` - 获取所有分类
- `GET /api/categories/stats` - 获取分类统计

## 示例数据

后端包含 8 篇示例样文，涵盖以下主题：

1. 有效沟通的艺术 (Communication)
2. 现代城市规划中的可持续发展 (Environment)
3. 拖延症的心理学 (Psychology)
4. 医疗技术创新 (Technology)
5. 面对变化时的韧性 (Personal Development)
6. 远程工作的未来 (Work & Career)
7. 信息过载时代的批判性思维 (Education)
8. 幸福和福祉的科学 (Psychology)

## 自定义和扩展

### 添加新样文

编辑 `sample-essays-backend/src/data/essays.js` 来添加或修改样文数据。

### 修改样式

修改 `sample-essays-frontend/src/input.css` 来定制 Tailwind CSS 配置。

### 连接真实数据库

将 `sample-essays-backend/src/modules/essays/essays.service.js` 中的模拟数据替换为真实数据库连接。

## 许可证

ISC
