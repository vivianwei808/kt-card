---
id: B-07
layer: 数据智能
title: nanobot 用四个文件拼出 Agent
source: 第39章
tags: [nanobot, Agent架构, 开源]
---

# B-07 nanobot 用四个文件拼出 Agent

> nanobot 仅 4000 行，config.json 定模型工具，AGENTS.md 定身份，skills 定能力。

## 机制

- 香港大学数据科学实验室开源的轻量助手，是 OpenClaw 的精简版，核心代码约 4000 行。
- 组成公式：config.json 配置、AGENTS.md 身份、skills 目录、Tool 类。
- 内置工具按目录分：filesystem、shell、web、spawn、message、cron、mcp。
- config.json 里 web.enable 设为 false 后，web_search、web_fetch 不会注册进工具集。
- 对比 DeepAgents：nanobot 用声明式配置，DeepAgents 用 Python 代码构建并依赖 LangGraph。

## 代码落点

- `config.json`：模型与工具开关
- `AGENTS.md`：Agent 身份
- `skills/`：技能目录
- `AgentLoop`：主循环

## 复用清单

- 做轻量 Agent 先学这套最小结构。
- 工具开关放配置，别在代码里注释。

## 面试一句话

nanobot 是 4000 行的 Agent 最小实现，配置加技能加工具就是一个完整 Agent。

## 常见坑

没把 nanobot-main 放对位置，导入到同名旧包就会报找不到模块。

---

来源：第39章
