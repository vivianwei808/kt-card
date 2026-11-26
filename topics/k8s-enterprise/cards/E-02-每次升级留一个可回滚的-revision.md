---
id: E-02
layer: 工程化与扩展
title: 每次升级留一个可回滚的 revision
source: 第26章 K8s工程化管理Helm
tags: [Helm, Release, 回滚]
---

# E-02 每次升级留一个可回滚的 revision

> Release 每次升级留一个 revision，history 可查可回滚。

## 机制

- helm install 创建 Release，首次 REVISION 为 1，状态 deployed。
- 每次 helm upgrade 生成新 revision，旧版本状态变为 superseded，helm history 完整保留。
- helm rollback 按 revision 号回退，回滚前先用 helm history 确认目标版本的说明与状态。
- upgrade 时要带上之前的 --set 值，否则新 revision 只保留本次传入的参数。
- helm get values 只显示用户传入的值；离线安装直接改 values.yaml 时返回 Null。
- helm status 看当前状态，helm get all 看值、配置与状态，helm delete 卸载 Release。

## YAML 与命令

- `helm install nginx bitnami/nginx -n helm-test`
- `helm upgrade --install nginx bitnami/nginx -n helm-test --set image.registry=docker.kubeasy.com --set replicaCount=2`
- `helm history nginx -n helm-test`
- `helm rollback nginx 4 -n helm-test`
- `helm get values nginx -n helm-test / helm get all nginx -n helm-test`

## 复用清单

- 每次升级前先 helm history 确认当前 revision，回滚目标写明确数字。
- 扩容与改镜像都走 helm upgrade，并带齐原有参数或 values 文件。
- 离线安装把参数固化在 values.yaml，不依赖 get values 追溯。

## 面试一句话

Helm 的发布单元是 Release，每个 revision 是一份快照，rollback 就是回到某个 revision。

## 常见坑

upgrade 时漏掉原来的 --set，镜像地址或副本数会被悄悄改回去；改了 values.yaml 再用 get values 查，看到的是 Null 而不是实际值。

---

来源：第26章 K8s工程化管理Helm
