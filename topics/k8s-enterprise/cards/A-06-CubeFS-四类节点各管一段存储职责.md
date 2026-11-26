---
id: A-06
layer: 弹性、网格与存储平台
title: CubeFS 四类节点各管一段存储职责
source: 第34章 K8s存储能力：EB级分布式存储平台
tags: [CubeFS, 分布式存储, DataNode, MetaNode]
---

# A-06 CubeFS 四类节点各管一段存储职责

> 四类节点分工：元信息、元数据、文件、对象接口。

## 机制

- Master 维护集群元信息，用 StatefulSet 部署，至少 3 个且建议奇数。
- DataNode 挂数据盘存文件，MetaNode 存文件元数据，两者都是 DaemonSet。
- ObjectNode 无状态，把文件系统转成 S3 协议，用 Deployment 部署。
- 节点靠 component.cubefs.io 的四类标签决定安装哪个组件。
- 数据盘格式化为 xfs，挂到 /data0、/data1，并写入 fstab。
- Helm 的 disks 写成 /data0:2147483648，冒号后是为该盘保留的字节数。

## YAML 与命令

- `kubectl label node <nodename> component.cubefs.io/master=enabled`：标记 Master 节点
- `mkfs.xfs -f /dev/sdb`：格式化数据盘
- `mount /dev/sdb /data0`：挂载数据盘
- `datanode.disks: - /data0:2147483648`：声明数据盘与保留空间
- `master.replicas: 3`：Master 副本数为奇数

## 复用清单

- 先规划节点标签，再装 Helm chart，Pod 才会落到正确节点。
- 数据盘统一按 data0 到 dataN 命名并写 fstab，扩容时顺序不乱。
- 生产把 Master 与 DataNode 的 requests 提到 8Gi/2 核，limits 32Gi/8 核。
- MetaNode 的 total_mem 设为主机内存的 80%。

## 面试一句话

CubeFS 用 Master 管元信息、MetaNode 存元数据、DataNode 存数据、ObjectNode 提供 S3，前三类靠节点标签与对应控制器落地。

## 常见坑

只给节点打 datanode 标签却没格式化挂载数据盘，Pod 起来但集群没有可用容量。

---

来源：第34章 K8s存储能力：EB级分布式存储平台
