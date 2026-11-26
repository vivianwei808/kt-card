---
id: A-02
layer: 弹性、网格与存储平台
title: 事件驱动伸缩用 KEDA 接外部指标
source: 第28章 K8s弹性能力：下一代弹性伸缩KEDA
tags: [KEDA, ScaledObject, HPA, 事件驱动]
---

# A-02 事件驱动伸缩用 KEDA 接外部指标

> ScaledObject 描述触发源，KEDA 生成 HPA 执行扩缩容。

## 机制

- KEDA 由 Operator、metrics apiserver、admission webhooks 组成。
- ScaledObject 指向工作负载，triggers 写事件源，KEDA 生成 HPA。
- cron 触发器用 timezone、start、end、desiredReplicas 控制定时扩容。
- RabbitMQ 的 mode 可选 QueueLength 或 MessageRate，value 是阈值。
- pollingInterval 默认 5 秒，cooldownPeriod 默认 300 秒。
- TriggerAuthentication 从 Secret 取连接串，ScaledObject 再引用它。

## YAML 与命令

- `helm install keda kedacore/keda --namespace keda --create-namespace`：安装 KEDA
- `kind: ScaledObject，spec.triggers[].type: cron`：定时扩缩容
- `metadata.mode: QueueLength，queueName: hello`：按 RabbitMQ 队列长度
- `kind: TriggerAuthentication，spec.secretTargetRef`：从 Secret 注入认证
- `kind: ScaledJob，spec.jobTargetRef`：按事件创建 Job

## 复用清单

- 先把事件源的连接信息放进 Secret，再写 TriggerAuthentication。
- 用 minReplicaCount 保留热实例，避免冷启动拖慢首批请求。
- 上线前核对 cooldownPeriod，队列清空后缩得太快会反复拉起。
- 定时任务用 ScaledJob，常驻服务用 ScaledObject。

## 面试一句话

KEDA 不替换 HPA，它把 Kafka、RabbitMQ、MySQL、cron 这些外部指标翻译成 HPA 能读的指标，再让 HPA 调整副本数。

## 常见坑

把 cooldownPeriod 设得比业务处理时间还短，队列一清空就缩容，下一批消息又全部冷启动。

---

来源：第28章 K8s弹性能力：下一代弹性伸缩KEDA
