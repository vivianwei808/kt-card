---
id: D-11
layer: 数据分析与算法
title: PyTorch 靠 autograd 和动态图
source: 第11章
tags: [PyTorch, autograd, 训练]
---

# D-11 PyTorch 靠 autograd 和动态图

> 写前向公式，调 backward() 自动算所有梯度；动态图让调试像普通 Python。

## 机制

- 张量用法和 NumPy 几乎一样，区别是可以搬到 GPU，速度快几十倍。
- x=torch.tensor(2.0,requires_grad=True)，y=x**2，y.backward() 后梯度为 4。
- 动态图每次前向实时建图，可逐行执行、中间插 print，支持 if/else 分支。
- 单机多卡用 DataParallel，主卡负载不均衡；多机多卡用 DDP，每卡独立算梯度再同步。
- TF 像自动挡、PyTorch 像手动挡；工业部署偏 TF，学术与大模型偏 PyTorch。

## 代码落点

- `requires_grad=True`：跟踪梯度
- `y.backward()`：自动求导
- `optimizer.zero_grad()`：清空梯度
- `DDP`：多机多卡

## 复用清单

- 多卡训练直接上 DDP，别用 DataParallel。
- 每轮更新前 zero_grad，否则梯度会累加。

## 面试一句话

PyTorch 三件套：张量、autograd、动态图，多卡训练用 DDP。

## 常见坑

用 DataParallel 跑多机多卡，或忘记 zero_grad 导致梯度累加。

---

来源：第11章
