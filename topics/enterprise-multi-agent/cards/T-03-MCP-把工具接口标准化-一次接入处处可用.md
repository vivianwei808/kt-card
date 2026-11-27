---
id: T-03
layer: 工具与协议
title: MCP：把工具接口标准化，一次接入处处可用
source: 第14讲；m2l9/m2l9_mcp.py
tags: [MCP, 协议, 多租户]
---

# T-03 MCP：把工具接口标准化，一次接入处处可用

> MCP 服务器对外暴露工具清单，Agent 侧只配地址、过滤器和请求头，就能拿到一组标准工具。

## 机制

- CrewAI 支持三种传输：MCPServerHTTP、MCPServerSSE、MCPServerStdio，远程服务用 HTTP 最省事。
- 配置里配 url、headers、tool_filter、cache_tools_list 四项，基本覆盖企业接入需求。
- tool_filter 支持静态和动态两种：静态按名字白名单，动态可按用户或上下文决定。
- 多租户靠 headers 传 X-User-Id，服务端按用户隔离数据和权限。
- cache_tools_list=True 缓存工具清单，避免每次启动都拉一遍 schema。
- 坑：CrewAI 委派时走 execute_task 不触发 _prepare_kickoff，MCP 工具不会自动加载，需要在首次执行前手动 get_mcp_tools 并塞进 tools。

## 代码落点

- `m2l9/m2l9_mcp.py`：MCPServerHTTP 配置与 create_static_tool_filter
- `m2l9/m2l9_mcp.py`：headers={"X-User-Id": user_id} 的多租户写法
- `m2l10/m2l10_sandbox.py`：get_mcp_tools 手动加载绕过委派 bug

## 复用清单

- 内部系统统一包一层 MCP 服务，各业务 Agent 只配地址。
- 工具白名单按角色配，别让写文档的 Agent 拿到删库工具。
- 多租户场景把用户身份放 header，服务端做数据隔离，不要靠提示词约束。

## 面试一句话

MCP 解决工具接口的标准化：服务端暴露工具清单，Agent 配地址和过滤器就能用；我在项目里用 header 传用户身份做多租户隔离，用静态过滤器限制每个角色能调的工具。

## 常见坑

以为配了 mcps 就万事大吉，委派场景下工具没加载，Agent 报工具不存在。

---

来源：第14讲；m2l9/m2l9_mcp.py
