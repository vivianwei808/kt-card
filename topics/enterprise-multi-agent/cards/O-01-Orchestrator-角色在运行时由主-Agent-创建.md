---
id: O-01
layer: 多智能体协作
title: Orchestrator：角色在运行时由主 Agent 创建
source: 第23讲；m4l23/m4l23_orchestrator.py
tags: [Orchestrator, 编排, 动态角色]
---

# O-01 Orchestrator：角色在运行时由主 Agent 创建

> 主 Agent 手里只有三个工具：生成子 Agent、并行生成、读产出文件，团队结构由它当场决定。

## 机制

- Orchestrator 的工具表极小：SpawnSubAgentTool 串行建一个子 Crew，SpawnParallelTool 并行建多个，FileReadTool 读产出。
- SOP 技能注入 backstory，让它知道阶段顺序：设计、Mock 与测试、开发、Review、修复、交付。
- 运行时它要回答四个问题：建什么角色、串行还是并行、传什么上下文、产出合不合格。
- 子 Crew 之间传的是文件引用，不是全文。下游读文件，上下文不膨胀。
- 这套结构适合任务形状事先不确定的项目，代价是每次运行的角色组合可能不同，需要靠评测兜底。

## 代码落点

- `m4l23/m4l23_orchestrator.py`：SpawnSubAgentTool 与 SpawnParallelTool 的实现
- `m4l23/workspace/requirements.md`：编排输入的示例需求
- `m4l23/test_orchestrator.py`：编排逻辑的离线测试

## 复用清单

- 任务形状固定就别用 Orchestrator，Sequential 加固定角色更可控。
- 子 Crew 产出统一落文件，主 Agent 只读路径和摘要。
- 给 Orchestrator 设角色数量上限，防止它一次建十个。

## 面试一句话

Orchestrator 模式把团队结构交给主 Agent：它用生成子 Agent 的工具现场建角色，串行还是并行自己决定，产出以文件引用传递，所以上下文不会随团队规模膨胀。

## 常见坑

让 Orchestrator 自己决定一切又没有上限，一次任务建了七八个子 Agent，成本和耗时都失控。

---

来源：第23讲；m4l23/m4l23_orchestrator.py
