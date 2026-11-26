---
id: A-01
layer: 弹性、网格与存储平台
title: HPA 按资源利用率自动增减副本
source: 第28章 K8s弹性能力：下一代弹性伸缩KEDA
tags: [HPA, 弹性伸缩, requests]
---

# A-01 HPA 按资源利用率自动增减副本

> HPA 按 requests 占比算副本数，没设 requests 就失真。

## 机制

- kubectl autoscale 按 CPU 百分比创建 HPA，示例阈值 10%，副本 1 到 10。
- autoscaling/v2 的 metrics 支持 Resource 类型，可对 memory 配利用率。
- 利用率以 requests 为分母，requests 没设或太小，百分比会失真。
- 压测后 HPA 从 1 个副本扩到 10 个，TARGETS 显示 230%/10%。
- HPA 示例最小副本为 1，KEDA 才支持缩容到 0。
- 扩容上限由 maxReplicas 卡住，缩容要等指标回落。

## YAML 与命令

- `kubectl autoscale deployment nginx-server --cpu-percent=10 --min=1 --max=10`：创建 CPU HPA
- `apiVersion: autoscaling/v2，kind: HorizontalPodAutoscaler`：HPA 资源
- `spec.metrics[].resource.name: memory`：按内存伸缩
- `target.type: Utilization，averageUtilization: 80`：目标利用率 80%
- `kubectl get hpa`：查看 TARGETS 与 REPLICAS

## 复用清单

- 上线前给所有工作负载设 requests，否则 HPA 的百分比没有意义。
- 先用固定 QPS 压测，记录副本数与延迟曲线，再定阈值。
- 把 maxReplicas 与节点容量、配额一起核算，避免扩到无节点可调度。
- 内存型 HPA 先观察缩容行为，必要时改用队列长度等业务指标。

## 面试一句话

HPA 按指标算出期望副本数，CPU 和内存用 requests 做分母，所以 requests 必须准确，扩容上限由 maxReplicas 卡住。

## 常见坑

requests 设得远小于实际用量，HPA 看到几百个百分点，一直顶在 maxReplicas。

---

来源：第28章 K8s弹性能力：下一代弹性伸缩KEDA
