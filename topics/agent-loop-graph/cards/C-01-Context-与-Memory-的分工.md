---
id: C-01
layer: Context 与记忆
title: Context 与 Memory 的分工
source: 第8章 8-1
tags: [Context, Memory, 概念]
---

# C-01 Context 与 Memory 的分工

> Context 管「这次带什么」，Memory 管「跨次存什么」；记忆是素材库，上下文是消费者。

## 机制

- Context 的生命周期是一次请求，组装完即消费，核心约束是 token 预算，主要操作是选择、压缩、排序。
- Memory 是持久化存储，有写入、晋升、遗忘，核心约束是存储与检索成本。
- 类比：Context 是今天这顿饭的菜单，Memory 是冰箱里的食材。
- 排障时先分清「存了没有」和「取了没有」。画像区为空可能是没写入，也可能是写了但没被召回。
- 第八章动的是「打包材料」这一步，不改引擎的决策逻辑。

## 代码落点

- `ContextAssembler.java`：本次 prompt 的组装与淘汰
- `UserProfile / ProfileRepository`：跨会话画像的存取
- `PlanChatService.buildPrompt()`：拼装点，四段标记 INSTRUCTION / CONSTRAINT / HISTORY / PROFILE

## 复用清单

- 设计任何带记忆的 Agent，先把这两层分开画。
- 出问题时先定位层：答案不对是取错，还是没存。

## 面试一句话

我把上下文和记忆分开：上下文是这一次的预算问题，记忆是跨会话的写入与遗忘问题。

## 常见坑

把会话历史直接当长期记忆。一次临时要求会被永久化。

---

来源：第8章 8-1
