---
id: T-11
layer: 微调与多模态
title: GRPO 用组内相对奖励，不要价值网络
source: 第30章
tags: [GRPO, 强化学习, 推理训练]
---

# T-11 GRPO 用组内相对奖励，不要价值网络

> 每题采样 6 个输出，用组内平均奖励算相对优势，省掉 PPO 的 critic 模型。

## 机制

- GRPO 从当前策略采样一组输出，每个输出的奖励与该组平均奖励比较，得到相对优势。
- 不需要价值网络，省掉 PPO 里 critic 的训练和显存；策略更新加 KL 散度约束。
- GSM8K 只有 question 和 answer，没有 reasoning，推理格式靠奖励函数引导出来。
- 奖励链合计最高 4 分：标签 0.5、含 reasoning 与 answer 0.5、格式 0.5、整数 0.5、答对 2.0。
- GRPOConfig 设 num_generations=6、learning_rate=5e-6，比 SFT 低一个数量级。

## 代码落点

- `GRPOTrainer`：GRPO 训练器
- `num_generations=6`：组内采样数
- `learning_rate=5e-6`：学习率
- `vLLM`：采样加速

## 复用清单

- 有可验证奖励的任务才上 GRPO。
- 奖励函数先分格式分和正确分，别只给最终对错。

## 面试一句话

GRPO 用同一题的多个采样做组内比较，替代 critic 估优势，推理格式由奖励函数引导生成。

## 常见坑

以为训练数据里必须有推理过程；GSM8K 只有问答，格式靠奖励函数塑形。

---

来源：第30章
