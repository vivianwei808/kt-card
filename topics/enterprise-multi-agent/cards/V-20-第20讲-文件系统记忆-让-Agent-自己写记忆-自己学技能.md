---
id: V-20
layer: 每讲速览
title: 第20讲 文件系统记忆：让 Agent 自己写记忆、自己学技能
source: 第20讲
tags: [记忆, 技能, 沙箱]
---

# V-20 第20讲 文件系统记忆：让 Agent 自己写记忆、自己学技能

> 主 Agent 手上只有技能加载器，写记忆和造技能都由子 Crew 在沙箱里完成，权限和格式收进 SKILL.md。

## 机制

- 对照上一讲：原来给 Agent 配 FileWriter、FileRead 直接读写，这一讲全部去掉，只留 SkillLoaderTool。
- 写记忆走 memory-save 技能：子 Crew 按四步规范写 user.md、memory.md，字段和格式由技能定义。
- 四步规范：①准入控制看 Utility、Confidence、Novelty、Type 四个问题，②分类路由按类型写进 user.md、agent.md 或 memory_*.md，③写入前检查行数，④有旧条目就 str_replace 更新而不是追加。
- memory.md 上限 200 行，按需加载的 memory_*.md 控制在 150 行内；150 到 179 行写入但警告，180 行起停止写入先治理。
- 每条记忆带双时间戳 [created, updated]，记忆的目标是越存越准，而非越存越多。
- 造技能走 skill-creator 技能：子 Crew 在沙箱里写 SKILL.md 到技能目录，Agent 下次启动就能看到新技能。
- 治理走 memory-governance 技能：读两个目录、查冲突、清过期。
- 目录挂载分权限：workspace 读写，skills 单独挂，主 Agent 不直接碰文件。

## 代码落点

- `m3l20/m3l20_file_memory.py`：assistant_agent 的工具表只剩 SkillLoaderTool
- `skills/memory-save/SKILL.md、skills/skill-creator/SKILL.md、skills/memory-governance/SKILL.md`
- `m3l20/sandbox-docker-compose.yaml`：workspace 与 skills 的挂载

## 复用清单

- 有格式要求的写盘一律包成技能。
- 让 Agent 造技能时限制可写目录，别给整个仓库。
- 技能文件本身就是文档，改技能不用改代码。

## 面试一句话

记忆写入我不给主 Agent 文件工具，只留技能加载器，写盘由技能内的子 Crew 在沙箱执行；好处是格式统一、权限收敛、主上下文干净。

## 常见坑

给 Agent 裸文件读写权限，它会把整份文件读进上下文，还会写出格式各异的记忆文件。

---

来源：第20讲
