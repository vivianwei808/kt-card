---
id: T-02
layer: 工具与协议
title: 工具封装五步 SOP：定义、参数、语义重构、I/O 瘦身、错误转译
source: 第13讲；tools/baidu_search.py
tags: [工具, SOP, 封装]
---

# T-02 工具封装五步 SOP：定义、参数、语义重构、I/O 瘦身、错误转译

> 把一份 REST API 改成 Agent 能用的工具，五步各有各的坑，最容易被跳过的是语义重构和 I/O 瘦身。

## 机制

- Step 1 工具定义：先做语义完整性。碎片化 API 要聚合（文字搜索、图片搜索、视频搜索合成一个 search），复合型 API 要拆解（一个接口做多件事时按意图拆成多个工具）。
- Step 2 参数定义：用 Pydantic 建 args_schema，字段名和 description 都写给模型看，必填项越少越好。
- Step 3 语义重构：把接口名和参数名翻成模型熟悉的说法，description 写清什么时候用、返回什么，这是模型选工具的唯一依据。
- Step 4 I/O 瘦身：降噪增信。原始返回里 query、request_id、icon、image 这些字段对模型没用，裁掉噪音，保留 title、url、摘要这类能直接推理的内容。
- Step 5 错误转译：把上游错误码翻成人话，例如「配额不足，请稍后重试」，模型才知道该换策略还是放弃。

## 代码落点

- `tools/baidu_search.py`：BaiduSearchInput 的 query/top_k/time_range/sites 四类参数
- `tools/baidu_search.py`：搜索结果裁剪成编号加标题加链接加摘要的紧凑格式
- `tools/baidu_search.py`：error_descriptions 把错误码翻译成模型能读懂的提示

## 复用清单

- 接一个新 API 先跑一遍五步，别直接把 requests 包一层就交差。
- I/O 瘦身对成本影响最大，返回从几 KB 降到几百字，上下文立刻轻松。
- 错误转译写成字典维护，新增错误码只改一处。

## 面试一句话

工具封装我按五步走：定义边界、定参数、语义重构、I/O 瘦身、错误转译；其中语义重构和 I/O 瘦身最容易被跳过，但这两步决定了模型会不会选错工具、上下文会不会爆。

## 常见坑

把 API 原样包一层，返回几十 KB 的 JSON，模型读不完，还容易被无关字段带偏。

---

来源：第13讲；tools/baidu_search.py
