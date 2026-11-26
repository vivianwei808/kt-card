---
id: W-11
layer: 工作负载与调度
title: 污点排斥 Pod，容忍才能调度上去
source: 第21章 K8s污点和容忍
tags: [污点, 容忍, NoSchedule, 节点维护]
---

# W-11 污点排斥 Pod，容忍才能调度上去

> NoSchedule 挡新 Pod，NoExecute 连已运行的也驱逐。

## 机制

- 污点格式 key=value:effect，effect 取 NoSchedule 等三种值。
- NoSchedule 只拦新调度，NoExecute 会把不容忍的 Pod 驱逐重建。
- 同名 key 能挂不同 effect 的污点，按 key 删除会把同名的全部清掉。
- tolerations 声明 key、operator、effect，Exists 按 key 匹配。
- tolerationSeconds 控制驱逐宽限，节点故障默认 5 分钟才重调度，设为 10 秒可快速恢复。
- cordon 把节点标成 SchedulingDisabled，已运行 Pod 不受影响，drain 才真正驱逐。

## YAML 与命令

- `kubectl taint node k8s-node02 gpu=true:NoSchedule`：给节点加污点
- `kubectl describe node k8s-node01 | grep Taints -A 10`：查看节点污点
- `spec.tolerations[].operator: Exists 与 effect: NoSchedule`：容忍 GPU 节点
- `tolerationSeconds: 10`：node.kubernetes.io/unreachable 与 not-ready 的容忍时长
- `kubectl drain k8s-node01 --ignore-daemonsets --delete-emptydir-data`：驱逐节点上的 Pod

## 复用清单

- 专用节点先打标签，再加 NoSchedule 污点，最后给对应负载配容忍与 nodeSelector。
- 节点维护先关闭调度，关键服务用 rollout restart 迁走，再用 NoExecute 驱逐剩余 Pod。
- 给核心服务加 unreachable 与 not-ready 的 tolerationSeconds，把故障恢复从 5 分钟压到 10 秒。
- 维护完成用 kubectl taint node <node> maintain- 或 kubectl uncordon 恢复调度。

## 面试一句话

污点是节点上的排斥标记，Pod 必须有对应 tolerations 才能调度；NoSchedule 只挡新的，NoExecute 会把不容忍的 Pod 驱逐，维护节点一般走 cordon 或 drain。

## 常见坑

用 key- 删污点时只想删一种 effect，实际同名 key 的所有污点都被清掉。

---

来源：第21章 K8s污点和容忍
