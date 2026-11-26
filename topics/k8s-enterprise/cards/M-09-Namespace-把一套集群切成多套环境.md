---
id: M-09
layer: 总览与基座
title: Namespace 把一套集群切成多套环境
source: 第9章 K8s初体验
tags: [Namespace, 环境隔离, 多租户, kubectl]
---

# M-09 Namespace 把一套集群切成多套环境

> 按环境和团队切 Namespace，一套集群当多套用。

## 机制

- Namespace 把集群资源做逻辑隔离，相当于在物理集群上切出多个独立环境。
- 不指定命名空间时落 default；kube-system 放系统组件，kube-public 任何人可读。
- 按环境切成 project-dev、project-sit、project-uat、project-prod 四套。
- 同一 Namespace 内服务发现和负载均衡更简单，访问权限也可以按 Namespace 分别授权。
- Namespace 同时是资源配额的划分单位，配合配额能限制每个环境的用量。
- 名字最长 63 个字符，只能包含字母、数字和中横线，首尾必须是字母或数字。

## YAML 与命令

- `kubectl create ns development`
- `kubectl get ns development --show-labels`
- `kind: Namespace 配合 metadata.name: development`：用 YAML 创建命名空间
- `kubectl delete ns NAMESPACE_NAME`

## 复用清单

- 建集群第一天就把 dev/sit/uat/prod 和公共组件的命名空间规划好。
- 所有命令显式带 -n，CI 里用变量传命名空间。
- 删除前先用 kubectl get 逐个确认里面没有生产资源，删 Namespace 会连带删掉全部内容。

## 面试一句话

Namespace 是集群内的逻辑隔离单位，通常按环境或团队切；它只是逻辑边界，权限和配额要另外配才完整。

## 常见坑

命令不带 -n，资源全落进 default，测试和生产混在一起；或者把删除 Namespace 当成删空目录，里面的 Deployment 和 Service 一起没了。

---

来源：第9章 K8s初体验
