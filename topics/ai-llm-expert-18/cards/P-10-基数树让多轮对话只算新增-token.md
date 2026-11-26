---
id: P-10
layer: 部署与性能
title: 基数树让多轮对话只算新增 token
source: 第36章
tags: [SGLang, RadixAttention, 缓存]
---

# P-10 基数树让多轮对话只算新增 token

> RadixAttention 按前缀复用 KV Cache，A10G 上比 vLLM 最高 5 倍吞吐。

## 机制

- 用基数树管理 token 序列与 KV Cache 映射，边可标记任意长度序列，查找比 Trie 快。
- KV Cache 按页存储，每页大小等于一个 token，物理上可以不连续。
- 显存满时 LRU 先逐出最久未用的叶子，公共祖先保留到自己也变成叶子。
- 第二轮对话命中系统 Prompt 和第一轮内容，只计算新增的用户消息。
- A10G 上 Llama-7B 与 Mixtral-8x7B 测试，最高 5 倍吞吐提升。

## 代码落点

- `RadixAttention`：前缀缓存
- `Radix Tree`：基数树
- `LRU`：缓存逐出
- `SGLang`：实现框架

## 复用清单

- 多轮对话、Agent、固定系统提示的场景优先测 SGLang。
- 把系统提示词放最前面，提高前缀命中。

## 面试一句话

RadixAttention 用基数树做前缀级 KV 复用，多轮和共享模板场景收益最大。

## 常见坑

以为 RadixAttention 对单轮随机问答也有效，这类场景命中率接近 0。

---

来源：第36章
