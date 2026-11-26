---
id: R-17
layer: RAG 工程
title: 检索看召回与排名，生成看 RAGAS
source: 第17章
tags: [RAG, 评测, RAGAS]
---

# R-17 检索看召回与排名，生成看 RAGAS

> 检索侧算 Recall@K、MRR、NDCG，生成侧用 RAGAS 四指标。

## 机制

- Recall@K 等于 Top-K 中相关文档数除以总相关文档数；Precision@K 等于相关文档数除以 K。
- MRR 等于第一个相关文档排名的倒数，适合单一正确答案；NDCG@K 适合分级相关性。
- RAGAS 用 LLM 自动评估免人工标注，pip install ragas 即可。
- Faithfulness 判断答案每个声明能否在上下文找到支撑；Answer Relevancy 用答案反推问题再比相似度。
- Context Relevance 算上下文中与问题相关的句子比例；Context Recall 看标准答案所需信息是否召回。

## 代码落点

- `Recall@K / MRR / NDCG`：检索指标
- `ragas`：生成评估库
- `faithfulness / answer_relevancy`：生成指标
- `langfuse`：跑评测与追踪

## 复用清单

- 准备 50 到 100 条样本覆盖各类问题，定期跑。
- 生成侧优先看 Faithfulness，幻觉代价最高。

## 面试一句话

评测拆两层：检索层算 Recall、MRR、NDCG，生成层算忠实度和相关性。

## 常见坑

只测端到端答案对错，检索和生成的问题混在一起说不清。

---

来源：第17章
