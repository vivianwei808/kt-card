---
id: A-23
layer: Agent 工程
title: Agent 框架四层：适配、工具、记忆、编排
source: 第25章
tags: [Agent, 框架, 架构]
---

# A-23 Agent 框架四层：适配、工具、记忆、编排

> LLM 适配、工具注册调度、Context 管理、控制流编排，四层缺一不可。

## 机制

- LLM 适配层用适配器模式抹平各家 API 差异，统一调用方式、参数和消息格式。
- 工具注册把函数的 name、docstring、type hints 转成 JSON Schema 喂给 LLM。
- Context 管理分短期和长期：短期滑动窗口，长期向量库检索。
- 控制流有四种形态：管道 Pipeline、Loop 即 ReAct、DAG 固定依赖、Chat 自由讨论。
- LangChain 用 @tool，Qwen-Agent 用 @register_tool 加类，LlamaIndex 用 FunctionTool。

## 代码落点

- `@tool / @register_tool`：工具注册
- `RunnableWithMessageHistory`：对话历史
- `Pipeline / Loop / DAG / Chat`：四种控制流

## 复用清单

- 看框架先看四层各做了什么，别只背 API。
- 自研框架按四层拆模块，边界清楚。

## 面试一句话

Agent 框架就四层：统一模型接口、工具 Schema 注册、长短记忆、控制流编排。

## 常见坑

只会上层 API 拼装，说不清框架在适配、工具、记忆、编排上各做了什么。

---

来源：第25章
