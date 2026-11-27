---
id: V-30
layer: 每讲速览
title: 第30讲 可观测性：Hook 骨架 + Langfuse 全链路追踪
source: 第30讲
tags: [可观测性, Hook, Langfuse]
---

# V-30 第30讲 可观测性：Hook 骨架 + Langfuse 全链路追踪

> 把 CrewAI 四种原生钩子统一成七个事件，观测代码与业务代码分离。

## 机制

- 约束的前提是先看见：Hook 在 12、19、28 课各管一摊，Agent 空转烧钱时，传统 APM 全绿也发现不了。
- EventType 统一成 7 个事件，覆盖一轮 Agent 推理的起止、LLM 调用、工具调用、任务完成与会话结束。
- HookContext 是 frozen 的 dataclass，带 agent_id、tool_name、token 数与 duration_ms，handler 改不动它。
- HookRegistry.dispatch 给每个 handler 包 try-except，Langfuse 超时不会拖垮结构化日志。
- hooks.yaml 声明事件到 handler 的映射，一个事件可挂多个 handler，全局层这次注册了 12 个。
- 适配层把 llm_call、tool_call、step_callback、task_callback 映射成 7 事件，故意不挂 after_llm_call。

## 代码落点

- `m5l30/hook_framework/registry.py`：EventType、HookContext、HookRegistry.dispatch
- `m5l30/hook_framework/crew_adapter.py`：CrewAI 四种机制到 7 事件的映射
- `m5l30/shared_hooks/langfuse_trace.py`：span 栈嵌套与 trace 构建

## 复用清单

- handler 里的异常自己吞，观测系统不能拖垮主流程。
- 事件名对齐 Agent 一轮的生命周期，换框架只重写适配层。
- 自托管 Langfuse 显式设 LANGFUSE_BASE_URL，并关掉 CrewAI 遥测防重复 trace。

## 面试一句话

可观测性靠 7 个事件加两层 hooks.yaml：全局层放日志与 Langfuse，workspace 层放审计，适配层负责桥接。

## 常见坑

只看 APM 绿灯不看输出质量，Agent 循环烧掉 4.7 万美元，月底账单才暴露。

---

来源：第30讲
