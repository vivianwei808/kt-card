---
id: S-02
layer: 服务发布与流量
title: Service 类型与访问链路
source: 第13章 K8s 服务发布：Service
tags: [Service, ClusterIP, NodePort, ExternalName]
---

# S-02 Service 类型与访问链路

> 按访问来源选类型，内网 ClusterIP，外网 NodePort。

## 机制

- Service 用 selector 选 Pod，把 port 映射到 targetPort，缺省等于 port。
- ClusterIP 是默认类型，只分配集群内虚拟 IP，集群外无法直接访问。
- NodePort 在每个装 kube-proxy 的节点开端口，默认范围 30000-32767，也可以手动指定。
- ExternalName 不配 selector 和端口，只返回 externalName 字段的 CNAME 记录。
- LoadBalancer 调云厂商负载均衡器暴露服务，成本高于 NodePort。
- Service 域名是 name.namespace.svc.cluster.local，Pod 内可用短名。

## YAML 与命令

- `kubectl expose deploy nginx --port 80`：由控制器直接生成 ClusterIP Service
- `spec.type: NodePort`：所有节点暴露端口，通过 NodeIP:NodePort 访问
- `spec.sessionAffinity: ClientIP + timeoutSeconds: 10800`：基于客户端 IP 的会话保持
- `spec.ports[].targetPort`：可写端口号，也可引用 Pod 端口名，改端口不影响访问
- `无 selector 的 Service 加同名 Endpoints`：把集群外服务代理成集群内地址

## 复用清单

- 集群内调用统一用 Service 短名，跨命名空间写 name.namespace。
- 对外暴露先按场景选型：临时测试用 NodePort，云上再换 LoadBalancer。
- 多端口应用在一个 Service 里给每个 port 起 name，如 RabbitMQ 的 5672 和 15672。
- 代理外部中间件时建无 selector 的 Service 并手写 Endpoints，IP 不能是 127.0.0.0/8 等地址。

## 面试一句话

ClusterIP 解决集群内访问，NodePort 让裸机集群对外暴露，ExternalName 只做域名别名，LoadBalancer 交给云厂商。

## 常见坑

改了 Pod 端口只改 port 不改 targetPort，访问会超时；targetPort 写成 Pod 端口名可以避开这个坑。

---

来源：第13章 K8s 服务发布：Service
