---
id: H-13
layer: Harness 与停止
title: 固定回放与 calls 断言
source: 第6章 6-5
tags: [Harness, 测试, 回放]
---

# H-13 固定回放与 calls 断言

> 回放要证明的是「无论模型犯什么错，宿主都能在边界前停住」。「模型什么时候犯错」本来就不可控。

## 机制

- 真实模型是非确定性系统，回放要把每轮的行程、Token、耗时全部写死。
- 断言四件事：终态、业务轮次、生成器调用次数、账本与 guard code。
- 关键证据是 calls == N：证明第 N+1 次调用根本没有发生。
- 前置拦截的自动化证据，就是「下一次花钱没有开始」。
- 不联网、不调真实模型、不 sleep；Clock 注入，重试延时设 0。
- 护栏限制失控，不缩短 Loop：三轮收敛的场景必须证明 G1 未误拦。

## 代码落点

- `Chapter6ScriptedPlanGenerator`：脚本化替身
- `Chapter6ExitMapReplayTest`：六类出口全覆盖
- `Chapter4FeedbackReplayTest / Chapter9GraphMigrationReplayTest`：同类手法

## 复用清单

- 给循环写一个脚本化生成器，按轮次返回预置结果。
- 每个护栏场景都断言调用次数，而不是只看终态。

## 面试一句话

机制验收要可复现：我用脚本化替身加 calls 断言，证明前置拦截真的没花那笔钱。

## 常见坑

用真实模型跑回归。输出不确定，断言写不了，问题也无法复现。

---

来源：第6章 6-5
