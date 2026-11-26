---
id: S-01
layer: 服务发布与流量
title: Label 与 Selector 是资源关联的胶水
source: 第13章 K8s 服务发布：Service
tags: [Label, Selector, nodeSelector]
---

# S-01 Label 与 Selector 是资源关联的胶水

> Label 是键值对，Selector 是查询条件，二者把资源串起来。

## 机制

- Label 是 key=value 键值对，Service 与控制器靠 Selector 匹配它选中对象。
- kubectl label 资源类型 资源名 key=value 打标签，--show-labels 查看。
- 同名 key 直接改会报错，必须加 --overwrite 才能覆盖旧值。
- 删标签把值去掉，写成 kubectl label deploy nginx version-。
- 选择器支持等值、in 集合和 !=，多个 -l 同时使用表示同时满足。
- nodeSelector 用节点标签把 Pod 固定到指定节点，例如 region: subnet7。

## YAML 与命令

- `kubectl label deploy nginx version=v1`：给单个对象添加标签
- `kubectl get deploy nginx --show-labels`：查看对象已有的全部标签
- `kubectl label deploy -l app=nginx version=v2 --overwrite`：按选择器批量改值
- `kubectl get deploy -l 'app in (nginx, backend)' -l version!=v1`：集合与不等选择器组合
- `nodeSelector: region: subnet7`：Pod 只调度到带该标签的节点

## 复用清单

- 工作负载统一打 app 与 version 两个标签，Deployment 的 selector.matchLabels 和 template 标签保持一致。
- 用 -l 批量操作前先 kubectl get 同选择器，确认命中范围。
- 专线、Ingress 入口这类专用节点用 Label 标记，不要靠主机名区分。
- 改已有标签值一律显式加 --overwrite，避免批量脚本半途失败。

## 面试一句话

Label 打在对象上，Selector 是查询条件，Deployment 选 Pod、Service 选后端、nodeSelector 选节点，全靠这一对。

## 常见坑

标签漏改或写错，Service 的 selector 选不到 Pod，表现是访问超时；改值不加 --overwrite 会直接报错。

---

来源：第13章 K8s 服务发布：Service
