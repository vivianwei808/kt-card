---
id: W-05
layer: 工作负载与调度
title: 滚动更新只在 Pod 模板变更时触发
source: 第11-12章 调度资源
tags: [Deployment, 滚动更新, ReplicaSet]
---

# W-05 滚动更新只在 Pod 模板变更时触发

> 改 spec.template 才发版，回滚靠旧 RS 与 revision。

## 机制

- 1.16 起 Deployment 只能用 apps/v1，selector 必填并对齐 template 标签。
- 只有 .spec.template 变更才触发滚动更新，改镜像、CPU、内存都算。
- 更新策略默认 RollingUpdate，Recreate 会先删掉全部旧 Pod。
- maxUnavailable 与 maxSurge 默认各 25%，两者不能同时为 0。
- 3 副本按默认值滚动时，先扩新 RS 到 1、缩旧 RS 到 2，最多 4 个 Pod、至少 2 个可用。
- 每次更新生成新 ReplicaSet，旧 RS 保留供回滚，默认留 10 个。

## YAML 与命令

- `kubectl set image deployment nginx nginx=registry.cn-beijing.aliyuncs.com/dotbalo/nginx:1.15.12 --record`：改镜像并记录 change-cause
- `kubectl rollout status deploy nginx`：观察新旧副本交替过程
- `kubectl rollout undo deployment/nginx --to-revision=2`：回滚到指定 revision
- `spec.strategy.rollingUpdate.maxSurge: 25%`：超出期望值的 Pod 上限
- `spec.revisionHistoryLimit: 10`：保留的历史 RS 数，0 表示不保留

## 复用清单

- 上线前把 maxUnavailable 设 0、maxSurge 设 1，先加后减，避免容量抖动。
- 发布加 --record，回滚前用 kubectl rollout history 确认 revision 对应的变更。
- 要一次改多处就先 kubectl rollout pause，改完再 resume。
- 检查 revisionHistoryLimit，设成 0 会失去回滚能力。

## 面试一句话

Deployment 只有 Pod 模板变了才滚动更新，每次生成新 ReplicaSet，旧版本默认保留 10 个供 rollout undo 回滚，更新节奏由 maxUnavailable 和 maxSurge 控制。

## 常见坑

以为改 replicas 也会产生新 revision；扩缩容不触发滚动更新，rollout undo 也回不到副本数。

---

来源：第11-12章 调度资源
