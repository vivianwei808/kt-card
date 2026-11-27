---
id: V-03
layer: 每讲速览
title: 第03讲 Multi-Agent 系统：Agent、Task、Process 的协作美学
source: 第03讲
tags: [多智能体, 三要素, 示例]
---

# V-03 第03讲 Multi-Agent 系统：Agent、Task、Process 的协作美学

> 先讲单 Agent 的上下文垃圾场，再给出解药：把岗位、工单、流程三件事分开定义。

## 机制

- [00:40] 单 Agent 崩溃图：调研、抓取、分析、编码、审查全挤在一个上下文里，结果是长度爆炸、内容污染、多指令挑战。
- [05:20] 三要素对应公司结构：Agent 是岗位，Task 是工单，Process 是流程（瀑布或敏捷）。
- [09:40] 现场读代码：四个 Agent 的 role/goal/backstory 与工具绑定，researcher、searcher 关闭委托，writer 开启。
- [09:50] 演示运行结果：多个 Agent 的分步产出落到独立 markdown 文件，最终合并成报告。
- 审核编辑拿到报告给意见，撰写员按意见改，形成一次最小的质检回退。

## 代码落点

- `m1l3/m1l3_multi_agent.py`：四个 Agent 与 Task 的定义
- `m1l3/极客时间平台全面深度调研报告-步骤1..7.md`：分步产出
- `m2l5/m2l5_crew.py`：Sequential Process 的多任务版

## 复用清单

- 画岗位表：岗位、工具、交付物、能否委托四列。
- 把中间产出落成文件，用文件名当接口。
- 先跑四角色最小闭环，再谈编排。

## 面试一句话

多智能体就是把公司结构搬进代码：Agent 是岗位、Task 是工单、Process 是流程，三者对上之后，上下文隔离和质检回退就自然有了。

## 常见坑

只拆角色不定交付物，四个 Agent 各写一份格式不同的报告，最后没人能合并。

---

来源：第03讲
