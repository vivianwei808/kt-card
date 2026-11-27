---
id: A-06
layer: Agent 与任务契约
title: 多模态：本地图片先转 Base64，再交给视觉模型
source: 第10讲；m2l6/m2l6_agent.py
tags: [多模态, 视觉, 工具]
---

# A-06 多模态：本地图片先转 Base64，再交给视觉模型

> AddImageToolLocal 把本地图片读成 Base64 塞进消息，模型侧指定 image_model 就能看图。

## 机制

- CrewAI 默认的 AddImageTool 面向 URL，本地图片要用自定义的 AddImageToolLocal。
- 工具做三件事：读文件、编码 Base64、按多模态消息格式拼进对话。
- Agent 侧指定 image_model="qwen3-vl-plus"，主模型负责推理，视觉模型负责读图。
- 用 AddImageToolLocal 时 multimodal 保持 False，两个开关别同时开。
- Task 的 description 必须明确要求调用该工具并给出图片路径，否则模型可能不看图直接编。

## 代码落点

- `tools/add_image_tool_local.py`：本地图片读取与 Base64 编码
- `m2l6/m2l6_agent.py`：image_model 与 tools=[AddImageToolLocal()] 的配置
- `m2l6/m2l6_agent.py`：ImageAnalysis 契约与图片质量评分字段

## 复用清单

- 图片分析的验收标准写进 Pydantic 契约，例如质量评分、问题清单。
- 批量场景先在工具里做压缩和尺寸校验，别把 20MB 原图塞给模型。
- 图片路径作为 inputs 传入，不要写死在 prompt 里。

## 面试一句话

多模态接入我把本地图片编码成 Base64 通过工具塞进消息，视觉模型单独指定；关键是在 Task 里强制要求先调工具看图，否则模型会凭文字编。

## 常见坑

只配了 image_model 没在任务里要求调用加载工具，模型看不到图，输出一段听起来合理但和图片无关的分析。

---

来源：第10讲；m2l6/m2l6_agent.py
