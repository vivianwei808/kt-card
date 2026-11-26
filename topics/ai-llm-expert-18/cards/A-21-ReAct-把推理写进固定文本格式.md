---
id: A-21
layer: Agent 工程
title: ReAct 把推理写进固定文本格式
source: 第24章
tags: [Agent, ReAct, LangChain]
---

# A-21 ReAct 把推理写进固定文本格式

> Thought、Action、Action Input、Observation 循环到模型自认有答案。

## 机制

- AGENT_TMPL 规定 Question、Thought、Action、Action Input、Observation 依次出现，可重复 N 次。
- 收尾固定为 Thought: 我现在知道最终答案，再接 Final Answer。
- {tools} 填工具描述，{tool_names} 填可选工具名，{agent_scratchpad} 存中间步骤。
- agent_scratchpad 像草稿本，存放思考过程和工具调用记录，回填进提示词。
- LLMSingleActionAgent 配 stop=["\nObservation:"]，让模型停在观察位前。

## 代码落点

- `AGENT_TMPL`：ReAct 模板
- `LLMSingleActionAgent`：单动作代理
- `stop=["\nObservation:"]`：截断输出
- `agent_scratchpad`：中间步骤

## 复用清单

- ReAct 必须设 stop 词，否则模型会自己编 Observation。
- 工具报错原样写进 Observation，模型才有机会改。

## 面试一句话

ReAct 用固定文本格式把思考、行动、观察串成循环，stop 词是工程上的关键细节。

## 常见坑

不设 stop 词，模型自己编造 Observation 继续往下写。

---

来源：第24章
