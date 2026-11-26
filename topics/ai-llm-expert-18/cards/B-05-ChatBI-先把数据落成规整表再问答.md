---
id: B-05
layer: 数据智能
title: ChatBI 先把数据落成规整表再问答
source: 第39章
tags: [ChatBI, 数据链路, Text2SQL]
---

# B-05 ChatBI 先把数据落成规整表再问答

> 链路是 Tushare 采集、MySQL 建表、自然语言转 SQL，工具回 describe 后由 LLM 总结。

## 机制

- Tushare 取 A 股行情，返回 stock_name、ts_code、trade_date、open、high、low、close、vol、amount。
- 数据按 trade_date 升序后建 MySQL 表，导入时 trade_date 解析失败，需改成 varchar(10)。
- ExcSQLTool 在 call 里自动画柱状图，df 行数多时改折线图并只抽 10 个点显示。
- 工具回复里附上 df.describe()，LLM 才能对查询结果做总结。
- 结果只有一行时不输出统计信息和图表，避免答非所问。

## 代码落点

- `Tushare`：行情数据
- `MySQL`：结构化存储
- `ExcSQLTool`：查询加绘图
- `df.describe()`：结果摘要

## 复用清单

- 先把数据落成规整表，再让模型写 SQL。
- 工具返回里带统计摘要，模型总结才有依据。

## 面试一句话

ChatBI 的难点在数据链路和工具返回格式，LLM 只负责理解问题和总结。

## 常见坑

用 DATE 类型接 Tushare 的 trade_date，导入报错后还得删表重建。

---

来源：第39章
