---
id: F-13
layer: 大模型地基
title: AI 编程工具等于模型加编排
source: 第3章
tags: [AI编程, Agent, 上下文]
---

# F-13 AI 编程工具等于模型加编排

> 决定体验的不只模型，还有系统指令和工具编排；交互速度约等于 token 数。

## 机制

- Wucai 用 qwen3-coder-plus，Claude Code 用 Claude，底层都是 LLM 加工具编排。
- Cursor、Trae、Lingma 属于 Code Agent：系统指令加工具，自主多轮调用 LLM。
- AI 编程的响应速度大致与输入加输出的 token 数成正比，上下文越长越慢越贵。
- 长会话用 /clear 或 /compact 压缩历史，减少每轮输入。
- Agent 能自主规划：只让它读一张表，它可能顺手把合并也做了。

## 代码落点

- `Code Agent`：系统指令加工具循环
- `/clear`：清空会话
- `/compact`：压缩历史
- `qwen3-coder-plus`：Wucai 的底层模型

## 复用清单

- 把长会话当成本问题管理，定期清理无关上下文。
- 评估工具时看模型、编排、项目上下文三部分，不只比模型榜。

## 面试一句话

AI 编程工具是模型加编排层，速度受 token 数约束，上下文管理是使用者的基本功。

## 常见坑

把所有代码和历史都塞进上下文，越聊越慢还容易跑偏。

---

来源：第3章
