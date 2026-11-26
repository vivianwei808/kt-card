---
id: R-01
layer: 资源治理与安全
title: requests 管调度，limits 管上限
source: 第22-24章 资源限制与QoS
tags: [requests, limits, 资源配额]
---

# R-01 requests 管调度，limits 管上限

> requests 管调度，limits 管运行上限，两者共同定 QoS。

## 机制

- 调度器按 requests 选节点，只把 Pod 放到剩余资源能满足 requests 的节点。
- 容器实际可用资源受 limits 约束，超出 requests 的部分属于可突发空间。
- ResourceQuota 的 requests.cpu 与 limits.cpu 分别累计，任一超限都会拒绝创建。
- 不写 resources 的容器归入 BestEffort，不保证资源，资源紧张时最先被驱逐。
- LimitRange 的 default 与 defaultRequest 会补到没写 resources 的容器上，已配置的参数不覆盖。
- CPU 支持小数与毫核，0.5 核即 500m；内存按 Mi、Gi 计。

## YAML 与命令

- `spec.containers[].resources.requests`：调度依据，也是 ResourceQuota 里 requests.cpu 的计数来源
- `spec.containers[].resources.limits`：容器运行上限，对应配额里的 limits.cpu 与 limits.memory
- `kubectl get po -n customer1 -oyaml | grep resources -A 6`：核对容器实际生效的 requests 与 limits
- `kubectl create deploy test-quota --image=registry.cn-beijing.aliyuncs.com/dotbalo/redis:7.2.5 -n customer1`：不写 resources 观察配额与调度结果

## 复用清单

- 新建工作负载先写 requests，再按峰值留出 limits，不要只写其中一个。
- 用 LimitRange 兜底默认值，再抽查 Pod 的 resources 是否被补齐。
- 容量规划按 requests 汇总，不要用 limits 估算可调度容量。

## 面试一句话

requests 是调度和配额的计算口径，limits 是容器运行时的上限，两者都写才谈得上资源治理。

## 常见坑

只写 limits 不写 requests，Pod 落入 Burstable，资源紧张时先被驱逐；配额卡 requests 时，缺 requests 的 Pod 直接创建不出来。

---

来源：第22-24章 资源限制与QoS
