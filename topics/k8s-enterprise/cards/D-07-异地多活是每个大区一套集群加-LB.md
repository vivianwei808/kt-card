---
id: D-07
layer: 交付、多集群与容灾
title: 异地多活是每个大区一套集群加 LB
source: 第40章 企业落地异地多活、异地容灾架构
tags: [异地多活, 多集群, Ingress, 容灾]
---

# D-07 异地多活是每个大区一套集群加 LB

> 每个大区独立建集群和入口，云 LB 对外，GTM 按地域解析。

## 机制

- 课件把异地多活分成单集群和多集群两种，落地演示的是每个大区一套独立集群。
- 大区按华南、华北、华东、华西划分，每个中心各自部署 K8s、Ingress 和测试服务。
- 对外不直接暴露服务器 IP，每个中心买云 LB，腾讯用 CLB，阿里用 SLB。
- 单节点测试集群 init 后去掉 control-plane 污点，再打 ingress=true 标签装入口。
- GTM 把不同地域的解析指向对应中心的 LB 地址，中心故障时切到另一个地址池。
- 故障切换不即时，DNS 有缓存有效期，用户要等 TTL 过期才会解析到新地址。

## YAML 与命令

- `kubeadm init --apiserver-advertise-address 10.206.0.6 --kubernetes-version 1.34.1`：各中心建集群
- `kubectl taint node k8s-nj-master01 node-role.kubernetes.io/control-plane-`：去掉单节点污点
- `kubectl label node k8s-nj-master01 ingress=true`：标记入口节点
- `kubectl create -f ingress-nginx-daemonset.yaml`：每个中心部署一套入口

## 复用清单

- 选区域时按用户分布选两到三个大区，每个大区至少一套独立集群和独立 LB。
- 各中心 Ingress 域名保持一致，切换只改 DNS，不改应用配置。
- 演练时直接关停一个中心的服务器，看 GTM 地址池状态和用户实际访问结果。
- 给每个中心单独规划网段，避免多集群互通时地址冲突。

## 面试一句话

异地多活在我的理解里是每个大区都有能独立承载流量的集群和入口，用户按地域解析到最近的中心，某个中心挂了由 GTM 把解析切到另一个地址池。

## 常见坑

把域名直接解析到某一台服务器 IP，机房故障时解析还指着它；以为切 DNS 立刻生效，忽略了 TTL 缓存。

---

来源：第40章 企业落地异地多活、异地容灾架构
