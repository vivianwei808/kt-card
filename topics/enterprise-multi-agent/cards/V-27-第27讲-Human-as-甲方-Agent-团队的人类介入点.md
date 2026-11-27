---
id: V-27
layer: 每讲速览
title: 第27讲 Human as 甲方：Agent 团队的人类介入点
source: 第27讲
tags: [Human-in-the-loop, 审批, SOP]
---

# V-27 第27讲 Human as 甲方：Agent 团队的人类介入点

> 人类只在三个节点签字，Manager 发完确认请求就退出，不阻塞等人。

## 机制

- 人类必须在场的地方只有三处：需求澄清、执行中的 checkpoint、异常兜底，其余环节全自主。
- 需求澄清用四维框架：目标、边界、约束、风险，Manager 主动发问，答案写进 requirements.md 并等人确认才开工。
- 异常兜底走 human.json：重试失败、执行超时、token 超预算、安全越权、循环不收敛，按类型路由给人。
- human.json 只允许 Manager 写，mailbox_cli.py 检查 --to human 时发送方必须是 manager，否则返回 errcode=1。
- human.json 用二态 read: false/true，human_cli.py 独立轮询；Manager 发完请求就退出，下次用 check-human 查结果。
- 审批按风险分级：低风险高置信度自动放行，中等人工确认，高风险阻塞；checkpoint 设太多会变成橡皮图章。

## 代码落点

- `m4l27/human_cli.py`：check、respond 子命令与二态 human.json 读写
- `m4l27/workspace/manager/skills/mailbox/scripts/mailbox_cli.py`：human 收件箱的发送方校验
- `m4l27/workspace/manager/agent.md`：四个场景的触发条件与结束动作

## 复用清单

- 打扰人的时机写进编排脚本，别让模型自己判断。
- 审批按风险分档，低风险高置信度的别让人看。
- SOP 共创和执行分开，改流程不重跑任务。

## 面试一句话

人类只在需求澄清、checkpoint、异常兜底三处出现；普通 Agent 不能直连 human.json，审批按风险分级，异步回复不阻塞。

## 常见坑

checkpoint 设太多，人工审批变成橡皮图章，真正要拦的高风险决策也被一路放行。

---

来源：第27讲
