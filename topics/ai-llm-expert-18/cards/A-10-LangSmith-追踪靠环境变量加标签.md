---
id: A-10
layer: Agent 工程
title: LangSmith 追踪靠环境变量加标签
source: 第20章
tags: [Agent, 可观测性, LangSmith]
---

# A-10 LangSmith 追踪靠环境变量加标签

> 设好 API key 和 tracing 开关，再用 tags、metadata 打标，才能按业务维度筛 trace。

## 机制

- 三个环境变量：LANGSMITH_API_KEY、LANGCHAIN_TRACING_V2=true、LANGCHAIN_PROJECT。
- agent.invoke(initial_state, config=config) 传入 RunnableConfig 就自动上报。
- tags 打 customer-{id}、risk_tolerance，metadata 放 portfolio_value、user_query。
- 控制台能看每个节点的输入输出、完整 Prompt、工具参数和状态转换。
- Trace 右上角可 Add Example to dataset，把这次调用存成带参考答案的样本。

## 代码落点

- `LANGSMITH_API_KEY`：鉴权
- `LANGCHAIN_TRACING_V2=true`：开启追踪
- `RunnableConfig`：传 tags 与 metadata
- `LANGCHAIN_PROJECT`：项目分组

## 复用清单

- 每次调用至少打 user_id 和业务场景两个标签。
- 把线上坏例子一键存进测试集。

## 面试一句话

LangSmith 用环境变量开启追踪，RunnableConfig 打 tag 和 metadata 做过滤。

## 常见坑

只开 tracing 不打 tag，几百条 trace 里找不到出问题的那条。

---

来源：第20章
