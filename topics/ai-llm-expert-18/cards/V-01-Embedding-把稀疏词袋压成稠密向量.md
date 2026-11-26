---
id: V-01
layer: 向量与检索
title: Embedding 把稀疏词袋压成稠密向量
source: 第12章
tags: [Embedding, 相似度, Word2Vec]
---

# V-01 Embedding 把稀疏词袋压成稠密向量

> 152 家酒店、3347 个 n-gram 特征，词频矩阵大量为 0，Embedding 换成固定维度稠密向量。

## 机制

- 152 家西雅图酒店，1、2、3-gram 特征合计 3347 个，TF-IDF 矩阵形状 152×3347，大量取值为 0。
- 余弦相似度只看方向：同向为 1，夹角 90° 为 0，完全反向为 -1。
- 两个句子的词频向量算得余弦相似度 0.738，接近 1 即判定语义相似。
- Word2Vec 学的是输入层到隐藏层的权值矩阵，大小 [vocab_size, hidden_size]，本质是一张查找表。
- Skip-Gram 用中心词预测上下文，CBOW 用上下文预测中心词，两者方向相反。

## 代码落点

- `CountVectorizer`：词频矩阵
- `TfidfVectorizer`：TF-IDF 特征
- `linear_kernel`：余弦相似度
- `gensim word2vec`：训练词向量

## 复用清单

- 小语料先跑词袋基线，再换 embedding 比较效果。
- 相似度任务统一用余弦，先归一化再算内积。

## 面试一句话

Embedding 解决稀疏词袋维度高、语义弱的问题，把词或句子压成固定长度稠密向量。

## 常见坑

拿原始词袋特征直接算相似度，维度高、矩阵稀疏，存储和计算都贵。

---

来源：第12章
