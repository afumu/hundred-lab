# Coremi

Coremi 是百创计划记录的第一个正式产品。

源码仓库：

- <https://github.com/afumu/coremi>

## 产品定位

Coremi 是一套面向真实业务场景的 AI 应用系统，不只是一个聊天界面，而是把用户侧前端、管理后台、业务后端和独立 runtime 组合在一起的完整产品形态。

从当前仓库结构看，Coremi 已经具备一套比较完整的产品骨架：

- `chat/`：用户侧聊天前端
- `admin/`：管理后台
- `service/`：业务后端、鉴权、计费、日志和 runtime 桥接
- `pi/`：agent / runtime 工作区，承载 Coremi、discussion 和 runtime bundle 逻辑

这说明 Coremi 的目标不是单次演示，而是一个可运行、可管理、可扩展的 AI 产品系统。

## 目标用户

- 需要部署 AI 应用系统的团队
- 需要用户端 + 管理后台 + 业务后端 + runtime 一体化能力的产品方
- 希望把 agent/runtime 接入真实业务链路的开发者和创业者

## 核心问题

Coremi 试图解决的不是“如何再做一个聊天 UI”，而是：

- 如何把 AI 应用真正接进业务系统
- 如何让前端、鉴权、计费、日志、群组状态和 runtime 协同工作
- 如何让 agent/runtime 在真实产品链路里稳定运行
- 如何形成一套可管理、可部署、可持续迭代的 AI 应用架构

## 当前状态

根据当前 GitHub 仓库的 README，Coremi 已经形成清晰的主链路：

```text
chat frontend
  -> service /api/chatgpt/*
     -> business logic + billing + logs + group state
     -> per-user PI runtime /v1/chat/completions
        -> agent session / direct model path / Coremi / discussion
        -> internal bridges back to service
           -> model proxy
           -> search bridge
```

几个很关键的产品特征：

- 前端不直接调用 runtime，而是先经过 `service`
- `service` 掌握鉴权、扣费、日志、群组状态和对外业务 API
- runtime 已经不是玩具层，而是业务链路的一部分
- Coremi 支持 `skill` 和 `builtin` 双引擎
- discussion 和专家发现能力已经进入 runtime 执行

这意味着 Coremi 已经不只是一个概念产品，而是一套正在成形的 AI 产品基础设施。

## 当前记录方式

- 这里作为百创计划中的产品说明入口
- 源码、部署细节和运行逻辑以 GitHub 仓库为准
- 后续如果 Coremi 的定位、能力边界或路线变化，再同步更新这里
- 具体的后续迭代方向，单独记录在 `roadmap.md`

## 后续可沉淀方向

- Coremi 的产品路线图
- Coremi 的架构与 runtime 方法论
- Coremi 的业务化落地案例
- 从 Coremi 提炼出的独立 Skill、文章、视频和开源项目
