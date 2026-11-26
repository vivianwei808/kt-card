---
id: T-02
layer: 微调与多模态
title: 底座不带分类头，要用 For 系列
source: 第26章
tags: [HuggingFace, 分类, 推理]
---

# T-02 底座不带分类头，要用 For 系列

> AutoModel 输出隐藏状态，For 系列多接一个分类头，直接给 logits。

## 机制

- AutoModel 只有底座，bert-base-chinese 输出 768 维隐藏状态，适合自己搭网络。
- 指定 num_labels=2 加载 For 系列，会在底座后加一层 Linear(768, 2) 分类头。
- 手写推理：tokenizer 出 input_ids 和 attention_mask，前向取 logits，softmax 后 argmax。
- logits [2.8590, -2.7449] 经 softmax 得 [0.9963, 0.0037]，再用 id2label 查表出标签。
- tokenizer 返回的 attention_mask 中 1 是真实 token，0 是 padding。

## 代码落点

- `AutoModelForSequenceClassification`：带分类头
- `num_labels=2`：二分类
- `softmax + argmax`：取预测类别
- `id2label`：id 转标签

## 复用清单

- 分类任务直接加载 For 系列，别自己接 Linear。
- 推理输出先 softmax 再看置信度。

## 面试一句话

底座出向量，For 系列出分数；推理走 tokenize、logits、softmax、id2label。

## 常见坑

拿 AutoModel 的输出直接当分类结果，底座没有分类头，维度对不上。

---

来源：第26章
