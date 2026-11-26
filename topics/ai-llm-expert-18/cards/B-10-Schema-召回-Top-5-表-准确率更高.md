---
id: B-10
layer: 数据智能
title: Schema 召回 Top-5 表，准确率更高
source: 第40章
tags: [Text2SQL, Schema, RAG]
---

# B-10 Schema 召回 Top-5 表，准确率更高

> 全量 schema 要 30K token、准确率 70%；召回 Top-5 表只用 3K token，准确率 88%。

## 机制

- 离线给每张表生成 200 到 500 token 的自然语言描述，含表名、字段名、注释、示例值、业务含义。
- 描述用 BGE-M3 或 text-embedding-3 向量化，存进 Qdrant、Milvus 这类向量库。
- 在线先检索 Top-K（K 取 10 到 20），再用 BGE-Reranker 精排到 Top-5 拼进 prompt。
- 业务词典一起进知识库，让模型看到 GMV 等于 order_amount 求和减 refund_amount 求和这样的定义。
- 效果对比：30K 以上 token 准确率 70%，3K token 准确率 88%，token 成本降 90%。

## 代码落点

- `BGE-M3 / text-embedding-3`：表描述向量化
- `Qdrant / Milvus`：向量库
- `BGE-Reranker`：精排到 Top-5
- `业务词典`：指标口径

## 复用清单

- 表多时先做 schema RAG，不要全量塞 prompt。
- 每张表写一段业务描述，比只给 DDL 有效。

## 面试一句话

Schema 太大就用 RAG 做 Schema Linking，召回相关表比塞全量更准也更便宜。

## 常见坑

把整个库的 schema 一次塞进 prompt，字段一多就超限，噪声还拉低准确率。

---

来源：第40章
