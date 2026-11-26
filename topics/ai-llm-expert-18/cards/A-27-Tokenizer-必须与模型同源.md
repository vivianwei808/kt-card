---
id: A-27
layer: Agent 工程
title: Tokenizer 必须与模型同源
source: 第27章
tags: [Tokenizer, HuggingFace, 部署]
---

# A-27 Tokenizer 必须与模型同源

> 同一个 ID 在 BERT 词表里是苹果，在别的模型词表里可能是汽车，混用等于喂乱码。

## 机制

- 每个模型预训练时有自己的词表和切词算法，如 BPE、WordPiece。
- 特殊控制标记不通用，BERT 用 [CLS]，Llama 用 <s>，起止和截断逻辑完全不同。
- BERT 切「今天天气很好」得到 [101, 872, 1921, 2523, 1962, 102]，换模型后这些 ID 指向别的 token。
- 部署时 model 和 tokenizer 必须来自同一 checkpoint，用同一个路径分别 from_pretrained。
- 微调数据、推理服务和评测脚本要用同一套分词配置。

## 代码落点

- `AutoTokenizer`：与模型同路径加载
- `WordPiece / BPE`：切词算法
- `CLS / <s>`：模型私有特殊标记

## 复用清单

- tokenizer 和 model 绑在同一个目录，别分开缓存。
- 换底座模型时，训练数据要重新分词。

## 面试一句话

词表和特殊 token 都是模型私有的，tokenizer 必须和模型同 checkpoint，否则 ID 全错位。

## 常见坑

为了省事拿现成的 BERT tokenizer 去处理喂给 Qwen 的数据，输出全是乱码。

---

来源：第27章
