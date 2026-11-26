---
id: S-06
layer: 服务发布与流量
title: Ingress 路由、灰度与 TLS
source: 第14章 K8s 服务发布：Ingress
tags: [Ingress, pathType, TLS, 灰度发布]
---

# S-06 Ingress 路由、灰度与 TLS

> 路由靠 pathType，灰度靠权重，HTTPS 靠 tls Secret。

## 机制

- 规则按 host 加 path 匹配，pathType 取 Exact 时 /bar 不匹配 /bar/。
- pathType 取 Prefix 时按 / 分段匹配，/abc 能匹配 /abc/bbb，最常用。
- 不写 host 的规则可以只按路径发布服务，适合没有域名的测试环境。
- TLS 在 spec.tls 填 hosts 与 secretName，证书放 tls 类型 Secret。
- 灰度用 canary: "true" 加 canary-weight，权重 10 时 v1 与 v2 约为 9:1。
- rewrite-target 配合正则路径去掉前缀，解决后端没有该路径的 404。

## YAML 与命令

- `pathType: Exact / Prefix / ImplementationSpecific`：精确、前缀、控制器自定义匹配
- `kubectl create secret tls ca-secret --cert=tls.crt --key=tls.key`：创建证书 Secret
- `spec.tls: hosts + secretName`：开启 HTTPS，HTTP 请求返回 308 跳到 HTTPS
- `nginx.ingress.kubernetes.io/canary-weight: "10"`：把 10% 流量切到灰度版本
- `nginx.ingress.kubernetes.io/rewrite-target: /$2`：配合 path: /api-a(/|$)(.*) 去掉前缀

## 复用清单

- 发布前固定 pathType，前缀路由一律用 Prefix，避免 Exact 漏掉子路径。
- 灰度按 10% 到 50% 分级推进，每级用脚本统计两版本比例。
- 证书统一用 secret tls 管理，轮换时只替换同名 Secret。
- 后端要传大文件时显式调大 proxy-body-size，默认只有 8M。

## 面试一句话

Ingress 路由由 host、path 和 pathType 决定，灰度用 canary-weight 按比例切流，HTTPS 只要挂一个 tls 类型的 Secret。

## 常见坑

Ingress 配了 /api-a 但后端没有这个前缀，返回 404，需要 rewrite-target 去掉；上传大文件不调 proxy-body-size 会报 413。

---

来源：第14章 K8s 服务发布：Ingress
