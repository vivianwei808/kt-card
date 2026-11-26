---
id: R-05
layer: RAG 工程
title: MultiQuery 扩三条，HyDE 换成文档向量
source: 第15章
tags: [RAG, Query改写, HyDE]
---

# R-05 MultiQuery 扩三条，HyDE 换成文档向量

> 原问题扩成 3 条不同视角的查询逐条检索，或先写假设答案再用答案向量检索。

## 机制

- generate_multi_queries(query, llm, num_queries=3) 让 LLM 输出 3 条不同角度的查询，每行一条。
- 示例把「客户经理被投诉扣多少分」扩成扣分标准、扣除绩效分、投诉处罚机制等 4 条变体。
- 每条变体各检索一次，结果合并去重后再进入回答流程。
- HyDE 让 LLM 先写约 100 字假设答案文档，用文档向量去检索，因为文档向量与文档向量更相似。
- 多轮改写保留最近 3 到 5 轮历史，先用 LLM 判断是否需要改写。

## 代码落点

- `generate_multi_queries`：生成多条查询
- `multi_query_search`：分别检索再合并
- `HyDE`：假设文档向量
- `qwen-plus`：改写模型

## 复用清单

- 口语问句多、召回不稳时先加 MultiQuery。
- HyDE 适合答案长、文档长的知识库。

## 面试一句话

查询侧优化两招：MultiQuery 扩视角，HyDE 把问题向量换成文档向量。

## 常见坑

只按原句检索一次，口语问法和文档表述对不上时直接召回为空。

---

来源：第15章
