---
id: P-15
layer: 部署与性能
title: 四顶帽子加背压，让 Agent 自主收尾
source: 第37章
tags: [AI测试, AgentLoop, 验收]
---

# P-15 四顶帽子加背压，让 Agent 自主收尾

> Planner、Builder、Critic、Finalizer 每轮只戴一顶，5 分钟花 0.31 美元完成开发。

## 机制

- Ralph 每轮迭代用干净上下文，人类只写一份 PROMPT.md。
- Builder 先写 7 个测试全红，再写实现，自己发现并修掉字符计数差 1 的 bug。
- Critic 是全新 Agent 实例，不知道 Builder 的决策，独立重跑测试。
- Finalizer 确认需求全部满足后输出 LOOP_COMPLETE，循环终止。
- Agent 卡住时改 Harness，补一条 Lint、加一段说明、加一个测试，别手动改它的代码。

## 代码落点

- `PROMPT.md`：人类输入
- `scratchpad.md`：过程记录
- `LOOP_COMPLETE`：终止信号
- `pytest`：验收门

## 复用清单

- 角色隔离，别让写代码的 Agent 自己验收。
- 卡住先改约束和测试，不改实现。

## 面试一句话

Ralph 用角色隔离加背压门控，让 Agent 在循环里自主完成并自我验证。

## 常见坑

坐到循环里手动改 Agent 的代码，同样的问题下次还会出现。

---

来源：第37章
