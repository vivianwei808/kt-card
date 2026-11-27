---
id: A-01
layer: Agent 与任务契约
title: 人设工程：Role、Goal、Backstory 各管一件事
source: 第07讲；m1l2/m1l2_agent.py
tags: [人设, Prompt, Agent]
---

# A-01 人设工程：Role、Goal、Backstory 各管一件事

> role 定岗位，goal 定验收标准，backstory 定行事风格和边界，三句话决定这个 Agent 的行为上限。

## 机制

- role 写职位名，越具体越好，像「深度研究专家」比「助手」更能约束输出。
- goal 写这个岗位的考核目标，带可判断的完成标准，例如「生成结构化信息点列表」。
- backstory 写履历、偏好、明确不做什么。课程的写法是「你是一位资深网络调研专家」，再补搜索策略和取舍原则。
- backstory 是唯一能放行为细节的地方：先搜什么、什么时候停、什么算不合格，写在这里比写在 task 里稳定。
- 三个字段最终拼进 system prompt，模型对身份认同越清晰，越少跑偏。

## 代码落点

- `m1l2/m1l2_agent.py`：单 Agent 调研示例的 role/goal/backstory 写法
- `llm/aliyun_llm.py`：AliyunLLM 适配器，Agent 的模型入口
- `m2l3/m2l3_agent.py`：Agent.kickoff() 跳过 Task 直接执行的最小用法

## 复用清单

- 写人设前先写岗位说明书：职责、交付物、不做什么，三条写完再翻译成三个字段。
- backstory 里写决策偏好（先搜还是先拆解）比写形容词有效。
- 同一个岗位的 prompt 改动，优先改 backstory，别在 task 里打补丁。

## 面试一句话

我把提示词工程升级成人设工程：role 定岗位，goal 定验收，backstory 写决策偏好和边界；改行为先改 backstory，这样同一套 Task 能复用到不同角色。

## 常见坑

backstory 写成一段赞美词（「你是一位经验丰富、认真负责的专家」），模型读完不知道该怎么做事。

---

来源：第07讲；m1l2/m1l2_agent.py
