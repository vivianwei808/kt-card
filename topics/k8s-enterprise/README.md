# K8s 企业级深度研修

基于《51CTO 宽哥 K8s 企业级深度研修实战》40 章课件整理。覆盖容器基础、工作负载、服务发布、配置存储、资源治理、Helm/Operator、可观测性、弹性伸缩、服务网格、DevOps 与异地多活。

- 卡片数量：70
- 分层数量：9
- 更新日期：2026-11-26
- 来源：课程课件第 2 至 42 章，含 PDF / PPTX / DOCX 讲义

## 怎么用

- 从知识库门户进入本专题，或直接打开 `../index.html#/k8s-enterprise`。
- 点击卡片在右侧面板阅读，支持搜索、分层筛选、上下键切换、打印。
- `cards/` 下是 Markdown 源文件，可直接导入 Obsidian、Notion、Anki。

## 分层

| 层 | 名称 | 数量 | 回答什么 |
| --- | --- | --- | --- |
| M | 总览与基座 | 9 | 云原生定位、K8s 架构组件、容器基础与集群初体验 |
| W | 工作负载与调度 | 11 | Pod、控制器、Job 与调度约束 |
| S | 服务发布与流量 | 7 | Label、Service、Ingress 与服务发现 |
| C | 配置与存储 | 7 | ConfigMap、Secret、Volume 与 PV/PVC/StorageClass |
| R | 资源治理与安全 | 7 | 配额、QoS、RBAC 与多租户隔离 |
| E | 工程化与扩展 | 6 | Helm、Operator/CRD 与 SpringCloud 迁移 |
| O | 可观测性 | 6 | 日志、指标、链路追踪与告警 |
| A | 弹性、网格与存储平台 | 7 | HPA/KEDA、Istio、CubeFS |
| D | 交付、多集群与容灾 | 10 | CI/CD、GitOps、高可用、异地多活与备份 |

## 卡片索引

### M 总览与基座

- [M-01 K8s 已成为云原生落地的事实标准](cards/M-01-K8s-已成为云原生落地的事实标准.md)：K8s 把部署、扩缩、服务发现与自愈收进声明式 API，成为云原生操作系统。
- [M-02 控制面四组件分工决定排查顺序](cards/M-02-控制面四组件分工决定排查顺序.md)：控制面组件都通过 Etcd 交互，用循环把状态对齐。
- [M-03 工作节点靠 kubelet 和运行时落地 Pod](cards/M-03-工作节点靠-kubelet-和运行时落地-Pod.md)：kubelet 执行、kube-proxy 转发、运行时经 CRI 接入。
- [M-04 声明式 API 加控制器循环撑起自愈](cards/M-04-声明式-API-加控制器循环撑起自愈.md)：提交期望状态，控制器循环负责把现实拉回来。
- [M-05 namespace 隔视图，cgroup 限用量](cards/M-05-namespace-隔视图-cgroup-限用量.md)：容器用 namespace 隔视图，用 cgroup 限用量，共享宿主机内核。
- [M-06 镜像是模板，容器是运行实例](cards/M-06-镜像是模板-容器是运行实例.md)：镜像是只读模板，容器是实例，仓库负责存和分发。
- [M-07 镜像瘦身先换基础镜像再做多阶段](cards/M-07-镜像瘦身先换基础镜像再做多阶段.md)：先换基础镜像压底座，再用多阶段把工具链留在构建阶段。
- [M-08 集群从裸机到可用只需 kubeadm 三件事](cards/M-08-集群从裸机到可用只需-kubeadm-三件事.md)：三件事：关 swap、装 containerd、kubeadm 初始化。
- [M-09 Namespace 把一套集群切成多套环境](cards/M-09-Namespace-把一套集群切成多套环境.md)：按环境和团队切 Namespace，一套集群当多套用。

### W 工作负载与调度

