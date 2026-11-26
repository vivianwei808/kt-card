---
id: C-06
layer: 配置与存储
title: NFS 与 CSI 存储接入
source: 第16章 K8s 存储管理
tags: [NFS, CSI, StorageClass]
---

# C-06 NFS 与 CSI 存储接入

> NFS 可以直接写进 volumes，也可以装 CSI 做按 PVC 自动供给。

## 机制

- NFS 卷在 Pod 里只需要 server 和 path 两个字段，节点必须装客户端工具才能挂载。
- 节点缺 nfs-utils 时 Pod 卡在 ContainerCreating。
- CSI 驱动分 controller 的 Deployment 和 node 的 DaemonSet。
- StorageClass 指定 provisioner、server 和 share，PVC 自动建 PV 和目录。
- 动态生成的 PV 名字是 pvc-<uuid>，NFS 上的目录同名，方便直接定位数据。
- 回收策略 Delete 下删 PVC 会同时删 PV 和 NFS 目录，数据一起消失。

## YAML 与命令

- `volumes[].nfs: server + path`：直接用 NFS 卷，不经过 PV
- `mount -t nfs 192.168.181.140:/data/nfs /mnt/`：节点侧挂载验证
- `./deploy/install-driver.sh v4.9.0 local`：安装 NFS CSI 驱动
- `provisioner: nfs.csi.k8s.io`：StorageClass 关联的 CSI 驱动
- `parameters: server + share`：指定 NFS 地址和共享目录

## 复用清单

- 节点统一预装 nfs-utils，Ubuntu 用 nfs-common，避免 Pod 卡在挂载。
- 静态共享直接写 nfs 卷或静态 PV，需要自动分配目录时上 CSI 加 StorageClass。
- StorageClass 里写死 mountOptions nfsvers=4.1，避免版本协商差异。
- 删 PVC 前确认 reclaimPolicy，Delete 会连数据一起清掉。

## 面试一句话

接 NFS 有两条路，直接在 volumes 里写 nfs 的 server 和 path，或者装 CSI 驱动加 StorageClass，按 PVC 自动建目录。

## 常见坑

节点没装 NFS 客户端，Pod 一直 ContainerCreating，报 mount failed: exit status 32。

---

来源：第16章 K8s 存储管理
