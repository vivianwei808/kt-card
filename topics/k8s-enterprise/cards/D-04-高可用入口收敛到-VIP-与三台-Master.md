---
id: D-04
layer: 交付、多集群与容灾
title: 高可用入口收敛到 VIP 与三台 Master
source: 第39章 K8s高可用集群落地
tags: [高可用, keepalived, haproxy, etcd]
---

# D-04 高可用入口收敛到 VIP 与三台 Master

> 客户端只认 VIP，haproxy 把 16443 转到 apiserver。

## 机制

- 三台 Master 各跑 apiserver、controller-manager、scheduler 和 etcd。
- VIP 由 keepalived 持有，haproxy 监听 16443，把请求轮询到三台 Master 的 6443。
- keepalived 101 主、100 备，vrrp_script 每 5 秒查 haproxy，失败两次降权。
- controlPlaneEndpoint 写 VIP:16443，join 和客户端都走这个地址。
- apiServer.certSANs 必须包含 VIP，否则通过 VIP 访问时证书校验不过。
- 其余 Master 用 --control-plane 加入，certificate-key 两小时后失效可重传。

## YAML 与命令

- `controlPlaneEndpoint: 192.168.181.236:16443`：集群统一入口
- `apiServer.certSANs: [192.168.181.236]`：证书包含 VIP
- `frontend k8s-master 绑定 0.0.0.0:16443，backend 指向三台 6443`：haproxy 四层转发
- `priority 101 / 100 加 vrrp_script chk_apiserver`：主备选举与健康检查
- `kubeadm join 192.168.181.236:16443 --control-plane --certificate-key ...`：加入控制平面

## 复用清单

- 规划时先确认 VIP 在同网段且无人使用，ping 不通才可用，再写进 certSANs。
- 公有云直接用 SLB、NLB、ELB 替代 haproxy 和 keepalived，不要硬套 VIP 方案。
- 生产选小版本号大于 5 的版本，课件按 1.33.4 落地。
- 装完在三台 Master 上核对 systemctl status keepalived haproxy 与 netstat -lntp。

## 面试一句话

高可用的关键是收住入口：客户端只认一个 VIP，haproxy 把 16443 转到三台 apiserver 的 6443，keepalived 负责 VIP 漂移，etcd 跟着 Master 做多副本。

## 常见坑

VIP 和公司内网已有 IP 冲突，或者忘了把它加进 certSANs，集群能 init 成功但走 VIP 访问 TLS 失败；公有云大多不支持 keepalived。

---

来源：第39章 K8s高可用集群落地
