---
id: C-04
layer: 配置与存储
title: EmptyDir 随 Pod 消失，HostPath 常驻
source: 第16章 K8s 存储管理
tags: [EmptyDir, HostPath, Volume]
---

# C-04 EmptyDir 随 Pod 消失，HostPath 常驻

> EmptyDir 随 Pod 消失，HostPath 把节点目录搬进容器。

## 机制

- EmptyDir 随 Pod 创建，Pod 删除或重建时数据被清空，适合容器间共享临时文件。
- emptyDir: {} 使用节点磁盘，medium 设为 Memory 就换成 tmpfs 内存文件系统。
- 内存型 EmptyDir 占用的大小计入容器内存限制，sizeLimit 再卡上限。
- HostPath 把节点上的文件或目录挂进 Pod，用于容器与节点之间共享数据。
- hostPath.type 决定路径检查方式，DirectoryOrCreate 不存在就建 0755 目录。
- FileOrCreate 会创建 0644 的空文件，Directory 和 File 则要求路径必须存在。

## YAML 与命令

- `emptyDir: {}`：使用节点磁盘的临时目录
- `emptyDir.medium: Memory`：改用 tmpfs 内存文件系统
- `emptyDir.sizeLimit: 10Mi`：限制卷大小，df 显示 10M
- `hostPath.path: /data`：把节点 /data 目录挂进容器
- `hostPath.type: DirectoryOrCreate`：目录不存在时自动创建 0755 目录

## 复用清单

- 缓存和临时交换文件用 EmptyDir，不要放需要持久化的数据。
- 内存型 EmptyDir 必须配 sizeLimit，防止把节点内存吃满。
- 只有节点级采集类组件才用 HostPath，业务数据走 PV 和 PVC。
- 用 HostPath 前显式声明 type，路径不存在时行为由 type 决定。

## 面试一句话

EmptyDir 是跟着 Pod 生命周期的临时卷，Pod 没了数据就没了；HostPath 直接挂节点目录，只适合节点级的共享。

## 常见坑

把需要持久化的数据放 EmptyDir，Pod 重建后数据全丢；磁盘型 EmptyDir 限制大小后 df 看不到限制，超限时 Pod 会变成 Completed。

---

来源：第16章 K8s 存储管理
