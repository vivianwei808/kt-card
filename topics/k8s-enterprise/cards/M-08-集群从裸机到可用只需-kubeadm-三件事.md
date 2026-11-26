---
id: M-08
layer: 总览与基座
title: 集群从裸机到可用只需 kubeadm 三件事
source: 第3章 云原生基石：K8s初体验
tags: [kubeadm, kubectl, containerd, 集群搭建]
---

# M-08 集群从裸机到可用只需 kubeadm 三件事

> 三件事：关 swap、装 containerd、kubeadm 初始化。

## 机制

- 环境：1 台控制节点加 3-4 台工作节点，每台 2C4G 以上，系统 Rocky、CentOS 或 Ubuntu。
- 所有节点先关防火墙、selinux、dnsmasq、swap，并把 /etc/fstab 里的 swap 行注释掉。
- 装 containerd 后改 SystemdCgroup = true，把 pause 镜像地址换成可达的仓库。
- kubeadm init 指定 APIServer 地址、镜像仓库和 cri-socket，join 用 token。
- Addons 用仓库里的 single 目录，kubectl apply -f . 一次装完。
- kubectl 按 [command] [TYPE] [NAME] [flags] 组织，查用 get、增用 apply。

## YAML 与命令

- `swapoff -a && sysctl -w vm.swappiness=0`：关 swap，再注释 /etc/fstab 对应行
- `kubeadm config images pull --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers --kubernetes-version 1.32.0`
- `kubeadm init --apiserver-advertise-address 192.168.181.134 --cri-socket unix:///var/run/containerd/containerd.sock`
- `kubeadm join 192.168.181.134:6443 --token ... --discovery-token-ca-cert-hash sha256:...`
- `kubectl get po -owide --show-labels`：看节点、IP 与标签

## 复用清单

- 所有节点都要改 containerd 的 pause 镜像和 cgroup 配置，不只改控制节点。
- init 完先 kubectl get node 看是否 Ready，再装 Addons。
- 排查统一用 get 看状态、describe 看事件、logs 看输出。

## 面试一句话

用 kubeadm init 拉起控制面、kubeadm join 加节点，运行时用 containerd；装完所有操作都收敛到 kubectl，get 看状态、describe 看事件、logs 看输出。

## 常见坑

只验证控制节点能跑，工作节点的 containerd 还指向 gcr 的 pause 镜像，join 上来后 Pod 一直卡在 ContainerCreating。

---

来源：第3章 云原生基石：K8s初体验
