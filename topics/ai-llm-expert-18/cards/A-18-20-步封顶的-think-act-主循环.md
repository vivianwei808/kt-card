---
id: A-18
layer: Agent 工程
title: 20 步封顶的 think-act 主循环
source: 第22章
tags: [Agent, 主循环, OpenManus]
---

# A-18 20 步封顶的 think-act 主循环

> run() 里 while 同时判步数和状态，每步先 think 选工具，再由 act 执行并回写内存。

## 机制

- BaseAgent.run() 先把 request 写进 memory，再循环到步数或状态结束。
- max_steps 默认 20，current_step 从 1 开始计数。
- ReActAgent.step() 调 think()，返回 False 就跳过 act，返回 True 才执行 act()。
- ToolCallAgent.think() 用 llm.ask_tool 传入 tools 参数，tool_choice 为 AUTO。
- act() 把每个工具结果包成 tool_message 写回 memory，带上 tool_call_id 和可选截图。

## 代码落点

- `BaseAgent.run()`：主循环
- `max_steps=20`：步数上限
- `ask_tool(tool_choice='auto')`：模型选工具
- `tool_message`：结果回写

## 复用清单

- 循环必须同时有步数上限和终态判断。
- 每次工具结果都带调用 ID，方便回溯。

## 面试一句话

Agent 主循环是 think、act、回写三步，步数上限是最后一道刹车。

## 常见坑

复杂页面任务 20 步不够，跑到一半就停在半路。

---

来源：第22章
