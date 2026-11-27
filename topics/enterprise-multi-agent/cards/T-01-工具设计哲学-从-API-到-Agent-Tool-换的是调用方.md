---
id: T-01
layer: 工具与协议
title: 工具设计哲学：从 API 到 Agent Tool 换的是调用方
source: 第12讲；tools/baidu_search.py
tags: [工具, 接口设计, Prompt]
---

# T-01 工具设计哲学：从 API 到 Agent Tool 换的是调用方

> 同一份能力，写成给人调用的 API 和写成给模型调用的工具，接口、报错、返回格式都不一样。

## 机制

- 传统 API 的调用方是程序员，文档可以长，参数可以嵌套，错误码可以查表。
- Agent Tool 的调用方是模型，它只看得到 name、description 和参数 schema 三样东西。
- 所以工具描述要写给模型看：什么时候用、参数怎么填、返回长什么样，一句话说不清模型就会乱调。
- 参数尽量扁平、必填项少、枚举值写全，模型对自由字符串的把握最差。
- 返回结果要给模型能直接推理的文本，不要把 JSON 原样倾倒。

## 代码落点

- `tools/baidu_search.py`：name、description、args_schema 三段式定义
- `tools/baidu_search.py`：BaiduSearchInput 的字段 description 就是给模型看的说明书

## 复用清单

- 写工具前先问：模型只读 description，能不能判断该不该用这个工具。
- 把「什么时候不用」写进 description，比只写用途更能减少误调。
- 工具返回值控制在几百字，超长的先摘要再返回。

## 面试一句话

工具是写给模型看的接口：name、description、schema 就是全部文档，我把「何时用、参数怎么填、返回什么」都压进 description，误调率明显下降。

## 常见坑

把 REST 文档原样搬进工具描述，模型读完还是不知道该传什么，于是反复试错或者干脆不调。

---

来源：第12讲；tools/baidu_search.py
