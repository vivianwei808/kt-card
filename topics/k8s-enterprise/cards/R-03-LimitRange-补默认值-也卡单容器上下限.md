---
id: R-03
layer: 资源治理与安全
title: LimitRange 补默认值，也卡单容器上下限
source: 第23章 K8s集群资源合理化分配：LimitRange
tags: [LimitRange, 默认资源, Namespace]
---

# R-03 LimitRange 补默认值，也卡单容器上下限

> LimitRange 给容器补默认值，也限制单容器上下限。

## 机制

- type: Container 的 default 写 limits，defaultRequest 写 requests，只对没配置的容器生效。
- 一个 Namespace 内新建的 Pod 都会被套用，多容器逐个补，已配置的参数不覆盖。
- max 与 min 约束单个容器能申报的范围，超出时 Pod 创建被拒绝。
- 把 type 换成 PersistentVolumeClaim，max 与 min 就改为限制 PVC 的 storage 大小。
- LimitRange 是命名空间级对象，必须带 -n 建到目标空间才生效。
- 默认值示例：limits cpu 1、memory 512Mi；requests cpu 0.5、memory 256Mi，落盘显示为 500m。

## YAML 与命令

- `kind: LimitRange / spec.limits[].type: Container`：容器级默认值与上下限
- `default: cpu: 1 / memory: 512Mi；defaultRequest: cpu: 0.5 / memory: 256Mi`：未配置容器的默认值
- `max: cpu: "800m" / memory: 1Gi；min: cpu: "10m" / memory: 128Mi`：单容器可申报范围
- `type: PersistentVolumeClaim / max.storage: 3Gi / min.storage: 1Gi`：PVC 容量边界
- `kubectl create -f min-max.yaml -n customer1`：LimitRange 必须建在目标命名空间

## 复用清单

- 先建 LimitRange 再建业务，保证新 Pod 都能拿到默认值。
- 默认值只做兜底，关键服务仍在清单里显式写 requests 与 limits。
- PVC 的 max/min 与 ResourceQuota 的 requests.storage 一起配置。

## 面试一句话

LimitRange 是准入层的默认值和单对象边界，ResourceQuota 是命名空间总量，两者职责不重叠。

## 常见坑

以为 LimitRange 会修改已有 Pod：它只在创建或更新时补值，运行中的容器不会变化。

---

来源：第23章 K8s集群资源合理化分配：LimitRange
