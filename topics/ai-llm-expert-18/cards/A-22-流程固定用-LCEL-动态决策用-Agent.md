---
id: A-22
layer: Agent 工程
title: 流程固定用 LCEL，动态决策用 Agent
source: 第24章
tags: [Agent, LCEL, LangChain]
---

# A-22 流程固定用 LCEL，动态决策用 Agent

> LCEL 用管道符串 Runnable，步骤由开发者写死；Agent 用 ReAct 让模型自己决定下一步。

## 机制

- LCEL 支持串联 A | B | C、并行分支 {"x": A, "y": B} 和 stream 流式输出。
- RunnableLambda 可以把普通函数包装成链上的节点。
- create_react_agent 加 AgentExecutor 自主选工具、多轮推理。
- LCEL 版不具备自主决策，换任务就得改代码；Agent 版多花 token 换灵活。
- 故障诊断链是固定顺序：DNS 查 IP、Ping 测连通、接口检查、日志分析。

## 代码落点

- `LCEL`：A | B | C 管道
- `RunnableLambda`：函数节点
- `StrOutputParser`：解析输出
- `create_react_agent`：自主 Agent

## 复用清单

- 步骤能写死就用 LCEL，成本可控。
- 只有分支不可预测时才上 ReAct。

## 面试一句话

固定流程用 LCEL，开放决策用 Agent，前者便宜可控，后者灵活但多花 token。

## 常见坑

固定流程也上自主 Agent，多花 token 换来不确定性。

---

来源：第24章
