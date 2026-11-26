---
id: P-08
layer: 部署与性能
title: PD 分离后 TPOT 才不抖
source: 第35章
tags: [推理, PD分离, 延迟]
---

# P-08 PD 分离后 TPOT 才不抖

> Prefill 吃算力、Decode 吃带宽，混在一张卡上互相拖累，TPOT 会抖动。

## 机制

- Prefill 一次性算完整个 Prompt 的 KV Cache，计算密集型，看 TTFT。
- Decode 每步只生成一个 token，内存带宽密集型，看 TPOT。
- 混合执行时 Prefill 阻塞 Decode 导致 TPOT 飙升，Decode 又让算力空闲。
- 分工策略：Prefill 用小 batch，Decode 用大 batch 把 Memory-Bound 拉向 Compute-Bound。
- vLLM 用 KV Transfer Connector，Prefill 做 kv_producer，Decode 做 kv_consumer。

## 代码落点

- `KVTransferConfig`：跨实例传 KV
- `PyNcclConnector`：传输后端
- `TTFT`：首 token 延迟
- `TPOT`：每 token 延迟

## 复用清单

- 长 Prompt 加低延迟要求，就拆 Prefill 和 Decode。
- 分别监控 TTFT 和 TPOT，别只看总延迟。

## 面试一句话

PD 分离按计算特性拆硬件，Prefill 保 TTFT，Decode 保 TPOT。

## 常见坑

在同一张卡上既跑长 Prompt 又要求低延迟，TPOT 必然抖动。

---

来源：第35章
