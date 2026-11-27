---
id: V-02
layer: 每讲速览
title: 第02讲 解构智能体：Agent 的解剖学与 ReAct 范式
source: 第02讲
tags: [ReAct, 原理, 手写]
---

# V-02 第02讲 解构智能体：Agent 的解剖学与 ReAct 范式

> 把 Agent 拆成 LLM、工具、记忆三块，再用 ReAct 的 Thought-Action-Observation 循环把它们串起来，最后手写一遍。

## 机制

- Agent 的三块组成：大脑是 LLM，手脚是工具，记忆分短期上下文和长期存储。
- ReAct 把循环写成文本协议：模型先想（Thought），再选动作（Action），程序执行后把观察（Observation）拼回对话。
- 手写实现的关键是两个细节：调用时带 stop 序列截断在 Action，执行完把 Observation 拼回 messages。
- 对话历史管理决定 Agent 能不能「记住」前几步做了什么，历史格式错了循环就跑不下去。
- 演示用原生 Python 实现，不依赖 CrewAI，目的是让后面的框架行为可解释。

## 代码落点

- `m1l2/m1l2_raw_agent.py`：RawAgent.run() 主循环与 stop=["Observation:"]
- `m1l2/m1l2_raw_agent.py`：parse_tool_name、parse_tool_input、extract_final_answer
- `m1l2/agent_system_prompt.txt`：工具清单与输出格式模板

## 复用清单

- 面试被问 Agent 原理，直接讲这个循环，比背框架概念有效。
- 框架出怪问题时，回到这个循环判断是模型输出格式问题还是历史拼接问题。
- 自研轻量 Agent 就从这一百多行开始。

## 面试一句话

Agent 是一个带退出条件的循环：模型输出 Action，程序执行工具，把 Observation 拼回历史再调模型，直到出现 Final Answer。

## 常见坑

只调一次模型就以为在做 Agent，没有工具回填和循环，复杂任务一定失败。

---

来源：第02讲
