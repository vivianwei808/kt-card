---
id: W-06
layer: 工作负载与调度
title: StatefulSet 给每个副本固定序号与域名
source: 第11-12章 调度资源
tags: [StatefulSet, Headless Service, ControllerRevision]
---

# W-06 StatefulSet 给每个副本固定序号与域名

> Pod 名固定为 web-0..N-1，域名来自 Headless。

## 机制

- StatefulSet 必须配 Headless Service，clusterIP 为 None。
- Pod 按序号命名 web-0、web-1，扩到 5 个时依次补出 web-2 到 web-4。
- 缩容从最大序号删起，5 改 3 时 web-4、web-3 依次进入 Terminating。
- DNS 域名由 StatefulSet 名、序号、serviceName 与命名空间拼成。
- podManagementPolicy 默认 OrderedReady，创建正序、删除同时。
- updateStrategy 默认 RollingUpdate 且倒序更新，partition 控制从哪个序号开始更新。

## YAML 与命令

- `spec.serviceName: nginx`：绑定 Headless Service，必填
- `web-0.nginx.default.svc.cluster.local`：Headless 域名格式，同命名空间可省后缀
- `spec.updateStrategy.rollingUpdate.partition: 3`：只更新序号大于等于 3 的 Pod
- `kubectl rollout undo sts web --to-revision=2`：回滚，历史保存在 ControllerRevision
- `kubectl delete statefulset web --cascade=false`：非级联删除，Pod 成为孤儿

## 复用清单

- 先建 clusterIP: None 的 Headless Service，再写 StatefulSet 填 serviceName。
- 用 kubectl get pods -w -l app=nginx 看扩容正序、缩容倒序。
- 灰度用 partition 从最大序号往下推，确认 web-2 没问题再放 web-1。
- 删 StatefulSet 前确认是否要 --cascade=false，避免连 Pod 一起删。

## 面试一句话

StatefulSet 给每个 Pod 固定序号和稳定域名，靠 Headless Service 做服务发现，默认倒序滚动更新，还能用 partition 做分段灰度。

## 常见坑

Headless Service 忘了建或 serviceName 写错，Pod 虽然 Running 但没有稳定域名，副本之间互相找不到。

---

来源：第11-12章 调度资源
