---
id: E-01
layer: 工程化与扩展
title: Chart 是模板、默认值与元数据的打包
source: 第26章 K8s工程化管理Helm
tags: [Helm, Chart, 模板]
---

# E-01 Chart 是模板、默认值与元数据的打包

> Chart 把模板、默认值与元数据打成一个可复用包。

## 机制

- helm create test 生成 charts、Chart.yaml、templates、values.yaml 四部分，构成一个可复用的包。
- templates 存放资源模板，helm template 渲染后按资源类型拆成 deployment.yaml、svc.yaml 等文件。
- values.yaml 提供默认值，安装时用 --set 覆盖，不必改动模板本身。
- Chart 打包为 tgz，helm pull 下载 nginx-18.2.5.tgz，解包后在目录里执行 helm install。
- Chart 有两个版本号：CHART VERSION 是包版本，APP VERSION 是应用版本，两者不同步。
- 来源可以是 repo add 的仓库，也可以是 OCI 地址，如 oci://docker.kubeasy.com/bitnamicharts/mysql。

## YAML 与命令

- `helm create test`：生成 charts、Chart.yaml、templates、values.yaml
- `helm template nginx . -n helm-test --output-dir yaml`：把渲染结果导出为 yaml
- `helm pull bitnami/nginx --version 18.2.4`：下载指定版本的 Chart 包
- `helm search repo bitnami/nginx -l`：列出可用版本与 CHART/APP VERSION
- `helm pull oci://docker.kubeasy.com/bitnamicharts/mysql --version 12.0.1`：从 OCI 拉取

## 复用清单

- 先 helm pull 固定版本再解包审阅，不直接装仓库里的最新版。
- 把环境差异写进 values.yaml，模板保持通用。
- 交付前用 helm template 导出 YAML，按普通资源清单审一遍。

## 面试一句话

Chart 是带默认值和模板的打包格式，真正下发给集群的是 helm template 渲染后的 YAML。

## 常见坑

只记 APP VERSION 不记 CHART VERSION：nginx 的 Chart 18.2.5 对应应用 1.27.2，回滚时按应用版本选包会选错。

---

来源：第26章 K8s工程化管理Helm
