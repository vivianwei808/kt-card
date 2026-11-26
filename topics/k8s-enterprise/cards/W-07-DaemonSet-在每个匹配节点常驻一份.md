---
id: W-07
layer: 工作负载与调度
title: DaemonSet 在每个匹配节点常驻一份
source: 第11-12章 调度资源
tags: [DaemonSet, 节点, nodeSelector]
---

# W-07 DaemonSet 在每个匹配节点常驻一份

> 没有 replicas，节点增减即 Pod 增减，适合节点级守护进程。

## 机制

- DaemonSet 不写 replicas，控制器在集群每个节点创建一个 Pod。
- .spec 唯一必需字段是 template，写法同 Pod，但没有 apiVersion 与 kind。
- template 的标签要与 selector 对齐，否则控制器找不到自己管的 Pod。
- 新增节点或节点标签变化时，立刻向新匹配节点加 Pod，删掉不匹配节点上的 Pod。
- updateStrategy 有 RollingUpdate 与 OnDelete，默认 RollingUpdate。
- nodeSelector 写在 template 里，把 DaemonSet 限定到指定节点。

## YAML 与命令

- `kubectl create -f nginx-ds.yaml`：每个节点生成一个 nginx Pod
- `kubectl get po -o wide`：核对每个 DaemonSet Pod 落在哪个节点
- `kubectl get ds nginx-ds -o go-template='{{.spec.updateStrategy.type}}'`：查看更新策略
- `spec.template.spec.nodeSelector.disktype: ssd`：只在 ssd 节点部署
- `kubectl rollout undo daemonset nginx-ds --to-revision=1`：回滚，历史在 ControllerRevision

## 复用清单

- 部署前检查目标节点是否带 NoSchedule 污点，必要时在模板里加 tolerations。
- 先给节点打 disktype 之类的标签，再写 nodeSelector，标签改动会立刻引起 Pod 增删。
- 用 kubectl get po -o wide 对比 Pod 数和节点数，少一个说明该节点不满足选择器或带污点。

## 面试一句话

DaemonSet 没有副本数概念，每个节点一份，节点加入或标签变化都会自动增删，典型用在 calico、kube-proxy、csi 这类节点级组件上。

## 常见坑

以为 DaemonSet 会铺满全部节点；template 里写了 nodeSelector，或节点带 NoSchedule 污点，Pod 就不会出现在这些节点上。

---

来源：第11-12章 调度资源
