---
id: T-15
layer: 微调与多模态
title: MinerU 靠三个模型分工解析 PDF
source: 第31章
tags: [多模态, PDF解析, MinerU]
---

# T-15 MinerU 靠三个模型分工解析 PDF

> 版面靠 LayoutLMv3，公式靠 YOLOv8 加 UniMERNet，文字靠 PaddleOCR。

## 机制

- 布局检测基于 LayoutLMv3 微调，区分文本、表格、图片区域，并按人类阅读顺序输出。
- 公式先用 YOLOv8 检测区域，再由 UniMERNet 转成 LaTeX；文本识别用 PaddleOCR 增强。
- 支持 84 种语言 OCR，自动识别扫描版 PDF 并启用，最低 8GB 显存，兼容 CPU、GPU、NPU。
- 私有化三步：pip 装 magic-pdf[full]、跑 download_models.py、执行 magic-pdf -p 文件 -o 输出目录。
- API 流程是申请 Token、提交 PDF 拿 task_id、轮询拿 full_zip_url，解压得到 layout.json 与 full.md。

## 代码落点

- `magic-pdf`：命令行工具
- `LayoutLMv3`：版面检测
- `UniMERNet`：公式转 LaTeX
- `PaddleOCR`：文字识别

## 复用清单

- 复杂 PDF 先跑版面分析，再分别处理表格、公式和正文。
- 扫描件和电子版走不同解析分支。

## 面试一句话

复杂 PDF 解析靠 MinerU 三件套：版面、公式、OCR，输出结构化 Markdown。

## 常见坑

把 MinerU 当生成式大模型用，它只是布局检测加 OCR 的识别模型。

---

来源：第31章
