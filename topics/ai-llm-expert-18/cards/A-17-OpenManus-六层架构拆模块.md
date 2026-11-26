---
id: A-17
layer: Agent 工程
title: OpenManus 六层架构拆模块
source: 第22章
tags: [OpenManus, 架构, Agent]
---

# A-17 OpenManus 六层架构拆模块

> 交互、入口、智能体、工具、流程控制、基础设施六层分开，十二类工具全部可插拔。

## 机制

- 用户交互层可选 CLI、Web API、可视化界面三种形态。
- 应用入口层分 main.py 单智能体、run_flow.py 多智能体、run_mcp.py 远程工具接入。
- 智能体层按 BaseAgent → ReActAgent → ToolCallAgent → Manus 四级继承，逐级叠加能力。
- 流程控制层 PlanningFlow 把任务拆成线性或 DAG 步骤，支持角色分工。
- 基础设施层含 Docker 部署、Redis 缓存、FAISS 长期记忆，LLM 适配器支持 10 多个模型。

## 代码落点

- `main.py / run_flow.py / run_mcp.py`：三种入口
- `BaseAgent→Manus`：四级继承
- `PlanningFlow`：流程编排
- `FAISS / Redis`：记忆与缓存

## 复用清单

- 业务逻辑写在工具或流程层，别塞进核心循环。
- 换模型只改适配器，不动 Agent 主流程。

## 面试一句话

OpenManus 用六层拆开交互、入口、Agent、工具、流程和基础设施，能力靠继承逐层叠加。

## 常见坑

把业务逻辑写进 Manus 子类，换个场景就得动核心循环。

---

来源：第22章
