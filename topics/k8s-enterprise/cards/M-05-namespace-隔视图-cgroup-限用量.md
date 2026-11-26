---
id: M-05
layer: 总览与基座
title: namespace 隔视图，cgroup 限用量
source: 第4-7章 必备容器基础
tags: [namespace, cgroup, 隔离, seccomp]
---

# M-05 namespace 隔视图，cgroup 限用量

> 容器用 namespace 隔视图，用 cgroup 限用量，共享宿主机内核。

## 机制

- 容器是轻量级虚拟化，不装完整操作系统，复用宿主机内核，所以创建和启动快。
- Pod 内多个容器共享存储、网络、PID、IPC，pause 容器负责提供这些共享视图。
- 资源上限由 cgroup 管，docker info 里的 Cgroup Version 为 2。
- cgroup driver 要与运行时一致，containerd 的 SystemdCgroup 要改成 true。
- 安全边界再叠 seccomp，Docker 默认启用内置 profile，docker-init 负责 PID 1。
- 隔离粒度比虚拟机细，但共享内核，隔离强度低于虚拟机。

## YAML 与命令

- `docker info`：看 Storage Driver、Cgroup Driver、Cgroup Version、Security Options
- `sed -i 's#SystemdCgroup = false#SystemdCgroup = true#g' /etc/containerd/config.toml`
- `ctr ns ls`：列出 containerd 命名空间，和 K8s 的 Namespace 是两个概念
- `pod.spec.containers[].resources.limits`：内存上限，超限会被 OOMKilled

## 复用清单

- 节点交付前核对 cgroup driver，containerd 的 SystemdCgroup 与 kubelet 保持一致。
- 内存 Limit 按实测峰值留余量，不要把 requests 当 Limit 用。
- 遇到 OOMKilled 先看 Limit 再排程序内存，别急着扩节点。

## 面试一句话

容器用 namespace 隔离网络、PID、IPC 这些视图，用 cgroup 限制 CPU 和内存；两者都由宿主机内核提供，所以起得快，隔离强度不如虚拟机。

## 常见坑

只把 kubelet 的 cgroup driver 设成 systemd，containerd 还留着 SystemdCgroup = false，两边不一致，资源视图对不上。

---

来源：第4-7章 必备容器基础
