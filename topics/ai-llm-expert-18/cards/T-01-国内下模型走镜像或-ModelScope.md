---
id: T-01
layer: 微调与多模态
title: 国内下模型走镜像或 ModelScope
source: 第26章
tags: [HuggingFace, 模型下载, 环境配置]
---

# T-01 国内下模型走镜像或 ModelScope

> from_pretrained 报连接错误先设镜像端点，且必须早于导入 transformers。

## 机制

- 在导入 transformers 之前设 HF_ENDPOINT 为 https://hf-mirror.com，下载自动走镜像。
- 方案二用 modelscope 的 snapshot_download('qwen/Qwen2.5-0.5B') 把权重下到本地目录。
- 下载完成后用 AutoTokenizer 和 AutoModel 从本地目录加载，传入 model_dir 路径。
- ModelScope 负责下载，HuggingFace 负责加载，两者分工不冲突。
- 缓存目录可用 cache_dir 或 HF_HOME 统一指向 /root/autodl-tmp/models。

## 代码落点

- `HF_ENDPOINT=https://hf-mirror.com`：镜像端点
- `snapshot_download`：ModelScope 下载
- `HF_HOME / cache_dir`：统一缓存目录

## 复用清单

- 把镜像设置写进启动脚本第一行。
- 权重先落到本地盘，再让训练脚本从本地加载。

## 面试一句话

国内报 ConnectionError 先设 HF_ENDPOINT 镜像，或用 ModelScope 下载再本地加载。

## 常见坑

在导入 transformers 之后才设 HF_ENDPOINT，变量不生效，照样连不上。

---

来源：第26章
