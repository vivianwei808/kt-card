---
id: V-12
layer: 每讲速览
title: 第12讲 工具设计哲学：从 API 到 Agent-Native
source: 第12讲
tags: [工具, Function Calling, ReAct]
---

# V-12 第12讲 工具设计哲学：从 API 到 Agent-Native

> 模型用工具有两条路：Native Function Calling 是直觉反射，ReAct 是思维链推理，成本和准确性的取舍不一样。

## 机制

- Native Function Calling：模型直接输出 JSON 形式的工具调用，程序执行后把结果塞回，速度快、token 少，黑盒。
- ReAct Engineering：模型先写 Thought 再选 Action，多一轮推理，token 更多，但复杂场景准确率更高，过程可解释。
- 对比四维：性能与成本、准确性、可解释性、适合场景。单一明确场景用 Function Calling，不确定性高的场景用 ReAct。
- 范式跃迁的落点是语义：API 面向程序员，工具面向模型，名字、参数、返回都要按模型的认知习惯重写。
- 这一讲为后面五步 SOP 打底，先讲清「为什么工具要重写」。

## 代码落点

- `m1l2/m1l2_raw_agent.py`：ReAct 风格的文本协议实现
- `tools/baidu_search.py`：Function Calling 风格的工具定义

## 复用清单

- 工具数量少、场景明确，用原生 Function Calling，省 token 也快。
- 需要模型自己判断该不该用工具时，给它 Thought 的空间。
- 两种方式可以混用，关键在工具描述写得清楚。

## 面试一句话

工具调用有两条路：Function Calling 快而省，适合明确场景；ReAct 多一轮思考，复杂场景更准也更可解释，我按任务不确定性选。

## 常见坑

所有场景都上 ReAct，token 翻倍，简单任务也没变准。

---

来源：第12讲
