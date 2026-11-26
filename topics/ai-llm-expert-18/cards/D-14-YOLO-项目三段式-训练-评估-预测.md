---
id: D-14
layer: 数据分析与算法
title: YOLO 项目三段式：训练、评估、预测
source: 第11章
tags: [YOLO, 训练, 工业检测]
---

# D-14 YOLO 项目三段式：训练、评估、预测

> dataset.yaml 写类别，train 设轮数与早停，val 看 mAP，predict 出框转提交。

## 机制

- model=YOLO('yolov12.yaml') 新建，YOLO('yolov12n.pt') 载预训练，model.info() 看层数参数量。
- 训练参数：epochs=100、batch=16、imgsz=640、patience=50、device='0'。
- 类别含 crazing、inclusion、pitted_surface、scratches、patches、rolled-in_scale 六类。
- 文件列表方式 train.txt 只写图片路径，程序自动到同名 labels 目录找标注。
- 提交格式每行一个框：image_id、bbox 绝对坐标、category_id、confidence。

## 代码落点

- `ultralytics YOLO`：训练与推理
- `dataset.yaml`：数据路径与类别
- `metrics.box.map`：验证 mAP
- `best.pt`：保存的最优权重

## 复用清单

- 先跑通 1 个 epoch，再放大轮数。
- 提交前把坐标从归一化转成像素，逐条抽查。

## 面试一句话

YOLO 落地讲数据标注、dataset.yaml、train/val/predict、结果转提交四步。

## 常见坑

缺陷图看不清就加深网络调参；先换光源换相机，往往提升更大。

---

来源：第11章
