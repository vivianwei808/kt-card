---
id: W-06
layer: 智能体平台
title: Coze 应用由工作流、数据表、页面拼成
source: 第5章
tags: [Coze, 应用开发, 数据表]
---

# W-06 Coze 应用由工作流、数据表、页面拼成

> 工作流管逻辑，数据表管存储，页面管交互，三者靠变量名对接成可交付应用。

## 机制

- 表单组件左上角的名称就是变量名，提交事件的 Workflow 入参按名称取值。
- 提交按钮新建事件关联工作流 product_rec，结果页文本绑定 {{product_rec.data}}。
- 结束节点打开流式输出、大模型输出选 Markdown，页面上才能边生成边显示。
- 风险评测结果写入数据表 client_risk_assessment，字段为 client_id、age、exp_level、risk_tolerance。
- 推荐规则写进提示词：R1/R2/R3 对应风险偏好 A/B/C，exp_level=1 不推复杂衍生品。

## 代码落点

- `client_risk_assessment`：结果数据表
- `product_rec`：推荐工作流
- `{{product_rec.data}}`：页面绑定变量
- `流式输出`：结束节点开关

## 复用清单

- 先定数据表字段，再让工作流和页面按字段名对接。
- 结果页统一用 Markdown 渲染，保留模型排版。

## 面试一句话

Coze 应用是三件套：工作流做逻辑、数据表做存储、页面做交互，变量名是连接件。

## 常见坑

表单变量名和工作流入参不一致，点提交后工作流拿不到值。

---

来源：第5章
