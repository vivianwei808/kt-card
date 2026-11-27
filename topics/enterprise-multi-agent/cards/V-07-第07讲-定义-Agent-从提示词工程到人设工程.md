---
id: V-07
layer: 每讲速览
title: 第07讲 定义 Agent：从提示词工程到人设工程
source: 第07讲
tags: [人设, RGB, Agent]
---

# V-07 第07讲 定义 Agent：从提示词工程到人设工程

> CrewAI 的 RGB 模式：Role 是职位名，Goal 是岗位目标，Backstory 是履历，三样凑齐一个岗位。

## 机制

- [00:20] 用招聘 JD 类比：职位名称对应 Role，岗位目标（KPI）对应 Goal，任职要求对应 Backstory。
- Role 写得越像真实职位，模型越少跑偏；「资深 Python 架构师」比「助手」有效。
- Goal 写考核口径，例如「负责后端核心模块重构」，带可判断的完成标准。
- Backstory 写履历、偏好、边界，是唯一能放行为细节的地方。
- 演示用 Agent.kickoff() 直接执行任务，跳过 Task 和 Crew，先看清一个 Agent 的行为。

## 代码落点

- `m1l2/m1l2_agent.py`：单 Agent 调研示例
- `m2l3/m2l3_agent.py`：Agent.kickoff() 的最小用法与 IntermediateTool

## 复用清单

- 写 Agent 前先写一张 JD，职位、KPI、任职要求三行。
- 改行为先改 Backstory，别在 Task 里打补丁。
- 一个 Agent 只对应一个岗位，别兼职。

## 面试一句话

我把写提示词换成写 JD：Role 是职位名，Goal 是 KPI，Backstory 是任职要求和行事风格，三件套写完 Agent 的行为就稳定了。

## 常见坑

Backstory 写成一串形容词，模型读完不知道具体该怎么做事。

---

来源：第07讲
