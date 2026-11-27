---
id: E-01
layer: 生产工程化
title: Hook 骨架：七个事件对齐 Agent 的一轮生命周期
source: 第30讲；m5l30/hook_framework/registry.py
tags: [可观测, Hook, 事件]
---

# E-01 Hook 骨架：七个事件对齐 Agent 的一轮生命周期

> 把一轮 Agent 的推理拆成七个可挂载点，所有观测、拦截、统计都挂在这七个点上。

## 机制

- 七个事件：BEFORE_TURN、BEFORE_LLM、BEFORE_TOOL_CALL、AFTER_TOOL_CALL、AFTER_TURN、TASK_COMPLETE、SESSION_END。
- 映射关系写死在一张表里：before_turn 用 before_llm_call 加轮次计数，AFTER_TOOL_CALL 用 after_tool_call，AFTER_TURN 用 step_callback。
- HookContext 是冻结的 dataclass，带 agent_id、task_name、tool_name、tool_input、token 数、耗时，处理函数只看这一个对象。
- 配置分两层：全局 hooks.yaml 管日志与追踪，workspace 的 hooks.yaml 管具体角色的审计，加载器按顺序合并。
- 全局 Hook 会自动传播到 Sub-Crew，子 Agent 的工具调用一样被记录。

## 代码落点

- `m5l30/hook_framework/registry.py`：EventType 与 HookRegistry.dispatch
- `m5l30/hook_framework/loader.py`：hooks.yaml 解析与 importlib 两层加载
- `m5l30/hook_framework/crew_adapter.py`：CrewAI 四种机制到七个事件的适配

## 复用清单

- 先定事件表，再写业务钩子，事件表稳定后各模块互不干扰。
- HookContext 用只读对象，避免一个 handler 改坏别的 handler 的输入。
- 全局钩子放公司级规范，角色级钩子放业务目录。

## 面试一句话

可观测性从事件模型开始：我把一轮 Agent 拆成七个可挂载点，工具调用、LLM 调用、轮次结束都有钩子，配置两层加载，全局钩子还能传播到子 Agent。

## 常见坑

在各个业务代码里手写日志和统计，没有统一事件点，新增一个指标要改十几处。

---

来源：第30讲；m5l30/hook_framework/registry.py
