---
id: T-19
layer: 微调与多模态
title: Bad Case 要重标注才能回训练集
source: 第32章
tags: [AI质检, BadCase, 数据闭环]
---

# T-19 Bad Case 要重标注才能回训练集

> 审核标成误检或漏检的图先导出，用 LabelImg 补齐框，再并入数据集重训。

## 机制

- 工作台五个 Tab：缺陷检测、检测记录、统计分析、数据导出、竞赛提交，记录存 SQLite。
- 审核状态四值 pending、correct、wrong、missed，Bad Case 取 wrong 与 missed。
- 导出目录含 images、bad_cases.csv（图片名、模型、审核状态、备注、原始检测结果）、export_info.json。
- 漏检样例要用 LabelImg 补一条归一化中心与宽高，再并入训练集。
- 迭代频率：新产线 1 到 2 周且 Bad Case 超 50 张，稳定期 1 到 3 个月或超 200 张。

## 代码落点

- `Gradio`：标注审核工作台
- `SQLite`：检测记录
- `labelImg`：重标注
- `bad_cases.csv`：坏例导出

## 复用清单

- Bad Case 入库前必须补标注，不能只丢图片。
- 按产线阶段设重训触发阈值。

## 面试一句话

闭环是检测、审核、导出、重标注、合并、重训，触发阈值按产线阶段定。

## 常见坑

把 Bad Case 图直接丢进训练集，不补标注，模型永远学不会漏掉的框。

---

来源：第32章
