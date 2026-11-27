---
id: A-04
layer: Agent 与任务契约
title: context 参数：任务依赖用声明式表达
source: 第09讲；m2l5/m2l5_crew.py
tags: [Task, 依赖, Process]
---

# A-04 context 参数：任务依赖用声明式表达

> Task 的 context 列上游任务，框架就会把上游产出塞进本任务的上下文，顺序和依赖一起确定。

## 机制

- context=[task_a, task_b] 表示本任务依赖这两个任务的输出，执行前框架会等它们完成。
- 依赖关系写在 Task 上，Process 负责按依赖调度，顺序不靠代码里的调用顺序保证。
- 上游产出如果是 output_pydantic，下游拿到的是结构化对象，拼接提示词时更可控。
- 课程示例里调研报告是逐步骤写的：每一步的 Task 依赖上一步的输出文件。
- context 与 allow_delegation 是两条路：声明式依赖适合固定流程，委托适合运行时才知道缺什么。

## 代码落点

- `m2l5/m2l5_crew.py`：多 Task 的 context 依赖与 Sequential 执行
- `m1l3/m1l3_multi_agent.py`：分步骤调研的任务链

## 复用清单

- 把任务图画出来再写代码，Task 之间的每条边对应一个 context。
- 上游产出较大时传文件路径，context 里只放摘要和路径。
- 流程稳定就别用委托，声明式依赖更好调试。

## 面试一句话

任务依赖我用 Task 的 context 声明，Process 按依赖调度，上游产出直接进下游上下文；产出大就传文件路径，避免上下文被撑爆。

## 常见坑

靠 Python 调用顺序保证依赖，遇到并行或重试时上游还没产出，下游拿到空上下文。

---

来源：第09讲；m2l5/m2l5_crew.py
