---
id: C-01
layer: 配置与存储
title: ConfigMap 的创建与注入
source: 第15章 K8s 配置管理
tags: [ConfigMap, 环境变量, Volume]
---

# C-01 ConfigMap 的创建与注入

> 配置从镜像里拿出来做成 key-value，再用文件挂载或环境变量注入。

## 机制

- ConfigMap 的 data 是 key: value，多行配置用 |- 保留换行。
- --from-file 按文件生成 key，--from-env-file 按 KEY=VALUE 拆分。
- 以 Volume 挂载时，key 名默认就是容器内的文件名。
- items 可以改挂载后的文件名，同时只挂 items 里列出的 key。
- 环境变量用 valueFrom.configMapKeyRef 单个注入，envFrom 能批量注入并加 prefix。
- ConfigMap 必须和 Pod 在同一命名空间，并且在 Pod 创建前就存在。

## YAML 与命令

- `kubectl create cm nginx-conf --from-file=nginx.conf`：以文件名为 key 创建
- `kubectl create cm env-cm --from-env-file=env-file`：把 KEY=VALUE 文件拆成多项
- `volumes[].configMap.name + volumeMounts[].mountPath`：以文件形式挂载
- `configMap.items: key + path`：指定挂载后的文件名
- `envFrom.configMapRef.name + prefix: CM_`：批量注入环境变量并统一前缀

## 复用清单

- 配置文件类用 --from-file，键值类用 --from-env-file 或 --from-literal。
- 挂载前核对 items 里的 key 都存在，否则 Pod 会卡在 ContainerCreating。
- 改文件后先 create --dry-run=client -oyaml，再 kubectl replace -f -。
- 一个 ConfigMap 只放一个应用的配置，避免挂载时互相覆盖。

## 面试一句话

ConfigMap 把配置做成 key-value 资源，文件挂载时 key 就是文件名，环境变量注入靠 configMapKeyRef 或 envFrom，key 写错 Pod 直接起不来。

## 常见坑

items 里写错 key，Pod 一直 ContainerCreating，describe 才看到 configmap references non-existent config key。

---

来源：第15章 K8s 配置管理
