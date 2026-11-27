---
id: V-29
layer: 每讲速览
title: 第29讲 项目实战4：Agent 小队完成真实项目需求
source: 第29讲
tags: [项目实战, 零编排, 数字团队]
---

# V-29 第29讲 项目实战4：Agent 小队完成真实项目需求

> 四个机制拼成小队，难点不在功能，在四个接缝。

## 机制

- 第29讲把角色体系、任务链、HITL、自我进化四个机制拉到一起跑，难的是接缝：邮箱、唤醒、权限、状态都要补齐。
- 骨架沿用第22课的三层继承，L1 基础设施和 L2 记忆不动，只加 L3 团队协作层，组件是发信、读信、kickoff、定时服务。
- 四个接缝落在四个文件：main.py 管入口，runner.py 管循环，team_tools.py 放 8 个工具，workspace.py 做权限化读写。
- 团队四个角色 manager、pm、rd、qa 各带身份四件套和一组 Skill，业务逻辑全在 35 个 Skill 里，Python 只负责接缝。
- 零编排循环靠两条腿：SendMail 发信即唤醒，CronService 定时兜底，收件箱读到消息就 kickoff 起 Agent。
- 工具层补可靠性：mailbox.py 三态机，tasks_store.py 先写临时文件再 rename 加 FileLock，event_log.py 只追加。

## 代码落点

- `m4l29/readme.md`：xiaopaw-team 仓库地址与本地路径说明
- `shared/digital_worker.py`：小队角色复用的数字员工框架
- `m4l26/tools/mailbox_ops.py`：三态邮箱，团队版的 mailbox.py 沿用同一套状态机

## 复用清单

- 集成期先列接缝清单，别急着加新能力。
- 业务逻辑放 Skill，Python 只写胶水。
- 定时任务只做兜底，主路径靠发信即唤醒。

## 面试一句话

22 课骨架上加团队层，main、runner、team_tools、workspace 四个接缝把角色、邮箱、HITL 拼成小队。

## 常见坑

把团队能力写成一个大编排脚本，四个接缝糊在一起，任何一环改动都要回归整条链。

---

来源：第29讲
