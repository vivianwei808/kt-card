---
id: A-03
layer: Agent 与任务契约
title: Task 契约：用 Pydantic 把交付物钉死
source: 第08讲；m2l4/m2l4_task.py
tags: [Task, Pydantic, 契约]
---

# A-03 Task 契约：用 Pydantic 把交付物钉死

> expected_output 描述要什么，output_pydantic 定义字段和类型，下游拿到的就是可解析的对象。

## 机制

- Task 的三件套：description 写做什么，expected_output 写交付标准，output_pydantic 绑定数据结构。
- 契约用 Pydantic 模型表达，例如 ContentStrategyBrief 里每个字段带类型和 Field 描述。
- 绑定 output_pydantic 后，框架会把模型输出解析成对象，字段缺失或类型不对就失败，问题在当步暴露。
- expected_output 要写成验收口径，例如「包含所有必填字段的 ContentStrategyBrief」。
- 契约还能反向约束模型：字段描述会进提示词，等于把 schema 当成规格说明用。

## 代码落点

- `m2l4/m2l4_task.py`：ImageAnalysis、VisualAnalysisReport、ContentStrategyBrief 三个模型
- `m2l4/m2l4_task.py`：output_pydantic=ContentStrategyBrief 的 Task 定义
- `m2l6/m2l6_agent.py`：多模态任务复用同一套 Pydantic 契约

## 复用清单

- 先写 Pydantic 模型，再写 Task，模型即接口文档。
- 下游要用字段时，让它依赖 output_pydantic 的结果，不要解析自由文本。
- 契约里给每个字段写 description，能显著减少字段含义的歧义。

## 面试一句话

任务定义我走契约驱动：Pydantic 模型定字段，output_pydantic 绑定到 Task，交付物是可解析对象，字段缺失当步就报错，不用等到下游才发现。

## 常见坑

只写 expected_output 的自由文本描述，下游拿到一段格式不稳定的 markdown，再写正则去抠字段。

---

来源：第08讲；m2l4/m2l4_task.py
