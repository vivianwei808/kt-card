---
id: R-10
layer: RAG 工程
title: 冠军方案等于基础 RAG 加两个路由和重排
source: 第16章
tags: [RAG, 项目实战, 路由]
---

# R-10 冠军方案等于基础 RAG 加两个路由和重排

> 在 native RAG 上加查询路由和 LLM reranking，2.5 小时内解析 100 份年报并答题。

## 机制

- 比赛条件：随机 100 份公司年报，每份最长 1000 页，2.5 小时内建库，再答 100 道模板题。
- 答案类型固定为是/否、公司名、职位、产品名、数值指标，每题标注引用页码。
- 架构只比基础 RAG 多两件东西：两个 router 和 LLM reranking 模块。
- 主流程四段：解析 Parsing、内容提取 Ingestion、检索 Retrieval、回答 Answering。
- 最终在 retrieval、generation 和总分三个维度都领先，推理使用 o3-mini。

## 代码落点

- `RAG-Challenge-2`：赛题代码
- `Docling`：PDF 解析
- `FAISS IndexFlatIP`：内积检索
- `o3-mini`：推理模型

## 复用清单

- 复杂知识库先做解析和路由，再谈换大模型。
- 每个环节单独评测，别只看总分。

## 面试一句话

讲这个项目一句话：基础链路加两个路由加 LLM 重排，靠工程细节取胜。

## 常见坑

以为必须上复杂框架，实际赢在解析、路由、重排、提示词逐环节抠细节。

---

来源：第16章
