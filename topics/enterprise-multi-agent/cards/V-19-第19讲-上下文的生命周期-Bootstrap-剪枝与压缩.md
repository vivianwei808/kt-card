---
id: V-19
layer: 每讲速览
title: 第19讲 上下文的生命周期：Bootstrap、剪枝与压缩
source: 第19讲
tags: [上下文, 生命周期, 剪枝]
---

# V-19 第19讲 上下文的生命周期：Bootstrap、剪枝与压缩

> Agent 的上下文是长出来的，不是写出来的；六个干预点决定它长成什么样。

## 机制

- 开篇对照：Workflow 的上下文是工程师写死的，输出完全可控；Agent 的上下文在 ReAct 循环里一轮轮长出来，必须有人在关键点修剪。
- 六个干预点：Bootstrap 拼骨架、Pre-Model 进模型前、Post-Model 出模型后、before-Tool 调工具前、after-Tool 拿到结果后、after-turn 一轮结束。
- Bootstrap：读 soul、user、agent、memory 四份文件，memory 索引控制在 200 行以内。
- 剪枝：倒数第 N 个 user 消息之前的工具返回替换为 [已剪枝]，保留 tool_call_id 保证消息结构合法。
- 压缩：用量与模型上限之比超过 0.45 时，按 token 分块摘要成 context_summary，最近十轮保留原文。
- 落盘：每轮写 ctx.json 覆盖状态，raw.jsonl 追加原始流水带时间戳。

## 代码落点

- `m3l19/m3l19_context_mgmt.py`：build_bootstrap_prompt、prune_tool_results、maybe_compress
- `m3l19/test_context_mgmt.py`：剪枝与压缩的单元测试
- `m3l19/workspace/`：四份上下文文件样例

## 复用清单

- 把六个干预点画成一张图，团队讨论上下文问题时对着图说。
- 剪枝解决工具返回占地方，压缩解决历史太长，两个都要有。
- 阈值用比例不用绝对值，换模型不用改配置。

## 面试一句话

Agent 的上下文是在循环里长出来的，所以我在六个点干预：开场拼 Bootstrap，调模型前后看用量，工具前后剪结果，轮次结束落盘；剪枝和压缩是两级兜底。

## 常见坑

只做压缩不做剪枝，压缩掉有用的对话，留下几万字的工具原始返回。

---

来源：第19讲
