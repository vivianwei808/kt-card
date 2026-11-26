---
id: A-07
layer: 弹性、网格与存储平台
title: CubeFS 选型看共享、扩容与对象存储
source: 第34章 K8s存储能力：EB级分布式存储平台
tags: [CubeFS, 存储选型, CSI, 对象存储]
---

# A-07 CubeFS 选型看共享、扩容与对象存储

> 要 RWX 共享、在线扩容和 S3 接口时，一套 CubeFS 就够。

## 机制

- CSI 给工作节点打 csi=enabled 标签，装完生成 StorageClass cfs-sc。
- PVC 声明 ReadWriteMany 后 PV 为 RWX，多个 Pod 挂载同一目录。
- allowVolumeExpansion 为 true，改 PVC 的 storage 即可在线扩容。
- 扩容可每台主机加盘改 disks，也可新增节点打 datanode 标签。
- ObjectNode 提供 S3 协议，按项目建用户、按微服务建桶。
- 卷删除默认延迟 48 小时，下线 DataNode 会自动迁移数据。

## YAML 与命令

- `kubectl label node component.cubefs.io/csi=enabled`：标记可挂载节点
- `storageClassName: cfs-sc，accessModes: ReadWriteMany`：共享卷声明
- `resources.requests.storage: 2Gi`：改 PVC 容量触发在线扩容
- `cfs-cli datanode decommission k8s-node02:17310`：下线数据节点
- `mc mb projecta/appa`：为微服务创建桶

## 复用清单

- 选型先问三个问题：要不要 RWX、要不要在线扩容、要不要 S3。
- 给 CubeFS 单独规划数据盘与节点标签，不和业务 Pod 抢盘。
- 上线前验证删 Pod 后数据仍在，再迁数据库类有状态服务。
- 对象存储按项目发 Access Key，不共用 root。

## 面试一句话

选 CubeFS 主要看三点：能不能给多 Pod 提供 RWX、能不能在线扩容、要不要同时提供 S3 对象存储，这三点它一套都能给。

## 常见坑

把 CubeFS 当普通 NFS 用，所有业务共用一个卷一个用户，出问题无法定位也无法限额。

---

来源：第34章 K8s存储能力：EB级分布式存储平台
