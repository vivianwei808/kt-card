---
id: D-03
layer: 交付、多集群与容灾
title: 多集群交付以 Git 为唯一事实源
source: 第41章 K8s多集群管理-ArgoCD
tags: [ArgoCD, GitOps, ApplicationSet, 多集群]
---

# D-03 多集群交付以 Git 为唯一事实源

> Git 唯一源，ArgoCD 对齐集群，ApplicationSet 管多集群。

## 机制

- GitOps 把 Git 仓库当唯一事实来源，集群状态由工具从仓库同步，人工不直接改集群。
- 三个组件：APIServer 收请求，Repository Server 渲染 YAML，Controller 纠偏。
- argocd cluster add 会在目标集群创建 argocd-manager 账号，并授予集群级权限。
- AppProject 限定可用的仓库、目标集群与 Namespace、可部署的资源类型。
- Application 的自动同步可开 selfHeal 和 prune，偏离就改回，Git 里删掉的资源也删。
- ApplicationSet 的 list 生成器按 region 生成三个 Application。

## YAML 与命令

- `kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`：安装 ArgoCD
- `argocd cluster add kubernetes-admin@kubernetes --name k8s-bj-cluster`：纳管集群
- `argocd cluster add kubernetes-admin@kubernetes --name k8s-nj-cluster --kubeconfig nj-kubeconfig`：按 kubeconfig 纳管
- `kind: ApplicationSet，spec.generators.list.elements`：按集群列表批量生成 Application
- `argocd app sync -l project=multi`：按标签批量同步

## 复用清单

- 纳管集群后先建 AppProject，把 sourceRepos 和 destinations 收窄到项目实际范围。
- 生产环境先跑手动同步，稳定后再开 automated；开 prune 前确认仓库里没有待删目录。
- 多环境差异走 ApplicationSet 的 elements 字段加 helm parameters，不要每个集群复制一份 values。
- 回滚优先改 Git 再同步，页面上的一键 Rollback 只用于紧急止血。

## 面试一句话

ArgoCD 是声明式的 GitOps 交付工具，Controller 持续把集群实际状态和 Git 期望状态做 diff，ApplicationSet 用一个模板就能把同一套 Helm 配置铺到多个集群。

## 常见坑

开了自动同步和 PRUNE，Git 里误删目录会直接删掉集群资源；页面 Rollback 之后集群和 Git 不一致，下一次同步又改回去。

---

来源：第41章 K8s多集群管理-ArgoCD
