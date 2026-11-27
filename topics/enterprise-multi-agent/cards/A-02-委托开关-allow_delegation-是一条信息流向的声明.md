---
id: A-02
layer: Agent 与任务契约
title: 委托开关：allow_delegation 是一条信息流向的声明
source: 第09讲 09:40；m1l3/m1l3_multi_agent.py
tags: [协作, 委托, 多智能体]
---

# A-02 委托开关：allow_delegation 是一条信息流向的声明

> 允许委托的岗位能把活转给别人，代价是任务可能被踢来踢去，所以按信息流向决定开关。

## 机制

- allow_delegation=True 时，Agent 可以把子问题转给同 Crew 的其他 Agent，框架会做一次内部委派。
- 需要回头补料的岗位该开：撰写员写到一半发现缺数据，要能回头找搜索专家。
- 纯执行岗位该关：研究员和搜索专家关掉委托，避免它们把调研任务转手。
- 委托链越长，日志越难读，成本越不可控，课程示例里四个 Agent 只开了一个。
- 委托本质是一次额外的 LLM 决策，能用 Task 的 context 依赖解决的事不要用委托。

## 代码落点

- `m1l3/m1l3_multi_agent.py`：researcher/searcher 的 allow_delegation=False，writer 的 True
- `m1l3/m1l3_multi_agent.py`：editor 负责审核并把意见回给 writer

## 复用清单

- 画一张信息流向图，标出哪条边需要回头，只给回头的岗位开委托。
- 委托开启后，在日志里单独统计委派次数，突增就是分工设计有问题。
- 任务之间能用 context 传数据时，优先用 context。

## 面试一句话

委托开关我按信息流向来定：需要回头补料的岗位开，纯执行岗位关；全开会让任务在角色之间打转，日志里看不到推进。

## 常见坑

把 allow_delegation 当能力开关，全 Crew 打开，结果一个任务被委派五六次，token 翻倍还没产出。

---

来源：第09讲 09:40；m1l3/m1l3_multi_agent.py
