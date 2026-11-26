---
id: R-12
layer: RAG 工程
title: 300 token 切块，命中后取整页重排
source: 第16章
tags: [RAG, 父页检索, 重排]
---

# R-12 300 token 切块，命中后取整页重排

> 每页切 300 token 小块存父页编号，检索 Top30 块换页去重，LLM 重排后取 Top10 页。

## 机制

- 整页做 chunk 太粗，目标句被无关文本稀释导致相似度低，改切 300 token 约 15 句。
- 每个块在 metadata 里存 ID 和父页面编号；metadata 不向量化，只当筛选标签。
- 整合检索器六步：查询向量化、取 Top30 块、按 metadata 换页去重、LLM 重排、调分、返回 Top10 页。
- LLM 重排输出 reasoning 和 relevance_score，最终分按 vector_weight 0.3、llm_weight 0.7 加权。
- 保留父页面是因为块负责定位，页面里还有次要但关键的细节。

## 代码落点

- `text_splitter.py`：300 token 切块
- `relevance_score`：LLM 重排分
- `vector_weight=0.3 / llm_weight=0.7`：融合权重
- `IndexFlatIP`：内积索引

## 复用清单

- 先定块大小和父页规则，再选重排模型。
- 重排结果保留 reasoning，方便抽查为什么排前面。

## 面试一句话

分块解决找得准，父页解决答得全，中间靠 metadata 页码做指针。

## 常见坑

块切得越小越好，结果命中块缺上下文，答案只能答一半。

---

来源：第16章
