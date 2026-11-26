---
id: A-20
layer: Agent 工程
title: 复杂页面先试 URL 直跳，再上视觉兜底
source: 第22章
tags: [Agent, 浏览器, 视觉兜底]
---

# A-20 复杂页面先试 URL 直跳，再上视觉兜底

> 携程日历点不中，两条路：把 URL 参数写进知识库绕开交互，或截图让 gui-plus 返回坐标。

## 机制

- RAG 策略在启动时读取 knowledge/*.txt 注入系统提示词，写清 oneway-{出发}-{到达}?depdate={日期} 的 URL 模板。
- GUI 策略调 gui-plus 模型，输入页面截图，返回 action 为 CLICK 加 x、y 坐标。
- 简化后的 click 和 type 内部走三层定位：Playwright Locator 精确匹配、JS 动态查找、gui-plus 视觉回退。
- ElementClassifier 给元素分 14 类并打 0 到 100 置信度，1 到 31 的数字自动标为 CALENDAR。
- 把日历弹窗元素补进编号后，可交互元素从 125 个增加到 233 个。

## 代码落点

- `gui-plus`：视觉坐标回退
- `ElementClassifier`：元素分类
- `Playwright Locator`：精确匹配
- `knowledge/travel_tools.txt`：URL 模板

## 复用清单

- 能拼 URL 就不点页面，稳定性和速度都更好。
- 视觉点击只当第三层兜底。

## 面试一句话

页面交互按成本分层：URL 直跳、DOM 定位、视觉点击，逐层降级。

## 常见坑

只调编号规则不换方案，日历弹窗依旧点不中。

---

来源：第22章
