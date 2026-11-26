---
id: R-02
layer: 资源治理与安全
title: ResourceQuota 给命名空间算总账
source: 第22章 K8s集群资源合理化分配：ResourceQuota
tags: [ResourceQuota, Namespace, 配额]
---

# R-02 ResourceQuota 给命名空间算总账

> 一个 Namespace 一份配额，按请求、上限与对象数量封顶。

## 机制

- ResourceQuota 是命名空间级对象，spec.hard 里逐项写上限，多个团队各建各的。
- requests.cpu、requests.memory 与 limits.cpu、limits.memory 分开累计，Pod 的申请和上限都受限。
- 对象数量用 pods、services、persistentvolumeclaims、count/replicasets.apps 这类键限制。
- 存储配额用 requests.storage 与 persistentvolumeclaims 控制 PVC 总量与容量。
- 配额生效后，未写 resources 的 Deployment 没有产生 Pod；超额创建会被拒绝。
- 每个 Namespace 再加一份默认配额，例如 count/pods: 1000、count/replicasets.apps: 2k，防止异常创建拖垮集群。

## YAML 与命令

- `apiVersion: v1 / kind: ResourceQuota`：命名空间级配额对象，metadata.namespace 指定生效空间
- `spec.hard.requests.cpu: "2" / limits.cpu: "8"`：租户 CPU 请求与上限总量
- `spec.hard.count/replicasets.apps: 1k`：控制器对象数量上限，1k 即 1000
- `kubectl get po -n customer1`：配额拦截后空间内没有 Pod 产生
- `exceeded quota: customer1-quota, requested: requests.cpu=3, used: requests.cpu=0, limited: requests.cpu=2`：RS 上的超额报错

## 复用清单

- 按租户或环境先建 Namespace，再挂 ResourceQuota，最后才放业务。
- 配额同时写 requests 与 limits，避免只限一端。
- 给每个 Namespace 加 count/pods 与 count/replicasets.apps 的兜底配额。

## 面试一句话

ResourceQuota 管的是命名空间总量，它拦的是创建请求，不负责给单个容器补默认值。

## 常见坑

配额只建在已有 Namespace 上，新开的命名空间没有默认配额，异常创建照样能打满集群。

---

来源：第22章 K8s集群资源合理化分配：ResourceQuota
