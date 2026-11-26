---
id: W-13
layer: 智能体平台
title: Dify 三种端点，按应用类型选对路径
source: 第6章
tags: [Dify, API, 集成]
---

# W-13 Dify 三种端点，按应用类型选对路径

> 聊天、文本生成、工作流各有一条 API 路径，参数格式不能混用。

## 机制

- /chat-messages 给对话型应用，带 conversation_id 可续上下文。
- /completion-messages 给文本生成应用，单次完成，inputs 通常是空对象。
- /workflows/run 给工作流应用，inputs 传参数，工作流必须先发布。
- 响应模式 response_mode 取 streaming 或 blocking。
- 自动探测按聊天、完成、工作流顺序试，靠 not_chat_app、app_unavailable 错误码降级。

## 代码落点

- `/chat-messages`：对话型
- `/completion-messages`：文本生成
- `/workflows/run`：工作流
- `response_mode`：streaming 或 blocking

## 复用清单

- 调用前先确认应用类型，再选端点。
- API Key 在应用内「访问 API」创建，用 Bearer 认证。

## 面试一句话

Dify 的 API 按应用形态分三条路径，工作流还要先发布才能调。

## 常见坑

拿工作流的 inputs 格式去调聊天端点，参数对不上直接报错。

---

来源：第6章
