---
id: H-07
layer: Harness 与停止
title: while(true) 与带身份证的 return
source: 第6章 6-2
tags: [Harness, 代码形状, 可解释]
---

# H-07 while(true) 与带身份证的 return

> 反面写法是 while(round < max && ...)，退出后不知道为什么停；正解是每个出口带自己的终态。

## 机制

- 条件堆在 while 头部的写法，退出后只剩一个「循环结束了」，证据全部丢失。
- while(true) 里每个 return 都带终态、原因、证据、建议。
- 检查点放在花钱之前，省下的正好是下一次调用。
- 轮顶顺序：取消信号、护栏检查、昂贵操作、验证、记账、判断。
- 取消与护栏回答同一个问题：下一次花钱该不该开始。
- 「为什么停」在回答格式里就保证不丢，不依赖日志补写。

## 代码落点

- `TravelPlanningEngine.runLoop()`：while(true) 与多个 return
- `PlanningStopReport`：四要素
- `SessionCancellationSignal`：取消信号接入

## 复用清单

- 把循环写成「一个入口、多个命名的出口」，每个出口都是可测试的。
- 不要用一个 boolean 变量拼所有停止条件。

## 面试一句话

我把循环写成 while(true) 加显式出口，每个 return 都带停止原因和证据，退出路径可测试。

## 常见坑

用 break 退出循环。停是停了，但系统无法解释为什么停。

---

来源：第6章 6-2
