---
id: X-04
layer: 上下文与记忆
title: 文件系统记忆：主 Agent 不碰文件，写记忆走技能
source: 第20讲；m3l20/README.md
tags: [记忆, 技能, 沙箱]
---

# X-04 文件系统记忆：主 Agent 不碰文件，写记忆走技能

> 主 Agent 只留一个 SkillLoaderTool，写记忆的活交给子 Crew 在沙箱里做，权限和格式都收在技能里。

## 机制

- 对照实验：上一讲给 Agent 直接配 FileWriterTool、FileReadTool，本讲把这些全去掉。
- 主 Agent 的工具表里只有 SkillLoaderTool，需要写记忆时调用 memory-save 技能。
- 技能内部起一个 Sub-Crew，在沙箱里按四步规范写文件，目录和格式由技能定义。
- 好处是主上下文里不会出现大段文件内容，写盘动作也统一走一套规范。
- 技能目录分两层：workspace 自己的 skills 放角色专属技能，全局 skills 放通用技能。

## 代码落点

- `m3l20/m3l20_file_memory.py`：assistant_agent 的工具表只剩 SkillLoaderTool
- `skills/memory-save/SKILL.md`：记忆写入的四步规范
- `skills/memory-governance/SKILL.md`：记忆审计与清理

## 复用清单

- 写盘这类有格式要求的操作，包成技能比给裸工具稳。
- 角色专属技能放 workspace，团队通用技能放全局目录。
- 主 Agent 的工具表越短，误调越少。

## 面试一句话

记忆写入我不给主 Agent 文件工具，只留技能加载器，写盘由技能内部的子 Crew 在沙箱执行，格式和目录都收在 SKILL.md 里，主上下文干净很多。

## 常见坑

给主 Agent 配完整文件读写，它会把整份文件读进上下文，记忆没存好，token 先爆了。

---

来源：第20讲；m3l20/README.md
