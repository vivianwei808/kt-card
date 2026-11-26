---
id: A-12
layer: Agent 工程
title: 评估器用 LLM 当判官打分
source: 第20章
tags: [Agent, 评估, LLM判官]
---

# A-12 评估器用 LLM 当判官打分

> create_llm_as_judge 加内置 prompt，11 个评估器覆盖正确性、简洁性、幻觉、计划遵循。

## 机制

- create_llm_as_judge 接收 prompt、feedback_key、judge，continuous=True 返回 0 到 1 分。
- 内置 11 个 prompt：正确性、简洁性、相关性、RAG 帮助性、毒性、幻觉、代码正确性、计划遵循等。
- 正确性实测：高质量回答 0.8，部分正确 0.6，答错 0.0；简洁性带冗余信息降到 0.2。
- groundedness 评输出是否忠于检索上下文；retrieval relevance 评检索内容是否相关。
- judge 模型建议 temperature=0，评估模型和被测模型可以是同一个。

## 代码落点

- `pip install openevals`：评估库
- `create_llm_as_judge`：LLM 判官
- `CORRECTNESS_PROMPT`：内置提示
- `HALLUCINATION_PROMPT`：幻觉检测

## 复用清单

- 先用内置评估器跑基线，再写业务专用 prompt。
- 判官 temperature 设 0，减少评分波动。

## 面试一句话

openevals 用 11 个现成 judge prompt 包成评估器，业务指标再自己写 prompt。

## 常见坑

拿通用 prompt 直接评业务指标，分数好看但对业务没意义。

---

来源：第20章