- [W-01 Pod 是调度与运行的最小单元](cards/W-01-Pod-是调度与运行的最小单元.md)：Pod 是最小单元，一个 Pod 可放多个容器，副本与调度都按它算。
- [W-02 命令与环境变量让镜像适配运行环境](cards/W-02-命令与环境变量让镜像适配运行环境.md)：command 换入口，env 用 fieldRef 注入 Pod 字段。
- [W-03 三种探针分工：启动、存活、就绪](cards/W-03-三种探针分工-启动-存活-就绪.md)：startup 管启动，liveness 管存活，readiness 管接流量。
- [W-04 一个 Pod 可放多容器，初始化容器先跑](cards/W-04-一个-Pod-可放多容器-初始化容器先跑.md)：主容器跑业务，初始化容器在主容器之前把依赖文件准备好。
- [W-05 滚动更新只在 Pod 模板变更时触发](cards/W-05-滚动更新只在-Pod-模板变更时触发.md)：改 spec.template 才发版，回滚靠旧 RS 与 revision。
- [W-06 StatefulSet 给每个副本固定序号与域名](cards/W-06-StatefulSet-给每个副本固定序号与域名.md)：Pod 名固定为 web-0..N-1，域名来自 Headless。
- [W-07 DaemonSet 在每个匹配节点常驻一份](cards/W-07-DaemonSet-在每个匹配节点常驻一份.md)：没有 replicas，节点增减即 Pod 增减，适合节点级守护进程。
- [W-08 Job 管完成次数，CronJob 管定时触发](cards/W-08-Job-管完成次数-CronJob-管定时触发.md)：Job 靠 completions 判成功，CronJob 定时生成 Job。
- [W-09 nodeSelector 用节点标签锁定落点](cards/W-09-nodeSelector-用节点标签锁定落点.md)：nodeSelector 是硬匹配，节点有污点时还要额外配容忍。
- [W-10 亲和性拉近，反亲和性打散副本](cards/W-10-亲和性拉近-反亲和性打散副本.md)：required 是硬约束，preferred 按 weight 打分。
- [W-11 污点排斥 Pod，容忍才能调度上去](cards/W-11-污点排斥-Pod-容忍才能调度上去.md)：NoSchedule 挡新 Pod，NoExecute 连已运行的也驱逐。

### S 服务发布与流量

- [S-01 Label 与 Selector 是资源关联的胶水](cards/S-01-Label-与-Selector-是资源关联的胶水.md)：Label 是键值对，Selector 是查询条件，二者把资源串起来。
- [S-02 Service 类型与访问链路](cards/S-02-Service-类型与访问链路.md)：按访问来源选类型，内网 ClusterIP，外网 NodePort。
- [S-03 kube-proxy 与转发模式](cards/S-03-kube-proxy-与转发模式.md)：kube-proxy 写节点转发规则，模式决定规模上限。
- [S-04 Headless Service 与集群 DNS](cards/S-04-Headless-Service-与集群-DNS.md)：clusterIP 设 None，DNS 直接返回每个 Pod 的 IP。
- [S-05 Ingress 靠 ingress-nginx 干活](cards/S-05-Ingress-靠-ingress-nginx-干活.md)：Ingress 是规则，真正干活的是 ingress-nginx。
- [S-06 Ingress 路由、灰度与 TLS](cards/S-06-Ingress-路由-灰度与-TLS.md)：路由靠 pathType，灰度靠权重，HTTPS 靠 tls Secret。
- [S-07 Service 与 Ingress 的排障顺序](cards/S-07-Service-与-Ingress-的排障顺序.md)：先按状态码分层，再从 Ingress 往下逐层排除。

### C 配置与存储

- [C-01 ConfigMap 的创建与注入](cards/C-01-ConfigMap-的创建与注入.md)：配置从镜像里拿出来做成 key-value，再用文件挂载或环境变量注入。
- [C-02 Secret 与敏感配置管理](cards/C-02-Secret-与敏感配置管理.md)：按用途选类型，证书给 Ingress，仓库凭证给 Pod。
- [C-03 配置热更新与生效边界](cards/C-03-配置热更新与生效边界.md)：Volume 挂载会同步，环境变量和 subPath 不会，程序不重读也没用。
- [C-04 EmptyDir 随 Pod 消失，HostPath 常驻](cards/C-04-EmptyDir-随-Pod-消失-HostPath-常驻.md)：EmptyDir 随 Pod 消失，HostPath 把节点目录搬进容器。
- [C-05 PV、PVC 与 StorageClass](cards/C-05-PV-PVC-与-StorageClass.md)：PV 是资源，PVC 是申请，三项条件对齐才能绑定。
- [C-06 NFS 与 CSI 存储接入](cards/C-06-NFS-与-CSI-存储接入.md)：NFS 可以直接写进 volumes，也可以装 CSI 做按 PVC 自动供给。
- [C-07 有状态存储的选型与落地](cards/C-07-有状态存储的选型与落地.md)：单实例用 Deployment 加 PVC，多实例用 StatefulSet。

