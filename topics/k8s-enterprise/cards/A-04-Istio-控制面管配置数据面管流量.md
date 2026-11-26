---
id: A-04
layer: 弹性、网格与存储平台
title: Istio 控制面管配置数据面管流量
source: 第33章 K8s细粒度流量管理：服务网格
tags: [Istio, Sidecar, istiod, IngressGateway]
---

# A-04 Istio 控制面管配置数据面管流量

> istiod 管配置，网关接南北流量，sidecar 管东西流量。

## 机制

- IstioOperator 声明组件，profile 为 default，istioctl install 安装。
- istiod 暴露 15010、15012、443、15014 端口，是控制面入口。
- 命名空间加 istio-injection=enabled，新 Pod 自动多一个 istio-proxy。
- Pod 级用 sidecar.istio.io/inject 覆盖命名空间设置。
- 去掉命名空间标签不影响已注入的 Pod，重建后才恢复单容器。
- 生产给 istiod 与网关配 minReplicas 2、maxReplicas 5。

## YAML 与命令

- `istioctl install -f istio-operator.yaml`：按 IstioOperator 安装
- `kubectl label namespace istio-test istio-injection=enabled`：开启自动注入
- `sidecar.istio.io/inject: "false"`：单个 Pod 关闭注入
- `components.pilot.k8s.hpaSpec.minReplicas: 2`：控制面至少两个副本
- `meshConfig.accessLogFile: /dev/stdout`：访问日志输出到标准输出

## 复用清单

- 先确认命名空间标签，再重建 Pod，注入发生在创建时。
- 给 istiod 与网关单独规划资源与副本，别用默认单副本跑生产。
- 上线前装 Kiali，用拓扑图核对东西流量是否真的经过 sidecar。
- 把 accessLog 打开并统一成 JSON，方便日志平台解析。

## 面试一句话

Istio 装上以后，istiod 是控制面负责下发配置，ingressgateway 接外部流量，业务 Pod 里的 istio-proxy 接管东西向流量。

## 常见坑

给命名空间打完标签却不重建 Pod，旧 Pod 仍是 1/1，流量根本没走 sidecar。

---

来源：第33章 K8s细粒度流量管理：服务网格
