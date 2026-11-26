---
id: G-07
layer: Graph 与并行
title: 并行前沿与 JoinSpec：只等最慢一项
source: 第9章 9-3
tags: [Graph, 并行, 汇合]
---

# G-07 并行前沿与 JoinSpec：只等最慢一项

> 四路只读同一份请求，谁也不等谁，收齐数据或降级说明后 generate 只启动一次。

## 机制

- 串行耗时是四项相加约 5.1 秒，并行只等最慢一项约 1.6 秒。
- 关键在依赖关系：这四件事互不依赖。依赖一变，执行顺序必须跟着变，开几个线程只是手段。
- 若酒店要读航班到达时间，补一条 flights 到 hotels 的边，自动转成串行。图上的边说了算。
- JoinSpec 挂在四条入边上，只等这四个来源；validate 到 generate 的返工边不在组内。
- 返工不重查事实，不触发并行。
- 四份结果到齐，generate 只启动一次。

## 代码落点

- `JoinSpec`：四源 ALL 汇合
- `LightGraph.joinForSources(targets)`：命中则并行组
- `LightGraph.runParallelGroup()`：有界 tool-pool，不阻塞 planning-pool

## 复用清单

- 先画依赖图，再决定并行；没有依赖的才放同一批。
- 把汇合组与返工边分开声明，避免返工重新触发查询。

## 面试一句话

并行从图里长出来：四路没有互相依赖的边，就自然同时开工；JoinSpec 负责等齐。

## 常见坑

手写线程池做并行。依赖关系不在代码结构里，后续没人敢改。

---

来源：第9章 9-3
