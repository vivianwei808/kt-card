---
id: D-01
layer: 交付、多集群与容灾
title: 流水线 Slave 建在集群里，用完即删
source: 第35-37章 基于K8s和Jenkins的DevOps平台落地
tags: [Jenkins, CI/CD, Pipeline, Kubernetes]
---

# D-01 流水线 Slave 建在集群里，用完即删

> Jenkins 主节点常驻，Slave 由插件按流水线创建，构建完删除。

## 机制

- 主节点用 Docker 跑，/data/jenkins_data 挂到 /bitnami/jenkins，重启不丢。
- 8080 是 Web 界面端口，50000 是 jnlp 端口，Slave 靠它和主节点通信。
- Kubernetes 插件在指定集群创建 Slave Pod，流水线结束即删除，构建环境不长期占机器。
- Slave Pod 按用途分容器：jnlp 通信、build 跑 mvn、kaniko 做镜像、kubectl 发版。
- workspace 挂 pipeline-cache PVC，~/.m2 依赖缓存跨构建复用。
- 拉代码阶段用 env.gitlabBranch 是否为空区分手动触发与 GitLab 触发，两个 stage 并行声明。

## YAML 与命令

- `docker run -d --name=jenkins -p 8080:8080 -p 50000:50000 -v /data/jenkins_data:/bitnami/jenkins`：主节点与数据持久化
- `agent { kubernetes { cloud 'kubernetes-study' } }`：指定 Slave 建在哪个集群
- `workspaceVolume persistentVolumeClaimWorkspaceVolume(claimName: "pipeline-cache")`：工作区挂 PVC
- `kaniko 容器`：executor -d ${HARBOR_ADDRESS}/${REGISTRY_DIR}/${IMAGE_NAME}:${TAG} -c . --insecure
- `kubectl set image deploy -l app=${IMAGE_NAME} ${IMAGE_NAME}=...:${TAG} -n $NAMESPACE`：按标签更新镜像

## 复用清单

- 先给构建节点打 build=true 标签，再在 Pod 模板里配 nodeSelector，避免 Slave 落到 Master。
- 把 Harbor 地址、项目、镜像名、Namespace 提到 environment，Jenkinsfile 只留一份模板。
- Kaniko 的 /kaniko/.docker 挂 docker-registry-config ConfigMap，否则推镜像认证失败。
- 每次构建用 BUILD_TAG 加 commit 短哈希做 TAG，回滚时能定位到具体提交。

## 面试一句话

Jenkins 不常驻构建机，它通过 Kubernetes 插件为每条流水线创建一个多容器 Pod，拉代码、编译、打镜像、发版都在 Pod 里完成，结束后 Pod 删除。

## 常见坑

cloud 名字写错或节点没有 build=true 标签，流水线会一直停在等待 agent；不挂 pipeline-cache，Maven 每次全量下载依赖。

---

来源：第35-37章 基于K8s和Jenkins的DevOps平台落地
