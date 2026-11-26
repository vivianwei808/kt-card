---
id: B-02
layer: 数据智能
title: 相似表多时 SQL Agent 会反复试错
source: 第38章
tags: [Text2SQL, Agent, Few-shot]
---

# B-02 相似表多时 SQL Agent 会反复试错

> Toolkit 自动读 schema，表一多就反复试错，要靠向量库召回 few-shot 示例。

## 机制

- SQLDatabase.from_uri 连库后自动获取数据库 metadata，SQLDatabaseToolkit 直接喂 LLM。
- create_sql_agent 完成自然语言到 SQL 再取结果的闭环，找不到表时报 OutputParseException。
- 多张表都像候选时，Agent 会逐张尝试，最后才判断哪张能出结果。
- 本质是 LLM 加 RAG：向量库召回相似问题与对应 SQL，作为 few-shot 塞进 prompt。
- 用 similarity threshold 过滤关系不大的示例，再优化 few-shot 多样性。

## 代码落点

- `SQLDatabase.from_uri`：连接数据库
- `SQLDatabaseToolkit`：schema 工具集
- `create_sql_agent`：SQL Agent
- `sql_get_similar_examples`：召回示例

## 复用清单

- 先跑通 Toolkit 通路，再补业务示例。
- 示例按问题相似度召回，别固定塞同一批。

## 面试一句话

搭 SQL Copilot 分两步：Toolkit 读 schema 跑通路，向量库补 few-shot 提准确率。

## 常见坑

只靠 Toolkit 自动读 schema 不补业务示例，复杂查询通过率低。

---

来源：第38章
