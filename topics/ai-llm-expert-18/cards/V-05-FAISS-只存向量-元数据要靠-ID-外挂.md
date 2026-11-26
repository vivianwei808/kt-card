---
id: V-05
layer: 向量与检索
title: FAISS 只存向量，元数据要靠 ID 外挂
source: 第12章
tags: [FAISS, 向量库, 检索]
---

# V-05 FAISS 只存向量，元数据要靠 ID 外挂

> FAISS 不存元数据，用 IndexIDMap 给向量分配 64 位整数 ID，再拿 ID 去外部表查原文。

## 机制

- IndexFlatL2 建 L2 欧氏距离精确索引，IndexIDMap 包装后可用 add_with_ids 写入自定义 ID。
- search 返回 distances 和 ids，id 为 -1 表示没有更多结果。
- 示例里 0.3222、1.0135 是距离不是相似度，距离越小越相似。
- 生产环境把 metadata_store 换成 Redis 按 ID 快查、PostgreSQL 存结构化字段、MongoDB 存 JSON。
- 案例规模：4 条文档、1024 维、k=3，第一条命中在线退票政策，距离 0.3222。

## 代码落点

- `faiss.IndexFlatL2`：精确 L2 索引
- `faiss.IndexIDMap`：包装后可写自定义 ID
- `add_with_ids`：写入向量与 ID
- `index.search`：返回 distances 与 ids

## 复用清单

- 向量库只存 ID、向量和少量过滤字段，原文放业务库。
- 把 -1 当成「没有更多结果」处理，不要当有效 ID。

## 面试一句话

FAISS 是向量检索引擎，不负责存原文，工程上要用 ID 把向量和业务数据接起来。

## 常见坑

想把原文和元数据一起塞进 FAISS，忘了它只管向量检索。

---

来源：第12章
