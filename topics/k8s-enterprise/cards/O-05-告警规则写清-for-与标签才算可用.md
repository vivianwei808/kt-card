---
id: O-05
layer: 可观测性
title: 告警规则写清 for 与标签才算可用
source: 第30-31章 K8s可观测性：全方位监控
tags: [Alertmanager, PrometheusRule, Grafana, 告警]
---

# O-05 告警规则写清 for 与标签才算可用

> 规则决定何时告警，Alertmanager 决定发给谁。

## 机制

- PrometheusRule 由 alert、expr、for、labels、annotations 组成。
- Alertmanager 配置分五块：全局、模板、路由、抑制、接收人。
- 分组等待默认 30s，组内重发 5m，重复通知默认 4h。
- inhibit_rules 用 source 与 target 匹配，抑制宿主机宕机带来的衍生告警。
- AlertmanagerConfig 按标签分流，邮件、企业微信、钉钉各配一个 receiver。
- Grafana 面板里的 PromQL 可直接改成告警表达式，再补 for 与 severity。

## YAML 与命令

- `spec.groups[].rules[].expr`：告警表达式
- `expr: predict_linear(node_filesystem_avail_bytes[6h], 24*60*60) < 0`：预测磁盘写满
- `route.group_wait / group_interval / repeat_interval`：分组等待与重发间隔
- `receivers[].email_configs[].send_resolved: true`：恢复通知
- `kind: AlertmanagerConfig，spec.route.routes[].matchers`：按标签分流

## 复用清单

- 先给告警打 severity 与 type 标签，再写路由，否则后期无法分流。
- 阈值先用一周数据回放，确认 for 能过滤掉抖动。
- 宿主机类告警先配抑制规则，再开容器与 Pod 级告警。
- 每季度清理一次没人处理的告警规则。

## 面试一句话

PrometheusRule 负责产生告警，Alertmanager 按 route 分组路由、按 inhibit_rules 抑制，最后通过 receiver 发到邮件或 IM。

## 常见坑

只写 expr 不写 for，瞬时抖动就打满手机；或者告警没有 severity 标签，路由规则无法匹配。

---

来源：第30-31章 K8s可观测性：全方位监控
