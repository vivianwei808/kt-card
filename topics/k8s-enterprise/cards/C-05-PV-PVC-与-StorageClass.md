---
id: C-05
layer: 配置与存储
title: PV、PVC 与 StorageClass
source: 第16章 K8s 存储管理
tags: [PV, PVC, StorageClass, 回收策略]
---

# C-05 PV、PVC 与 StorageClass

> PV 是资源，PVC 是申请，三项条件对齐才能绑定。

## 机制

- PV 是集群级存储资源，PVC 是命名空间内的申请，两者按条件匹配后绑定。
- PVC 申请 3Gi 可以绑定 5Gi 的 PV，只要 StorageClass 和访问模式一致且 PV 未被占用。
- 回收策略 Retain 保留数据，Delete 删 PVC 时连带删 PV，动态存储默认 Delete。
- Recycle 会对卷执行清理，只支持 NFS 与 HostPath，后续会被弃用。
- PV 状态依次是 Available、Bound，删 PVC 后变 Released，回收失败是 Failed。
- 访问模式里 HostPath 只有 RWO，NFS 支持 RWO、ROX 和 RWX。

## YAML 与命令

- `spec.capacity.storage: 10Gi`：PV 容量
- `spec.accessModes: ReadWriteMany`：多节点读写，缩写 RWX
- `spec.persistentVolumeReclaimPolicy: Retain`：删 PVC 后保留 PV
- `spec.resources.requests.storage: 3Gi`：PVC 申请容量
- `volumes[].persistentVolumeClaim.claimName: task-pvc-claim`：Pod 挂载 PVC

## 复用清单

- PVC 卡 Pending 时按容量、StorageClass、accessModes、PV 是否已被占用逐项核对。
- 生产数据卷用 Retain，确认业务可接受再改 Delete。
- kubectl get pv 看 STATUS，Released 说明 PVC 已删但卷没有回收。
- 选访问模式前查后端支持矩阵，不要给 HostPath 申请 RWX。

## 面试一句话

PV 是存储资源，PVC 是申请单，K8s 按容量、StorageClass 和访问模式把两者绑在一起，删除行为由回收策略决定。

## 常见坑

申请容量大于 PV 容量、StorageClass 名字不一致、访问模式不一致，任何一个都会让 PVC 一直 Pending。

---

来源：第16章 K8s 存储管理
