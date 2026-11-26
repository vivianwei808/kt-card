---
id: B-09
layer: 数据智能
title: SQL 工具的只读约束要写进代码
source: 第39章
tags: [Agent, SQL安全, 工具设计]
---

# B-09 SQL 工具的只读约束要写进代码

> QueryDBTool 用代码白名单只放 SELECT 和 PRAGMA，最多回 50 行，模型想删库也做不到。

## 机制

- 自定义工具继承 nanobot 的 Tool，实现 name、description、parameters、read_only 加 execute。
- execute 先做 upper().lstrip() 判断首词，不是 SELECT 或 PRAGMA 直接返回错误。
- DELETE、DROP、INSERT、UPDATE 全部被拦，模型犯错的路径被代码堵死。
- 结果最多返回 50 行，超出标注 total rows，防止大表撑爆上下文。
- read_only=True 标记只读，工具可安全并行执行；exec 是通用 shell，能绕过白名单。

## 代码落点

- `QueryDBTool`：只读查询工具
- `read_only=True`：并行安全标记
- `白名单`：SELECT / PRAGMA
- `50 行上限`：控制返回体积

## 复用清单

- 只读约束落在代码判断，不靠提示词。
- 同时关掉通用 shell，否则白名单形同虚设。

## 面试一句话

SQL 工具的只读约束要落在代码判断上，光靠 AGENTS.md 一句话不够。

## 常见坑

用 prompt 约束只读，同时开着 exec，模型照样能通过 shell 执行危险 SQL。

---

来源：第39章
