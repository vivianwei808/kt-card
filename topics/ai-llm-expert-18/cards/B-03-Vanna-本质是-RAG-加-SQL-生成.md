---
id: B-03
layer: 数据智能
title: Vanna 本质是 RAG 加 SQL 生成
source: 第38章
tags: [Text2SQL, Vanna, RAG]
---

# B-03 Vanna 本质是 RAG 加 SQL 生成

> Vanna 把 DDL、文档、问题-SQL 三样训练数据写进向量库，提问时召回拼 prompt 再执行。

## 机制

- 三种训练入口：train(ddl=...)、train(documentation=...)、train(question=..., sql=...)。
- ask 依次调用 generate_sql、run_sql、generate_plotly_code、get_plotly_figure，返回表格和图表。
- generate_sql 内部三路召回：相似 question-SQL 对、相关 DDL、相关文档。
- 多继承设计：ChromaDB_VectorStore 加 OpenAI_Chat，LLM、向量库、数据库三层可插拔。
- 训练数据用 get_training_data 列出，用 remove_training_data 按 id 删除。

## 代码落点

- `vn.train`：写入训练数据
- `vn.ask`：提问到图表
- `generate_sql / run_sql`：生成与执行
- `VannaFlaskApp`：Web 界面

## 复用清单

- 三类数据都要喂：DDL、业务文档、问题-SQL 对。
- 把业务叫法写进 documentation，减少字段错配。

## 面试一句话

Vanna 的准确率来自三类训练数据：DDL、文档、问题-SQL，本质是 RAG 而非微调。

## 常见坑

只 train DDL 不写 documentation，业务叫法对不上字段名，召回和生成都偏。

---

来源：第38章
