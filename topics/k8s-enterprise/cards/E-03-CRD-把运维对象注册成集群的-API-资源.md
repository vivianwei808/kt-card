---
id: E-03
layer: 工程化与扩展
title: CRD 把运维对象注册成集群的 API 资源
source: 第27章 K8s扩展能力：Operator
tags: [CRD, 自定义资源, Operator]
---

# E-03 CRD 把运维对象注册成集群的 API 资源

> CRD 注册新 kind，之后就能用 kubectl 操作。

## 机制

- Operator 安装时一并创建 CRD，kubectl get crd | grep redis 能看到 redis、redisclusters 等四种。
- CR 的 apiVersion 为 redis.redis.opstreelabs.in/v1beta1，kind 为 RedisCluster。
- kubectl create -f 创建 CR 后，APIServer 接收对象，后续由对应 Operator 负责落地。
- kubectl get rediscluster 返回 CLUSTERSIZE、READYLEADERREPLICAS 等自定义列。
- CRD 名是复数加 group，例如 ndbclusters.mysql.oracle.com。
- 删除 CR 就删除整套集群，kubectl delete -f redis-cluster.yaml 即可回收下游资源。

## YAML 与命令

- `kubectl get crd | grep redis`
- `apiVersion: redis.redis.opstreelabs.in/v1beta1 / kind: RedisCluster`
- `kubectl create -f redis-cluster.yaml -n public-service`
- `kubectl get rediscluster -n public-service`
- `kubectl delete -f redis-cluster.yaml -n public-service`

## 复用清单

- 装完 Operator 先列 CRD，确认它扩展了哪些 kind。
- 业务 CR 放进业务命名空间，与 Operator 自身的命名空间分开。
- 用 kubectl get 自定义资源的列判断控制器汇报的就绪状态。

## 面试一句话

CRD 扩展的是 API，不是运行时，真正把 CR 变成 Pod 与 Service 的是监听它的 Operator。

## 常见坑

把 CRD 当普通配置随手删掉，所有 CR 和依赖它们声明的实例都会失去定义；CR 建了但 Pod 不出时，先查 Operator 是否在运行。

---

来源：第27章 K8s扩展能力：Operator
