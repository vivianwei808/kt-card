---
id: W-11
layer: 智能体平台
title: Dify 本地部署四步，更新也是三条命令
source: 第6章
tags: [Dify, 部署, Docker]
---

# W-11 Dify 本地部署四步，更新也是三条命令

> 克隆仓库、复制 .env、docker compose up -d，三条命令完成社区版完整部署。

## 机制

- git clone langgenius/dify 仓库，进 dify/docker 后 cp .env.example .env。
- .env 里至少改 APP_URL，它决定访问地址，本地通常是 http://localhost 或本机 IP。
- docker compose up -d 后台启动，-d 表示脱离终端运行。
- 首次访问 http://IP/install 设管理员，之后访问 http://IP 进入主页面。
- 更新依次执行 git pull、docker compose pull、docker compose up -d。

## 代码落点

- `git clone`：拉取仓库
- `cp .env.example .env`：准备配置
- `docker compose up -d`：后台启动
- `APP_URL`：访问地址配置

## 复用清单

- 内网隔离环境把模型也换成本地服务，数据不出网。
- 升级前备份 .env 和卷数据，再拉新镜像。

## 面试一句话

Dify 社区版本地部署就是克隆、配置、compose 三步，更新用 pull 加 up。

## 常见坑

只 clone 不复制 .env，启动时缺配置项，容器反复重启。

---

来源：第6章
