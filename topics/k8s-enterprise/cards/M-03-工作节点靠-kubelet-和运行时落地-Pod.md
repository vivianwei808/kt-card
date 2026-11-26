---
id: M-03
layer: 总览与基座
title: 工作节点靠 kubelet 和运行时落地 Pod
source: 第4-8章 容器运行时与 K8s 架构
tags: [kubelet, containerd, CRI, kube-proxy]
---

# M-03 工作节点靠 kubelet 和运行时落地 Pod

> kubelet 执行、kube-proxy 转发、运行时经 CRI 接入。

## 机制

- Kubelet 管理本节点 Pod，做容器健康检查与监控，并上报节点和 Pod 状态。
- Kube-Proxy 维护节点网络规则，负责 Service 与 Pod 之间的请求路由和流量转发。
- Container Runtime 需符合 CRI，Containerd、CRI-O、Kata 均可接入。
- containerd 从 Docker 剥离后捐给 CNCF，调用链止于 runc。
- 用 Cilium 做 CNI 时可以不装 kube-proxy。
- containerd 的 pause 镜像地址要换成本地可达的仓库，否则节点拉不到沙箱镜像。

## YAML 与命令

- `crictl ps`：按 CRI 规范查看节点上的容器
- `crictl logs`：查看 Pod 内容器的日志
- `ctr -n k8s.io c ls`：在 k8s.io 命名空间下看 containerd 容器
- `sed -i 's#SystemdCgroup = false#SystemdCgroup = true#g' /etc/containerd/config.toml`
- `kubeadm init --cri-socket unix:///var/run/containerd/containerd.sock`

## 复用清单

- 新节点先 systemctl enable --now containerd，确认服务正常再 kubeadm join。
- 容器起不来先 crictl ps -a 看状态，再 crictl logs 看输出。
- 所有节点统一改 containerd 的 pause 镜像和 cgroup 配置，改完 restart containerd。

## 面试一句话

kubelet 是节点上的代理，向 APIServer 汇报状态并通过 CRI 起容器；kube-proxy 只维护 Service 的转发规则；运行时只要实现 CRI 就能被接管。

## 常见坑

在宿主机 docker ps 看不到 Pod 容器就以为容器没起来；Pod 的容器在 containerd 的 k8s.io 命名空间里，要用 crictl 查。

---

来源：第4-8章 容器运行时与 K8s 架构
