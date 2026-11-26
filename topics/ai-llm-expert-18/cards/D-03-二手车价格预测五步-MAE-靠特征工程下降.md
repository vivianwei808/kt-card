---
id: D-03
layer: 数据分析与算法
title: 二手车价格预测五步，MAE 靠特征工程下降
source: 第8章
tags: [建模流程, XGBoost, MAE]
---

# D-03 二手车价格预测五步，MAE 靠特征工程下降

> 同一份数据，无特征工程加 LR 的 MAE 约 1000，特征工程加 XGBoost 约 550。

## 机制

- 流程固定五步：数据加载、EDA 看缺失与标签分布、特征选择、模型训练、预测写 submission。
- 原始 csv 空格分隔；15 万条按 13 万训练、2 万验证切分，验证集 MAE 用来判断过拟合。
- 评价指标 MAE 是 L1 loss，越小越好；训练时可直接把 eval_metric 改成 mae。
- XGBoost 常用 learning_rate=0.1、max_depth=15、subsample=0.8、n_estimators=2000。
- 本地 MAE 546、提交 548 属正常；本地一百多而提交几千，先查 ID 类泄漏特征。

## 代码落点

- `XGBoost`：n_estimators=2000
- `tree_method='gpu_hist'`：GPU 训练
- `eval_metric='mae'`：对齐赛题指标
- `CatBoost`：类别特征原生处理

## 复用清单

- 先把验证集切法写死，再谈模型和调参。
- MAE 卡住时先补特征，调参只能逼近特征给出的上限。

## 面试一句话

建模按加载、EDA、特征、训练、预测五步答，并说明验证集切分和指标口径。

## 常见坑

反复调参追 MAE，不动特征；特征决定上限，调参只把上限跑出来。

---

来源：第8章
