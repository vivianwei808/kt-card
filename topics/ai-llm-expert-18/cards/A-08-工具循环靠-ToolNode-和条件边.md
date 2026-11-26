---
id: A-08
layer: Agent 工程
title: 工具循环靠 ToolNode 和条件边
source: 第19章
tags: [Agent, LangGraph, 工具循环]
---

# A-08 工具循环靠 ToolNode 和条件边

> bind_tools 让 LLM 产出 tool_calls，ToolNode 执行后回填消息，条件边决定继续还是结束。

## 机制

- llm.bind_tools(tools) 把工具描述绑到模型，模型在响应里给出 tool_calls。
- should_continue_tools 检查最后一条消息有无 tool_calls，有就返回 'tools'，否则 'end'。
- ToolNode 从 AIMessage 取工具名和参数，执行后封装成 ToolMessage 写回状态。
- 工具调用是循环：拿到结果后 LLM 可能再调下一个工具，直到信息够用。
- StateGraph 固定路由用 add_edge，条件路由用 add_conditional_edges。

## 代码落点

- `bind_tools`：绑定工具
- `ToolNode`：执行工具节点
- `add_conditional_edges`：循环路由
- `AIMessage.tool_calls`：判断是否继续

## 复用清单

- 循环出口只看 tool_calls，不看模型文本。
- 给循环加最大轮次，防止模型无限调工具。

## 面试一句话

LangGraph 的循环由 LLM 节点、ToolNode 和检查 tool_calls 的条件边组成。

## 常见坑

条件边只看消息文本不看 tool_calls，循环永远退不出来。

---

来源：第19章
