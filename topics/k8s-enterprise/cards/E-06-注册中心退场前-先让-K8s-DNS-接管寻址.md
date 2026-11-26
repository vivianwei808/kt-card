---
id: E-06
layer: 工程化与扩展
title: 注册中心退场前，先让 K8s DNS 接管寻址
source: 第18-19章 K8s综合项目：SpringCloud项目迁移
tags: [SpringCloud, 注册中心, 服务发现]
---

# E-06 注册中心退场前，先让 K8s DNS 接管寻址

> 服务地址已改用 K8s DNS，注册中心的地址簿职责可被 Service 接管。

## 机制

- 课件把 SpringCloud 改造分成迁移与去中心化两步，18-19 章只完成迁移。
- Eureka 是三副本 StatefulSet，Service 为 clusterIP: None。
- EUREKA_SERVER_ADDRESS 写的是 demo-eureka-0/1/2.demo-eureka:8761，服务寻址已经依赖 K8s DNS。
- 网关、业务与前端各有自己的 Deployment 与 Service，外部入口由 Ingress 按 host 和 path 分发。
- 注册中心仍在运行并接收注册，课件未给出下线步骤，退场属于后续的去中心化升级。

## YAML 与命令

- `spec.replicas: 3 / spec.serviceName: demo-eureka / podManagementPolicy: Parallel`
- `spec.clusterIP: None`：Eureka 的 Service 为 headless
- `env EUREKA_SERVER_ADDRESS: http://demo-eureka-0.demo-eureka:8761/eureka/,http://demo-eureka-1.demo-eureka:8761/eureka/,http://demo-eureka-2.demo-eureka:8761/eureka/`
- `Ingress: host demo.test.com / path /receiveapi(/|$)(.*) / rewrite-target /$2`

## 复用清单

- 把迁移和去中心化分成两个发布窗口，别在同一次变更里删注册中心。
- 退场前先盘点所有服务的注册中心地址与调用方式，确认可改用 Service 名。
- 保留 Eureka 作为回退路径，直到全量调用方切换完成。

## 面试一句话

注册中心退场的前提是服务间寻址全部换成 K8s Service 和 DNS，迁移章节只完成了把 Eureka 搬进集群。

## 常见坑

把 18-19 章的迁移当成去中心化：Eureka 还在跑，服务仍向它注册，直接删掉会让按注册表寻址的调用全部断掉。

---

来源：第18-19章 K8s综合项目：SpringCloud项目迁移
