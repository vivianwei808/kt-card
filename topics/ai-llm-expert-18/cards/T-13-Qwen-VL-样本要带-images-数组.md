---
id: T-13
layer: 微调与多模态
title: Qwen-VL 样本要带 images 数组
source: 第31章
tags: [VLM, 数据格式, Qwen-VL]
---

# T-13 Qwen-VL 样本要带 images 数组

> 文本里用 image 标记占位，images 数组按出现顺序给路径，一条样本可以挂多张图。

## 机制

- 一条训练样本是 messages 加 images 两个字段，messages 里 user 与 assistant 交替。
- 图片位置由 content 里的 image 标记决定，第二轮 user 写成 What are they doing? 后紧跟标记。
- images 数组两条都指向同一张图，对应文本里出现的两个图片标记。
- 格式来自 Qwen2-VL 官方示例，微调数据按这个结构组织即可直接喂给 Qwen-VL 系列。
- 多图样本按出现顺序排 images，模型才能对上每一轮是哪张图。

## 代码落点

- `messages`：对话结构
- `images`：图片路径数组
- `image 标记`：正文中的占位符
- `Qwen2-VL`：格式来源

## 复用清单

- 数据构造先对齐官方示例，别自创字段名。
- 多图样本逐条检查标记与路径的顺序。

## 面试一句话

多模态 SFT 样本是 messages 加 images，图片标记的位置决定图注入哪一轮对话。

## 常见坑

只把路径塞进 images 数组，漏写图片标记，模型对不上是哪一轮的图。

---

来源：第31章