### R 资源治理与安全

- [R-01 requests 管调度，limits 管上限](cards/R-01-requests-管调度-limits-管上限.md)：requests 管调度，limits 管运行上限，两者共同定 QoS。
- [R-02 ResourceQuota 给命名空间算总账](cards/R-02-ResourceQuota-给命名空间算总账.md)：一个 Namespace 一份配额，按请求、上限与对象数量封顶。
- [R-03 LimitRange 补默认值，也卡单容器上下限](cards/R-03-LimitRange-补默认值-也卡单容器上下限.md)：LimitRange 给容器补默认值，也限制单容器上下限。
- [R-04 QoS 三类决定资源紧张时谁先被驱逐](cards/R-04-QoS-三类决定资源紧张时谁先被驱逐.md)：requests 与 limits 的关系决定 Pod 的 QoS 与驱逐顺序。
- [R-05 RBAC 的权限边界由绑定范围决定](cards/R-05-RBAC-的权限边界由绑定范围决定.md)：Role 定权限，Binding 定范围，绑在哪个空间就在哪生效。
- [R-06 ServiceAccount 权限按用途拆开](cards/R-06-ServiceAccount-权限按用途拆开.md)：ServiceAccount 只解决身份，权限靠 RoleBinding。
- [R-07 多租户隔离要四件套一起上](cards/R-07-多租户隔离要四件套一起上.md)：Namespace 到 RBAC 四层都齐，才算租户隔离。

### E 工程化与扩展

- [E-01 Chart 是模板、默认值与元数据的打包](cards/E-01-Chart-是模板-默认值与元数据的打包.md)：Chart 把模板、默认值与元数据打成一个可复用包。
- [E-02 每次升级留一个可回滚的 revision](cards/E-02-每次升级留一个可回滚的-revision.md)：Release 每次升级留一个 revision，history 可查可回滚。
- [E-03 CRD 把运维对象注册成集群的 API 资源](cards/E-03-CRD-把运维对象注册成集群的-API-资源.md)：CRD 注册新 kind，之后就能用 kubectl 操作。
- [E-04 Operator 用控制器把运维知识代码化](cards/E-04-Operator-用控制器把运维知识代码化.md)：Operator 监听 CR，按 spec 创建并持续维持整套实例。
- [E-05 迁移先跑通，再改架构](cards/E-05-迁移先跑通-再改架构.md)：上 K8s 的第一步是容器化加清单化，注册中心与网关先原样搬进去。
- [E-06 注册中心退场前，先让 K8s DNS 接管寻址](cards/E-06-注册中心退场前-先让-K8s-DNS-接管寻址.md)：服务地址已改用 K8s DNS，注册中心的地址簿职责可被 Service 接管。

### O 可观测性

- [O-01 可观测性三支柱先日志后指标再链路](cards/O-01-可观测性三支柱先日志后指标再链路.md)：先让日志可查，再用指标设告警，最后用链路定位慢调用。
- [O-02 日志采集链路用 ECK 声明式部署](cards/O-02-日志采集链路用-ECK-声明式部署.md)：采集与入库用 ECK 声明，Kafka 另装，Kibana 查询。
- [O-03 日志采集范围靠条件与标签收窄](cards/O-03-日志采集范围靠条件与标签收窄.md)：先用条件限定命名空间或标签，再处理文件日志与 sidecar。
- [O-04 监控目标用自定义资源声明](cards/O-04-监控目标用自定义资源声明.md)：Prometheus Operator 用 CRD 描述采集目标，再生成配置。
- [O-05 告警规则写清 for 与标签才算可用](cards/O-05-告警规则写清-for-与标签才算可用.md)：规则决定何时告警，Alertmanager 决定发给谁。
- [O-06 全链路追踪靠 Agent 埋点串起来](cards/O-06-全链路追踪靠-Agent-埋点串起来.md)：OAP 收数据落 ES，UI 看拓扑，Agent 决定埋点粒度。

