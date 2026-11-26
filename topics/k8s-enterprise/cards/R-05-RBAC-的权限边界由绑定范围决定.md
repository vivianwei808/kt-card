---
id: R-05
layer: 资源治理与安全
title: RBAC 的权限边界由绑定范围决定
source: 第25章 K8s细粒度权限管理RBAC
tags: [RBAC, RoleBinding, ClusterRole]
---

# R-05 RBAC 的权限边界由绑定范围决定

> Role 定权限，Binding 定范围，绑在哪个空间就在哪生效。

## 机制

- Role 是命名空间内的权限集合，用 --verb 指定动作、--resource 指定资源。
- ClusterRole 是集群级权限集合，非核心组资源写成 replicasets.apps 这种组.资源形式。
- RoleBinding 把 Role 或 ClusterRole 绑给 ServiceAccount、用户或组，作用域限于所在命名空间。
- ClusterRoleBinding 授予全集群范围，组 system:serviceaccounts:kube-users 可一次覆盖整个租户空间。
- 子资源要单独授权：pods/log 查日志、pods/exec 执行命令、pods/status 看状态。
- 内置 ClusterRole view、edit、admin 可直接绑定，覆盖只读、编辑与空间管理场景。

## YAML 与命令

- `kubectl create role pod-reader --verb=get --verb=list --verb=watch --resource=pods`
- `kubectl create role foo --verb=get,list,watch --resource=replicasets.apps`
- `kubectl create rolebinding dukuan-pod-reader --clusterrole=pod-reader --serviceaccount=default:dukuan`
- `kubectl create clusterrolebinding namespace-readonly --clusterrole=namespace-readonly --group=system:serviceaccounts:kube-users`
- `kubectl auth can-i get configmaps -n default --as=system:serviceaccount:default:dukuan`

## 复用清单

- 先定义最小 ClusterRole，再按命名空间建 RoleBinding，不要直接上 cluster-admin。
- 把日志、exec、编辑拆成独立 ClusterRole，按环境分别绑定。
- 用 kubectl auth can-i --as 验证每个身份的边界，再交付。

## 面试一句话

RBAC 的权限来自 Role 或 ClusterRole，生效范围由 RoleBinding 还是 ClusterRoleBinding 决定。

## 常见坑

用 RoleBinding 绑 ClusterRole 却以为全集群生效；反过来把 admin 用 ClusterRoleBinding 绑给租户，等于交出整个集群。

---

来源：第25章 K8s细粒度权限管理RBAC
