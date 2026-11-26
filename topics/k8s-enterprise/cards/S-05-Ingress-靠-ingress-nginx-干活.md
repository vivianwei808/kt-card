---
id: S-05
layer: 服务发布与流量
title: Ingress 靠 ingress-nginx 干活
source: 第14章 K8s 服务发布：Ingress
tags: [Ingress, ingress-nginx, DaemonSet, hostNetwork]
---

# S-05 Ingress 靠 ingress-nginx 干活

> Ingress 是规则，真正干活的是 ingress-nginx。

## 机制

- Ingress 资源只描述七层路由，必须由 Ingress Controller 解析后生成 Nginx 配置。
- 裸机生产环境把 Controller 的 Deployment 改成 DaemonSet，每个节点跑一份。
- hostNetwork 直占节点 80/443，dnsPolicy 要跟着改。
- nodeSelector 配合节点标签 ingress=true，把 Controller 限制在入口专用节点。
- 部署完成后节点上能看到 nginx master 监听 0.0.0.0:80 与 0.0.0.0:443。
- Ingress 用 networking.k8s.io/v1，1.22 以上必须 v1。

## YAML 与命令

- `kind: DaemonSet`：ingress-nginx 从 Deployment 改为每节点一份
- `hostNetwork: true + dnsPolicy: ClusterFirstWithHostNet`：占用宿主 80/443 并保留集群 DNS
- `nodeSelector: ingress: "true"`：Controller 只调度到入口专用节点
- `kubectl label node k8s-node02 ingress=true`：给节点打入口标签
- `ingressClassName: nginx`：指定由哪个 Controller 解析该 Ingress

## 复用清单

- 裸机集群按 bare-metal 文档改 DaemonSet 加 hostNetwork，不要用默认 Deployment 加 NodePort。
- 入口节点单独打 ingress=true 标签，并准备多节点承接 80 和 443。
- 部署后 netstat -lntp | grep nginx 确认 80 和 443 已监听。
- 1.22 以上统一写 networking.k8s.io/v1，旧注解 ingress.class 换成 ingressClassName。

## 面试一句话

Ingress 是七层路由声明，真正转发的是 ingress-nginx，生产上把它改成 DaemonSet 加 hostNetwork 直接吃节点 80 和 443。

## 常见坑

只创建 Ingress 不装 Controller，资源能建出来但没人解析，访问一律 404。

---

来源：第14章 K8s 服务发布：Ingress
