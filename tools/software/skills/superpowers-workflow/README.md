# superpowers-workflow

## 当前定位

`superpowers-workflow` 不是单个 skill，而是一组围绕 AI 编程和 agent 开发的工作流 skills。

这一组 skill 组合起来，基本覆盖了从理解需求、写方案、实施开发、调试问题、做验证、收尾集成的完整链路，是你当前 AI 编程体系里最重要的一套流程能力。

## 这组 skills 主要在做什么

### 1. 进入和组织工作流

- `using-superpowers`：进入整套 Superpowers 体系的入口，提醒先判断要不要用 skill
- `using-git-worktrees`：需要隔离工作区时，先建立独立 worktree

### 2. 方案与计划

- `brainstorming`：先把需求讲清楚、设计清楚，再决定怎么做
- `writing-plans`：把需求拆成可执行的实现计划

### 3. 实施开发

- `executing-plans`：按计划逐步执行
- `subagent-driven-development`：需要拆子任务并行开发时使用
- `dispatching-parallel-agents`：多个独立任务并行推进

### 4. 质量与排错

- `systematic-debugging`：遇到 bug 时先找根因，不能乱修
- `test-driven-development`：以测试驱动实现
- `requesting-code-review`：做完后主动发起审查
- `receiving-code-review`：收到 review 后先判断反馈是否合理，再修改
- `verification-before-completion`：在宣称完成之前必须重新验证

### 5. 收尾与沉淀

- `finishing-a-development-branch`：开发完成后决定怎么合并、怎么收尾
- `writing-skills`：把反复验证有效的方法论继续沉淀成 skill

## 适用场景

- AI 编程任务
- 复杂功能开发
- 需要多阶段推进的项目
- 希望把 agent 从“随便写写”升级成“更像工程化执行器”的场景

## 在当前工具栈里的价值

这组 skills 对你非常关键，因为你最近一直在强调：

- 先方案，再实现
- 先把测试指标、接口和流程定义清楚
- 方案要能 review
- 出错经验要能沉淀

Superpowers 工作流本质上就是在帮你把这些原则稳定化。它不是一个单点工具，而是一套 AI 编程操作系统。

## 来源

- `/Users/apple/.codex/superpowers/skills/`
