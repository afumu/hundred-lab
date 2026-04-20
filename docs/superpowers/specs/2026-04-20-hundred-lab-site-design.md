# Hundred Lab Site Design

## Goal

为 `hundred-lab` 构建一个可部署到 GitHub Pages 的前端官网，用高设计感的方式展示：

- 百创计划整体介绍
- 当前仓库 `hundred-lab`
- 外部 GitHub 仓库卡片
- 正式内容目录：项目、产品、技能、文章、视频
- 文章正文的 Markdown 渲染阅读页

这个站点既是仓库说明页，也是一个持续扩展的公开展示入口。

## Recommended Approach

推荐使用 **Astro 静态站点**，并在需要交互的局部区域引入前端组件。

原因：

- 适合内容驱动站点，天然适配文章、项目、产品、技能目录
- 构建后是纯静态资源，适合 GitHub Pages
- 对 Markdown 和本地内容组织支持很好
- 比纯 React 更轻，更适合当前仓库的内容站 + 展示站场景
- 后续仍可加入 React 组件，不锁死扩展能力

## Alternatives Considered

### Option A: Astro

优点：

- 内容组织最自然
- Markdown 渲染和静态生成体验最好
- GitHub Pages 部署路径成熟
- 视觉页和内容页都能兼顾

缺点：

- 团队如果更熟 React-only 思维，需要适应 Astro 的内容和页面组织方式

### Option B: Vite + React

优点：

- 标准前端项目结构
- 组件化和交互自由度高

缺点：

- Markdown 内容、路由、数据收集、构建时读取本地内容都要额外搭一层
- 对当前这种“仓库展示 + 内容阅读”站点来说更重

### Option C: 文档站生成器

优点：

- Markdown 和目录支持成熟

缺点：

- 视觉上容易退化成普通文档站
- 不符合“漂亮、有设计感、像作品集和内容门户”的目标

## Design Direction

视觉方向采用：

- **Editorial + Futuristic Atlas**

站点不是做成常规 SaaS 仪表盘，也不是普通博客，而是像一张“资产地图”：

- 首页有强烈的品牌标题和导语
- 内容以大卡片、专题区块、关系导航组织
- 用深色底 + 暖色高亮 + 细颗粒纹理 + 轻微网格地图感，营造“公开知识母仓库”的氛围
- 文章阅读页更克制，保证 Markdown 内容可读

这个方向要避免：

- 默认文档站样式
- 紫色渐变白底 AI 套路
- 普通 SaaS 卡片墙

## Information Architecture

### 1. Home

首页承载：

- 百创计划主标题
- 仓库定位与目标
- 当前资产总览
- 仓库和外部项目入口
- 最新文章或重点内容

### 2. Repositories

仓库展示区分两层：

- `hundred-lab` 本仓库
- 外部 GitHub 仓库卡片，例如 `openwork`、`openlink`

每张卡片展示：

- 名称
- 类型
- 一句话介绍
- 核心标签
- GitHub 链接
- 是否在本仓库有对应正式条目

### 3. Content Sections

正式内容分五类展示：

- Projects
- Products
- Skills
- Articles
- Videos

每类都先展示概览卡片，再进入详情页或条目页。

### 4. Article Pages

文章详情页直接渲染 Markdown，并保留：

- 标题
- 摘要
- 正文
- 目录
- 关联项目 / 产品 / 技能

## Content Sources

站点第一版只读取仓库内已经存在的正式内容，不读取 `ideas/`。

数据来源：

- `content/projects/`
- `content/products/`
- `content/skills/`
- `content/articles/`
- `content/videos/`

文章正文优先读取：

- `content/articles/**/article.md`

目录和元信息优先读取：

- 各条目目录下的 `README.md`
- `meta.yaml`

外部 GitHub 仓库信息第一版采用 **仓库内维护的正式条目** 作为主数据源，而不是浏览器运行时直接请求 GitHub API。

这样可以：

- 避免 GitHub API 限流
- 避免客户端暴露令牌问题
- 保持 Pages 纯静态部署

## Markdown Rendering Strategy

文章渲染采用：

- Astro 页面负责路由和静态生成
- Markdown 文件在构建时读取并渲染
- 支持 GitHub Flavored Markdown

要求：

- 标题层级清晰
- 代码块样式精致
- 表格、引用、列表渲染完整
- 移动端可读

不在第一版支持：

- 在线编辑
- 评论系统
- 动态搜索索引服务

## Page Structure

第一版建议包含以下页面：

- `/` 首页
- `/projects`
- `/products`
- `/skills`
- `/articles`
- `/videos`
- `/articles/[slug]`

如有需要，后续再加：

- `/repos`
- `/about`
- `/tools`

## Deployment

部署目标为 GitHub Pages。

方案：

- 使用 GitHub Actions 构建和发布
- Pages source 选择 GitHub Actions
- 站点构建输出发布到 Pages artifact
- 若站点部署到仓库子路径，则正确配置 `base`

## Non-Goals For V1

第一版不做：

- 后台 CMS
- 动态用户登录
- 在线数据库
- 评论、点赞、收藏
- 运行时从 GitHub API 拉全量仓库数据
- 自动同步所有 ideas

## Success Criteria

第一版成功的标准是：

- 用户打开 GitHub Pages 就能理解百创计划是什么
- 用户能清楚看到 `hundred-lab` 和外部仓库的关系
- 正式内容能以统一视觉方式展示
- 文章能稳定渲染 Markdown
- 页面在桌面和移动端都可读
- 后续新增正式条目时，站点结构能自然扩展

## Implementation Notes

实现时应优先保证：

- 内容源读取清晰
- 页面结构稳定
- 视觉上有明确辨识度
- 文章页优先保证阅读体验

不要为了第一版去做过多动态能力。
