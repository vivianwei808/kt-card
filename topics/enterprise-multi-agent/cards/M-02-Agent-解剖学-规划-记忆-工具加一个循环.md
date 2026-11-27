---
id: M-02
layer: 架构选型
title: Agent 解剖学：规划、记忆、工具加一个循环
source: 第02讲 12:30-17:00；m1l2/m1l2_raw_agent.py
tags: [ReAct, Agent, 循环]
---

# M-02 Agent 解剖学：规划、记忆、工具加一个循环

> Agent 的本质是一个 while 循环：调 LLM 拿动作，执行动作，把观察结果塞回上下文，直到模型说结束。

## 机制

- 解剖图上三块器官：Planning（任务拆解与 ReAct）、Memory（短期上下文 + 长期知识）、Tools（搜索、抓取、文件系统）。
- 执行过程是反馈回路：拆解搜索任务 → 调工具 → 判断信息是否充足 → 不足就补充搜索，充足就生成报告。
- ReAct 把这一步写成文本协议：Thought、Action、Observation 交替，模型看到 Observation 再决定下一个 Action。
- 手写实现的关键是 stop 序列：调用时带 stop=["Observation:"]，模型输出到 Action 就停，由程序执行工具后再把 Observation 拼回对话。
- 这套循环是所有框架的底座，CrewAI、LangChain、AutoGPT 只是在外面包了角色、任务和调度。

## 代码落点

- `m1l2/m1l2_raw_agent.py`：RawAgent.run() 里 while "Final Answer:" not in response 的主循环
- `m1l2/m1l2_raw_agent.py`：response + "\nObservation:" + tool_result 拼回 messages 的分支
- `m1l2/agent_system_prompt.txt`：工具清单与输出格式的模板

## 复用清单

- 排查 Agent 卡死时，先看这个循环的三处：stop 序列、Observation 拼接格式、退出条件。
- 自己写轻量 Agent 时用这个结构，一千行以内不用背框架。
- 给团队讲 Agent 原理，直接跑这段代码，比画架构图有效。

## 面试一句话

Agent 就是一个带退出条件的循环，循环体是「模型选动作、程序执行、结果回填」，我手写过这个循环，知道框架帮我们做的是记忆管理、工具 schema 和异常重试。

## 常见坑

把 Observation 拼错位置或漏掉 stop 序列，模型会自己编造工具结果；现象是 Agent 看起来在跑，其实一次工具都没调。

---

来源：第02讲 12:30-17:00；m1l2/m1l2_raw_agent.py
