---
id: D-07
layer: 数据分析与算法
title: p 和 q 不手拍，用 AIC 网格搜索取最小
source: 第9章
tags: [时间序列, AIC, 调参]
---

# D-07 p 和 q 不手拍，用 AIC 网格搜索取最小

> ps、qs 各取 0 到 2 共 9 组，逐个拟合取 AIC 最小，比凭经验定阶可靠。

## 机制

- AIC 是赤池信息准则，衡量统计模型拟合好坏，数值越小越好。
- ARMA(data,(p,q)).fit() 后读 model.aic，循环里用 best_aic 记录最小值。
- 示例对比：ARIMA(2,0,2) AIC 4593.911，SARIMAX(1,1,4) AIC 4511.524 更优。
- 参数非法时 statsmodels 抛 ValueError，循环里 try/except 跳过继续。
- 预测未来 3 个月先构造 date_list，再 concat 空行后用 predict 取 predicted_mean。

## 代码落点

- `itertools.product`：遍历 p、q 组合
- `model.aic`：比较拟合优度
- `SARIMAX`：带季节项
- `get_prediction().predicted_mean`：预测值

## 复用清单

- 定阶用小网格搜索，别在 0 到 10 全量暴力跑。
- AIC 相近时优先简单模型，泛化更稳。

## 面试一句话

ARIMA 调参一句话：p、q 网格搜索，AIC 最小者为最优。

## 常见坑

阶数凭感觉定，或只看训练误差不看 AIC。

---

来源：第9章
