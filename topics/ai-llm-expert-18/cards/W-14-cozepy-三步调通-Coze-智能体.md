---
id: W-14
layer: 智能体平台
title: cozepy 三步调通 Coze 智能体
source: 第6章
tags: [Coze, SDK, API]
---

# W-14 cozepy 三步调通 Coze 智能体

> 拿到 PAT 和 bot_id，初始化客户端，流式监听事件，就能把 Coze Bot 接进自己的程序。

## 机制

- 准备 API Token（coze.cn/open/oauth/pats 建 PAT）和 bot_id（智能体 URL 末段）。
- 初始化 Coze(auth=TokenAuth(token=...), base_url=COZE_CN_BASE_URL)。
- 非流式用 chat.create_and_poll，状态为 ChatStatus.COMPLETED 后取 assistant 消息。
- 流式用 chat.stream，监听 CONVERSATION_MESSAGE_DELTA 事件逐段打印。
- cozepy 支持同步、异步、流式输出与分页查询。

## 代码落点

- `cozepy`：Coze Python SDK
- `TokenAuth`：PAT 鉴权
- `create_and_poll`：非流式调用
- `chat.stream`：流式事件

## 复用清单

- PAT 放环境变量，bot_id 从智能体 URL 取。
- 需要打字机效果就用 stream，后台任务用 create_and_poll。

## 面试一句话

cozepy 接入 Coze 就三步：鉴权、初始化、按需选轮询或流式。

## 常见坑

把 bot_id 和插件 ID 搞混，或 token 权限没开，请求直接鉴权失败。

---

来源：第6章
