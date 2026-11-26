---
id: P-07
layer: 部署与性能
title: 每生成一个 token 就调度一次
source: 第35章
tags: [推理, 批处理, 吞吐]
---

# P-07 每生成一个 token 就调度一次

> Continuous Batching 让完成的请求立刻腾位，吞吐从 800 提到 1800 tok/s。

## 机制

- 静态批处理必须等最慢请求，A、B、C 各需 100、200、150 步，整批卡在 200 步。
- Iteration-level 调度：每轮取新请求、前向一次、完成的请求立即释放 block。
- GPU 利用率从 40% 到 60% 升到 85% 到 95%，吞吐提升 2.25 倍。
- 平均延迟 P50 从 1200ms 降到 800ms。
- Ollama 的 llama.cpp 不支持 Continuous Batching，Go 层并发不等于推理并发。

## 代码落点

- `Continuous Batching`：连续批处理
- `Iteration-level Scheduling`：单 token 调度
- `llama.cpp`：不支持连续批处理

## 复用清单

- 压测时区分请求并发和推理并发。
- 生产服务选支持连续批处理的内核。

## 面试一句话

Continuous Batching 把调度粒度降到单 token，完成即腾位，是吞吐翻倍的关键。

## 常见坑

在 Ollama 上压并发，Go 层收下请求，推理内核仍串行执行。

---

来源：第35章
