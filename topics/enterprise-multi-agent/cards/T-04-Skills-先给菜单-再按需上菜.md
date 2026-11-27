---
id: T-04
layer: 工具与协议
title: Skills：先给菜单，再按需上菜
source: 第16讲；tools/skill_loader_tool.py
tags: [Skills, 渐进披露, 上下文]
---

# T-04 Skills：先给菜单，再按需上菜

> 工具描述里只放技能名和一句话摘要，模型选中之后才加载完整 SKILL.md，上下文只花一次钱。

## 机制

- 渐进式披露分两步：启动时扫描 skills 目录，把 name 和 frontmatter 里的描述拼成 <available_skills> 注入工具描述；调用时才读 SKILL.md 正文。
- 工具描述只放 XML 菜单，几十个技能也只有几百字，上下文开销可控。
- skill 分两类：type=reference 只返回操作指令文本，type=task 会现场搭一个 Sub-Crew 去执行。
- type=task 的 Sub-Crew 复用同一套骨架：backstory 塞进 SKILL.md，工具走沙箱 MCP，再用 tool_filter 限定四个沙箱工具。
- 技能文件可以放在全局 skills 目录，也可以放在每个 workspace 自己的 skills 目录，实现角色专属技能。

## 代码落点

- `tools/skill_loader_tool.py`：__init__ 只解析 frontmatter，_run 时才读全文
- `tools/skill_loader_tool.py`：_build_description 生成 <available_skills> XML
- `skills/load_skills.yaml`：技能清单与类型声明
- `skills/pdf/SKILL.md、skills/docx/SKILL.md`：reference 与 task 两类技能示例

## 复用清单

- 技能数量超过十个就上渐进式披露，别把全文塞进 system prompt。
- 把「怎么写」放进 SKILL.md，「查什么数据」放进脚本，两者分开维护。
- 技能目录按角色划分，manager 和 pm 各自挂不同技能。

## 面试一句话

Skills 我按渐进式披露做：启动只注入技能菜单，模型选中后加载正文；需要执行的技能会起一个 Sub-Crew 在沙箱里跑，这样技能再多上下文也不爆。

## 常见坑

把所有 SKILL.md 全文拼进系统提示词，二十个技能吃掉上万 token，模型反而选不准。

---

来源：第16讲；tools/skill_loader_tool.py
