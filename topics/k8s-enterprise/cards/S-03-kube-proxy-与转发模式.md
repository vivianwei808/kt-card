---
id: S-03
layer: 服务发布与流量
title: kube-proxy 与转发模式
source: 第13章 K8s 服务发布：Service
tags: [kube-proxy, IPVS, iptables]
---

# S-03 kube-proxy 与转发模式

> kube-proxy 写节点转发规则，模式决定规模上限。

## 机制

- kube-proxy 监听 Service 与 Endpoint 变化，把转发规则写到节点。
- iptables 模式把规则插进 netfilter 链，命中 Service IP 的流量随机转到 Pod。
- iptables 规则数随 Service 数量增长，更新时可能短暂锁表，影响网络性能。
- IPVS 用哈希表存规则，Service 数量大时仍能保持转发性能，更新代价小。
- IPVS 支持 rr、lc、sh、dh、nq、sed 等调度算法，可以换成最少连接等策略。
- curl 127.0.0.1:10249/proxyMode 查模式，改 ConfigMap 后必须重启。

## YAML 与命令

- `curl 127.0.0.1:10249/proxyMode`：返回 iptables 或 ipvs
- `kubectl edit cm kube-proxy -n kube-system`：修改代理模式与调度算法
- `kubectl patch daemonset kube-proxy（改 annotations.date）`：触发 kube-proxy 滚动重启
- `ipvsadm -ln`：查看 IPVS 规则和 Scheduler 列
- `IPVS 算法`：rr 轮询、lc 最少连接、sh 源地址哈希、dh 目的地址哈希

## 复用清单

- Service 数量上千前把模式切到 IPVS，变更后核对 proxyMode 返回值。
- 改 kube-proxy ConfigMap 后统一用 patch 重启 DaemonSet，不要只改单节点。
- 用 ipvsadm -ln 确认调度算法已生效，避免改了配置没重启。
- 二进制安装的节点用 systemctl restart kube-proxy 生效。

## 面试一句话

kube-proxy 本身不转发流量，它把 Service 和 Endpoint 翻译成节点上的 iptables 或 IPVS 规则，规模大了就该用 IPVS。

## 常见坑

只改 ConfigMap 不重启 kube-proxy，proxyMode 还是旧值；IPVS 的源地址 NAT 仍要依赖 iptables 规则。

---

来源：第13章 K8s 服务发布：Service
