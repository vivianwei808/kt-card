---
id: D-10
layer: 交付、多集群与容灾
title: 企业落地按 CI、GitOps、多活、备份推进
source: 第35-42章 DevOps、高可用与容灾
tags: [落地路线, DevOps, GitOps, 容灾]
---

# D-10 企业落地按 CI、GitOps、多活、备份推进

> 先 CI，再 GitOps 和高可用，然后多活，最后用 Velero 兜底。

## 机制

- 第一步把镜像仓库和流水线跑通：GitLab 存代码，Harbor 存镜像，Jenkins 或 Tekton 负责构建。
- 第二步把部署方式统一成 Helm 加 GitOps，ArgoCD 从 Git 同步，人工不直接改集群。
- 第三步做集群高可用：三 Master、VIP 加 haproxy 和 keepalived，云上用 LB。
- 第四步做异地多活：每个大区独立集群、独立 LB，GTM 按地域调度。
- 第五步补备份：Velero 定时备份到对象存储，重大变更前额外做一次。
- 每一步都要有验收口径，集群按可用性清单，多活按故障切换演练，备份按实际恢复验证。

## YAML 与命令

- `kubectl get node / kubectl get po -A`：底座验收的第一条命令
- `argocd cluster add kubernetes-admin@kubernetes --name k8s-bj-cluster`：GitOps 纳管各集群
- `velero schedule create daily-cluster-backup --schedule="0 13 * * *"`：每天备份
- `kubectl drain k8s-node02 --ignore-daemonsets`：变更前先维护节点

## 复用清单

- 按团队现状选 Jenkins 或 Tekton，存量 Jenkins 用户先复用插件和凭证体系。
- 上 ArgoCD 前先把微服务改成 Helm chart，否则多环境差异只能手改 YAML。
- 多活和备份都要演练，没演练过的切换和恢复不能算能力。
- 给每个阶段定验收项：流水线能一键发版、节点故障不掉业务、单中心挂掉能切走。

## 面试一句话

我会先把 CI 和镜像仓库跑通，再把部署收敛到 Helm 加 ArgoCD，然后做集群高可用和异地多活，最后用 Velero 把误删和变更失败兜住。

## 常见坑

工具一口气全上，但资源没有 Helm 化，ArgoCD 只能同步原始 YAML；多活建了集群却没配 GTM 和 LB，故障时流量切不出去。

---

来源：第35-42章 DevOps、高可用与容灾
