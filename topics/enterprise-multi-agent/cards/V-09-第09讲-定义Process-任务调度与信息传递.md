---
id: V-09
layer: 每讲速览
title: 第09讲 定义Process：任务调度与信息传递
source: 第09讲
tags: [Process, 调度, 信息传递]
---

# V-09 第09讲 定义Process：任务调度与信息传递

> 流程的本质是任务怎么调度，加上任务之间怎么交接，两条讲清 Sequential 与 Hierarchical。

## 机制

- [00:17] 认知原点：任务列表加调度方式。顺序调度是预先分配、线性流程；层级调度是动态分配、监督反馈，能打回重做和重新分配。
- [00:33] Sequential 的优势是确定性和没有额外性能损耗；问题是遇到不确定任务就僵住，且强依赖单个 Agent 的效果。
- [00:50] 交接棒讲信息传递：TaskOutput 的结构里有 Description、Raw、Format 三段，Format 可以是 JSON 或 Pydantic。
- [00:50] 传递有两种：不设 context 是隐式传递，下游只能看到上游的原始输出；context=[task1, task3] 是显式传递，按需挑选上游。
- 课程的示例链路是图片输入分析、内容策略分析、笔记文案撰写、SEO 优化，四步逐级传。

## 代码落点

- `m2l5/m2l5_crew.py`：Process.sequential 与 Task 的 context 依赖
- `m1l3/m1l3_multi_agent.py`：分层调度的 manager 与打回逻辑

## 复用清单

- 先问任务能否事前写死，能写死就用 Sequential。
- 显式传 context，避免下游被无关的上游输出污染。
- 需要打回和重分配时再上 Hierarchical，成本翻倍。

## 面试一句话

Process 就是任务调度方式：Sequential 是预先分配的线性流程，确定性强；Hierarchical 是动态分配加监督反馈，能打回重做，代价是多一层管理调用。

## 常见坑

不设 context 靠隐式传递，下游拿到一堆无关输出，还得自己分辨哪段有用。

---

来源：第09讲
