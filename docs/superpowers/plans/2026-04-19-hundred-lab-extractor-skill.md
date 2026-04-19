# 百创计划元技能 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在仓库中创建第一个正式元技能，用来指导如何从用户上下文中优先提炼产品机会，并进一步拆解为项目、技能、文章和视频

**Architecture:** 把“仓库级硬规则”和“可复用提炼方法”拆开。仓库默认行为继续留在 `AGENTS.md` 与 `docs/workflow.md`，元技能本体只负责说明提炼与追问的方法。技能目录采用最小骨架：`README.md`、`SKILL.md`、`meta.yaml`。

**Tech Stack:** Markdown 文档、YAML 元数据、仓库目录结构

---

### Task 1: 创建元技能目录骨架

**Files:**
- Create: `content/skills/S000-hundred-lab-extractor/README.md`
- Create: `content/skills/S000-hundred-lab-extractor/SKILL.md`
- Create: `content/skills/S000-hundred-lab-extractor/meta.yaml`

- [ ] **Step 1: 创建目录**

创建目录：

```text
content/skills/S000-hundred-lab-extractor/
```

- [ ] **Step 2: 创建技能配套文件**

创建最小骨架：

```text
content/skills/S000-hundred-lab-extractor/
├── README.md
├── SKILL.md
└── meta.yaml
```

- [ ] **Step 3: 检查目录存在**

Run: `find content/skills/S000-hundred-lab-extractor -maxdepth 2 | sort`
Expected: 输出中包含以上三个文件

### Task 2: 编写元技能内容

**Files:**
- Create: `content/skills/S000-hundred-lab-extractor/SKILL.md`
- Create: `content/skills/S000-hundred-lab-extractor/README.md`
- Create: `content/skills/S000-hundred-lab-extractor/meta.yaml`

- [ ] **Step 1: 写 README**

README 需要说明：

- 这个技能是什么
- 它不负责什么
- 它与 `AGENTS.md`、`docs/workflow.md` 的关系
- 它适合什么时候使用

- [ ] **Step 2: 写 SKILL.md**

SKILL 需要覆盖：

- 触发条件
- 产品优先的提炼顺序
- 五类资产拆解方法
- 缺口判断
- 追问原则
- 候选落点判断
- 升级提醒条件

- [ ] **Step 3: 写 meta.yaml**

元数据至少包含：

- id
- title
- slug
- status
- visibility
- tags
- related 文段

### Task 3: 验证与提交

**Files:**
- Modify: `content/skills/README.md`
- Create: `content/skills/S000-hundred-lab-extractor/*`

- [ ] **Step 1: 把新技能挂到技能区**

必要时更新 `content/skills/README.md`，让目录说明与第一个正式技能保持一致。

- [ ] **Step 2: 检查工作区变化**

Run: `git status --short`
Expected: 输出中包含新技能目录和相关文档

- [ ] **Step 3: 提交并推送**

Run:

```bash
git add .
git commit -m "feat: add hundred lab extractor skill"
git push
```

Expected: 新技能被提交并同步到远程仓库
