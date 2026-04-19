# 百创计划仓库骨架 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为百创计划总母仓库创建第一版目录骨架和可提交的占位文件

**Architecture:** 采用“顶层分类目录 + 候选池子目录 + 每个目录一个中文说明文件”的轻量方案。先把仓库的组织结构占好坑，再逐步往各个目录中填充真实内容，避免过早创建过重模板。

**Tech Stack:** Git 仓库目录结构、Markdown 文档

---

### Task 1: 创建顶层目录骨架

**Files:**
- Create: `projects/README.md`
- Create: `skills/README.md`
- Create: `products/README.md`
- Create: `articles/README.md`
- Create: `videos/README.md`
- Create: `candidates/README.md`
- Create: `docs/README.md`
- Create: `assets/README.md`
- Create: `scripts/README.md`
- Create: `registry/README.md`
- Create: `templates/README.md`
- Create: `archive/README.md`

- [ ] **Step 1: 创建顶层目录**

创建以下目录：

```text
projects/
skills/
products/
articles/
videos/
candidates/
docs/
assets/
scripts/
registry/
templates/
archive/
```

- [ ] **Step 2: 为每个顶层目录创建说明文件**

在每个目录下创建一个简短中文 `README.md`，用于说明该目录用途，并让 Git 能稳定跟踪目录结构。

- [ ] **Step 3: 检查目录是否已创建**

Run: `find . -maxdepth 2 -type d | sort`
Expected: 输出中包含以上顶层目录

### Task 2: 创建候选池子目录

**Files:**
- Create: `candidates/products/README.md`
- Create: `candidates/projects/README.md`
- Create: `candidates/skills/README.md`
- Create: `candidates/articles/README.md`
- Create: `candidates/videos/README.md`

- [ ] **Step 1: 创建候选池子目录**

创建以下目录：

```text
candidates/products/
candidates/projects/
candidates/skills/
candidates/articles/
candidates/videos/
```

- [ ] **Step 2: 为每个候选池子目录创建说明文件**

在每个子目录下创建简短中文 `README.md`，说明该目录按日期记录候选内容。

- [ ] **Step 3: 检查候选池结构**

Run: `find candidates -maxdepth 2 | sort`
Expected: 输出中包含五个候选分类子目录

### Task 3: 创建资源与模板子目录

**Files:**
- Create: `assets/brand/README.md`
- Create: `assets/covers/README.md`
- Create: `assets/thumbnails/README.md`
- Create: `assets/shared/README.md`
- Create: `templates/project-repo/README.md`
- Create: `templates/skill-repo/README.md`
- Create: `templates/product-repo/README.md`
- Create: `templates/article-item/README.md`
- Create: `templates/video-item/README.md`

- [ ] **Step 1: 创建资源子目录**

创建以下目录：

```text
assets/brand/
assets/covers/
assets/thumbnails/
assets/shared/
```

- [ ] **Step 2: 创建模板子目录**

创建以下目录：

```text
templates/project-repo/
templates/skill-repo/
templates/product-repo/
templates/article-item/
templates/video-item/
```

- [ ] **Step 3: 为资源和模板目录创建说明文件**

每个目录各放一个简短中文 `README.md`，说明后续用途。

- [ ] **Step 4: 检查结构完整性**

Run: `find assets templates -maxdepth 2 | sort`
Expected: 输出中包含资源和模板的子目录

### Task 4: 验证并提交骨架

**Files:**
- Modify: `README.md`
- Create: `.gitkeep`（如某些目录必须保留但不需要说明文件时）

- [ ] **Step 1: 检查工作区变化**

Run: `git status --short`
Expected: 输出中包含新建的目录说明文件

- [ ] **Step 2: 复核目录层级**

Run: `find . -maxdepth 3 | sort`
Expected: 目录结构与计划一致，没有明显遗漏

- [ ] **Step 3: 提交骨架**

Run:

```bash
git add .
git commit -m "chore: scaffold repository structure"
```

Expected: 生成包含目录骨架和说明文件的提交
