---
id: R-11
layer: RAG 工程
title: 表格给 LLM 用 HTML，序列化反而降效
source: 第16章
tags: [RAG, PDF解析, 表格]
---

# R-11 表格给 LLM 用 HTML，序列化反而降效

> 试过 20 多个解析器后选 Docling，表格改 HTML 喂模型，表格序列化实测略变差。

## 机制

- PDF 解析难点：保留表格结构、标题和项目符号、识别多栏、处理图表公式页眉页脚。
- 作者试过 20 多种解析器（小众、知名、ML 训练、商业 API），最终选 Docling 并改源码补能力。
- Docling 先输出 JSON 再构建 Markdown，解析乱码用十几个正则清洗。
- 表格先试 Markdown 后改 HTML，因为模型对 HTML 理解更好，能表达合并单元格和子标题。
- 被寄予厚望的表格序列化实测没提升反而略降，配置 use_serialized_tables 默认 False。

## 代码落点

- `Docling`：PDF 转结构化
- `use_serialized_tables=False`：关闭表格序列化
- `HTML table`：喂模型的表格格式
- `MinerU`：另一条解析路线

## 复用清单

- 表格解析先保结构，再决定 Markdown 还是 HTML。
- 任何解析优化都用评测集验证，别凭直觉开开关。

## 面试一句话

表格别急着序列化，先把 HTML 结构喂给模型，用配置开关实测决定。

## 常见坑

默认表格序列化能救大表，实测降效，延迟和 token 白花。

---

来源：第16章
