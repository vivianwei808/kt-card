---
id: M-04
layer: 总览与基座
title: 声明式 API 加控制器循环撑起自愈
source: 第8章 K8s设计思想必知必会
tags: [声明式, 控制器, watch, apply]
---

# M-04 声明式 API 加控制器循环撑起自愈

> 提交期望状态，控制器循环负责把现实拉回来。

## 机制

- 用户提交 YAML 描述期望状态，APIServer 校验后写入 Etcd，不直接执行任何动作。
- 控制器 list/watch 资源，比对期望值与实际值，不一致就发起变更，直到一致。
- Controller Manager 承担这类循环，副本不足时补齐，异常退出后拉回设定值。
- Scheduler 本身也是 watch 循环，只处理 nodeName 为空的 Pod。
- 状态存在 Etcd，组件重启后读回期望状态继续收敛，不依赖进程内存。
- kubectl apply 是声明式入口，重复执行结果一致；replace 用整份文件替换。

## YAML 与命令

- `kubectl apply -f xxx.yaml`：声明式提交，可重复执行
- `kubectl replace -f xxx.yaml`：整份替换线上对象
- `kubectl edit deploy nginx`：在线改对象，保存即触发收敛
- `kubectl create deployment nginx --image=registry.cn-beijing.aliyuncs.com/dotbalo/counter:v1 --dry-run=client -o yaml`：先生成 YAML
- `kubectl get deploy nginx -oyaml`：拿线上的期望状态

## 复用清单

- 生产只用 apply -f，把 YAML 放进版本库，禁止 edit 线上对象。
- 改副本、镜像、资源都走 YAML 再 apply 一遍。
- 改了没生效，先 kubectl get -oyaml 对比 Git 里的 YAML。

## 面试一句话

声明式 API 只记录期望状态，控制器循环不断比对并对齐，自愈、滚动更新、回滚都是这个循环在不同资源上的表现。

## 常见坑

用 kubectl edit 手改线上对象，Git 里的 YAML 没同步，下一次 apply 把改动覆盖回去。

---

来源：第8章 K8s设计思想必知必会
