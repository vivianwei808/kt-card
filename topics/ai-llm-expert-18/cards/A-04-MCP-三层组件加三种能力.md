---
id: A-04
layer: Agent 工程
title: MCP 三层组件加三种能力
source: 第18章
tags: [MCP, 协议, 架构]
---

# A-04 MCP 三层组件加三种能力

> Host 跑模型，Client 通信，Server 暴露 Resources、Tools、Prompts。

## 机制

- MCP 由 Anthropic 于 2024 年 11 月推出，用来标准化 LLM 与外部数据源、工具的交互。
- MCP Host 是运行模型的环境，如 Claude Desktop、Cursor；Client 嵌在 Host 里与 Server 通信。
- Resources 提供结构化数据扩展上下文，Tools 执行外部操作，Prompts 是预定义指令模板。
- 客户端接入只需一段 mcpServers 配置：command 为 npx，args 为 -y 加包名，env 放 API KEY。
- Python 侧用 FastMCP 加 @mcp.tool() 暴露函数，mcp.run() 启动，mcp dev 开本地调试。

## 代码落点

- `mcpServers`：客户端配置
- `FastMCP`：Python Server 框架
- `@mcp.tool()`：暴露工具
- `mcp dev`：本地调试

## 复用清单

- Key 放 env，不写死在代码里。
- 工具、资源、提示三类能力按用途分开暴露。

## 面试一句话

MCP 分 Host、Client、Server 三层，Server 暴露 Resources、Tools、Prompts 三类能力。

## 常见坑

把 key 写死在代码里而不放 env，换环境就报 No server info found。

---

来源：第18章
