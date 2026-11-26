---
id: R-04
layer: 资源治理与安全
title: QoS 三类决定资源紧张时谁先被驱逐
source: 第24章 K8s集群资源合理化分配：QoS
tags: [QoS, 驱逐, Guaranteed]
---

# R-04 QoS 三类决定资源紧张时谁先被驱逐

> requests 与 limits 的关系决定 Pod 的 QoS 与驱逐顺序。

## 机制

- Guaranteed 要求每个容器都写 requests 与 limits，且 cpu、memory 两项分别相等。
- Guaranteed 优先级最高，调度器保证其所需资源，驱逐时排在最后。
- Burstable 是不满足 Guaranteed、但至少一个容器写了 requests.cpu 或 requests.memory 的 Pod。
- Burstable 优先级中等，资源紧张时可能被驱逐，节点有空闲时可用超过 requests 的资源。
- BestEffort 完全不配 resources 字段，优先级最低，资源紧张时最先被驱逐。
- Guaranteed 优先级最高、Burstable 中等、BestEffort 最低，驱逐从最低一级开始。

## YAML 与命令

- `limits.cpu: 200m / requests.cpu: 200m，memory 同样相等`：Guaranteed 写法
- `requests: cpu: 100m / memory: 128Mi，不写 limits`：落入 Burstable
- `spec.containers 不写 resources 字段`：BestEffort
- `kubectl get po -n customer1 -oyaml`：核对容器是否真的带上了 requests 与 limits

## 复用清单

- 核心服务按 Guaranteed 配置，逐容器对齐 requests 与 limits。
- 批处理与离线任务放 BestEffort 或 Burstable，把驱逐风险留给低优先级负载。
- 上线前抽查每个容器的 resources，确认没有漏配导致 QoS 降级。

## 面试一句话

QoS 是 kubelet 按 requests 与 limits 的关系算出来的，Guaranteed 最难被驱逐，BestEffort 最先走。

## 常见坑

只给部分容器写 requests，或者 cpu 相等而 memory 不等，Pod 就掉到 Burstable；Guaranteed 要求每个容器两项都相等。

---

来源：第24章 K8s集群资源合理化分配：QoS
