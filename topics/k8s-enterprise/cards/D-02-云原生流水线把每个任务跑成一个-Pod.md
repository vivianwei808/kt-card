---
id: D-02
layer: 交付、多集群与容灾
title: 云原生流水线把每个任务跑成一个 Pod
source: 第38章 云原生DevOps平台：Tekton
tags: [Tekton, Pipeline, TaskRun, CI/CD]
---

# D-02 云原生流水线把每个任务跑成一个 Pod

> Task 与 Pipeline 只声明，Run 对象才建 Pod。

## 机制

- Task 定义步骤和镜像，本身不执行；TaskRun 引用 taskRef 后才创建 Pod 跑起来。
- Pipeline 用 runAfter 串 Task，PipelineRun 会为每个 Task 建 TaskRun。
- 传值用 results：上游把值写进 tag 结果，下游按 tasks.init.results.tag 取。
- 代码目录用 workspaces：PipelineRun 把 PVC 的 subPath 挂成 share-data。
- 流水线拆成拉代码、初始化、构建、打镜像、发版五个 Task，由一条 Pipeline 串联。
- 凭据用 Secret 挂成 workspace：Git 密钥、镜像仓库、kubeconfig。

## YAML 与命令

- `kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml`：安装 Tekton
- `kind: TaskRun，spec.taskRef.name`：引用 Task 并触发一次执行
- `runAfter: ["fetch-source"]`：声明 build 在拉代码之后运行
- `echo $TAG | tee $(results.tag.path)`：写入 results，下游用 $(tasks.init.results.tag) 读取
- `kubectl get taskrun / kubectl logs -f <taskrun>-pod -c step-build`：查执行与日志

## 复用清单

- 先
- 建
-  
- t
- e
- k
- t
- o
- n
- -
- w
- o
- r
- k
- s
- p
- a
- c
- e
-  
- 与
-  
- t
- e
- k
- t
- o
- n
- -
- c
- a
- c
- h
- e
-  
- 两
- 个
-  
- P
- V
- C
- ，
- 用
- 支
- 持
-  
- R
- W
- X
-  
- 的
-  
- n
- f
- s
- -
- c
- s
- i
- 。
- 把 Git、镜像仓库、kubeconfig 三类 Secret 提前建好，PipelineRun 只引用名字。
- PipelineRun 用 generateName，每次执行自动生成唯一名字，历史记录不会互相覆盖。
- 每个 Task 只做一件事，构建命令通过 BUILD_COMMAND 传入，同一套 Pipeline 复用到 Java、Go、前端。

## 面试一句话

Tekton 把流水线拆成 Task 和 Pipeline 两类声明，真正执行靠 TaskRun 和 PipelineRun，每个 TaskRun 就是一个 Pod，日志和产物都留在集群里。

## 常见坑

只 apply 了 Task 或 Pipeline 不会跑，必须再建 TaskRun 或 PipelineRun；workspace 的 PVC、Secret 没建，Pod 会卡在挂载。

---

来源：第38章 云原生DevOps平台：Tekton
