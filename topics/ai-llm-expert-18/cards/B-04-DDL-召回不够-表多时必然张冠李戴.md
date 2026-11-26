---
id: B-04
layer: 数据智能
title: DDL 召回不够，表多时必然张冠李戴
source: 第38章
tags: [Text2SQL, 召回, Vanna]
---

# B-04 DDL 召回不够，表多时必然张冠李戴

> Vanna 默认只召回 10 条 DDL，26 张表时关键表进不了 prompt，模型只能拿错表硬凑。

## 机制

- 默认 n_results_ddl=10，库里表多时关键表的 DDL 可能进不到 prompt。
- 真实案例：26 张表问英雄攻击力前 5，heros 没被召回，模型用只有 score 字段的 hero_score 生成 SQL。
- 修复一：把 n_results_ddl 调到 30，强制多召回几张表。
- 修复二：train documentation 写明英雄数据在 heros 表、attack_max 是最大攻击力。
- Web 版和 CLI 版共用同一份 chroma.sqlite3，配置不一致时召回结果会不同。

## 代码落点

- `n_results_ddl`：DDL 召回数
- `vn.train(documentation=...)`：业务文档
- `chroma.sqlite3`：共享向量库

## 复用清单

- 表多时先调大 DDL 召回，再补业务文档。
- 多个入口共用向量库，配置要统一。

## 面试一句话

Text-to-SQL 先保证相关表能召回，再谈生成，调 K 值之外还要给关键表补业务文档。

## 常见坑

只调大召回数量，不写业务描述，K 一大噪音也一起进 prompt。

---

来源：第38章
