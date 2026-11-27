---
id: O-06
layer: 多智能体协作
title: 自我进化：Skill 管怎么想，Script 管查什么
source: 第28讲；m4l28/README.md
tags: [进化, 复盘, 提案]
---

# O-06 自我进化：Skill 管怎么想，Script 管查什么

> 复盘技能给出思考框架，日志查询脚本负责取数，Agent 产出结构化的改进提案，审批后才改文件。

## 机制

- 分工原则：SKILL.md 写五个递进问题和根因枚举，log_query.py 负责 stats、tasks、steps、l1、all-agents 五类查询。
- Agent 读日志、按框架推理，产出 RetroOutput JSON：复盘报告加改进提案。
- 提案带 root_cause、before_text、after_text，Manager 审批后由 PM 执行，改动落在 agent.md、soul.md、memory.md 或技能文件上。
- 三层日志支撑复盘：任务层记录每次任务，步骤层记录 ReAct 轨迹，人工纠正层记录人改过什么。
- 关键约束：模型不能自己改自己的规则，所有改动要过审批。

## 代码落点

- `m4l28/README.md`：Skill 与 Script 的分工图
- `m4l28/run.py、m4l28/scheduler.py`：复盘调度
- `m4l28/schemas.py`：RetroOutput 与改进提案的结构定义
- `skills/self_retrospective/SKILL.md、tools/log_query.py`

## 复用清单

- 让 Agent 改进自己时，先给它数据查询能力，再给它思考框架。
- 改进提案必须带前后对照文本，审批的人才知道改了什么。
- 改动走审批，模型不碰自己的规则文件。

## 面试一句话

自我进化我拆成两块：技能负责怎么想，脚本负责查数据，产出带根因和前后对照的改进提案，人审批后才改规则文件，模型不能直接改自己。

## 常见坑

让 Agent 直接编辑自己的提示词，一次误改就可能把整个角色改坏，而且没有回滚。

---

来源：第28讲；m4l28/README.md
