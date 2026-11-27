---
id: E-02
layer: 生产工程化
title: Langfuse 全链路：一次任务在追踪里是一棵树
source: 第30讲；m5l30/README.md
tags: [可观测, Langfuse, 追踪]
---

# E-02 Langfuse 全链路：一次任务在追踪里是一棵树

> Trace 下面挂 TOOL span、GENERATION span 和 task-complete 事件，成本和耗时按节点看得到。

## 机制

- 自托管 Langfuse 六个容器：Web、Worker、Postgres、Redis、ClickHouse、MinIO，ClickHouse 冷启动要五到八分钟。
- 接入方式是 Hook：before_llm 建 generation span，before_tool_call 建 tool span，after 记录结果与耗时。
- 追踪树和 Hook 事件一一对应，所以在界面上看到的层级就是实际的执行层级。
- 每个 span 带 token 数与成本，出了成本异常能直接定位到某个工具的某次调用。
- TASK_COMPLETE 事件用来标记任务结束，方便按任务聚合成功率与 P95 延迟。

## 代码落点

- `m5l30/README.md`：Langfuse 自托管部署与密钥配置
- `m5l30/hook_framework/hooks.yaml`：langfuse_trace 钩子配置
- `m5l31/demo.py`：跑一次任务后查看 Trace 树

## 复用清单

- 自托管比 SaaS 更适合数据敏感的企业内网。
- span 命名带上 agent 和 tool，排查时好筛。
- 把成本挂到 span 上，成本归因不用再算账。

## 面试一句话

全链路追踪我接在 Hook 上，一次任务在 Langfuse 里是一棵树，工具调用和模型调用各自成节点，带 token 和耗时，成本异常能直接定位到某次工具调用。

## 常见坑

只记录最终答案，中间调用全黑箱，出问题时只能靠猜是哪一步错了。

---

来源：第30讲；m5l30/README.md
