---
id: V-16
layer: 每讲速览
title: 第16讲 Skills 生态：渐进式披露与 Sub-Crew 编排
source: 第16讲
tags: [Skills, 渐进披露, Sub-Crew]
---

# V-16 第16讲 Skills 生态：渐进式披露与 Sub-Crew 编排

> 技能不塞进提示词，先给模型一份菜单，选中了再上菜，需要动手时现场起一个子 Crew 去沙箱执行。

## 机制

- 菜单阶段：启动时扫目录，把技能名和一句话描述拼成 <available_skills> 注入工具描述，几十个技能也只占几百字。
- 点菜阶段：模型调用 skill_loader(skill_name, task_context)，这时才读 SKILL.md 正文。
- 技能分两类：type=reference 直接返回操作指令文本，不执行代码；type=task 现场构建 Sub-Crew。
- Sub-Crew 的 backstory 就是 SKILL.md，工具走沙箱 MCP，再用 tool_filter 限定四个沙箱工具。
- 技能可以放全局目录，也可以放 workspace 目录，实现角色专属能力。

## 代码落点

- `tools/skill_loader_tool.py`：frontmatter 解析、_build_description、_run 的三段结构
- `skills/load_skills.yaml`：技能清单
- `skills/pdf/SKILL.md、skills/docx/SKILL.md`：两类技能示例

## 复用清单

- 技能超过十个就上渐进式披露，上下文成本可控。
- 把操作规范写进 SKILL.md，执行细节交给沙箱工具。
- 技能目录分层，团队级和角色级分开维护。

## 面试一句话

Skills 用渐进式披露：菜单常驻、正文按需加载，需要执行的技能起一个子 Crew 在沙箱里跑，技能再多上下文也不会爆。

## 常见坑

把所有技能说明拼进系统提示词，token 花了一大半，模型反而选不准。

---

来源：第16讲
