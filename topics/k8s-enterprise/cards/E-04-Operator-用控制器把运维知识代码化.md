---
id: E-04
layer: 工程化与扩展
title: Operator 用控制器把运维知识代码化
source: 第27章 K8s扩展能力：Operator
tags: [Operator, RedisCluster, 控制器]
---

# E-04 Operator 用控制器把运维知识代码化

> Operator 监听 CR，按 spec 创建并持续维持整套实例。

## 机制

- redis-operator 用 Helm 装在 ot-operators 命名空间，一个 Pod 常驻监听 RedisCluster。
- CR 里 clusterSize: 3 决定规模，Operator 创建 3 个 leader 与 3 个 follower Pod。
- clusterVersion、persistenceEnabled 与 storage.volumeClaimTemplate 决定实例形态。
- 密码放 Secret，CR 用 redisSecret.name 与 key 引用，Operator 负责注入。
- NDB Operator 由 Deployment、Webhook Server、SA 与 ClusterRole 组成。
- service.serviceType: NodePort 时 Operator 为每个 Pod 建 NodePort Service，生产环境不推荐外露。

## YAML 与命令

- `helm install redis-operator ot-helm/redis-operator --namespace ot-operators --create-namespace`
- `kubectl get po -n ot-operators`：确认 Operator 常驻
- `spec.clusterSize: 3 / clusterVersion: v7 / persistenceEnabled: true`
- `spec.redisSecret.name: redis-secret / key: password`
- `kubectl get po -n public-service`：leader 与 follower 各 3 个

## 复用清单

- Operator 单独放一个命名空间，业务 CR 放业务命名空间。
- 把密码、存储类等易变项放 Secret 与 CR 字段，不写进镜像。
- 卸载时先删 CR 再删 Operator，确认实例回收干净。

## 面试一句话

Operator 等于 CRD 加控制器，CRD 定义声明式接口，控制器负责把期望状态持续调谐成实际状态。

## 常见坑

直接改 CR 里的密码字段不一定会重建 Pod，课件是 delete 再 create；把 Redis 用 NodePort 暴露到集群外，生产环境也不推荐。

---

来源：第27章 K8s扩展能力：Operator
