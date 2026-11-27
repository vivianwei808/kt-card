---
id: V-33
layer: 每讲速览
title: 第33讲 项目实战5：系统加固你的 XiaoPaw 本地工作助手
source: 第33讲；m5l32/demo.py
tags: [项目实战, 加固, Trace]
---

# V-33 第33讲 项目实战5：系统加固你的 XiaoPaw 本地工作助手

> 699 行 Hook 接线，6 行业务改动，给 XiaoPaw 穿上三层装甲。

## 机制

- 改动全景：699 行新增全是 30/31/32 三课的 handler，业务侧只改 6 行把 Hook 接进 Runner，骨架不动。
- hooks.yaml 同时装观测、可靠性、安全三组策略，三课叠加在同一份配置，加载顺序就是执行顺序。
- HookContext 增加 sender_id，PermissionGate 按飞书 routing_key 识别用户，同一个 Agent 对不同人给不同权限。
- Langfuse 追踪用 contextvars 传递 trace_id 和 span 栈，Sub-Crew 线程自动挂到父节点，AFTER_TURN 强制 flush。
- 沙箱挂载先校验 host 与 container 的 inode 一致，再启动 Skill，避免读写落到错误目录。
- 验收走 Trace 树：llm-call、tool-skill_loader、tool-agent_execution、task-complete、session_end 都挂在同一棵树上。

## 代码落点

- `m5l32/demo.py`：Runner 接线与三层策略装配
- `m5l32/workspace/demo_agent/soul.md`：角色禁令
- `m5l32/tests/test_e2e_demo_flow.py`：四路径验收与脱敏断言
- `m2l17/readme.md`：XiaoPaw 原始链路与能力边界

## 复用清单

- 接线只改入口，Hook 全放配置，业务代码保持干净。
- 每层给一个可关的开关，出问题先关层再定位。
- 验收看 trace 树结构，不只看最终答案。

## 面试一句话

XiaoPaw 加固只动入口：699 行 Hook 配置，6 行接进 Runner，观测、可靠、安全三层挂在同一棵 trace 树上，业务代码几乎没改。

## 常见坑

把 Hook 装配散在业务代码里，改一次策略要翻十几个文件。

---

来源：第33讲；m5l32/demo.py
