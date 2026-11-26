---
id: W-04
layer: 工作负载与调度
title: 一个 Pod 可放多容器，初始化容器先跑
source: 第10章 Pod 入门与实战；第32章 K8s可观测性：全链路追踪
tags: [Pod, InitContainer, emptyDir]
---

# W-04 一个 Pod 可放多容器，初始化容器先跑

> 主容器跑业务，初始化容器在主容器之前把依赖文件准备好。

## 机制

- spec.containers 是容器列表，一个 Pod 可声明多个容器，各自指定镜像与端口。
- 同一 Pod 内多个容器不能重名，name 同样要符合 RFC 1035。
- 示例 Pod 用 nginx:stable 监听 80，同时用 redis:7.2.5 监听 6379。
- initContainers 在主容器之前执行，用来准备主容器启动所需的文件。
- Skywalking 示例用 emptyDir，init 容器把 agent 复制到 /agent，业务容器挂载后加载。
- init 容器同样能设 securityContext 与 command，ES 示例提权跑 sysctl。

## YAML 与命令

- `spec.containers[]`：容器列表，每项含 name、image、ports，同 Pod 内 name 不能重复
- `spec.initContainers[].command: ['sh','-c','cp -R /skywalking/agent /agent/']`：启动前复制 agent
- `spec.volumes[].emptyDir: {}`：Pod 内容器共享的临时目录
- `volumeMounts[].mountPath: /agent`：初始化容器写入，主容器从同一卷读取
- `securityContext.privileged: true`：init 容器提权执行 sysctl 调整内核参数

## 复用清单

- 把渲染配置、下载依赖、改权限这类一次性动作放进 initContainers，主容器只起业务进程。
- 先给共享目录建 emptyDir 卷，再让 init 容器写、主容器读。
- 检查同一 Pod 内所有容器 name，重复会直接创建失败。

## 面试一句话

一个 Pod 里可以放多个容器，name 不能重名；initContainers 在主容器之前跑完，常见做法是用 emptyDir 把依赖文件准备好再交给业务容器。

## 常见坑

把初始化逻辑塞进主容器的启动脚本，失败后整个业务容器跟着重启，重试和排查都不受控。

---

来源：第10章 Pod 入门与实战；第32章 K8s可观测性：全链路追踪
