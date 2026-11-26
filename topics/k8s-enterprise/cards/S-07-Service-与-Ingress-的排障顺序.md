---
id: S-07
layer: 服务发布与流量
title: Service 与 Ingress 的排障顺序
source: 第14章 K8s 服务发布：Ingress
tags: [Ingress, 排障, Service]
---

# S-07 Service 与 Ingress 的排障顺序

> 先按状态码分层，再从 Ingress 往下逐层排除。

## 机制

- 先确认 Ingress Controller 正在运行并解析了规则，未被解析的 Ingress 一律 404。
- 404 查路径配置、域名和路径是否正确，以及后端服务有没有这个路径。
- 503 查 Ingress 里的 Service 名字和端口是否写错，Service 是否存在，后端 Pod 是否正常。
- 504 是后端处理时间超过 Nginx 等待时间，先确认服务耗时，再决定调超时。
- 413 是请求体超过 Nginx 默认 8M，调 proxy-body-size，不用动后端。
- 回到 Service 层看 selector 与 Pod 标签是否一致，再看域名能否解析。

## YAML 与命令

- `kubectl get po -n ingress-nginx`：确认 Controller 处于 Running
- `kubectl get svc -n study-ingress`：核对 Service 名称、端口和 ClusterIP
- `nslookup my-service`：在 Pod 内验证 Service 域名解析
- `curl -H "Host:auth.test.com" <节点IP>`：绕过 DNS 直接用 Host 头测 Ingress
- `kubectl logs -f <pod>`：查看后端容器启动失败的原因

## 复用清单

- 排障按域名解析、Controller 日志、Ingress 规则、Service、Pod 的顺序走。
- 先 curl -I 看状态码分类，再决定查哪一层，不要一上来改后端。
- 改完 Ingress 用 curl -H "Host:xxx" 直连节点 IP 验证，排除 DNS 干扰。
- 排查 Service 前先 kubectl get po --show-labels 确认标签与 selector 一致。

## 面试一句话

先看状态码，404 查路由和 rewrite，503 查 Service 与后端 Pod，504 查后端耗时，最后回到 Service 的 selector 和 DNS。

## 常见坑

看到 503 就重启 Pod，实际是 Ingress 里 Service 名字或端口写错；504 直接调大超时，把后端本身慢的问题盖住。

---

来源：第14章 K8s 服务发布：Ingress
