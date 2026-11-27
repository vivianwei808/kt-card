---
id: A-05
layer: Agent 与任务契约
title: Process：Sequential 保顺序，Hierarchical 加管理
source: 第09讲；m2l5/m2l5_crew.py
tags: [Process, 调度, 验收]
---

# A-05 Process：Sequential 保顺序，Hierarchical 加管理

> Sequential 按任务顺序流水执行，Hierarchical 多一个管理者负责分派和验收。

## 机制

- Sequential 适合步骤固定的流水线：调研 → 撰写 → 审核，一步接一步，失败即停。
- Hierarchical 引入 manager agent，把任务分派给成员并判断是否合格，不合格打回重做。
- 管理者的判断也是一次 LLM 调用，成本更高，但能兜住成员跑偏。
- 课程的主线用 Sequential 讲清楚信息传递，用 Hierarchical 讲验收与回退。
- 选择标准：步骤能不能事先写死。能写死用 Sequential，需要边做边判用 Hierarchical 或 Orchestrator。

## 代码落点

- `m2l5/m2l5_crew.py`：Process.sequential 的 Crew 配置
- `m4l23/m4l23_orchestrator.py`：更进一步的 Orchestrator 模式，运行时决定角色和顺序
- `m4l26/README.md`：Manager 分配与验收，PM 执行的双 Crew 结构

## 复用清单

- 先按 Sequential 搭通链路，需要验收再加 manager。
- Hierarchical 的 manager 提示词要写清验收标准，否则它只会说「看起来不错」。
- 顺序执行的 Crew 要设最大轮次，防止打回循环。

## 面试一句话

流程固定我用 Sequential，需要质检和回退就上 Hierarchical，管理者负责验收；再往上需要动态建角色，就用 Orchestrator 模式。

## 常见坑

一开始就上 Hierarchical，管理者没有验收标准，打回理由含糊，成员反复重做同一份产出。

---

来源：第09讲；m2l5/m2l5_crew.py
