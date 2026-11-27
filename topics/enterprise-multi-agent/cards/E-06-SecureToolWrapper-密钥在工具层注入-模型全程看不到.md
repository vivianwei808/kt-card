---
id: E-06
layer: 生产工程化
title: SecureToolWrapper：密钥在工具层注入，模型全程看不到
source: 第32讲；m5l32/demo.py
tags: [安全, 密钥, 凭证]
---

# E-06 SecureToolWrapper：密钥在工具层注入，模型全程看不到

> 密钥不写进 backstory，也不写进工具描述，包装器在执行那一刻从环境变量取出并合并进参数。

## 机制

- 传统做法把 API Key 写进 Agent 的 backstory 或工具 description，模型能看到，一次对话泄漏就出去了。
- SecureToolWrapper.wrap(tool, credentials={"api_key": "SECURE_API_KEY"}) 只记环境变量名，不记值。
- 执行时才从环境读密钥并合并到 kwargs，模型的 tool schema、messages、tool_input 全程不含密钥。
- 配合沙箱守卫使用：输入消毒保证 tool_input 里没有拼接进来的恶意参数。
- 课程的 api-leak 攻击演示专门验证这一点：诱导模型输出密钥，输出里没有。

## 代码落点

- `m5l32/demo.py`：SecureToolWrapper.wrap 的用法与 api-leak 攻击路径
- `m5l32/README.md`：凭证注入的设计说明

## 复用清单

- 所有带凭证的工具统一走包装器，代码里不出现密钥字面量。
- 密钥只存在运行环境，不进仓库、不进提示词、不进日志。
- 把「模型看到的上下文里没有密钥」当成验收项，写进安全测试。

## 面试一句话

密钥不进模型上下文：工具用包装器注册，执行那一刻才从环境变量注入，模型的 schema 和消息里全程没有密钥；我们专门做了一个诱导泄漏的攻击用例来验证。

## 常见坑

图省事把 key 写在 backstory 里，模型在总结对话时可能原样复述出来。

---

来源：第32讲；m5l32/demo.py
