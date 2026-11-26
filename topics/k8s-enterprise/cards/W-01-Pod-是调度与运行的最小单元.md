---
id: W-01
layer: 工作负载与调度
title: Pod 是调度与运行的最小单元
source: 第10章 Pod 入门与实战
tags: [Pod, 容器, 调度]
---

# W-01 Pod 是调度与运行的最小单元

> Pod 是最小单元，一个 Pod 可放多个容器，副本与调度都按它算。

## 机制

- Pod 必选 apiVersion、kind、metadata.name 与 spec.containers。
- kubectl create -f 提交后 Pod 先为 ContainerCreating，就绪后转 Running。
- 命令行也能起 Pod：kubectl run nginx-run --image=nginx:1.15.12。
- containerPort 是可选的端口声明项，一个容器可以声明多个端口。
- resources 分 requests 与 limits，cpu 以 m 计，1 核等于 1000m。
- imagePullPolicy 默认随 tag：latest 用 Always，其余用 IfNotPresent。

## YAML 与命令

- `kubectl create -f nginx.yaml`：按 YAML 创建 Pod，输出 pod/nginx created
- `kubectl run nginx-run --image=nginx:1.15.12`：命令行创建 Pod
- `kubectl get po nginx`：看 READY 与 STATUS，创建中为 0/1 与 ContainerCreating
- `spec.containers[].resources.requests.memory: "100Mi"`：内存请求，单位支持 Mi、Gi、Ti
- `spec.containers[].image: registry.cn-beijing.aliyuncs.com/dotbalo/nginx:stable`：容器镜像地址

## 复用清单

- 先用 kubectl run 起一个最小 Pod 验证镜像能拉取，再写正式 YAML。
- 检查 metadata.name 与容器 name 是否符合 RFC 1035，这是创建时的硬性要求。
- resources 的 requests 与 limits 成对写，cpu 用 m、内存用 Mi 或 Gi。
- 用 kubectl get po 盯着 ContainerCreating 到 Running，卡住先查镜像仓库可达性。

## 面试一句话

Pod 是 K8s 里调度和运行的最小单位，一个 Pod 可以放多个容器，创建后从 ContainerCreating 走到 Running，重启策略默认 Always。

## 常见坑

镜像用 latest tag 却没注意 imagePullPolicy 默认变成 Always，每次启动都要去拉镜像，节点没网就直接起不来。

---

来源：第10章 Pod 入门与实战
