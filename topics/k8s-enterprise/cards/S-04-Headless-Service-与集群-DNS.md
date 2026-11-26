---
id: S-04
layer: 服务发布与流量
title: Headless Service 与集群 DNS
source: 第13章 K8s 服务发布：Service
tags: [Headless Service, DNS, StatefulSet]
---

# S-04 Headless Service 与集群 DNS

> clusterIP 设 None，DNS 直接返回每个 Pod 的 IP。

## 机制

- 把 spec.clusterIP 设为 None 就是 Headless Service，不分配虚拟 IP。
- 解析 Headless Service 返回 Pod IP 列表，解析普通 Service 返回 ClusterIP。
- 每个 Pod 都有 <pod-name>.<service-name>.<namespace> 形式的独立域名。
- 有状态应用靠这条记录定位实例，StatefulSet 用 serviceName 关联。
- 集群 DNS 是 CoreDNS，kubernetes Service 的地址是 10.96.0.10。
- 普通 Service 用 nslookup 解析出全名和 ClusterIP。

## YAML 与命令

- `spec.clusterIP: None`：声明 Headless Service，不分配 ClusterIP
- `StatefulSet spec.serviceName: "nginx"`：绑定同名 Headless Service
- `nslookup my-service`：返回全名与 ClusterIP 或 Pod IP
- `DNS 格式`：<pod-name>.<service-name>.<namespace>.svc.cluster.local
- `kubectl get svc`：Headless 的 ClusterIP 列显示 None

## 复用清单

- 数据库、消息队列这类要按实例寻址的工作负载，用 StatefulSet 配 Headless Service。
- 客户端连接具体实例时用 pod-0、pod-1 的域名，不要连 Service 名。
- 排查解析先在 Pod 内 nslookup 短名，确认返回的是 ClusterIP 还是 Pod IP。
- 跨命名空间调用写全 name.namespace.svc.cluster.local。

## 面试一句话

Headless Service 把 clusterIP 设成 None，DNS 返回后端 Pod 的 IP 和每个 Pod 的独立域名，给有状态应用做实例级发现。

## 常见坑

把 Headless 当普通 Service 用，客户端以为拿到一个 VIP，实际是一组 Pod IP，需要自己做选路和重试。

---

来源：第13章 K8s 服务发布：Service
