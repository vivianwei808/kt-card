---
id: A-03
layer: Agent 工程
title: Text2SQL 助手把建表语句写进提示
source: 第18章
tags: [Text2SQL, Prompt, 工具]
---

# A-03 Text2SQL 助手把建表语句写进提示

> 把建表 DDL 和字段注释放进 system_prompt，模型据此写 SQL，function_list 只传工具名。

## 机制

- system_prompt 里贴 tkt_orders 建表 DDL 与字段中文注释，模型才能把「销量」映射到 quantity。
- Assistant 传 system_message 和 function_list=['exc_sql']，只写工具名字符串。
- 工具在 agent 初始化时注册一次，不必每次请求重复注册。
- 查询同一库的多张表，每张表的 schema 都要写进 prompt，缺一张就会编字段。
- LLM 先输出工具名和参数，框架执行后回填结果再让 LLM 组织答案，至少两次模型调用。

## 代码落点

- `system_message`：DDL 加字段注释
- `function_list=['exc_sql']`：工具名列表
- `Assistant`：Qwen-Agent 入口
- `exc_sql`：执行 SQL 的工具

## 复用清单

- 表结构写进系统提示，工具只负责执行。
- 字段中文注释和业务叫法一起给，减少编字段。

## 面试一句话

Text2SQL 助手的提示词就是表结构加业务术语，工具只负责执行 SQL。

## 常见坑

只给表名不给字段含义，模型把「入园人数」写成不存在的列。

---

来源：第18章
