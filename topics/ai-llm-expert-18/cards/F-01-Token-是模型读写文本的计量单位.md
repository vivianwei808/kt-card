---
id: F-01
layer: 大模型地基
title: Token 是模型读写文本的计量单位
source: 第1章
tags: [Token, 上下文, 计费]
---

# F-01 Token 是模型读写文本的计量单位

> 同一句话在不同模型里切出的 token 不同，上下文、计费、速度都按 token 算。

## 机制

- 模型先按分词器把文本切成 token，再映射成数字向量参与计算。
- GPT-4o 把「Hello World」切成 2 个 token，id 为 13225 和 5922。
- DeepSeek-R1 把「人工智能你好啊」切成「人工智能」「你好」「啊」，id 为 33574、30594、3266。
- 分词器不同，同一段中文的 token 数就不同，按字数估窗口会低估。
- 32K 上下文指 32K 个 token，不是 32K 个汉字。

## 代码落点

- `tiktokenizer`：对比 GPT-4o 与 DeepSeek-R1 的切分结果
- `max_output_tokens`：按 token 限制输出长度
- `tokenizer.encode`：本地统计输入 token 数

## 复用清单

- 估算成本前，先用目标模型的分词器数一遍真实输入。
- 长文档功能把 token 预算写进设计，不留到联调时才发现超窗。

## 面试一句话

Token 是分词器的输出，上下文窗口和计费都按 token 算，不按字数。

## 常见坑

用中文字数估 token，实际切分可能多出三成。

---

来源：第1章
