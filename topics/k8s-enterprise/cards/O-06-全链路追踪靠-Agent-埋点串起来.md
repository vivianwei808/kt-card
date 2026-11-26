---
id: O-06
layer: 可观测性
title: 全链路追踪靠 Agent 埋点串起来
source: 第32章 K8s可观测性：Skywalking
tags: [Skywalking, 链路追踪, Agent, OAP]
---

# O-06 全链路追踪靠 Agent 埋点串起来

> OAP 收数据落 ES，UI 看拓扑，Agent 决定埋点粒度。

## 机制

- Helm 一次装 ES、OAP、UI，OAP 的 storageType 为 elasticsearch。
- Java 用 initContainer 把 agent 复制到 emptyDir，主容器加载 -javaagent。
- SW_AGENT_NAME 写成命名空间::服务名，实例名用 Pod 名。
- Java 与 Go 的上报地址变量名不同，端口都是 11800。
- Go 在编译期执行 skywalking-go-agent -inject，并用 -toolexec 构建。
- 告警在 alarm-settings.yml 配 hooks，自定义规则写 expression 与 period。

## YAML 与命令

- `JAVA_TOOL_OPTIONS: -javaagent:/skywalking/agent/skywalking-agent.jar`：加载 Java Agent
- `SW_AGENT_NAME: $(NAMESPACE)::$(APP)`：服务名带命名空间
- `SW_AGENT_COLLECTOR_BACKEND_SERVICES: skywalking-oap.skywalking:11800`：OAP 地址
- `RUN skywalking-go-agent -inject /path/to/project`：Go 编译期注入
- `kubectl exec <oap-pod> -- cat config/alarm-settings.yml`：查看告警配置

## 复用清单

- 接入前先给 Deployment 补 version 与 app 标签，链路和灰度都要用。
- agent 用 initContainer 复制，避免把 agent 打进业务镜像。
- 先接一条核心链路，确认拓扑、trace、错误日志都正常再铺开。
- 练习环境按 3 台 4C8G 准备，OAP 的 javaOpts 设 -Xmx2g -Xms2g。

## 面试一句话

Skywalking 的 Java Agent 在启动参数里挂载，Go Agent 在编译期注入，数据统一发到 OAP，OAP 落 ES，UI 用 traceId 串起跨服务调用。

## 常见坑

只配 JAVA_TOOL_OPTIONS 不配 SW_AGENT_COLLECTOR_BACKEND_SERVICES，Agent 起得来但数据发不到 OAP。

---

来源：第32章 K8s可观测性：Skywalking
