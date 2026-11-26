---
id: A-19
layer: Agent 工程
title: 浏览器 Agent 用文本编号替代视觉模型
source: 第22章
tags: [Agent, 浏览器, DOM]
---

# A-19 浏览器 Agent 用文本编号替代视觉模型

> 可交互元素编成 [index]<type>text</type>，模型靠文本匹配选 index，省掉截图识图成本。

## 机制

- browser_use 用 DomService 遍历 DOM，识别 button、input、a 等元素，再用 JS 在页面渲染索引标签。
- 状态格式为 [0]<button>搜索</button>，模型返回 {"action": "click_element", "index": 2}。
- 携程国内机票页一次识别出 133 个可交互元素。
- 除索引点击外还支持 click_coordinates(x, y) 坐标点击和 scroll_to_text。
- 动态弹窗里的元素默认不会被编号，日历格子就是典型失败场景。

## 代码落点

- `BrowserUseTool`：浏览器工具
- `DomService`：DOM 遍历
- `get_current_state()`：带编号的页面状态
- `click_element(index)`：按编号点击

## 复用清单

- 优先用 DOM 文本编号，视觉模型只做兜底。
- 动态弹窗要单独补编号规则。

## 面试一句话

浏览器 Agent 先用 DOM 编号把页面变成文本，模型选编号比截图识图便宜也稳定。

## 常见坑

点了日期框弹出日历，弹窗元素没编号，Agent 永远点不到日期。

---

来源：第22章
