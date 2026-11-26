---
id: B-08
layer: 数据智能
title: 技能摘要常驻，正文按需 read_file
source: 第39章
tags: [Agent, Context, 技能加载]
---

# B-08 技能摘要常驻，正文按需 read_file

> 8 个技能全文塞 prompt 要 4000 tokens，渐进式加载只放约 500 字符摘要。

## 机制

- 三级加载：元数据（名称加描述，约 100 词）常驻，SKILL.md 正文触发时加载，捆绑资源按需加载。
- ContextBuilder 注入的 XML 摘要含 name、description、location、available 四个字段。
- frontmatter 标 always: true 的技能全文进 system prompt，内置只有 memory 这样配置。
- 其余技能只给一句提示：需要时用 read_file 读它的 SKILL.md。
- 8 个技能每个 2000 多字符，全量注入约 4000 tokens，摘要只占约 500 字符。

## 代码落点

- `ContextBuilder`：注入技能摘要
- `build_skills_summary`：生成摘要
- `read_file`：按需读正文
- `always: true`：常驻技能

## 复用清单

- 技能多时只放摘要，正文让模型自己读。
- 高频核心技能才常驻全文。

## 面试一句话

技能库大了就做渐进式加载，摘要常驻，正文让模型自己 read_file。

## 常见坑

把所有技能正文写进 system prompt，token 花光还挤掉对话历史。

---

来源：第39章
