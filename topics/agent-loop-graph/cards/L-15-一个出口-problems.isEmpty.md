---
id: L-15
layer: Loop 与验收
title: 一个出口：problems.isEmpty()
source: 第5章 5-5
tags: [验收, 停止条件, 一致性]
---

# L-15 一个出口：problems.isEmpty()

> 生成侧、契约层、交付层三个入口汇总成一份清单，清单为空才算本轮通过。

## 机制

- 入口一：生成侧自己报告的问题。
- 入口二：契约层失败项。
- 入口三：交付层里 severity == HARD 的失败建议，带编号拼接。
- passed = problems.isEmpty()。三个入口全是程序算的，没有一处是「觉得」。
- SOFT 失败只进报告，不进 problems，所以不阻塞交付。
- 快照里的 passed() 与引擎里的判断用同一个定义，两处一致。
- 这份清单同时喂给三个地方：页面右栏、下一轮反馈、逐轮快照。

## 代码落点

- `TravelPlanningEngine`：problems 三个入口与 passed 判断
- `PlanningRoundSnapshot.passed()`：同一算法
- `PlanResponse`：携带全部轮次

## 复用清单

- 停止条件只写一处，其他位置引用它，避免两套判定漂移。
- 把「通过」定义成可计算表达式，评审时可以直接念出来。

## 面试一句话

本轮是否通过只看 problems 是否为空，三个入口都是程序算的；「通过」从感觉变成计算。

## 常见坑

页面显示一套通过标准，Loop 用另一套。用户看到绿灯，系统其实还在返工。

---

来源：第5章 5-5
