---
id: A-01
layer: Agent 工程
title: FC 是私有接口，MCP 是开放协议
source: 第18章
tags: [MCP, Function Calling, 协议]
---

# A-01 FC 是私有接口，MCP 是开放协议

> 简单原子任务用 FC 更快更低延迟；跨模型跨平台复用选 MCP。

## 机制

- Function Calling 是模型厂商私有接口，换个模型要重新适配。
- MCP 是开放协议，一次开发多模型兼容，Claude、Cursor 等 Client 都能连。
- MCP 支持多轮对话与复杂上下文管理，FC 适合简单、单次调用。
- 安全性上 FC 依赖云端 API 密钥，MCP 支持本地化数据控制。
- get_weather(city='北京') 这类原子调用直接用 FC，省掉 MCP Server 的协议开销。

## 代码落点

- `Function Calling`：厂商私有工具调用
- `MCP`：跨模型开放协议
- `get_weather / calculate`：原子工具示例
- `List Tools`：MCP 的工具发现接口

## 复用清单

- 单模型单点调用用 FC，多客户端复用再包 MCP Server。
- 工具数量少时别为协议而协议。

## 面试一句话

FC 是厂商私有函数接口，MCP 是跨模型开放协议；单点调用用 FC，跨端复用用 MCP。

## 常见坑

以为有了 MCP 就不再需要 Function Calling，把简单调用全包成 Server。

---

来源：第18章
