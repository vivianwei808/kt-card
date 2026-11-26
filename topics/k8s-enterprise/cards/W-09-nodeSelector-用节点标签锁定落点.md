---
id: W-09
layer: 工作负载与调度
title: nodeSelector 用节点标签锁定落点
source: 第11-12章 调度资源；第21章 K8s污点和容忍
tags: [调度, nodeSelector, Label]
---

# W-09 nodeSelector 用节点标签锁定落点

> nodeSelector 是硬匹配，节点有污点时还要额外配容忍。

## 机制

- Pod 模板里的 schedulerName 默认 default-scheduler，由它完成节点选择。
- nodeSelector 按节点标签匹配，键和值都对上才会被选中。
- 节点标签先用 kubectl label node 打，如 zone=beijing-haidian。
- DaemonSet 用 template 里的 nodeSelector 限定节点，示例 disktype: ssd。
- 节点标签变化或新增节点时，DaemonSet 立刻补齐 Pod，不匹配的节点删掉。
- 专用节点同时有污点和标签时，Pod 要写 nodeSelector 加 tolerations 才能落上去。

## YAML 与命令

- `spec.template.spec.schedulerName: default-scheduler`：指定调度器
- `spec.template.spec.nodeSelector.disktype: ssd`：只在带该标签的节点创建
- `kubectl label node k8s-node02 ingress=true`：给节点打标签
- `kubectl get po -o wide`：查看 Pod 实际落在哪个节点
- `spec.template.spec.nodeSelector.gpu: "true"`：GPU 节点的选择器写法

## 复用清单

- 先 kubectl label node 打标签，再写 nodeSelector，顺序反了 Pod 无处可去。
- 核对 nodeSelector 的每个键值都能在节点标签里找到，少一个就不匹配。
- 目标节点带污点时，nodeSelector 与 tolerations 一起加，再用 kubectl get po -o wide 验证。

## 面试一句话

Pod 默认由 default-scheduler 调度，nodeSelector 是节点标签的硬匹配，键值都要对上；节点有污点时得同时配 tolerations，DaemonSet 也用同一个字段圈定节点范围。

## 常见坑

只写 nodeSelector 没写容忍，节点上挂着 NoSchedule 污点，Pod 一直调度不上去。

---

来源：第11-12章 调度资源；第21章 K8s污点和容忍
