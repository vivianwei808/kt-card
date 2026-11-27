---
id: O-02
layer: 多智能体协作
title: 数字团队：一个通用类，装不同的 workspace
source: 第25讲、第26讲；shared/digital_worker.py
tags: [数字员工, 复用, workspace]
---

# O-02 数字团队：一个通用类，装不同的 workspace

> DigitalWorkerCrew 只有一份代码，角色差异全在 workspace 的四个 markdown 和技能目录里。

## 机制

- shared/digital_worker.py 里角色和目标是通用值：数字员工，按背景和技能完成任务。
- 身份来自 workspace：soul.md 定身份与决策偏好，agent.md 定职责与 NEVER 清单，user.md 定服务对象，memory.md 定记忆索引。
- 任务模板也是通用的，把用户请求和四段背景拼进去，具体做什么由技能和工作区决定。
- 这带来一个好处：新增一个岗位只需要新建目录和四份文件，代码零改动。
- Manager 和 PM 是两个实例，跑同一个类，Kickoff 时传入各自的 workspace。

## 代码落点

- `shared/digital_worker.py`：UNIVERSAL_ROLE、UNIVERSAL_GOAL、UNIVERSAL_TASK_TEMPLATE
- `m4l26/main.py、m4l26/start_pm.py`：同一类的两个实例入口
- `m4l27/workspace/manager/、workspace/pm/`：两套四份文件

## 复用清单

- 角色超过三个就抽通用类，别复制三份 prompt。
- 把差异全部下沉到 workspace 文件，代码只留引擎。
- 新增岗位的验收标准：只改文件，不改代码。

## 面试一句话

我把数字员工抽成一个通用类，每个角色的差异全在 workspace 的 soul、agent、user、memory 四份文件里，加一个岗位是加目录，不是加代码。

## 常见坑

每个角色写一个 Crew 类，改一个公共逻辑要动五处，几周后没人敢改。

---

来源：第25讲、第26讲；shared/digital_worker.py
