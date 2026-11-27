---
id: V-23
layer: 每讲速览
title: 第23讲 Orchestrator 范式：任务层的主 Agent 加子 Agent
source: 第23讲
tags: [Orchestrator, 子Agent, 并行]
---

# V-23 第23讲 Orchestrator 范式：任务层的主 Agent 加子 Agent

> 主 Agent 运行时决定角色与串并行，子 Crew 之间用文件路径交接。

## 机制

- 顺序工作流把步骤写死、误差叠加，Swarm 无协调中心难收敛；Orchestrator 由主 Agent 运行时决定下一步，Claude Code 就是这个范式。
- SpawnSubAgentTool 收六个参数：role、goal、context、任务描述、产出文件、工具白名单，现场拼一个 Sub-Crew，跑完即销毁。
- SpawnParallelTool 用 ThreadPoolExecutor 按子任务数开线程，单路异常被捕获成 error 字符串，不阻塞其他路。
- 子 Agent 之间只传文件路径：context 写「读 workspace/design/architecture.md」，正文留盘，下游用 FileReadTool 按需读。
- TOOL_REGISTRY 预置读文件、写文件、Bash 三类工具，主 Agent 按 tool_names 给子 Agent 发白名单，不给全量权限。
- SOP 从 SKILL.md 读入注入 backstory，换一份文件就换流程；_resolve_workspace_path 专门修 LLM 编出来的假路径。

## 代码落点

- `m4l23/m4l23_orchestrator.py`：SpawnSubAgentTool、SpawnParallelTool 与 TOOL_REGISTRY 实现
- `m4l23/README.md`：Orchestrator 与 Workflow 的对比和七步阅读路线
- `m4l23/test_orchestrator.py`：8 个用例，覆盖并行 wall-time、未知工具过滤、上下文隔离

## 复用清单

- 先跑通单 Agent，证明不够用再扩成多 Agent，别一上来就编排。
- 执行与评审分开，另起一个验收 Agent 判断产出合不合格。
- 子 Agent 交接只写文件路径，正文留在磁盘。

## 面试一句话

Orchestrator 没有预定义任务图，主 Agent 运行时决定角色和串并行，用 Spawn 工具拉子 Crew，产出靠文件路径交接。

## 常见坑

没有 kill switch 和预算上限，主 Agent 规划一错，整条子链放大错误，出现 HackerNews 上 600 美元账单换零产出的案例。

---

来源：第23讲
