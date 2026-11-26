---
id: W-08
layer: 工作负载与调度
title: Job 管完成次数，CronJob 管定时触发
source: 第17章 K8s任务管理
tags: [Job, CronJob, 批处理]
---

# W-08 Job 管完成次数，CronJob 管定时触发

> Job 靠 completions 判成功，CronJob 定时生成 Job。

## 机制

- Job 用 batch/v1 定义，Pod 模板的 restartPolicy 写 Never 或 OnFailure。
- completions 是期望成功次数，parallelism 是同时跑的 Pod 数，2 并发跑满 5 次。
- backoffLimit 限制重试次数，用满后 Job 标记 Failed。
- CronJob 的 concurrencyPolicy 有 Allow、Forbid、Replace，默认 Allow。
- 执行记录默认保留成功 3 次、失败 1 次，可用两个 HistoryLimit 字段调大。
- timeZone 默认 UTC，不写就按 kube-controller-manager 的时区调度。

## YAML 与命令

- `kubectl create job hello --image=registry.cn-beijing.aliyuncs.com/dotbalo/busybox -- echo "Hello, Job"`：一次性任务
- `spec.parallelism: 2 与 spec.completions: 5`：2 个 Pod 并发，完成 5 次结束
- `spec.concurrencyPolicy: Forbid`：上次没结束就不新建
- `spec.schedule: '*/1 * * * *'`：每分钟触发一次
- `spec.timeZone: Asia/Shanghai`：指定调度时区，1.25 起需开 CronJobTimeZone 特性门控

## 复用清单

- 定时任务先写 timeZone，不写就按 UTC 跑，'00 01 * * *' 可能落在本地九点。
- 长任务用 Forbid 或 Replace，避免前一次没结束就叠加下一次。
- 调大 successfulJobsHistoryLimit 与 failedJobsHistoryLimit，保留足够历史 Job 查日志。
- 任务要能重复执行，backoffLimit 用满后 Job 直接 Failed，需要人工介入。

## 面试一句话

Job 用 completions 和 parallelism 控制跑几次、并发几个，CronJob 按 cron 表达式定时生成 Job，并发由 concurrencyPolicy 控制，时区默认 UTC 要显式配。

## 常见坑

schedule 写 '00 01 * * *' 就算凌晨一点，没配 timeZone，controller 跑在 UTC 上，任务落在本地九点。

---

来源：第17章 K8s任务管理
