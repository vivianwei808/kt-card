---
id: X-01
layer: 上下文与记忆
title: 从 Prompt 到 Harness：Bootstrap 四件套
source: 第18讲、第19讲；m3l19/README.md
tags: [上下文, Bootstrap, Harness]
---

# X-01 从 Prompt 到 Harness：Bootstrap 四件套

> 每次开工先拼四段骨架：我是谁、服务谁、怎么干、记得什么，拼完再交给模型。

## 机制

- soul.md 放身份与决策偏好，user.md 放服务对象画像，agent.md 放工作规范，memory.md 放记忆索引。
- Bootstrap 函数把四份文件拼成带标签的提示词，注入 Agent 的 backstory。
- memory.md 只放索引，控制在 200 行以内，细节靠检索或读文件补。
- 这套骨架让提示词从「一段话」变成「可维护的四份文档」，改行为改文件，不改代码。
- 课程把这一层叫 Harness：模型之外的一切工程约束，都在这里组装。

## 代码落点

- `m3l20/m3l20_file_memory.py`：build_bootstrap_prompt 拼装四段
- `m3l19/workspace/`：soul.md、user.md、agent.md、memory.md 四份样例
- `shared/digital_worker.py`：复用同一套 bootstrap，传给每个数字员工

## 复用清单

- 新角色上线前先写四份 markdown，代码零改动。
- memory.md 只写索引和关键词，正文放文件或向量库。
- 把四份文件纳入版本管理，改人设走 review。

## 面试一句话

上下文我按 Harness 思路做：soul、user、agent、memory 四份文件拼成 bootstrap 骨架，注入 backstory，改角色行为就是改文档，代码不动。

## 常见坑

所有规则堆在 system prompt 里，改一条要动代码，几个角色之间还会互相抄错。

---

来源：第18讲、第19讲；m3l19/README.md
