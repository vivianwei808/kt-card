---
id: D-13
layer: 数据分析与算法
title: YOLO 用一次回归输出框、置信度和类别
source: 第11章
tags: [YOLO, 目标检测, NMS]
---

# D-13 YOLO 用一次回归输出框、置信度和类别

> 7×7 网格、每格 2 个框、20 类，输出 7×7×30 张量；NMS 阈值 0.5 去掉重叠框。

## 机制

- YOLOv1 把图切成 S×S 网格，每格预测 B 个框的 (x,y,w,h,confidence)，只负责中心落在格内的物体。
- S=7、B=2、20 类时输出 7×7×30；30 维等于 20 类概率加 2 置信度加 8 个坐标。
- 7×7 网格每格只出一个物体，最多 49 个；两个框中取置信度大的。
- one-stage 如 YOLO、SSD 速度快精度略低；two-stage 如 Faster R-CNN 精度高但慢。
- 标准 YOLO 达 45 帧/秒，Fast YOLO 达 155 帧/秒，mAP 仍是其他实时算法的两倍。

## 代码落点

- `YOLOv1`：7×7×30 输出
- `NMS`：IOU>0.5 的同类框丢弃
- `IOU`：框重叠度
- `Faster R-CNN`：two-stage 对照

## 复用清单

- 实时检测优先 one-stage，精度优先 two-stage。
- 后处理一定做 NMS，否则一个物体会出多个框。

## 面试一句话

YOLO 把检测当回归，一次前向出所有框，最后用 NMS 收尾。

## 常见坑

拿 two-stage 的精度标准要求 YOLO，或后处理不做 NMS 导致一物多框。

---

来源：第11章
