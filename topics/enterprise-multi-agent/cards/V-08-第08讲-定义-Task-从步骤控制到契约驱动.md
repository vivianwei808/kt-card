---
id: V-08
layer: 每讲速览
title: 第08讲 定义 Task：从步骤控制到契约驱动
source: 第08讲
tags: [Task, 契约, Pydantic]
---

# V-08 第08讲 定义 Task：从步骤控制到契约驱动

> Task 不只是描述做什么，还要用 Pydantic 定义交付物长什么样，下游拿到的是对象而不是一段文字。

## 机制

- 契约驱动三件套：description 写做什么，expected_output 写验收标准，output_pydantic 绑数据结构。
- Pydantic 模型给每个字段类型和描述，字段描述会进提示词，等于把 schema 当规格说明。
- 任务依赖用 context 参数声明，框架按依赖调度，不靠代码调用顺序。
- 演示里先用 Mock 上游输出，单独验证本任务的契约是否成立。
- 契约让失败提前：字段缺失或类型不对，当步就报错，不用等到下游解析。

## 代码落点

- `m2l4/m2l4_task.py`：ImageAnalysis、VisualAnalysisReport、ContentStrategyBrief 三个契约
- `m2l4/m2l4_task.py`：output_pydantic 绑定与 context 依赖
- `m2l5/m2l5_crew.py`：多任务契约的链式传递

## 复用清单

- 先定 Pydantic 模型再写 Task，模型就是接口文档。
- 下游要用字段就依赖结构化输出，别解析自由文本。
- 每个字段写 description，歧义会少一大半。

## 面试一句话

任务定义我走契约驱动：Pydantic 定字段，output_pydantic 绑定，交付物是可解析对象，字段错了当步暴露。

## 常见坑

只写自然语言的 expected_output，下游拿到格式不稳定的 markdown，再写正则抠字段。

---

来源：第08讲