### A 弹性、网格与存储平台

- [A-01 HPA 按资源利用率自动增减副本](cards/A-01-HPA-按资源利用率自动增减副本.md)：HPA 按 requests 占比算副本数，没设 requests 就失真。
- [A-02 事件驱动伸缩用 KEDA 接外部指标](cards/A-02-事件驱动伸缩用-KEDA-接外部指标.md)：ScaledObject 描述触发源，KEDA 生成 HPA 执行扩缩容。
- [A-03 弹性指标要选业务真正卡住的地方](cards/A-03-弹性指标要选业务真正卡住的地方.md)：CPU 看算力，队列看积压，定时高峰用 cron。
- [A-04 Istio 控制面管配置数据面管流量](cards/A-04-Istio-控制面管配置数据面管流量.md)：istiod 管配置，网关接南北流量，sidecar 管东西流量。
- [A-05 路由决定流量落到哪个服务版本](cards/A-05-路由决定流量落到哪个服务版本.md)：先按标签划版本，再按权重或请求头分流。
- [A-06 CubeFS 四类节点各管一段存储职责](cards/A-06-CubeFS-四类节点各管一段存储职责.md)：四类节点分工：元信息、元数据、文件、对象接口。
- [A-07 CubeFS 选型看共享、扩容与对象存储](cards/A-07-CubeFS-选型看共享-扩容与对象存储.md)：要 RWX 共享、在线扩容和 S3 接口时，一套 CubeFS 就够。

### D 交付、多集群与容灾

- [D-01 流水线 Slave 建在集群里，用完即删](cards/D-01-流水线-Slave-建在集群里-用完即删.md)：Jenkins 主节点常驻，Slave 由插件按流水线创建，构建完删除。
- [D-02 云原生流水线把每个任务跑成一个 Pod](cards/D-02-云原生流水线把每个任务跑成一个-Pod.md)：Task 与 Pipeline 只声明，Run 对象才建 Pod。
- [D-03 多集群交付以 Git 为唯一事实源](cards/D-03-多集群交付以-Git-为唯一事实源.md)：Git 唯一源，ArgoCD 对齐集群，ApplicationSet 管多集群。
- [D-04 高可用入口收敛到 VIP 与三台 Master](cards/D-04-高可用入口收敛到-VIP-与三台-Master.md)：客户端只认 VIP，haproxy 把 16443 转到 apiserver。
- [D-05 可用性要按清单验证，不只看节点状态](cards/D-05-可用性要按清单验证-不只看节点状态.md)：节点 Ready 只是第一步，VIP、端口、DNS、跨节点通信都要逐项验。
- [D-06 下线与升级都先打污点再驱逐](cards/D-06-下线与升级都先打污点再驱逐.md)：下线、扩容、升级同一套顺序：打污点、迁 Pod、drain、恢复调度。
- [D-07 异地多活是每个大区一套集群加 LB](cards/D-07-异地多活是每个大区一套集群加-LB.md)：每个大区独立建集群和入口，云 LB 对外，GTM 按地域解析。
- [D-08 智能 DNS 用地址池和健康检查切流量](cards/D-08-智能-DNS-用地址池和健康检查切流量.md)：GTM 按健康检查和线路选地址池，主力全挂才走兜底地址池。
- [D-09 Velero 把集群资源备份进对象存储](cards/D-09-Velero-把集群资源备份进对象存储.md)：备份资源到对象存储，恢复时按备份重建，跨集群靠复制目录。
- [D-10 企业落地按 CI、GitOps、多活、备份推进](cards/D-10-企业落地按-CI-GitOps-多活-备份推进.md)：先 CI，再 GitOps 和高可用，然后多活，最后用 Velero 兜底。

## 内容边界

- 卡片只整理课件里出现的概念、参数与操作步骤，不代表生产环境的最佳实践全集。
- 命令与 YAML 来自课件演示环境，版本差异请以集群实际 API 为准。
