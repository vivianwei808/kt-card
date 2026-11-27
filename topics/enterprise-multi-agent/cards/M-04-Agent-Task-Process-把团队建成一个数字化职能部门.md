---
id: M-04
layer: 架构选型
title: Agent、Task、Process：把团队建成一个数字化职能部门
source: 第03讲 05:20-10:00；第09讲
tags: [Agent, Task, Process]
---

# M-04 Agent、Task、Process：把团队建成一个数字化职能部门

> Agent 是岗位，Task 是工单，Process 是流程，三者对上公司里的职能部门。

## 机制

- Agent 对应岗位：role 是职位名，goal 是这个岗位的考核目标，backstory 是履历与行事风格。
- Task 对应工单：description 写清要做什么，expected_output 写清交付什么，context 挂上依赖的上游任务。
- Process 对应流程：Sequential 按顺序流水，Hierarchical 由管理者分派与验收。
- 课程里的多智能体示例是四个岗位：深度研究专家、网络搜索专家、报告撰写研究员、报告审核编辑，各自绑不同工具。
- allow_delegation 决定这个岗位能不能把活转给别人：研究员和搜索专家关闭委托，撰写员打开，因为撰写员需要回头找搜索补料。

## 代码落点

- `m1l3/m1l3_multi_agent.py`：四个 Agent 的 role/goal/backstory 与 tools 绑定
- `m1l3/m1l3_multi_agent.py`：allow_delegation=False 的研究、搜索岗，True 的撰写岗
- `m2l5/m2l5_crew.py`：Sequential Process 下的多任务与 context 依赖

## 复用清单

- 先画岗位表再写代码：岗位、职责、工具、交付物四列，写完再落 Agent 和 Task。
- 委托开关按信息流向定：需要回头补料的岗位开，纯执行岗位关。
- Task 的 expected_output 写成可验收的格式，否则下游 Agent 要靠猜。

## 面试一句话

我设计多智能体系统时先出岗位表：谁负责什么、手里有什么工具、交给下游什么格式，这份表和 Agent/Task/Process 三要素是一一对应的。

## 常见坑

所有 Agent 都开 allow_delegation，任务在几个角色之间来回踢皮球，日志里看不到推进。

---

来源：第03讲 05:20-10:00；第09讲
