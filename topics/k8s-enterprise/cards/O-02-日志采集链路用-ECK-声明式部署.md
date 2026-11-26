---
id: O-02
layer: 可观测性
title: 日志采集链路用 ECK 声明式部署
source: 第29章 K8s可观测性：日志收集
tags: [ECK, Filebeat, Kafka, 日志收集]
---

# O-02 日志采集链路用 ECK 声明式部署

> 采集与入库用 ECK 声明，Kafka 另装，Kibana 查询。

## 机制

- ECK 先装 CRD 再装 Operator，之后用自定义资源创建各 Elastic 组件。
- Filebeat 用 DaemonSet 跑在每个节点，hostPath 挂载容器日志目录。
- autodiscover 按容器 ID 找到日志文件，输出到 Kafka 的 k8spodlogs。
- Logstash 消费 Kafka，按日期索引写入 ES，Kibana 建 data view 查询。
- ES 的 nodeSet 配 3 个节点，Kibana 通过 elasticsearchRef 关联集群。
- Kafka 与 Zookeeper 不属于 ECK 资源，用 Helm 单独安装。

## YAML 与命令

- `kubectl create -f https://download.elastic.co/downloads/eck/2.16.0/crds.yaml`：安装 ECK CRD
- `kubectl apply -f https://download.elastic.co/downloads/eck/2.16.0/operator.yaml`：安装 ECK Operator
- `kind: Elasticsearch，spec.nodeSets[].count: 3`：三个 ES 节点
- `kind: Beat，spec.type: filebeat`：声明 Filebeat 采集器
- `spec.elasticsearchRefs[].clusterName: es-cluster`：Logstash 关联 ES

## 复用清单

- 先装 CRD 再装 Operator，顺序反了 Operator 起不来。
- ES 的 emptyDir 只适合练习，生产要开 volumeClaimTemplates 挂 PVC。
- Kibana 用 NodePort 暴露时把 selfSignedCertificate.disabled 设为 true。
- 上线前确认 vm.max_map_count 已调到 262144，否则 ES 容器反复重启。

## 面试一句话

ECK 把 Elastic 全家桶变成 Kubernetes 自定义资源，采集端用 Filebeat DaemonSet，中间加 Kafka 削峰，Logstash 负责写 ES。

## 常见坑

只装 Operator 没装 CRD，或者 ES 用 emptyDir，Pod 一重建日志全丢。

---

来源：第29章 K8s可观测性：日志收集
