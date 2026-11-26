---
id: R-07
layer: RAG 工程
title: Rerank 逐对算分，候选别超 20 个
source: 第15章
tags: [RAG, Rerank, 检索]
---

# R-07 Rerank 逐对算分，候选别超 20 个

> 召回 100 个候选后用 cross-encoder 逐对算分选出 5 个，别拿它当召回用。

## 机制

- BGE-Rerank 基于 Cross-Encoder，把 query 和 doc 拼在一起输入，直接输出相关性 logits。
- bge-reranker 分数未归一化：3.0 到 10.0 高相关，0 到 3.0 中等，负数为不相关。
- 参数建议 initial_k 10 到 20、final_k 3 到 5、max_length 512，长文档会被截断。
- 链路示例：1000 万 chunks 先召回 100 个，rerank 后留 5 个送给 LLM。
- bge-reranker-base 轻量、large 更准更慢；Cohere rerank 返回 0 到 1 的归一化分数。

## 代码落点

- `BAAI/bge-reranker-base`：轻量重排
- `BAAI/bge-reranker-large`：高精度
- `initial_k=20 / final_k=5`：候选与保留数
- `cohere rerank`：归一化分数

## 复用清单

- 粗排控制在 10 到 20 个候选，别对上千条做重排。
- 中文场景先试 bge-reranker，再看商业 API。

## 面试一句话

embedding 粗而快，一次比千条；rerank 精而慢，逐对算分，所以只精排 Top20。

## 常见坑

对上千条候选做 rerank，延迟爆炸，收益还不如先把粗排候选收窄。

---

来源：第15章
