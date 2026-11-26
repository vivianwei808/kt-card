---
id: C-02
layer: 配置与存储
title: Secret 与敏感配置管理
source: 第15章 K8s 配置管理
tags: [Secret, TLS, imagePullSecrets]
---

# C-02 Secret 与敏感配置管理

> 按用途选类型，证书给 Ingress，仓库凭证给 Pod。

## 机制

- 常用 Opaque、kubernetes.io/tls、dockerconfigjson 三类。
- data 字段存 base64 编码的值，stringData 直接写明文，创建后读取看到的是 data。
- 拉私有仓库镜像用 docker-registry 类型，Pod 上通过 imagePullSecrets 引用。
- 域名证书用 tls 类型，Ingress 的 spec.tls.secretName 直接引用。
- 挂载同 ConfigMap，卷字段换成 secretName，环境变量用 secretKeyRef。
- Secret 必须和引用它的 Pod 在同一命名空间，并且提前创建。

## YAML 与命令

- `kubectl create secret generic basic-auth-secret --from-literal=username=admin`：创建 Opaque
- `stringData: ssh-key: password`：YAML 里直接写明文
- `kubectl create secret tls nginx-test-tls --key=tls.key --cert=tls.crt`：创建 TLS 证书
- `kubectl create secret docker-registry myregistrykey`：--docker-server、--docker-username、--docker-password 三项必填
- `spec.imagePullSecrets: - name: myregistrykey`：Pod 使用仓库凭证

## 复用清单

- 密码、token、证书一律用 Secret，不要写进 ConfigMap 或镜像。
- 私有仓库凭证用 docker-registry 类型配 imagePullSecrets，别在每个节点登录。
- 证书用 tls 类型并以 secretName 挂到 Ingress，轮换只换 Secret。
- Secret 提交到 Git 前先确认脱敏，base64 编码等同于明文。

## 面试一句话

Secret 按用途分类型，Opaque、tls 和 docker-registry 最常用，data 里只是 base64，挂载方式与 ConfigMap 一样，卷字段换成 secretName。

## 常见坑

把 Secret 当成加密存储，kubectl get secret -oyaml 拿到 data 后 base64 -d 就能还原明文。

---

来源：第15章 K8s 配置管理
