---
id: R-06
layer: 资源治理与安全
title: ServiceAccount 权限按用途拆开
source: 第25章 K8s细粒度权限管理RBAC
tags: [ServiceAccount, RBAC, 最小权限]
---

# R-06 ServiceAccount 权限按用途拆开

> ServiceAccount 只解决身份，权限靠 RoleBinding。

## 机制

- 每个 Namespace 自带 default ServiceAccount，Pod 不指定 serviceAccountName 时就用它访问 API。
- kubectl create token 生成令牌，--duration 控制有效期，适合临时排障。
- 长期令牌建 service-account-token 类型的 Secret，用注解关联 SA。
- 用 Token、CA 证书与 APIServer 地址拼成 kubeconfig，就能以该 SA 身份操作集群。
- Pod 设 spec.serviceAccountName 后，容器内程序继承该 SA 的权限，无需额外配置文件。
- 按环境拆权限：生产只给 pod-log，开发测试才给 pod-log 加 pod-exec。

## YAML 与命令

- `kubectl create sa app-view -n project-a-dev`
- `kubectl create rolebinding app-view --clusterrole=view --serviceaccount=project-a-dev:app-view -n project-a-dev`
- `spec.serviceAccountName: app-view`
- `kubectl create token dukuan --duration=99999h`
- `kind: Secret / type: kubernetes.io/service-account-token / annotation kubernetes.io/service-account.name: dukuan`

## 复用清单

- 按用途建 SA，监控、CI、应用各一个，不要共用 default。
- 先建 SA 与 RoleBinding，再在 Deployment 里指定 serviceAccountName。
- 外部 kubeconfig 只给需要的 SA，用完即回收 Token。

## 面试一句话

ServiceAccount 只解决身份，权限仍由 RoleBinding 决定，新建的 SA 默认没有任何权限。

## 常见坑

图省事给 default SA 绑 view 或 admin，命名空间里所有没指定身份的 Pod 都跟着拿到权限；99999h 的令牌也等于长期凭证。

---

来源：第25章 K8s细粒度权限管理RBAC
