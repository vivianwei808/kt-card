---
id: W-10
layer: 智能体平台
title: Dify 五种应用类型，选错形态后面全别扭
source: 第6章
tags: [Dify, 应用类型, 选型]
---

# W-10 Dify 五种应用类型，选错形态后面全别扭

> 要记忆和多轮对话选 Chatflow，要批处理单轮出结果选 Workflow。

## 机制

- 五种类型：聊天助手、文本生成、Agent、对话流 Chatflow、工作流 Workflow。
- Chatflow 支持多轮与记忆，有 Answer 节点可在流程中间流式输出文本。
- Workflow 面向自动化、批处理等单轮任务，单向出结果，不保留对话状态。
- Chatflow 适合智能客服、语义搜索、AI 助教；Workflow 适合数据处理与内容生成。
- Dify 比 LangChain 更容易上手，适合业务侧自己搭流程。

## 代码落点

- `Chatflow`：多轮对话流
- `Workflow`：单轮自动化
- `Answer 节点`：流程中间输出
- `Agent`：自主工具调用

## 复用清单

- 先问要不要记忆和多轮，再选 Chatflow 或 Workflow。
- 批处理、定时任务一律用 Workflow。

## 面试一句话

Dify 选型先看对话状态：要记忆选 Chatflow，单轮批处理选 Workflow。

## 常见坑

客服场景选了 Workflow，用户追问一次就丢上下文。

---

来源：第6章
