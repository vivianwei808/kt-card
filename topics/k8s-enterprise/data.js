window.KB_TOPIC = {
 "slug": "k8s-enterprise",
 "meta": {
  "slug": "k8s-enterprise",
  "title": "K8s 企业级深度研修",
  "subtitle": "从容器基础到多集群容灾，把 K8s 用成企业级平台",
  "description": "基于《51CTO 宽哥 K8s 企业级深度研修实战》40 章课件整理。覆盖容器基础、工作负载、服务发布、配置存储、资源治理、Helm/Operator、可观测性、弹性伸缩、服务网格、DevOps 与异地多活。",
  "source": "课程课件第 2 至 42 章，含 PDF / PPTX / DOCX 讲义",
  "updated": "2026-11-26",
  "accent": "#326ce5",
  "tags": [
   "Kubernetes",
   "云原生",
   "DevOps",
   "Istio",
   "可观测性"
  ]
 },
 "layers": [
  {
   "key": "M",
   "name": "总览与基座",
   "en": "Map",
   "color": "#475569",
   "desc": "云原生定位、K8s 架构组件、容器基础与集群初体验",
   "count": 9
  },
  {
   "key": "W",
   "name": "工作负载与调度",
   "en": "Workload",
   "color": "#b45309",
   "desc": "Pod、控制器、Job 与调度约束",
   "count": 11
  },
  {
   "key": "S",
   "name": "服务发布与流量",
   "en": "Service",
   "color": "#1d4ed8",
   "desc": "Label、Service、Ingress 与服务发现",
   "count": 7
  },
  {
   "key": "C",
   "name": "配置与存储",
   "en": "Config",
   "color": "#0f766e",
   "desc": "ConfigMap、Secret、Volume 与 PV/PVC/StorageClass",
   "count": 7
  },
  {
   "key": "R",
   "name": "资源治理与安全",
   "en": "Governance",
   "color": "#b91c1c",
   "desc": "配额、QoS、RBAC 与多租户隔离",
   "count": 7
  },
  {
   "key": "E",
   "name": "工程化与扩展",
   "en": "Engineering",
   "color": "#7c3aed",
   "desc": "Helm、Operator/CRD 与 SpringCloud 迁移",
   "count": 6
  },
  {
   "key": "O",
   "name": "可观测性",
   "en": "Observability",
   "color": "#0e7490",
   "desc": "日志、指标、链路追踪与告警",
   "count": 6
  },
  {
   "key": "A",
   "name": "弹性、网格与存储平台",
   "en": "Advanced",
   "color": "#047857",
   "desc": "HPA/KEDA、Istio、CubeFS",
   "count": 7
  },
  {
   "key": "D",
   "name": "交付、多集群与容灾",
   "en": "Delivery",
   "color": "#be185d",
   "desc": "CI/CD、GitOps、高可用、异地多活与备份",
   "count": 10
  }
 ],
 "cards": [
  {
   "id": "M-01",
   "layer": "M",
   "title": "K8s 已成为云原生落地的事实标准",
   "oneliner": "K8s 把部署、扩缩、服务发现与自愈收进声明式 API，成为云原生操作系统。",
   "mechanism": [
    "Kubernetes 前身是谷歌内部 Borg，2014 年 6 月开源，后捐给 CNCF，成为其第一个顶级项目。",
    "2017 年 7 月 v1.6 单集群支持 5000 节点、15 万 Pod；2018 年从 CNCF 毕业。",
    "只用 Docker 缺生命周期管理、服务发现、负载均衡、配置与存储管理，宿主机宕机容器不会自动恢复。",
    "K8s 提供声明式、自愈、健康检查、滚动更新、一键回滚、服务发现与负载均衡。",
    "演进路线是物理机、虚拟化、容器、容器编排与容器云，最后到 Serverless。",
    "CRI 把 K8s 与运行时解耦，不再为 Docker 单独维护 dockershim。"
   ],
   "code": [
    "Deployment：无状态服务（Java、PHP、Go、.Net），负责部署、运行与调度",
    "StatefulSet：有状态服务（MySQL、Kafka、Nacos、Zookeeper、Eureka）",
    "DaemonSet：守护进程（Filebeat、Fluentd、NodeExporter）",
    "Job/CronJob：备份与定期任务"
   ],
   "reuse": [
    "先判断服务有无状态，无状态交 Deployment，有状态交 StatefulSet。",
    "日志、中间件、定时任务分别对应 DaemonSet 与 Job/CronJob，不要全塞进 Deployment。",
    "用 kubectl get deploy -n kube-system 看系统组件，作为集群是否健康的基线。"
   ],
   "interview": "K8s 是把谷歌 Borg 的生产经验开源出来的容器编排系统，它用声明式 API 把部署、扩缩、服务发现和自愈统一起来，所以成了云原生的基座。",
   "pitfall": "把 K8s 当成能远程 docker run 的机器，不设副本、探针和资源，节点宕机后还得人工恢复，等于没用上编排能力。",
   "source": "第8章 K8s设计思想必知必会",
   "tags": [
    "云原生",
    "Kubernetes",
    "Borg",
    "CRI"
   ]
  },
  {
   "id": "M-02",
   "layer": "M",
   "title": "控制面四组件分工决定排查顺序",
   "oneliner": "控制面组件都通过 Etcd 交互，用循环把状态对齐。",
   "mechanism": [
    "APIServer 提供资源增删改查与 watch 的 REST 接口，是唯一直接读写 Etcd 的组件。",
    "APIServer 无状态，可以直接横向扩容，集群状态全部落在 Etcd。",
    "Scheduler 监听 nodeName 为空的 Pod，选出节点写 binding，再由 kubelet 启动。",
    "Controller Manager 比对期望值与实际值，副本数不达标时自动补齐。",
    "Etcd 是集群后台键值数据库，生产建议部署 3 个以上的奇数节点，数据盘用 SSD。",
    "Scheduler 与 Controller 是有状态组件，主节点信息记录在 leases 资源里，选主无需人工干预。"
   ],
   "code": [
    "kubectl get leases -n kube-system：查看 Scheduler 和 Controller 的主节点选主记录",
    "pod.spec.nodeName：为空说明 Pod 还没被调度",
    "kubectl get deploy -n kube-system：核对控制面工作负载",
    "kubeadm init --apiserver-advertise-address 192.168.181.134：指定 APIServer 对外地址"
   ],
   "reuse": [
    "排障顺序固定为 APIServer 可用性、leases 选主、Etcd 成员状态。",
    "Etcd 节点数取大于 3 的奇数，单独挂 SSD 数据盘。",
    "控制面对象一律加 -n kube-system 查看，避免和业务命名空间混在一起。"
   ],
   "interview": "APIServer 是唯一读写 Etcd 的入口，Scheduler 只给未绑定的 Pod 选节点写 binding，Controller Manager 负责把实际状态拉回期望值。",
   "pitfall": "以为 Scheduler 会启动 Pod。它只写绑定关系，真正调 CRI 起容器的是节点上的 kubelet；Pod 一直 Pending 时先看有没有可调度节点。",
   "source": "第8章 K8s设计思想必知必会",
   "tags": [
    "APIServer",
    "Scheduler",
    "Etcd",
    "控制面"
   ]
  },
  {
   "id": "M-03",
   "layer": "M",
   "title": "工作节点靠 kubelet 和运行时落地 Pod",
   "oneliner": "kubelet 执行、kube-proxy 转发、运行时经 CRI 接入。",
   "mechanism": [
    "Kubelet 管理本节点 Pod，做容器健康检查与监控，并上报节点和 Pod 状态。",
    "Kube-Proxy 维护节点网络规则，负责 Service 与 Pod 之间的请求路由和流量转发。",
    "Container Runtime 需符合 CRI，Containerd、CRI-O、Kata 均可接入。",
    "containerd 从 Docker 剥离后捐给 CNCF，调用链止于 runc。",
    "用 Cilium 做 CNI 时可以不装 kube-proxy。",
    "containerd 的 pause 镜像地址要换成本地可达的仓库，否则节点拉不到沙箱镜像。"
   ],
   "code": [
    "crictl ps：按 CRI 规范查看节点上的容器",
    "crictl logs：查看 Pod 内容器的日志",
    "ctr -n k8s.io c ls：在 k8s.io 命名空间下看 containerd 容器",
    "sed -i 's#SystemdCgroup = false#SystemdCgroup = true#g' /etc/containerd/config.toml",
    "kubeadm init --cri-socket unix:///var/run/containerd/containerd.sock"
   ],
   "reuse": [
    "新节点先 systemctl enable --now containerd，确认服务正常再 kubeadm join。",
    "容器起不来先 crictl ps -a 看状态，再 crictl logs 看输出。",
    "所有节点统一改 containerd 的 pause 镜像和 cgroup 配置，改完 restart containerd。"
   ],
   "interview": "kubelet 是节点上的代理，向 APIServer 汇报状态并通过 CRI 起容器；kube-proxy 只维护 Service 的转发规则；运行时只要实现 CRI 就能被接管。",
   "pitfall": "在宿主机 docker ps 看不到 Pod 容器就以为容器没起来；Pod 的容器在 containerd 的 k8s.io 命名空间里，要用 crictl 查。",
   "source": "第4-8章 容器运行时与 K8s 架构",
   "tags": [
    "kubelet",
    "containerd",
    "CRI",
    "kube-proxy"
   ]
  },
  {
   "id": "M-04",
   "layer": "M",
   "title": "声明式 API 加控制器循环撑起自愈",
   "oneliner": "提交期望状态，控制器循环负责把现实拉回来。",
   "mechanism": [
    "用户提交 YAML 描述期望状态，APIServer 校验后写入 Etcd，不直接执行任何动作。",
    "控制器 list/watch 资源，比对期望值与实际值，不一致就发起变更，直到一致。",
    "Controller Manager 承担这类循环，副本不足时补齐，异常退出后拉回设定值。",
    "Scheduler 本身也是 watch 循环，只处理 nodeName 为空的 Pod。",
    "状态存在 Etcd，组件重启后读回期望状态继续收敛，不依赖进程内存。",
    "kubectl apply 是声明式入口，重复执行结果一致；replace 用整份文件替换。"
   ],
   "code": [
    "kubectl apply -f xxx.yaml：声明式提交，可重复执行",
    "kubectl replace -f xxx.yaml：整份替换线上对象",
    "kubectl edit deploy nginx：在线改对象，保存即触发收敛",
    "kubectl create deployment nginx --image=registry.cn-beijing.aliyuncs.com/dotbalo/counter:v1 --dry-run=client -o yaml：先生成 YAML",
    "kubectl get deploy nginx -oyaml：拿线上的期望状态"
   ],
   "reuse": [
    "生产只用 apply -f，把 YAML 放进版本库，禁止 edit 线上对象。",
    "改副本、镜像、资源都走 YAML 再 apply 一遍。",
    "改了没生效，先 kubectl get -oyaml 对比 Git 里的 YAML。"
   ],
   "interview": "声明式 API 只记录期望状态，控制器循环不断比对并对齐，自愈、滚动更新、回滚都是这个循环在不同资源上的表现。",
   "pitfall": "用 kubectl edit 手改线上对象，Git 里的 YAML 没同步，下一次 apply 把改动覆盖回去。",
   "source": "第8章 K8s设计思想必知必会",
   "tags": [
    "声明式",
    "控制器",
    "watch",
    "apply"
   ]
  },
  {
   "id": "M-05",
   "layer": "M",
   "title": "namespace 隔视图，cgroup 限用量",
   "oneliner": "容器用 namespace 隔视图，用 cgroup 限用量，共享宿主机内核。",
   "mechanism": [
    "容器是轻量级虚拟化，不装完整操作系统，复用宿主机内核，所以创建和启动快。",
    "Pod 内多个容器共享存储、网络、PID、IPC，pause 容器负责提供这些共享视图。",
    "资源上限由 cgroup 管，docker info 里的 Cgroup Version 为 2。",
    "cgroup driver 要与运行时一致，containerd 的 SystemdCgroup 要改成 true。",
    "安全边界再叠 seccomp，Docker 默认启用内置 profile，docker-init 负责 PID 1。",
    "隔离粒度比虚拟机细，但共享内核，隔离强度低于虚拟机。"
   ],
   "code": [
    "docker info：看 Storage Driver、Cgroup Driver、Cgroup Version、Security Options",
    "sed -i 's#SystemdCgroup = false#SystemdCgroup = true#g' /etc/containerd/config.toml",
    "ctr ns ls：列出 containerd 命名空间，和 K8s 的 Namespace 是两个概念",
    "pod.spec.containers[].resources.limits：内存上限，超限会被 OOMKilled"
   ],
   "reuse": [
    "节点交付前核对 cgroup driver，containerd 的 SystemdCgroup 与 kubelet 保持一致。",
    "内存 Limit 按实测峰值留余量，不要把 requests 当 Limit 用。",
    "遇到 OOMKilled 先看 Limit 再排程序内存，别急着扩节点。"
   ],
   "interview": "容器用 namespace 隔离网络、PID、IPC 这些视图，用 cgroup 限制 CPU 和内存；两者都由宿主机内核提供，所以起得快，隔离强度不如虚拟机。",
   "pitfall": "只把 kubelet 的 cgroup driver 设成 systemd，containerd 还留着 SystemdCgroup = false，两边不一致，资源视图对不上。",
   "source": "第4-7章 必备容器基础",
   "tags": [
    "namespace",
    "cgroup",
    "隔离",
    "seccomp"
   ]
  },
  {
   "id": "M-06",
   "layer": "M",
   "title": "镜像是模板，容器是运行实例",
   "oneliner": "镜像是只读模板，容器是实例，仓库负责存和分发。",
   "mechanism": [
    "镜像是载体，容器是实例，同一个镜像可以反复启动多个容器。",
    "镜像地址由 registry、repository、tag 三段组成。",
    "不写 tag 默认 latest，docker pull nginx 实际拉的就是 latest。",
    "推送前先 docker tag 成 仓库地址/命名空间/名字:版本 再 push，拉取时要写全地址。",
    "Harbor 默认账号 admin:Harbor12345，HTTP 访问要配 insecure-registries。",
    "符合 OCI 的镜像都能在 K8s 里跑，K8s 不依赖 Docker 也能拉同一份镜像。"
   ],
   "code": [
    "gcr.k8s.io/coreos/prometheus-adapter:0.8：三段依次是 registry、repository、tag",
    "docker tag nginx-v2 dotbalo/nginx-v2:test：改成带仓库地址的 tag",
    "docker save -o counter-v2.tar 与 docker load -i counter-v2.tar：离线搬运镜像",
    "ctr -n k8s.io i ls：在 K8s 使用的命名空间看镜像",
    "containerd 的 registry.mirrors 配 endpoint = [\"http://192.168.181.200\"]：内网 HTTP 仓库"
   ],
   "reuse": [
    "tag 用版本号或 commit，禁止 latest 上生产。",
    "内网仓库优先上 HTTPS；只能 HTTP 时，Docker 改 daemon.json 的 insecure-registries。",
    "containerd 走 registry.mirrors 的 endpoint，改完重启 containerd 和 kubelet。",
    "镜像拉取失败先 docker login 或核对仓库地址，再查节点到仓库的网络。"
   ],
   "interview": "镜像是只读模板，容器是它跑起来的实例；仓库负责存储和分发，地址由 registry、repository、tag 组成，K8s 侧拉镜像走的是 containerd。",
   "pitfall": "在节点上用 docker pull 拉完镜像，以为 containerd 就能直接用；docker 拉取的镜像和 containerd 没有任何关系。",
   "source": "第4-7章 必备容器基础",
   "tags": [
    "镜像",
    "Harbor",
    "OCI",
    "镜像仓库"
   ]
  },
  {
   "id": "M-07",
   "layer": "M",
   "title": "镜像瘦身先换基础镜像再做多阶段",
   "oneliner": "先换基础镜像压底座，再用多阶段把工具链留在构建阶段。",
   "mechanism": [
    "Dockerfile 每条指令一层，docker history 可看层大小，centos:7 底座 194MB。",
    "换 Alpine 基础镜像后，同样创建用户的镜像从 194MB 降到 5.57MB。",
    "多阶段构建只把二进制 COPY 进最终镜像，Go 程序从 372MB 降到 2.07MB。",
    "多条 RUN 合并成一条，源替换、apk update、apk add 用分号连写，少一层中间产物。",
    "需要改权限的文件在容器外解压、chown 完再 COPY，镜像里就少一层。",
    "CMD 会被 docker run 后面的命令覆盖，ENTRYPOINT 不会；--entrypoint 可临时替换。"
   ],
   "code": [
    "docker history 949582cb3192：逐层看镜像体积来源",
    "FROM registry.cn-beijing.aliyuncs.com/dotbalo/alpine:3.20：换掉 centos 底座",
    "COPY --from=builder /opt/hw .：多阶段只带二进制产物",
    "RUN sed -i \"s@dl-cdn.alpinelinux.org@mirrors.aliyun.com@g\" /etc/apk/repositories; apk update; apk add nginx curl：合成一层",
    "docker build --build-arg USERNAME=\"test_arg\" -t test:arg .：ARG 动态传参"
   ],
   "reuse": [
    "构建前先 docker history 找最大的一层，再决定换底座还是拆阶段。",
    "Go、Java 这类编译型服务一律多阶段，构建工具链不进运行镜像。",
    "USER 指定非 root（如 USER 1001），COPY 时用 --chown 修属主。",
    "启动命令用 ENTRYPOINT，需要允许外部覆盖时才用 CMD。"
   ],
   "interview": "镜像优化先换小的基础镜像，再用多阶段构建把编译环境留在 builder 阶段，最后合并 RUN 减少层；一个 Go 程序能从 372MB 降到 2.07MB。",
   "pitfall": "只把 FROM 换成 alpine 就算优化完，编译缓存和工具链还在同一阶段；或者把启动命令写在 CMD 里，被 docker run 的附加参数覆盖。",
   "source": "第4-7章 必备容器基础",
   "tags": [
    "Dockerfile",
    "多阶段构建",
    "Alpine",
    "镜像优化"
   ]
  },
  {
   "id": "M-08",
   "layer": "M",
   "title": "集群从裸机到可用只需 kubeadm 三件事",
   "oneliner": "三件事：关 swap、装 containerd、kubeadm 初始化。",
   "mechanism": [
    "环境：1 台控制节点加 3-4 台工作节点，每台 2C4G 以上，系统 Rocky、CentOS 或 Ubuntu。",
    "所有节点先关防火墙、selinux、dnsmasq、swap，并把 /etc/fstab 里的 swap 行注释掉。",
    "装 containerd 后改 SystemdCgroup = true，把 pause 镜像地址换成可达的仓库。",
    "kubeadm init 指定 APIServer 地址、镜像仓库和 cri-socket，join 用 token。",
    "Addons 用仓库里的 single 目录，kubectl apply -f . 一次装完。",
    "kubectl 按 [command] [TYPE] [NAME] [flags] 组织，查用 get、增用 apply。"
   ],
   "code": [
    "swapoff -a && sysctl -w vm.swappiness=0：关 swap，再注释 /etc/fstab 对应行",
    "kubeadm config images pull --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers --kubernetes-version 1.32.0",
    "kubeadm init --apiserver-advertise-address 192.168.181.134 --cri-socket unix:///var/run/containerd/containerd.sock",
    "kubeadm join 192.168.181.134:6443 --token ... --discovery-token-ca-cert-hash sha256:...",
    "kubectl get po -owide --show-labels：看节点、IP 与标签"
   ],
   "reuse": [
    "所有节点都要改 containerd 的 pause 镜像和 cgroup 配置，不只改控制节点。",
    "init 完先 kubectl get node 看是否 Ready，再装 Addons。",
    "排查统一用 get 看状态、describe 看事件、logs 看输出。"
   ],
   "interview": "用 kubeadm init 拉起控制面、kubeadm join 加节点，运行时用 containerd；装完所有操作都收敛到 kubectl，get 看状态、describe 看事件、logs 看输出。",
   "pitfall": "只验证控制节点能跑，工作节点的 containerd 还指向 gcr 的 pause 镜像，join 上来后 Pod 一直卡在 ContainerCreating。",
   "source": "第3章 云原生基石：K8s初体验",
   "tags": [
    "kubeadm",
    "kubectl",
    "containerd",
    "集群搭建"
   ]
  },
  {
   "id": "M-09",
   "layer": "M",
   "title": "Namespace 把一套集群切成多套环境",
   "oneliner": "按环境和团队切 Namespace，一套集群当多套用。",
   "mechanism": [
    "Namespace 把集群资源做逻辑隔离，相当于在物理集群上切出多个独立环境。",
    "不指定命名空间时落 default；kube-system 放系统组件，kube-public 任何人可读。",
    "按环境切成 project-dev、project-sit、project-uat、project-prod 四套。",
    "同一 Namespace 内服务发现和负载均衡更简单，访问权限也可以按 Namespace 分别授权。",
    "Namespace 同时是资源配额的划分单位，配合配额能限制每个环境的用量。",
    "名字最长 63 个字符，只能包含字母、数字和中横线，首尾必须是字母或数字。"
   ],
   "code": [
    "kubectl create ns development",
    "kubectl get ns development --show-labels",
    "kind: Namespace 配合 metadata.name: development：用 YAML 创建命名空间",
    "kubectl delete ns NAMESPACE_NAME"
   ],
   "reuse": [
    "建集群第一天就把 dev/sit/uat/prod 和公共组件的命名空间规划好。",
    "所有命令显式带 -n，CI 里用变量传命名空间。",
    "删除前先用 kubectl get 逐个确认里面没有生产资源，删 Namespace 会连带删掉全部内容。"
   ],
   "interview": "Namespace 是集群内的逻辑隔离单位，通常按环境或团队切；它只是逻辑边界，权限和配额要另外配才完整。",
   "pitfall": "命令不带 -n，资源全落进 default，测试和生产混在一起；或者把删除 Namespace 当成删空目录，里面的 Deployment 和 Service 一起没了。",
   "source": "第9章 K8s初体验",
   "tags": [
    "Namespace",
    "环境隔离",
    "多租户",
    "kubectl"
   ]
  },
  {
   "id": "W-01",
   "layer": "W",
   "title": "Pod 是调度与运行的最小单元",
   "oneliner": "Pod 是最小单元，一个 Pod 可放多个容器，副本与调度都按它算。",
   "mechanism": [
    "Pod 必选 apiVersion、kind、metadata.name 与 spec.containers。",
    "kubectl create -f 提交后 Pod 先为 ContainerCreating，就绪后转 Running。",
    "命令行也能起 Pod：kubectl run nginx-run --image=nginx:1.15.12。",
    "containerPort 是可选的端口声明项，一个容器可以声明多个端口。",
    "resources 分 requests 与 limits，cpu 以 m 计，1 核等于 1000m。",
    "imagePullPolicy 默认随 tag：latest 用 Always，其余用 IfNotPresent。"
   ],
   "code": [
    "kubectl create -f nginx.yaml：按 YAML 创建 Pod，输出 pod/nginx created",
    "kubectl run nginx-run --image=nginx:1.15.12：命令行创建 Pod",
    "kubectl get po nginx：看 READY 与 STATUS，创建中为 0/1 与 ContainerCreating",
    "spec.containers[].resources.requests.memory: \"100Mi\"：内存请求，单位支持 Mi、Gi、Ti",
    "spec.containers[].image: registry.cn-beijing.aliyuncs.com/dotbalo/nginx:stable：容器镜像地址"
   ],
   "reuse": [
    "先用 kubectl run 起一个最小 Pod 验证镜像能拉取，再写正式 YAML。",
    "检查 metadata.name 与容器 name 是否符合 RFC 1035，这是创建时的硬性要求。",
    "resources 的 requests 与 limits 成对写，cpu 用 m、内存用 Mi 或 Gi。",
    "用 kubectl get po 盯着 ContainerCreating 到 Running，卡住先查镜像仓库可达性。"
   ],
   "interview": "Pod 是 K8s 里调度和运行的最小单位，一个 Pod 可以放多个容器，创建后从 ContainerCreating 走到 Running，重启策略默认 Always。",
   "pitfall": "镜像用 latest tag 却没注意 imagePullPolicy 默认变成 Always，每次启动都要去拉镜像，节点没网就直接起不来。",
   "source": "第10章 Pod 入门与实战",
   "tags": [
    "Pod",
    "容器",
    "调度"
   ]
  },
  {
   "id": "W-02",
   "layer": "W",
   "title": "命令与环境变量让镜像适配运行环境",
   "oneliner": "command 换入口，env 用 fieldRef 注入 Pod 字段。",
   "mechanism": [
    "spec.containers[].command 覆盖镜像的启动命令，写成数组形式。",
    "示例把 command 设为 sleep 与 \"600\" 两个元素，容器保持运行。",
    "env 用 name 与 value 注入常量，示例 ENV=test。",
    "fieldRef 可引用 metadata.name、metadata.namespace 注入环境变量。",
    "常用字段还有 spec.nodeName、status.podIP、status.hostIP。",
    "metadata.uid、labels[xxx]、annotations[xxx] 也能被引用。"
   ],
   "code": [
    "command: [sh, -c, 'sleep 30; nginx -g \"daemon off;\"']：覆盖容器启动命令",
    "env[].valueFrom.fieldRef.fieldPath: metadata.name：注入 Pod 名称",
    "fieldPath: spec.nodeName：注入 Pod 所在节点名",
    "fieldPath: status.podIP：注入 Pod 的 IP",
    "fieldPath: metadata.namespace：注入 Pod 所在命名空间"
   ],
   "reuse": [
    "把 Pod 名称、命名空间、节点名注入成环境变量，应用日志带上它们便于定位副本。",
    "写 fieldRef 前对照课件列出的可选字段，fieldPath 必须是真实存在的路径。",
    "调试容器时用 command 覆盖成 sleep，再 kubectl exec 进去看现场。"
   ],
   "interview": "command 覆盖镜像的入口命令，env 既能写死常量，也能用 valueFrom.fieldRef 把 Pod 名称、命名空间、节点名、Pod IP 这些字段读进容器。",
   "pitfall": "fieldRef 的 fieldPath 写错，Pod 起不来；可选字段只有 metadata、spec、status 下那几项，容器名、自定义路径都不行。",
   "source": "第10章 Pod 入门与实战",
   "tags": [
    "Pod",
    "环境变量",
    "fieldRef"
   ]
  },
  {
   "id": "W-03",
   "layer": "W",
   "title": "三种探针分工：启动、存活、就绪",
   "oneliner": "startup 管启动，liveness 管存活，readiness 管接流量。",
   "mechanism": [
    "startupProbe 1.16 新增，配了它会先禁用其他探针，直到它成功为止。",
    "startupProbe 失败时 kubelet 杀死容器，按 restartPolicy 处理，成功后不再探测。",
    "livenessProbe 失败同样杀死容器，未配置时该探针默认 Success。",
    "readinessProbe 失败，Endpoints Controller 剔除该 Pod IP。",
    "检查方式四种：Exec 返回 0、TCP 端口通、HTTPGet 200~400、GRPC SERVING。",
    "initialDelaySeconds 控制首次延迟，periodSeconds 控制检测间隔。"
   ],
   "code": [
    "spec.containers[].readinessProbe.httpGet.path: /index.html：就绪探测路径",
    "spec.containers[].livenessProbe.tcpSocket.port: 80：端口存活探测",
    "spec.containers[].startupProbe.failureThreshold: 5：启动探测连续失败 5 次判失败",
    "lifecycle.preStop.exec.command: sleep 10：容器停止前执行的钩子",
    "spec.restartPolicy: Never：容器退出后不重启，默认 Always"
   ],
   "reuse": [
    "启动慢的服务先配 startupProbe，再配 liveness，避免启动期被误杀。",
    "initialDelaySeconds 按冷启动实测值给，failureThreshold 留两次以上缓冲。",
    "readiness 指向业务真实路径，探测成功后才让 Endpoints 收录该 Pod。",
    "preStop 里放 sleep，给摘流量和连接排空留出窗口。"
   ],
   "interview": "三种探针各管一段：startupProbe 覆盖启动期并屏蔽其他探针，livenessProbe 失败就杀容器按重启策略来，readinessProbe 失败就把 Pod IP 从 Endpoints 摘掉。",
   "pitfall": "只配 liveness 不配 startup，应用冷启动 30 秒而探测 10 秒就判死，Pod 陷入反复重启。",
   "source": "第10章 Pod 入门与实战",
   "tags": [
    "Pod",
    "探针",
    "livenessProbe",
    "readinessProbe"
   ]
  },
  {
   "id": "W-04",
   "layer": "W",
   "title": "一个 Pod 可放多容器，初始化容器先跑",
   "oneliner": "主容器跑业务，初始化容器在主容器之前把依赖文件准备好。",
   "mechanism": [
    "spec.containers 是容器列表，一个 Pod 可声明多个容器，各自指定镜像与端口。",
    "同一 Pod 内多个容器不能重名，name 同样要符合 RFC 1035。",
    "示例 Pod 用 nginx:stable 监听 80，同时用 redis:7.2.5 监听 6379。",
    "initContainers 在主容器之前执行，用来准备主容器启动所需的文件。",
    "Skywalking 示例用 emptyDir，init 容器把 agent 复制到 /agent，业务容器挂载后加载。",
    "init 容器同样能设 securityContext 与 command，ES 示例提权跑 sysctl。"
   ],
   "code": [
    "spec.containers[]：容器列表，每项含 name、image、ports，同 Pod 内 name 不能重复",
    "spec.initContainers[].command: ['sh','-c','cp -R /skywalking/agent /agent/']：启动前复制 agent",
    "spec.volumes[].emptyDir: {}：Pod 内容器共享的临时目录",
    "volumeMounts[].mountPath: /agent：初始化容器写入，主容器从同一卷读取",
    "securityContext.privileged: true：init 容器提权执行 sysctl 调整内核参数"
   ],
   "reuse": [
    "把渲染配置、下载依赖、改权限这类一次性动作放进 initContainers，主容器只起业务进程。",
    "先给共享目录建 emptyDir 卷，再让 init 容器写、主容器读。",
    "检查同一 Pod 内所有容器 name，重复会直接创建失败。"
   ],
   "interview": "一个 Pod 里可以放多个容器，name 不能重名；initContainers 在主容器之前跑完，常见做法是用 emptyDir 把依赖文件准备好再交给业务容器。",
   "pitfall": "把初始化逻辑塞进主容器的启动脚本，失败后整个业务容器跟着重启，重试和排查都不受控。",
   "source": "第10章 Pod 入门与实战；第32章 K8s可观测性：全链路追踪",
   "tags": [
    "Pod",
    "InitContainer",
    "emptyDir"
   ]
  },
  {
   "id": "W-05",
   "layer": "W",
   "title": "滚动更新只在 Pod 模板变更时触发",
   "oneliner": "改 spec.template 才发版，回滚靠旧 RS 与 revision。",
   "mechanism": [
    "1.16 起 Deployment 只能用 apps/v1，selector 必填并对齐 template 标签。",
    "只有 .spec.template 变更才触发滚动更新，改镜像、CPU、内存都算。",
    "更新策略默认 RollingUpdate，Recreate 会先删掉全部旧 Pod。",
    "maxUnavailable 与 maxSurge 默认各 25%，两者不能同时为 0。",
    "3 副本按默认值滚动时，先扩新 RS 到 1、缩旧 RS 到 2，最多 4 个 Pod、至少 2 个可用。",
    "每次更新生成新 ReplicaSet，旧 RS 保留供回滚，默认留 10 个。"
   ],
   "code": [
    "kubectl set image deployment nginx nginx=registry.cn-beijing.aliyuncs.com/dotbalo/nginx:1.15.12 --record：改镜像并记录 change-cause",
    "kubectl rollout status deploy nginx：观察新旧副本交替过程",
    "kubectl rollout undo deployment/nginx --to-revision=2：回滚到指定 revision",
    "spec.strategy.rollingUpdate.maxSurge: 25%：超出期望值的 Pod 上限",
    "spec.revisionHistoryLimit: 10：保留的历史 RS 数，0 表示不保留"
   ],
   "reuse": [
    "上线前把 maxUnavailable 设 0、maxSurge 设 1，先加后减，避免容量抖动。",
    "发布加 --record，回滚前用 kubectl rollout history 确认 revision 对应的变更。",
    "要一次改多处就先 kubectl rollout pause，改完再 resume。",
    "检查 revisionHistoryLimit，设成 0 会失去回滚能力。"
   ],
   "interview": "Deployment 只有 Pod 模板变了才滚动更新，每次生成新 ReplicaSet，旧版本默认保留 10 个供 rollout undo 回滚，更新节奏由 maxUnavailable 和 maxSurge 控制。",
   "pitfall": "以为改 replicas 也会产生新 revision；扩缩容不触发滚动更新，rollout undo 也回不到副本数。",
   "source": "第11-12章 调度资源",
   "tags": [
    "Deployment",
    "滚动更新",
    "ReplicaSet"
   ]
  },
  {
   "id": "W-06",
   "layer": "W",
   "title": "StatefulSet 给每个副本固定序号与域名",
   "oneliner": "Pod 名固定为 web-0..N-1，域名来自 Headless。",
   "mechanism": [
    "StatefulSet 必须配 Headless Service，clusterIP 为 None。",
    "Pod 按序号命名 web-0、web-1，扩到 5 个时依次补出 web-2 到 web-4。",
    "缩容从最大序号删起，5 改 3 时 web-4、web-3 依次进入 Terminating。",
    "DNS 域名由 StatefulSet 名、序号、serviceName 与命名空间拼成。",
    "podManagementPolicy 默认 OrderedReady，创建正序、删除同时。",
    "updateStrategy 默认 RollingUpdate 且倒序更新，partition 控制从哪个序号开始更新。"
   ],
   "code": [
    "spec.serviceName: nginx：绑定 Headless Service，必填",
    "web-0.nginx.default.svc.cluster.local：Headless 域名格式，同命名空间可省后缀",
    "spec.updateStrategy.rollingUpdate.partition: 3：只更新序号大于等于 3 的 Pod",
    "kubectl rollout undo sts web --to-revision=2：回滚，历史保存在 ControllerRevision",
    "kubectl delete statefulset web --cascade=false：非级联删除，Pod 成为孤儿"
   ],
   "reuse": [
    "先建 clusterIP: None 的 Headless Service，再写 StatefulSet 填 serviceName。",
    "用 kubectl get pods -w -l app=nginx 看扩容正序、缩容倒序。",
    "灰度用 partition 从最大序号往下推，确认 web-2 没问题再放 web-1。",
    "删 StatefulSet 前确认是否要 --cascade=false，避免连 Pod 一起删。"
   ],
   "interview": "StatefulSet 给每个 Pod 固定序号和稳定域名，靠 Headless Service 做服务发现，默认倒序滚动更新，还能用 partition 做分段灰度。",
   "pitfall": "Headless Service 忘了建或 serviceName 写错，Pod 虽然 Running 但没有稳定域名，副本之间互相找不到。",
   "source": "第11-12章 调度资源",
   "tags": [
    "StatefulSet",
    "Headless Service",
    "ControllerRevision"
   ]
  },
  {
   "id": "W-07",
   "layer": "W",
   "title": "DaemonSet 在每个匹配节点常驻一份",
   "oneliner": "没有 replicas，节点增减即 Pod 增减，适合节点级守护进程。",
   "mechanism": [
    "DaemonSet 不写 replicas，控制器在集群每个节点创建一个 Pod。",
    ".spec 唯一必需字段是 template，写法同 Pod，但没有 apiVersion 与 kind。",
    "template 的标签要与 selector 对齐，否则控制器找不到自己管的 Pod。",
    "新增节点或节点标签变化时，立刻向新匹配节点加 Pod，删掉不匹配节点上的 Pod。",
    "updateStrategy 有 RollingUpdate 与 OnDelete，默认 RollingUpdate。",
    "nodeSelector 写在 template 里，把 DaemonSet 限定到指定节点。"
   ],
   "code": [
    "kubectl create -f nginx-ds.yaml：每个节点生成一个 nginx Pod",
    "kubectl get po -o wide：核对每个 DaemonSet Pod 落在哪个节点",
    "kubectl get ds nginx-ds -o go-template='{{.spec.updateStrategy.type}}'：查看更新策略",
    "spec.template.spec.nodeSelector.disktype: ssd：只在 ssd 节点部署",
    "kubectl rollout undo daemonset nginx-ds --to-revision=1：回滚，历史在 ControllerRevision"
   ],
   "reuse": [
    "部署前检查目标节点是否带 NoSchedule 污点，必要时在模板里加 tolerations。",
    "先给节点打 disktype 之类的标签，再写 nodeSelector，标签改动会立刻引起 Pod 增删。",
    "用 kubectl get po -o wide 对比 Pod 数和节点数，少一个说明该节点不满足选择器或带污点。"
   ],
   "interview": "DaemonSet 没有副本数概念，每个节点一份，节点加入或标签变化都会自动增删，典型用在 calico、kube-proxy、csi 这类节点级组件上。",
   "pitfall": "以为 DaemonSet 会铺满全部节点；template 里写了 nodeSelector，或节点带 NoSchedule 污点，Pod 就不会出现在这些节点上。",
   "source": "第11-12章 调度资源",
   "tags": [
    "DaemonSet",
    "节点",
    "nodeSelector"
   ]
  },
  {
   "id": "W-08",
   "layer": "W",
   "title": "Job 管完成次数，CronJob 管定时触发",
   "oneliner": "Job 靠 completions 判成功，CronJob 定时生成 Job。",
   "mechanism": [
    "Job 用 batch/v1 定义，Pod 模板的 restartPolicy 写 Never 或 OnFailure。",
    "completions 是期望成功次数，parallelism 是同时跑的 Pod 数，2 并发跑满 5 次。",
    "backoffLimit 限制重试次数，用满后 Job 标记 Failed。",
    "CronJob 的 concurrencyPolicy 有 Allow、Forbid、Replace，默认 Allow。",
    "执行记录默认保留成功 3 次、失败 1 次，可用两个 HistoryLimit 字段调大。",
    "timeZone 默认 UTC，不写就按 kube-controller-manager 的时区调度。"
   ],
   "code": [
    "kubectl create job hello --image=registry.cn-beijing.aliyuncs.com/dotbalo/busybox -- echo \"Hello, Job\"：一次性任务",
    "spec.parallelism: 2 与 spec.completions: 5：2 个 Pod 并发，完成 5 次结束",
    "spec.concurrencyPolicy: Forbid：上次没结束就不新建",
    "spec.schedule: '*/1 * * * *'：每分钟触发一次",
    "spec.timeZone: Asia/Shanghai：指定调度时区，1.25 起需开 CronJobTimeZone 特性门控"
   ],
   "reuse": [
    "定时任务先写 timeZone，不写就按 UTC 跑，'00 01 * * *' 可能落在本地九点。",
    "长任务用 Forbid 或 Replace，避免前一次没结束就叠加下一次。",
    "调大 successfulJobsHistoryLimit 与 failedJobsHistoryLimit，保留足够历史 Job 查日志。",
    "任务要能重复执行，backoffLimit 用满后 Job 直接 Failed，需要人工介入。"
   ],
   "interview": "Job 用 completions 和 parallelism 控制跑几次、并发几个，CronJob 按 cron 表达式定时生成 Job，并发由 concurrencyPolicy 控制，时区默认 UTC 要显式配。",
   "pitfall": "schedule 写 '00 01 * * *' 就算凌晨一点，没配 timeZone，controller 跑在 UTC 上，任务落在本地九点。",
   "source": "第17章 K8s任务管理",
   "tags": [
    "Job",
    "CronJob",
    "批处理"
   ]
  },
  {
   "id": "W-09",
   "layer": "W",
   "title": "nodeSelector 用节点标签锁定落点",
   "oneliner": "nodeSelector 是硬匹配，节点有污点时还要额外配容忍。",
   "mechanism": [
    "Pod 模板里的 schedulerName 默认 default-scheduler，由它完成节点选择。",
    "nodeSelector 按节点标签匹配，键和值都对上才会被选中。",
    "节点标签先用 kubectl label node 打，如 zone=beijing-haidian。",
    "DaemonSet 用 template 里的 nodeSelector 限定节点，示例 disktype: ssd。",
    "节点标签变化或新增节点时，DaemonSet 立刻补齐 Pod，不匹配的节点删掉。",
    "专用节点同时有污点和标签时，Pod 要写 nodeSelector 加 tolerations 才能落上去。"
   ],
   "code": [
    "spec.template.spec.schedulerName: default-scheduler：指定调度器",
    "spec.template.spec.nodeSelector.disktype: ssd：只在带该标签的节点创建",
    "kubectl label node k8s-node02 ingress=true：给节点打标签",
    "kubectl get po -o wide：查看 Pod 实际落在哪个节点",
    "spec.template.spec.nodeSelector.gpu: \"true\"：GPU 节点的选择器写法"
   ],
   "reuse": [
    "先 kubectl label node 打标签，再写 nodeSelector，顺序反了 Pod 无处可去。",
    "核对 nodeSelector 的每个键值都能在节点标签里找到，少一个就不匹配。",
    "目标节点带污点时，nodeSelector 与 tolerations 一起加，再用 kubectl get po -o wide 验证。"
   ],
   "interview": "Pod 默认由 default-scheduler 调度，nodeSelector 是节点标签的硬匹配，键值都要对上；节点有污点时得同时配 tolerations，DaemonSet 也用同一个字段圈定节点范围。",
   "pitfall": "只写 nodeSelector 没写容忍，节点上挂着 NoSchedule 污点，Pod 一直调度不上去。",
   "source": "第11-12章 调度资源；第21章 K8s污点和容忍",
   "tags": [
    "调度",
    "nodeSelector",
    "Label"
   ]
  },
  {
   "id": "W-10",
   "layer": "W",
   "title": "亲和性拉近，反亲和性打散副本",
   "oneliner": "required 是硬约束，preferred 按 weight 打分。",
   "mechanism": [
    "affinity 分节点亲和、Pod 亲和与 Pod 反亲和三类。",
    "节点亲和看节点标签，Pod 亲和与反亲和看目标 Pod 的标签。",
    "required 系列不满足就不调度，preferred 系列只参与打分，靠 weight 分优先。",
    "podAntiAffinity 加 topologyKey 取节点名，副本拆到不同宿主机。",
    "topologyKey 换成 zone，副本就分布到不同可用域，区域标签靠 kubectl label node 打。",
    "topologySpreadConstraints 用 maxSkew 限定拓扑域偏差。"
   ],
   "code": [
    "spec.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution[].topologyKey: kubernetes.io/hostname：强制分宿主机",
    "spec.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution[].weight: 100：让应用靠近 cache",
    "spec.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms[].matchExpressions[].operator: In：节点硬筛选",
    "topologySpreadConstraints[].maxSkew: 1：任意拓扑域副本数最多相差 1",
    "matchExpressions[].operator: NotIn：避开 performance=low 的节点"
   ],
   "reuse": [
    "先给节点打 region、zone、engineroom 标签，再把 topologyKey 设成对应键。",
    "核心服务用 required 反亲和加 hostname，保证两个副本不在同一台机器。",
    "跨机房均衡用 topologySpreadConstraints，maxSkew 设 1，whenUnsatisfiable 用 DoNotSchedule。",
    "靠近缓存的软需求写 preferred，写 required 会在不满足时直接调度失败。"
   ],
   "interview": "亲和分节点亲和和 Pod 亲和，required 是硬约束、preferred 按 weight 打分；反亲和配 topologyKey 能把副本打散到不同宿主机、可用域或机房。",
   "pitfall": "反亲和写成 preferred，副本数一涨还是可能全挤在一台宿主机上。",
   "source": "第20章 K8s亲和力",
   "tags": [
    "亲和性",
    "反亲和性",
    "topologyKey"
   ]
  },
  {
   "id": "W-11",
   "layer": "W",
   "title": "污点排斥 Pod，容忍才能调度上去",
   "oneliner": "NoSchedule 挡新 Pod，NoExecute 连已运行的也驱逐。",
   "mechanism": [
    "污点格式 key=value:effect，effect 取 NoSchedule 等三种值。",
    "NoSchedule 只拦新调度，NoExecute 会把不容忍的 Pod 驱逐重建。",
    "同名 key 能挂不同 effect 的污点，按 key 删除会把同名的全部清掉。",
    "tolerations 声明 key、operator、effect，Exists 按 key 匹配。",
    "tolerationSeconds 控制驱逐宽限，节点故障默认 5 分钟才重调度，设为 10 秒可快速恢复。",
    "cordon 把节点标成 SchedulingDisabled，已运行 Pod 不受影响，drain 才真正驱逐。"
   ],
   "code": [
    "kubectl taint node k8s-node02 gpu=true:NoSchedule：给节点加污点",
    "kubectl describe node k8s-node01 | grep Taints -A 10：查看节点污点",
    "spec.tolerations[].operator: Exists 与 effect: NoSchedule：容忍 GPU 节点",
    "tolerationSeconds: 10：node.kubernetes.io/unreachable 与 not-ready 的容忍时长",
    "kubectl drain k8s-node01 --ignore-daemonsets --delete-emptydir-data：驱逐节点上的 Pod"
   ],
   "reuse": [
    "专用节点先打标签，再加 NoSchedule 污点，最后给对应负载配容忍与 nodeSelector。",
    "节点维护先关闭调度，关键服务用 rollout restart 迁走，再用 NoExecute 驱逐剩余 Pod。",
    "给核心服务加 unreachable 与 not-ready 的 tolerationSeconds，把故障恢复从 5 分钟压到 10 秒。",
    "维护完成用 kubectl taint node <node> maintain- 或 kubectl uncordon 恢复调度。"
   ],
   "interview": "污点是节点上的排斥标记，Pod 必须有对应 tolerations 才能调度；NoSchedule 只挡新的，NoExecute 会把不容忍的 Pod 驱逐，维护节点一般走 cordon 或 drain。",
   "pitfall": "用 key- 删污点时只想删一种 effect，实际同名 key 的所有污点都被清掉。",
   "source": "第21章 K8s污点和容忍",
   "tags": [
    "污点",
    "容忍",
    "NoSchedule",
    "节点维护"
   ]
  },
  {
   "id": "S-01",
   "layer": "S",
   "title": "Label 与 Selector 是资源关联的胶水",
   "oneliner": "Label 是键值对，Selector 是查询条件，二者把资源串起来。",
   "mechanism": [
    "Label 是 key=value 键值对，Service 与控制器靠 Selector 匹配它选中对象。",
    "kubectl label 资源类型 资源名 key=value 打标签，--show-labels 查看。",
    "同名 key 直接改会报错，必须加 --overwrite 才能覆盖旧值。",
    "删标签把值去掉，写成 kubectl label deploy nginx version-。",
    "选择器支持等值、in 集合和 !=，多个 -l 同时使用表示同时满足。",
    "nodeSelector 用节点标签把 Pod 固定到指定节点，例如 region: subnet7。"
   ],
   "code": [
    "kubectl label deploy nginx version=v1：给单个对象添加标签",
    "kubectl get deploy nginx --show-labels：查看对象已有的全部标签",
    "kubectl label deploy -l app=nginx version=v2 --overwrite：按选择器批量改值",
    "kubectl get deploy -l 'app in (nginx, backend)' -l version!=v1：集合与不等选择器组合",
    "nodeSelector: region: subnet7：Pod 只调度到带该标签的节点"
   ],
   "reuse": [
    "工作负载统一打 app 与 version 两个标签，Deployment 的 selector.matchLabels 和 template 标签保持一致。",
    "用 -l 批量操作前先 kubectl get 同选择器，确认命中范围。",
    "专线、Ingress 入口这类专用节点用 Label 标记，不要靠主机名区分。",
    "改已有标签值一律显式加 --overwrite，避免批量脚本半途失败。"
   ],
   "interview": "Label 打在对象上，Selector 是查询条件，Deployment 选 Pod、Service 选后端、nodeSelector 选节点，全靠这一对。",
   "pitfall": "标签漏改或写错，Service 的 selector 选不到 Pod，表现是访问超时；改值不加 --overwrite 会直接报错。",
   "source": "第13章 K8s 服务发布：Service",
   "tags": [
    "Label",
    "Selector",
    "nodeSelector"
   ]
  },
  {
   "id": "S-02",
   "layer": "S",
   "title": "Service 类型与访问链路",
   "oneliner": "按访问来源选类型，内网 ClusterIP，外网 NodePort。",
   "mechanism": [
    "Service 用 selector 选 Pod，把 port 映射到 targetPort，缺省等于 port。",
    "ClusterIP 是默认类型，只分配集群内虚拟 IP，集群外无法直接访问。",
    "NodePort 在每个装 kube-proxy 的节点开端口，默认范围 30000-32767，也可以手动指定。",
    "ExternalName 不配 selector 和端口，只返回 externalName 字段的 CNAME 记录。",
    "LoadBalancer 调云厂商负载均衡器暴露服务，成本高于 NodePort。",
    "Service 域名是 name.namespace.svc.cluster.local，Pod 内可用短名。"
   ],
   "code": [
    "kubectl expose deploy nginx --port 80：由控制器直接生成 ClusterIP Service",
    "spec.type: NodePort：所有节点暴露端口，通过 NodeIP:NodePort 访问",
    "spec.sessionAffinity: ClientIP + timeoutSeconds: 10800：基于客户端 IP 的会话保持",
    "spec.ports[].targetPort：可写端口号，也可引用 Pod 端口名，改端口不影响访问",
    "无 selector 的 Service 加同名 Endpoints：把集群外服务代理成集群内地址"
   ],
   "reuse": [
    "集群内调用统一用 Service 短名，跨命名空间写 name.namespace。",
    "对外暴露先按场景选型：临时测试用 NodePort，云上再换 LoadBalancer。",
    "多端口应用在一个 Service 里给每个 port 起 name，如 RabbitMQ 的 5672 和 15672。",
    "代理外部中间件时建无 selector 的 Service 并手写 Endpoints，IP 不能是 127.0.0.0/8 等地址。"
   ],
   "interview": "ClusterIP 解决集群内访问，NodePort 让裸机集群对外暴露，ExternalName 只做域名别名，LoadBalancer 交给云厂商。",
   "pitfall": "改了 Pod 端口只改 port 不改 targetPort，访问会超时；targetPort 写成 Pod 端口名可以避开这个坑。",
   "source": "第13章 K8s 服务发布：Service",
   "tags": [
    "Service",
    "ClusterIP",
    "NodePort",
    "ExternalName"
   ]
  },
  {
   "id": "S-03",
   "layer": "S",
   "title": "kube-proxy 与转发模式",
   "oneliner": "kube-proxy 写节点转发规则，模式决定规模上限。",
   "mechanism": [
    "kube-proxy 监听 Service 与 Endpoint 变化，把转发规则写到节点。",
    "iptables 模式把规则插进 netfilter 链，命中 Service IP 的流量随机转到 Pod。",
    "iptables 规则数随 Service 数量增长，更新时可能短暂锁表，影响网络性能。",
    "IPVS 用哈希表存规则，Service 数量大时仍能保持转发性能，更新代价小。",
    "IPVS 支持 rr、lc、sh、dh、nq、sed 等调度算法，可以换成最少连接等策略。",
    "curl 127.0.0.1:10249/proxyMode 查模式，改 ConfigMap 后必须重启。"
   ],
   "code": [
    "curl 127.0.0.1:10249/proxyMode：返回 iptables 或 ipvs",
    "kubectl edit cm kube-proxy -n kube-system：修改代理模式与调度算法",
    "kubectl patch daemonset kube-proxy（改 annotations.date）：触发 kube-proxy 滚动重启",
    "ipvsadm -ln：查看 IPVS 规则和 Scheduler 列",
    "IPVS 算法：rr 轮询、lc 最少连接、sh 源地址哈希、dh 目的地址哈希"
   ],
   "reuse": [
    "Service 数量上千前把模式切到 IPVS，变更后核对 proxyMode 返回值。",
    "改 kube-proxy ConfigMap 后统一用 patch 重启 DaemonSet，不要只改单节点。",
    "用 ipvsadm -ln 确认调度算法已生效，避免改了配置没重启。",
    "二进制安装的节点用 systemctl restart kube-proxy 生效。"
   ],
   "interview": "kube-proxy 本身不转发流量，它把 Service 和 Endpoint 翻译成节点上的 iptables 或 IPVS 规则，规模大了就该用 IPVS。",
   "pitfall": "只改 ConfigMap 不重启 kube-proxy，proxyMode 还是旧值；IPVS 的源地址 NAT 仍要依赖 iptables 规则。",
   "source": "第13章 K8s 服务发布：Service",
   "tags": [
    "kube-proxy",
    "IPVS",
    "iptables"
   ]
  },
  {
   "id": "S-04",
   "layer": "S",
   "title": "Headless Service 与集群 DNS",
   "oneliner": "clusterIP 设 None，DNS 直接返回每个 Pod 的 IP。",
   "mechanism": [
    "把 spec.clusterIP 设为 None 就是 Headless Service，不分配虚拟 IP。",
    "解析 Headless Service 返回 Pod IP 列表，解析普通 Service 返回 ClusterIP。",
    "每个 Pod 都有 <pod-name>.<service-name>.<namespace> 形式的独立域名。",
    "有状态应用靠这条记录定位实例，StatefulSet 用 serviceName 关联。",
    "集群 DNS 是 CoreDNS，kubernetes Service 的地址是 10.96.0.10。",
    "普通 Service 用 nslookup 解析出全名和 ClusterIP。"
   ],
   "code": [
    "spec.clusterIP: None：声明 Headless Service，不分配 ClusterIP",
    "StatefulSet spec.serviceName: \"nginx\"：绑定同名 Headless Service",
    "nslookup my-service：返回全名与 ClusterIP 或 Pod IP",
    "DNS 格式：<pod-name>.<service-name>.<namespace>.svc.cluster.local",
    "kubectl get svc：Headless 的 ClusterIP 列显示 None"
   ],
   "reuse": [
    "数据库、消息队列这类要按实例寻址的工作负载，用 StatefulSet 配 Headless Service。",
    "客户端连接具体实例时用 pod-0、pod-1 的域名，不要连 Service 名。",
    "排查解析先在 Pod 内 nslookup 短名，确认返回的是 ClusterIP 还是 Pod IP。",
    "跨命名空间调用写全 name.namespace.svc.cluster.local。"
   ],
   "interview": "Headless Service 把 clusterIP 设成 None，DNS 返回后端 Pod 的 IP 和每个 Pod 的独立域名，给有状态应用做实例级发现。",
   "pitfall": "把 Headless 当普通 Service 用，客户端以为拿到一个 VIP，实际是一组 Pod IP，需要自己做选路和重试。",
   "source": "第13章 K8s 服务发布：Service",
   "tags": [
    "Headless Service",
    "DNS",
    "StatefulSet"
   ]
  },
  {
   "id": "S-05",
   "layer": "S",
   "title": "Ingress 靠 ingress-nginx 干活",
   "oneliner": "Ingress 是规则，真正干活的是 ingress-nginx。",
   "mechanism": [
    "Ingress 资源只描述七层路由，必须由 Ingress Controller 解析后生成 Nginx 配置。",
    "裸机生产环境把 Controller 的 Deployment 改成 DaemonSet，每个节点跑一份。",
    "hostNetwork 直占节点 80/443，dnsPolicy 要跟着改。",
    "nodeSelector 配合节点标签 ingress=true，把 Controller 限制在入口专用节点。",
    "部署完成后节点上能看到 nginx master 监听 0.0.0.0:80 与 0.0.0.0:443。",
    "Ingress 用 networking.k8s.io/v1，1.22 以上必须 v1。"
   ],
   "code": [
    "kind: DaemonSet：ingress-nginx 从 Deployment 改为每节点一份",
    "hostNetwork: true + dnsPolicy: ClusterFirstWithHostNet：占用宿主 80/443 并保留集群 DNS",
    "nodeSelector: ingress: \"true\"：Controller 只调度到入口专用节点",
    "kubectl label node k8s-node02 ingress=true：给节点打入口标签",
    "ingressClassName: nginx：指定由哪个 Controller 解析该 Ingress"
   ],
   "reuse": [
    "裸机集群按 bare-metal 文档改 DaemonSet 加 hostNetwork，不要用默认 Deployment 加 NodePort。",
    "入口节点单独打 ingress=true 标签，并准备多节点承接 80 和 443。",
    "部署后 netstat -lntp | grep nginx 确认 80 和 443 已监听。",
    "1.22 以上统一写 networking.k8s.io/v1，旧注解 ingress.class 换成 ingressClassName。"
   ],
   "interview": "Ingress 是七层路由声明，真正转发的是 ingress-nginx，生产上把它改成 DaemonSet 加 hostNetwork 直接吃节点 80 和 443。",
   "pitfall": "只创建 Ingress 不装 Controller，资源能建出来但没人解析，访问一律 404。",
   "source": "第14章 K8s 服务发布：Ingress",
   "tags": [
    "Ingress",
    "ingress-nginx",
    "DaemonSet",
    "hostNetwork"
   ]
  },
  {
   "id": "S-06",
   "layer": "S",
   "title": "Ingress 路由、灰度与 TLS",
   "oneliner": "路由靠 pathType，灰度靠权重，HTTPS 靠 tls Secret。",
   "mechanism": [
    "规则按 host 加 path 匹配，pathType 取 Exact 时 /bar 不匹配 /bar/。",
    "pathType 取 Prefix 时按 / 分段匹配，/abc 能匹配 /abc/bbb，最常用。",
    "不写 host 的规则可以只按路径发布服务，适合没有域名的测试环境。",
    "TLS 在 spec.tls 填 hosts 与 secretName，证书放 tls 类型 Secret。",
    "灰度用 canary: \"true\" 加 canary-weight，权重 10 时 v1 与 v2 约为 9:1。",
    "rewrite-target 配合正则路径去掉前缀，解决后端没有该路径的 404。"
   ],
   "code": [
    "pathType: Exact / Prefix / ImplementationSpecific：精确、前缀、控制器自定义匹配",
    "kubectl create secret tls ca-secret --cert=tls.crt --key=tls.key：创建证书 Secret",
    "spec.tls: hosts + secretName：开启 HTTPS，HTTP 请求返回 308 跳到 HTTPS",
    "nginx.ingress.kubernetes.io/canary-weight: \"10\"：把 10% 流量切到灰度版本",
    "nginx.ingress.kubernetes.io/rewrite-target: /$2：配合 path: /api-a(/|$)(.*) 去掉前缀"
   ],
   "reuse": [
    "发布前固定 pathType，前缀路由一律用 Prefix，避免 Exact 漏掉子路径。",
    "灰度按 10% 到 50% 分级推进，每级用脚本统计两版本比例。",
    "证书统一用 secret tls 管理，轮换时只替换同名 Secret。",
    "后端要传大文件时显式调大 proxy-body-size，默认只有 8M。"
   ],
   "interview": "Ingress 路由由 host、path 和 pathType 决定，灰度用 canary-weight 按比例切流，HTTPS 只要挂一个 tls 类型的 Secret。",
   "pitfall": "Ingress 配了 /api-a 但后端没有这个前缀，返回 404，需要 rewrite-target 去掉；上传大文件不调 proxy-body-size 会报 413。",
   "source": "第14章 K8s 服务发布：Ingress",
   "tags": [
    "Ingress",
    "pathType",
    "TLS",
    "灰度发布"
   ]
  },
  {
   "id": "S-07",
   "layer": "S",
   "title": "Service 与 Ingress 的排障顺序",
   "oneliner": "先按状态码分层，再从 Ingress 往下逐层排除。",
   "mechanism": [
    "先确认 Ingress Controller 正在运行并解析了规则，未被解析的 Ingress 一律 404。",
    "404 查路径配置、域名和路径是否正确，以及后端服务有没有这个路径。",
    "503 查 Ingress 里的 Service 名字和端口是否写错，Service 是否存在，后端 Pod 是否正常。",
    "504 是后端处理时间超过 Nginx 等待时间，先确认服务耗时，再决定调超时。",
    "413 是请求体超过 Nginx 默认 8M，调 proxy-body-size，不用动后端。",
    "回到 Service 层看 selector 与 Pod 标签是否一致，再看域名能否解析。"
   ],
   "code": [
    "kubectl get po -n ingress-nginx：确认 Controller 处于 Running",
    "kubectl get svc -n study-ingress：核对 Service 名称、端口和 ClusterIP",
    "nslookup my-service：在 Pod 内验证 Service 域名解析",
    "curl -H \"Host:auth.test.com\" <节点IP>：绕过 DNS 直接用 Host 头测 Ingress",
    "kubectl logs -f <pod>：查看后端容器启动失败的原因"
   ],
   "reuse": [
    "排障按域名解析、Controller 日志、Ingress 规则、Service、Pod 的顺序走。",
    "先 curl -I 看状态码分类，再决定查哪一层，不要一上来改后端。",
    "改完 Ingress 用 curl -H \"Host:xxx\" 直连节点 IP 验证，排除 DNS 干扰。",
    "排查 Service 前先 kubectl get po --show-labels 确认标签与 selector 一致。"
   ],
   "interview": "先看状态码，404 查路由和 rewrite，503 查 Service 与后端 Pod，504 查后端耗时，最后回到 Service 的 selector 和 DNS。",
   "pitfall": "看到 503 就重启 Pod，实际是 Ingress 里 Service 名字或端口写错；504 直接调大超时，把后端本身慢的问题盖住。",
   "source": "第14章 K8s 服务发布：Ingress",
   "tags": [
    "Ingress",
    "排障",
    "Service"
   ]
  },
  {
   "id": "C-01",
   "layer": "C",
   "title": "ConfigMap 的创建与注入",
   "oneliner": "配置从镜像里拿出来做成 key-value，再用文件挂载或环境变量注入。",
   "mechanism": [
    "ConfigMap 的 data 是 key: value，多行配置用 |- 保留换行。",
    "--from-file 按文件生成 key，--from-env-file 按 KEY=VALUE 拆分。",
    "以 Volume 挂载时，key 名默认就是容器内的文件名。",
    "items 可以改挂载后的文件名，同时只挂 items 里列出的 key。",
    "环境变量用 valueFrom.configMapKeyRef 单个注入，envFrom 能批量注入并加 prefix。",
    "ConfigMap 必须和 Pod 在同一命名空间，并且在 Pod 创建前就存在。"
   ],
   "code": [
    "kubectl create cm nginx-conf --from-file=nginx.conf：以文件名为 key 创建",
    "kubectl create cm env-cm --from-env-file=env-file：把 KEY=VALUE 文件拆成多项",
    "volumes[].configMap.name + volumeMounts[].mountPath：以文件形式挂载",
    "configMap.items: key + path：指定挂载后的文件名",
    "envFrom.configMapRef.name + prefix: CM_：批量注入环境变量并统一前缀"
   ],
   "reuse": [
    "配置文件类用 --from-file，键值类用 --from-env-file 或 --from-literal。",
    "挂载前核对 items 里的 key 都存在，否则 Pod 会卡在 ContainerCreating。",
    "改文件后先 create --dry-run=client -oyaml，再 kubectl replace -f -。",
    "一个 ConfigMap 只放一个应用的配置，避免挂载时互相覆盖。"
   ],
   "interview": "ConfigMap 把配置做成 key-value 资源，文件挂载时 key 就是文件名，环境变量注入靠 configMapKeyRef 或 envFrom，key 写错 Pod 直接起不来。",
   "pitfall": "items 里写错 key，Pod 一直 ContainerCreating，describe 才看到 configmap references non-existent config key。",
   "source": "第15章 K8s 配置管理",
   "tags": [
    "ConfigMap",
    "环境变量",
    "Volume"
   ]
  },
  {
   "id": "C-02",
   "layer": "C",
   "title": "Secret 与敏感配置管理",
   "oneliner": "按用途选类型，证书给 Ingress，仓库凭证给 Pod。",
   "mechanism": [
    "常用 Opaque、kubernetes.io/tls、dockerconfigjson 三类。",
    "data 字段存 base64 编码的值，stringData 直接写明文，创建后读取看到的是 data。",
    "拉私有仓库镜像用 docker-registry 类型，Pod 上通过 imagePullSecrets 引用。",
    "域名证书用 tls 类型，Ingress 的 spec.tls.secretName 直接引用。",
    "挂载同 ConfigMap，卷字段换成 secretName，环境变量用 secretKeyRef。",
    "Secret 必须和引用它的 Pod 在同一命名空间，并且提前创建。"
   ],
   "code": [
    "kubectl create secret generic basic-auth-secret --from-literal=username=admin：创建 Opaque",
    "stringData: ssh-key: password：YAML 里直接写明文",
    "kubectl create secret tls nginx-test-tls --key=tls.key --cert=tls.crt：创建 TLS 证书",
    "kubectl create secret docker-registry myregistrykey：--docker-server、--docker-username、--docker-password 三项必填",
    "spec.imagePullSecrets: - name: myregistrykey：Pod 使用仓库凭证"
   ],
   "reuse": [
    "密码、token、证书一律用 Secret，不要写进 ConfigMap 或镜像。",
    "私有仓库凭证用 docker-registry 类型配 imagePullSecrets，别在每个节点登录。",
    "证书用 tls 类型并以 secretName 挂到 Ingress，轮换只换 Secret。",
    "Secret 提交到 Git 前先确认脱敏，base64 编码等同于明文。"
   ],
   "interview": "Secret 按用途分类型，Opaque、tls 和 docker-registry 最常用，data 里只是 base64，挂载方式与 ConfigMap 一样，卷字段换成 secretName。",
   "pitfall": "把 Secret 当成加密存储，kubectl get secret -oyaml 拿到 data 后 base64 -d 就能还原明文。",
   "source": "第15章 K8s 配置管理",
   "tags": [
    "Secret",
    "TLS",
    "imagePullSecrets"
   ]
  },
  {
   "id": "C-03",
   "layer": "C",
   "title": "配置热更新与生效边界",
   "oneliner": "Volume 挂载会同步，环境变量和 subPath 不会，程序不重读也没用。",
   "mechanism": [
    "以 Volume 目录挂载的 ConfigMap，更新后容器内文件会同步成新内容。",
    "环境变量形式的注入不会热更新，envFrom 和 valueFrom 都要重建 Pod 才生效。",
    "subPath 挂载的单个文件不跟随更新，改了 ConfigMap 容器里还是旧内容。",
    "程序不重新读配置文件时，文件更新了也不会生效，要 reload 或重启。",
    "设 immutable: true 后 data 不允许再改，只能重建资源。",
    "envFrom 遇到不存在的 key 会忽略，valueFrom 指定不存在的 key 会让 Pod 起不来。"
   ],
   "code": [
    "volumes[].configMap 挂到 mountPath：目录形式挂载，更新会同步",
    "subPath: nginx.conf：只挂单个文件，不会热更新",
    "immutable: true：锁住 data，后续修改被拒绝",
    "kubectl replace -f basic-cm.yaml：整份替换 ConfigMap",
    "kubectl edit cm nginx-conf：直接编辑，保存即更新"
   ],
   "reuse": [
    "需要热更新的配置用目录挂载，不要让 subPath 挡住更新。",
    "依赖环境变量的服务，把配置变更和滚动重启放在同一次发布里。",
    "改完关键配置手动重启或滚动一次，别假设容器会自动读新值。",
    "确认不会再改的 ConfigMap 设 immutable: true，防止误改。"
   ],
   "interview": "Volume 挂载的 ConfigMap 会同步到容器，环境变量和 subPath 都不热更新，而且程序不重读配置的话，文件更新了也是旧值。",
   "pitfall": "改完 ConfigMap 以为已生效，实际是 envFrom 注入的环境变量，必须重建 Pod；subPath 挂载的文件也一直停在旧版本。",
   "source": "第15章 K8s 配置管理",
   "tags": [
    "ConfigMap",
    "Secret",
    "热更新",
    "subPath"
   ]
  },
  {
   "id": "C-04",
   "layer": "C",
   "title": "EmptyDir 随 Pod 消失，HostPath 常驻",
   "oneliner": "EmptyDir 随 Pod 消失，HostPath 把节点目录搬进容器。",
   "mechanism": [
    "EmptyDir 随 Pod 创建，Pod 删除或重建时数据被清空，适合容器间共享临时文件。",
    "emptyDir: {} 使用节点磁盘，medium 设为 Memory 就换成 tmpfs 内存文件系统。",
    "内存型 EmptyDir 占用的大小计入容器内存限制，sizeLimit 再卡上限。",
    "HostPath 把节点上的文件或目录挂进 Pod，用于容器与节点之间共享数据。",
    "hostPath.type 决定路径检查方式，DirectoryOrCreate 不存在就建 0755 目录。",
    "FileOrCreate 会创建 0644 的空文件，Directory 和 File 则要求路径必须存在。"
   ],
   "code": [
    "emptyDir: {}：使用节点磁盘的临时目录",
    "emptyDir.medium: Memory：改用 tmpfs 内存文件系统",
    "emptyDir.sizeLimit: 10Mi：限制卷大小，df 显示 10M",
    "hostPath.path: /data：把节点 /data 目录挂进容器",
    "hostPath.type: DirectoryOrCreate：目录不存在时自动创建 0755 目录"
   ],
   "reuse": [
    "缓存和临时交换文件用 EmptyDir，不要放需要持久化的数据。",
    "内存型 EmptyDir 必须配 sizeLimit，防止把节点内存吃满。",
    "只有节点级采集类组件才用 HostPath，业务数据走 PV 和 PVC。",
    "用 HostPath 前显式声明 type，路径不存在时行为由 type 决定。"
   ],
   "interview": "EmptyDir 是跟着 Pod 生命周期的临时卷，Pod 没了数据就没了；HostPath 直接挂节点目录，只适合节点级的共享。",
   "pitfall": "把需要持久化的数据放 EmptyDir，Pod 重建后数据全丢；磁盘型 EmptyDir 限制大小后 df 看不到限制，超限时 Pod 会变成 Completed。",
   "source": "第16章 K8s 存储管理",
   "tags": [
    "EmptyDir",
    "HostPath",
    "Volume"
   ]
  },
  {
   "id": "C-05",
   "layer": "C",
   "title": "PV、PVC 与 StorageClass",
   "oneliner": "PV 是资源，PVC 是申请，三项条件对齐才能绑定。",
   "mechanism": [
    "PV 是集群级存储资源，PVC 是命名空间内的申请，两者按条件匹配后绑定。",
    "PVC 申请 3Gi 可以绑定 5Gi 的 PV，只要 StorageClass 和访问模式一致且 PV 未被占用。",
    "回收策略 Retain 保留数据，Delete 删 PVC 时连带删 PV，动态存储默认 Delete。",
    "Recycle 会对卷执行清理，只支持 NFS 与 HostPath，后续会被弃用。",
    "PV 状态依次是 Available、Bound，删 PVC 后变 Released，回收失败是 Failed。",
    "访问模式里 HostPath 只有 RWO，NFS 支持 RWO、ROX 和 RWX。"
   ],
   "code": [
    "spec.capacity.storage: 10Gi：PV 容量",
    "spec.accessModes: ReadWriteMany：多节点读写，缩写 RWX",
    "spec.persistentVolumeReclaimPolicy: Retain：删 PVC 后保留 PV",
    "spec.resources.requests.storage: 3Gi：PVC 申请容量",
    "volumes[].persistentVolumeClaim.claimName: task-pvc-claim：Pod 挂载 PVC"
   ],
   "reuse": [
    "PVC 卡 Pending 时按容量、StorageClass、accessModes、PV 是否已被占用逐项核对。",
    "生产数据卷用 Retain，确认业务可接受再改 Delete。",
    "kubectl get pv 看 STATUS，Released 说明 PVC 已删但卷没有回收。",
    "选访问模式前查后端支持矩阵，不要给 HostPath 申请 RWX。"
   ],
   "interview": "PV 是存储资源，PVC 是申请单，K8s 按容量、StorageClass 和访问模式把两者绑在一起，删除行为由回收策略决定。",
   "pitfall": "申请容量大于 PV 容量、StorageClass 名字不一致、访问模式不一致，任何一个都会让 PVC 一直 Pending。",
   "source": "第16章 K8s 存储管理",
   "tags": [
    "PV",
    "PVC",
    "StorageClass",
    "回收策略"
   ]
  },
  {
   "id": "C-06",
   "layer": "C",
   "title": "NFS 与 CSI 存储接入",
   "oneliner": "NFS 可以直接写进 volumes，也可以装 CSI 做按 PVC 自动供给。",
   "mechanism": [
    "NFS 卷在 Pod 里只需要 server 和 path 两个字段，节点必须装客户端工具才能挂载。",
    "节点缺 nfs-utils 时 Pod 卡在 ContainerCreating。",
    "CSI 驱动分 controller 的 Deployment 和 node 的 DaemonSet。",
    "StorageClass 指定 provisioner、server 和 share，PVC 自动建 PV 和目录。",
    "动态生成的 PV 名字是 pvc-<uuid>，NFS 上的目录同名，方便直接定位数据。",
    "回收策略 Delete 下删 PVC 会同时删 PV 和 NFS 目录，数据一起消失。"
   ],
   "code": [
    "volumes[].nfs: server + path：直接用 NFS 卷，不经过 PV",
    "mount -t nfs 192.168.181.140:/data/nfs /mnt/：节点侧挂载验证",
    "./deploy/install-driver.sh v4.9.0 local：安装 NFS CSI 驱动",
    "provisioner: nfs.csi.k8s.io：StorageClass 关联的 CSI 驱动",
    "parameters: server + share：指定 NFS 地址和共享目录"
   ],
   "reuse": [
    "节点统一预装 nfs-utils，Ubuntu 用 nfs-common，避免 Pod 卡在挂载。",
    "静态共享直接写 nfs 卷或静态 PV，需要自动分配目录时上 CSI 加 StorageClass。",
    "StorageClass 里写死 mountOptions nfsvers=4.1，避免版本协商差异。",
    "删 PVC 前确认 reclaimPolicy，Delete 会连数据一起清掉。"
   ],
   "interview": "接 NFS 有两条路，直接在 volumes 里写 nfs 的 server 和 path，或者装 CSI 驱动加 StorageClass，按 PVC 自动建目录。",
   "pitfall": "节点没装 NFS 客户端，Pod 一直 ContainerCreating，报 mount failed: exit status 32。",
   "source": "第16章 K8s 存储管理",
   "tags": [
    "NFS",
    "CSI",
    "StorageClass"
   ]
  },
  {
   "id": "C-07",
   "layer": "C",
   "title": "有状态存储的选型与落地",
   "oneliner": "单实例用 Deployment 加 PVC，多实例用 StatefulSet。",
   "mechanism": [
    "单实例数据库用 Deployment 加 PVC，副本数固定 1，直接挂数据目录。",
    "更新策略设 Recreate，避免新旧 Pod 同时挂同一个卷。",
    "多实例有状态集群用 StatefulSet，volumeClaimTemplates 给每个 Pod 生成独立 PVC。",
    "PVC 名是 <模板名>-<StatefulSet名>-<序号>。",
    "StatefulSet 配合 clusterIP: None 的 Headless Service，集群内按序号寻址。",
    "探针用 tcpSocket 检查端口，initialDelaySeconds 要留够数据初始化时间。"
   ],
   "code": [
    "strategy.type: Recreate：先停旧 Pod 再起新 Pod",
    "volumeClaimTemplates: metadata.name + resources.requests.storage：每个 Pod 一份 PVC",
    "volumeMounts: mountPath: /var/lib/mysql：挂 MySQL 数据目录",
    "livenessProbe.tcpSocket.port: 3306 + initialDelaySeconds: 30：端口探测",
    "serviceName: rmq-cluster：StatefulSet 关联 Headless Service"
   ],
   "reuse": [
    "单实例 MySQL、Redis 先用 Deployment 加 PVC，升级时停写并重建。",
    "需要多副本的有状态服务上 StatefulSet，存储模板按每实例 4Gi 规划。",
    "探针延迟按数据初始化时间设，MySQL 至少留 30 秒。",
    "上线前删一次 Pod，确认数据确实落在后端存储上。"
   ],
   "interview": "单实例数据库用 Deployment 加 PVC 并设 Recreate，多副本有状态集群用 StatefulSet 的 volumeClaimTemplates 自动给每个 Pod 建 PVC，再配 Headless Service 按序号访问。",
   "pitfall": "有状态服务沿用默认 RollingUpdate，升级时新旧 Pod 会同时挂同一个卷。",
   "source": "第16章 K8s 存储管理",
   "tags": [
    "StatefulSet",
    "PVC",
    "MySQL",
    "volumeClaimTemplates"
   ]
  },
  {
   "id": "R-01",
   "layer": "R",
   "title": "requests 管调度，limits 管上限",
   "oneliner": "requests 管调度，limits 管运行上限，两者共同定 QoS。",
   "mechanism": [
    "调度器按 requests 选节点，只把 Pod 放到剩余资源能满足 requests 的节点。",
    "容器实际可用资源受 limits 约束，超出 requests 的部分属于可突发空间。",
    "ResourceQuota 的 requests.cpu 与 limits.cpu 分别累计，任一超限都会拒绝创建。",
    "不写 resources 的容器归入 BestEffort，不保证资源，资源紧张时最先被驱逐。",
    "LimitRange 的 default 与 defaultRequest 会补到没写 resources 的容器上，已配置的参数不覆盖。",
    "CPU 支持小数与毫核，0.5 核即 500m；内存按 Mi、Gi 计。"
   ],
   "code": [
    "spec.containers[].resources.requests：调度依据，也是 ResourceQuota 里 requests.cpu 的计数来源",
    "spec.containers[].resources.limits：容器运行上限，对应配额里的 limits.cpu 与 limits.memory",
    "kubectl get po -n customer1 -oyaml | grep resources -A 6：核对容器实际生效的 requests 与 limits",
    "kubectl create deploy test-quota --image=registry.cn-beijing.aliyuncs.com/dotbalo/redis:7.2.5 -n customer1：不写 resources 观察配额与调度结果"
   ],
   "reuse": [
    "新建工作负载先写 requests，再按峰值留出 limits，不要只写其中一个。",
    "用 LimitRange 兜底默认值，再抽查 Pod 的 resources 是否被补齐。",
    "容量规划按 requests 汇总，不要用 limits 估算可调度容量。"
   ],
   "interview": "requests 是调度和配额的计算口径，limits 是容器运行时的上限，两者都写才谈得上资源治理。",
   "pitfall": "只写 limits 不写 requests，Pod 落入 Burstable，资源紧张时先被驱逐；配额卡 requests 时，缺 requests 的 Pod 直接创建不出来。",
   "source": "第22-24章 资源限制与QoS",
   "tags": [
    "requests",
    "limits",
    "资源配额"
   ]
  },
  {
   "id": "R-02",
   "layer": "R",
   "title": "ResourceQuota 给命名空间算总账",
   "oneliner": "一个 Namespace 一份配额，按请求、上限与对象数量封顶。",
   "mechanism": [
    "ResourceQuota 是命名空间级对象，spec.hard 里逐项写上限，多个团队各建各的。",
    "requests.cpu、requests.memory 与 limits.cpu、limits.memory 分开累计，Pod 的申请和上限都受限。",
    "对象数量用 pods、services、persistentvolumeclaims、count/replicasets.apps 这类键限制。",
    "存储配额用 requests.storage 与 persistentvolumeclaims 控制 PVC 总量与容量。",
    "配额生效后，未写 resources 的 Deployment 没有产生 Pod；超额创建会被拒绝。",
    "每个 Namespace 再加一份默认配额，例如 count/pods: 1000、count/replicasets.apps: 2k，防止异常创建拖垮集群。"
   ],
   "code": [
    "apiVersion: v1 / kind: ResourceQuota：命名空间级配额对象，metadata.namespace 指定生效空间",
    "spec.hard.requests.cpu: \"2\" / limits.cpu: \"8\"：租户 CPU 请求与上限总量",
    "spec.hard.count/replicasets.apps: 1k：控制器对象数量上限，1k 即 1000",
    "kubectl get po -n customer1：配额拦截后空间内没有 Pod 产生",
    "exceeded quota: customer1-quota, requested: requests.cpu=3, used: requests.cpu=0, limited: requests.cpu=2：RS 上的超额报错"
   ],
   "reuse": [
    "按租户或环境先建 Namespace，再挂 ResourceQuota，最后才放业务。",
    "配额同时写 requests 与 limits，避免只限一端。",
    "给每个 Namespace 加 count/pods 与 count/replicasets.apps 的兜底配额。"
   ],
   "interview": "ResourceQuota 管的是命名空间总量，它拦的是创建请求，不负责给单个容器补默认值。",
   "pitfall": "配额只建在已有 Namespace 上，新开的命名空间没有默认配额，异常创建照样能打满集群。",
   "source": "第22章 K8s集群资源合理化分配：ResourceQuota",
   "tags": [
    "ResourceQuota",
    "Namespace",
    "配额"
   ]
  },
  {
   "id": "R-03",
   "layer": "R",
   "title": "LimitRange 补默认值，也卡单容器上下限",
   "oneliner": "LimitRange 给容器补默认值，也限制单容器上下限。",
   "mechanism": [
    "type: Container 的 default 写 limits，defaultRequest 写 requests，只对没配置的容器生效。",
    "一个 Namespace 内新建的 Pod 都会被套用，多容器逐个补，已配置的参数不覆盖。",
    "max 与 min 约束单个容器能申报的范围，超出时 Pod 创建被拒绝。",
    "把 type 换成 PersistentVolumeClaim，max 与 min 就改为限制 PVC 的 storage 大小。",
    "LimitRange 是命名空间级对象，必须带 -n 建到目标空间才生效。",
    "默认值示例：limits cpu 1、memory 512Mi；requests cpu 0.5、memory 256Mi，落盘显示为 500m。"
   ],
   "code": [
    "kind: LimitRange / spec.limits[].type: Container：容器级默认值与上下限",
    "default: cpu: 1 / memory: 512Mi；defaultRequest: cpu: 0.5 / memory: 256Mi：未配置容器的默认值",
    "max: cpu: \"800m\" / memory: 1Gi；min: cpu: \"10m\" / memory: 128Mi：单容器可申报范围",
    "type: PersistentVolumeClaim / max.storage: 3Gi / min.storage: 1Gi：PVC 容量边界",
    "kubectl create -f min-max.yaml -n customer1：LimitRange 必须建在目标命名空间"
   ],
   "reuse": [
    "先建 LimitRange 再建业务，保证新 Pod 都能拿到默认值。",
    "默认值只做兜底，关键服务仍在清单里显式写 requests 与 limits。",
    "PVC 的 max/min 与 ResourceQuota 的 requests.storage 一起配置。"
   ],
   "interview": "LimitRange 是准入层的默认值和单对象边界，ResourceQuota 是命名空间总量，两者职责不重叠。",
   "pitfall": "以为 LimitRange 会修改已有 Pod：它只在创建或更新时补值，运行中的容器不会变化。",
   "source": "第23章 K8s集群资源合理化分配：LimitRange",
   "tags": [
    "LimitRange",
    "默认资源",
    "Namespace"
   ]
  },
  {
   "id": "R-04",
   "layer": "R",
   "title": "QoS 三类决定资源紧张时谁先被驱逐",
   "oneliner": "requests 与 limits 的关系决定 Pod 的 QoS 与驱逐顺序。",
   "mechanism": [
    "Guaranteed 要求每个容器都写 requests 与 limits，且 cpu、memory 两项分别相等。",
    "Guaranteed 优先级最高，调度器保证其所需资源，驱逐时排在最后。",
    "Burstable 是不满足 Guaranteed、但至少一个容器写了 requests.cpu 或 requests.memory 的 Pod。",
    "Burstable 优先级中等，资源紧张时可能被驱逐，节点有空闲时可用超过 requests 的资源。",
    "BestEffort 完全不配 resources 字段，优先级最低，资源紧张时最先被驱逐。",
    "Guaranteed 优先级最高、Burstable 中等、BestEffort 最低，驱逐从最低一级开始。"
   ],
   "code": [
    "limits.cpu: 200m / requests.cpu: 200m，memory 同样相等：Guaranteed 写法",
    "requests: cpu: 100m / memory: 128Mi，不写 limits：落入 Burstable",
    "spec.containers 不写 resources 字段：BestEffort",
    "kubectl get po -n customer1 -oyaml：核对容器是否真的带上了 requests 与 limits"
   ],
   "reuse": [
    "核心服务按 Guaranteed 配置，逐容器对齐 requests 与 limits。",
    "批处理与离线任务放 BestEffort 或 Burstable，把驱逐风险留给低优先级负载。",
    "上线前抽查每个容器的 resources，确认没有漏配导致 QoS 降级。"
   ],
   "interview": "QoS 是 kubelet 按 requests 与 limits 的关系算出来的，Guaranteed 最难被驱逐，BestEffort 最先走。",
   "pitfall": "只给部分容器写 requests，或者 cpu 相等而 memory 不等，Pod 就掉到 Burstable；Guaranteed 要求每个容器两项都相等。",
   "source": "第24章 K8s集群资源合理化分配：QoS",
   "tags": [
    "QoS",
    "驱逐",
    "Guaranteed"
   ]
  },
  {
   "id": "R-05",
   "layer": "R",
   "title": "RBAC 的权限边界由绑定范围决定",
   "oneliner": "Role 定权限，Binding 定范围，绑在哪个空间就在哪生效。",
   "mechanism": [
    "Role 是命名空间内的权限集合，用 --verb 指定动作、--resource 指定资源。",
    "ClusterRole 是集群级权限集合，非核心组资源写成 replicasets.apps 这种组.资源形式。",
    "RoleBinding 把 Role 或 ClusterRole 绑给 ServiceAccount、用户或组，作用域限于所在命名空间。",
    "ClusterRoleBinding 授予全集群范围，组 system:serviceaccounts:kube-users 可一次覆盖整个租户空间。",
    "子资源要单独授权：pods/log 查日志、pods/exec 执行命令、pods/status 看状态。",
    "内置 ClusterRole view、edit、admin 可直接绑定，覆盖只读、编辑与空间管理场景。"
   ],
   "code": [
    "kubectl create role pod-reader --verb=get --verb=list --verb=watch --resource=pods",
    "kubectl create role foo --verb=get,list,watch --resource=replicasets.apps",
    "kubectl create rolebinding dukuan-pod-reader --clusterrole=pod-reader --serviceaccount=default:dukuan",
    "kubectl create clusterrolebinding namespace-readonly --clusterrole=namespace-readonly --group=system:serviceaccounts:kube-users",
    "kubectl auth can-i get configmaps -n default --as=system:serviceaccount:default:dukuan"
   ],
   "reuse": [
    "先定义最小 ClusterRole，再按命名空间建 RoleBinding，不要直接上 cluster-admin。",
    "把日志、exec、编辑拆成独立 ClusterRole，按环境分别绑定。",
    "用 kubectl auth can-i --as 验证每个身份的边界，再交付。"
   ],
   "interview": "RBAC 的权限来自 Role 或 ClusterRole，生效范围由 RoleBinding 还是 ClusterRoleBinding 决定。",
   "pitfall": "用 RoleBinding 绑 ClusterRole 却以为全集群生效；反过来把 admin 用 ClusterRoleBinding 绑给租户，等于交出整个集群。",
   "source": "第25章 K8s细粒度权限管理RBAC",
   "tags": [
    "RBAC",
    "RoleBinding",
    "ClusterRole"
   ]
  },
  {
   "id": "R-06",
   "layer": "R",
   "title": "ServiceAccount 权限按用途拆开",
   "oneliner": "ServiceAccount 只解决身份，权限靠 RoleBinding。",
   "mechanism": [
    "每个 Namespace 自带 default ServiceAccount，Pod 不指定 serviceAccountName 时就用它访问 API。",
    "kubectl create token 生成令牌，--duration 控制有效期，适合临时排障。",
    "长期令牌建 service-account-token 类型的 Secret，用注解关联 SA。",
    "用 Token、CA 证书与 APIServer 地址拼成 kubeconfig，就能以该 SA 身份操作集群。",
    "Pod 设 spec.serviceAccountName 后，容器内程序继承该 SA 的权限，无需额外配置文件。",
    "按环境拆权限：生产只给 pod-log，开发测试才给 pod-log 加 pod-exec。"
   ],
   "code": [
    "kubectl create sa app-view -n project-a-dev",
    "kubectl create rolebinding app-view --clusterrole=view --serviceaccount=project-a-dev:app-view -n project-a-dev",
    "spec.serviceAccountName: app-view",
    "kubectl create token dukuan --duration=99999h",
    "kind: Secret / type: kubernetes.io/service-account-token / annotation kubernetes.io/service-account.name: dukuan"
   ],
   "reuse": [
    "按用途建 SA，监控、CI、应用各一个，不要共用 default。",
    "先建 SA 与 RoleBinding，再在 Deployment 里指定 serviceAccountName。",
    "外部 kubeconfig 只给需要的 SA，用完即回收 Token。"
   ],
   "interview": "ServiceAccount 只解决身份，权限仍由 RoleBinding 决定，新建的 SA 默认没有任何权限。",
   "pitfall": "图省事给 default SA 绑 view 或 admin，命名空间里所有没指定身份的 Pod 都跟着拿到权限；99999h 的令牌也等于长期凭证。",
   "source": "第25章 K8s细粒度权限管理RBAC",
   "tags": [
    "ServiceAccount",
    "RBAC",
    "最小权限"
   ]
  },
  {
   "id": "R-07",
   "layer": "R",
   "title": "多租户隔离要四件套一起上",
   "oneliner": "Namespace 到 RBAC 四层都齐，才算租户隔离。",
   "mechanism": [
    "先按租户或环境建 Namespace，customer1 与 customer2、project-a-dev/test/prod 各自独立。",
    "每个 Namespace 挂一份 ResourceQuota，限制 requests、limits、Pod 数、Service 数与 PVC。",
    "每个 Namespace 挂一份 LimitRange，给未声明资源的容器补默认值并限制单容器上下限。",
    "RBAC 按命名空间绑定：RoleBinding 引用 kube-users 下的 SA，只在该 Namespace 生效。",
    "组 system:serviceaccounts:<ns> 可以一次性给整个租户授基础权限，例如查 Namespace。",
    "生产与非生产分权：生产只给 pod-log，开发测试才给 pod-exec 与 ConfigMap、Deployment 编辑。"
   ],
   "code": [
    "kubectl create namespace customer1；kubectl create namespace customer2：按租户划分边界",
    "spec.hard: requests.cpu / limits.cpu / pods / services：命名空间总量",
    "kubectl create rolebinding develop-pod-exec --clusterrole=pod-exec --serviceaccount=kube-users:project-a-develop -n project-a-test",
    "kubectl create clusterrolebinding namespace-readonly --clusterrole=namespace-readonly --group=system:serviceaccounts:kube-users"
   ],
   "reuse": [
    "新租户上线按 Namespace、Quota、LimitRange、RoleBinding 的顺序一次建齐。",
    "把生产空间的权限压到只读日志，编辑权限只开在 dev 与 test。",
    "定期用 kubectl auth can-i --as 抽查跨空间访问是否被拒。"
   ],
   "interview": "多租户隔离靠命名空间做边界，配额与 LimitRange 管资源，RBAC 管动作，四层都按 Namespace 落地才成立。",
   "pitfall": "只建 Namespace 就宣布隔离完成：没有配额会被一个 Deployment 吃满节点，没有 RBAC 则任何 SA 都能跨空间查资源。",
   "source": "第22-25章 资源限制与RBAC",
   "tags": [
    "多租户",
    "Namespace",
    "RBAC"
   ]
  },
  {
   "id": "E-01",
   "layer": "E",
   "title": "Chart 是模板、默认值与元数据的打包",
   "oneliner": "Chart 把模板、默认值与元数据打成一个可复用包。",
   "mechanism": [
    "helm create test 生成 charts、Chart.yaml、templates、values.yaml 四部分，构成一个可复用的包。",
    "templates 存放资源模板，helm template 渲染后按资源类型拆成 deployment.yaml、svc.yaml 等文件。",
    "values.yaml 提供默认值，安装时用 --set 覆盖，不必改动模板本身。",
    "Chart 打包为 tgz，helm pull 下载 nginx-18.2.5.tgz，解包后在目录里执行 helm install。",
    "Chart 有两个版本号：CHART VERSION 是包版本，APP VERSION 是应用版本，两者不同步。",
    "来源可以是 repo add 的仓库，也可以是 OCI 地址，如 oci://docker.kubeasy.com/bitnamicharts/mysql。"
   ],
   "code": [
    "helm create test：生成 charts、Chart.yaml、templates、values.yaml",
    "helm template nginx . -n helm-test --output-dir yaml：把渲染结果导出为 yaml",
    "helm pull bitnami/nginx --version 18.2.4：下载指定版本的 Chart 包",
    "helm search repo bitnami/nginx -l：列出可用版本与 CHART/APP VERSION",
    "helm pull oci://docker.kubeasy.com/bitnamicharts/mysql --version 12.0.1：从 OCI 拉取"
   ],
   "reuse": [
    "先 helm pull 固定版本再解包审阅，不直接装仓库里的最新版。",
    "把环境差异写进 values.yaml，模板保持通用。",
    "交付前用 helm template 导出 YAML，按普通资源清单审一遍。"
   ],
   "interview": "Chart 是带默认值和模板的打包格式，真正下发给集群的是 helm template 渲染后的 YAML。",
   "pitfall": "只记 APP VERSION 不记 CHART VERSION：nginx 的 Chart 18.2.5 对应应用 1.27.2，回滚时按应用版本选包会选错。",
   "source": "第26章 K8s工程化管理Helm",
   "tags": [
    "Helm",
    "Chart",
    "模板"
   ]
  },
  {
   "id": "E-02",
   "layer": "E",
   "title": "每次升级留一个可回滚的 revision",
   "oneliner": "Release 每次升级留一个 revision，history 可查可回滚。",
   "mechanism": [
    "helm install 创建 Release，首次 REVISION 为 1，状态 deployed。",
    "每次 helm upgrade 生成新 revision，旧版本状态变为 superseded，helm history 完整保留。",
    "helm rollback 按 revision 号回退，回滚前先用 helm history 确认目标版本的说明与状态。",
    "upgrade 时要带上之前的 --set 值，否则新 revision 只保留本次传入的参数。",
    "helm get values 只显示用户传入的值；离线安装直接改 values.yaml 时返回 Null。",
    "helm status 看当前状态，helm get all 看值、配置与状态，helm delete 卸载 Release。"
   ],
   "code": [
    "helm install nginx bitnami/nginx -n helm-test",
    "helm upgrade --install nginx bitnami/nginx -n helm-test --set image.registry=docker.kubeasy.com --set replicaCount=2",
    "helm history nginx -n helm-test",
    "helm rollback nginx 4 -n helm-test",
    "helm get values nginx -n helm-test / helm get all nginx -n helm-test"
   ],
   "reuse": [
    "每次升级前先 helm history 确认当前 revision，回滚目标写明确数字。",
    "扩容与改镜像都走 helm upgrade，并带齐原有参数或 values 文件。",
    "离线安装把参数固化在 values.yaml，不依赖 get values 追溯。"
   ],
   "interview": "Helm 的发布单元是 Release，每个 revision 是一份快照，rollback 就是回到某个 revision。",
   "pitfall": "upgrade 时漏掉原来的 --set，镜像地址或副本数会被悄悄改回去；改了 values.yaml 再用 get values 查，看到的是 Null 而不是实际值。",
   "source": "第26章 K8s工程化管理Helm",
   "tags": [
    "Helm",
    "Release",
    "回滚"
   ]
  },
  {
   "id": "E-03",
   "layer": "E",
   "title": "CRD 把运维对象注册成集群的 API 资源",
   "oneliner": "CRD 注册新 kind，之后就能用 kubectl 操作。",
   "mechanism": [
    "Operator 安装时一并创建 CRD，kubectl get crd | grep redis 能看到 redis、redisclusters 等四种。",
    "CR 的 apiVersion 为 redis.redis.opstreelabs.in/v1beta1，kind 为 RedisCluster。",
    "kubectl create -f 创建 CR 后，APIServer 接收对象，后续由对应 Operator 负责落地。",
    "kubectl get rediscluster 返回 CLUSTERSIZE、READYLEADERREPLICAS 等自定义列。",
    "CRD 名是复数加 group，例如 ndbclusters.mysql.oracle.com。",
    "删除 CR 就删除整套集群，kubectl delete -f redis-cluster.yaml 即可回收下游资源。"
   ],
   "code": [
    "kubectl get crd | grep redis",
    "apiVersion: redis.redis.opstreelabs.in/v1beta1 / kind: RedisCluster",
    "kubectl create -f redis-cluster.yaml -n public-service",
    "kubectl get rediscluster -n public-service",
    "kubectl delete -f redis-cluster.yaml -n public-service"
   ],
   "reuse": [
    "装完 Operator 先列 CRD，确认它扩展了哪些 kind。",
    "业务 CR 放进业务命名空间，与 Operator 自身的命名空间分开。",
    "用 kubectl get 自定义资源的列判断控制器汇报的就绪状态。"
   ],
   "interview": "CRD 扩展的是 API，不是运行时，真正把 CR 变成 Pod 与 Service 的是监听它的 Operator。",
   "pitfall": "把 CRD 当普通配置随手删掉，所有 CR 和依赖它们声明的实例都会失去定义；CR 建了但 Pod 不出时，先查 Operator 是否在运行。",
   "source": "第27章 K8s扩展能力：Operator",
   "tags": [
    "CRD",
    "自定义资源",
    "Operator"
   ]
  },
  {
   "id": "E-04",
   "layer": "E",
   "title": "Operator 用控制器把运维知识代码化",
   "oneliner": "Operator 监听 CR，按 spec 创建并持续维持整套实例。",
   "mechanism": [
    "redis-operator 用 Helm 装在 ot-operators 命名空间，一个 Pod 常驻监听 RedisCluster。",
    "CR 里 clusterSize: 3 决定规模，Operator 创建 3 个 leader 与 3 个 follower Pod。",
    "clusterVersion、persistenceEnabled 与 storage.volumeClaimTemplate 决定实例形态。",
    "密码放 Secret，CR 用 redisSecret.name 与 key 引用，Operator 负责注入。",
    "NDB Operator 由 Deployment、Webhook Server、SA 与 ClusterRole 组成。",
    "service.serviceType: NodePort 时 Operator 为每个 Pod 建 NodePort Service，生产环境不推荐外露。"
   ],
   "code": [
    "helm install redis-operator ot-helm/redis-operator --namespace ot-operators --create-namespace",
    "kubectl get po -n ot-operators：确认 Operator 常驻",
    "spec.clusterSize: 3 / clusterVersion: v7 / persistenceEnabled: true",
    "spec.redisSecret.name: redis-secret / key: password",
    "kubectl get po -n public-service：leader 与 follower 各 3 个"
   ],
   "reuse": [
    "Operator 单独放一个命名空间，业务 CR 放业务命名空间。",
    "把密码、存储类等易变项放 Secret 与 CR 字段，不写进镜像。",
    "卸载时先删 CR 再删 Operator，确认实例回收干净。"
   ],
   "interview": "Operator 等于 CRD 加控制器，CRD 定义声明式接口，控制器负责把期望状态持续调谐成实际状态。",
   "pitfall": "直接改 CR 里的密码字段不一定会重建 Pod，课件是 delete 再 create；把 Redis 用 NodePort 暴露到集群外，生产环境也不推荐。",
   "source": "第27章 K8s扩展能力：Operator",
   "tags": [
    "Operator",
    "RedisCluster",
    "控制器"
   ]
  },
  {
   "id": "E-05",
   "layer": "E",
   "title": "迁移先跑通，再改架构",
   "oneliner": "上 K8s 的第一步是容器化加清单化，注册中心与网关先原样搬进去。",
   "mechanism": [
    "构建放在容器里做：maven:3.5.3 镜像挂载源码与 /data/m2 缓存，mvn clean package 产出 jar。",
    "运行镜像基于 jdk:8u211-jmap，COPY target/*.jar 后用 java -jar 启动。",
    "Eureka 用 StatefulSet 三副本，配 headless Service 与 Parallel 管理策略。",
    "业务服务用 Deployment 加 ClusterIP Service，env 注入端口与 Eureka 地址。",
    "外部流量走 Ingress：demo-receive 用 /receiveapi 前缀配 rewrite-target: /$2。",
    "资源 requests 100m/128Mi、limits 1/1Gi，demo-handler 配 tcpSocket 探针。"
   ],
   "code": [
    "mvn clean package：在 maven 容器里构建 jar",
    "FROM registry.cn-beijing.aliyuncs.com/dotbalo/jdk:8u211-jmap / COPY target/*.jar ./ / CMD [\"java\",\"-jar\",\"./*.jar\"]",
    "spec.serviceName: demo-eureka / podManagementPolicy: Parallel",
    "env EUREKA_SERVER_ADDRESS: http://demo-eureka-0.demo-eureka:8761/eureka/,http://demo-eureka-1.demo-eureka:8761/eureka/,http://demo-eureka-2.demo-eureka:8761/eureka/",
    "annotation nginx.ingress.kubernetes.io/rewrite-target: /$2"
   ],
   "reuse": [
    "先容器化构建、再打运行镜像，构建缓存目录单独挂载。",
    "有状态组件用 StatefulSet 加 headless Service，无状态服务用 Deployment。",
    "Ingress 的 path 与 rewrite-target 成对设计，上线前逐个路径验证。"
   ],
   "interview": "SpringCloud 迁移先容器化、先搬注册中心与网关，再逐项替换为 K8s 原生能力。",
   "pitfall": "服务地址写成 localhost 或固定 Pod IP，迁移后跨命名空间直接失效；Ingress 只改 path 不改 rewrite-target，请求会 404。",
   "source": "第18-19章 K8s综合项目：SpringCloud项目迁移",
   "tags": [
    "SpringCloud",
    "迁移",
    "StatefulSet"
   ]
  },
  {
   "id": "E-06",
   "layer": "E",
   "title": "注册中心退场前，先让 K8s DNS 接管寻址",
   "oneliner": "服务地址已改用 K8s DNS，注册中心的地址簿职责可被 Service 接管。",
   "mechanism": [
    "课件把 SpringCloud 改造分成迁移与去中心化两步，18-19 章只完成迁移。",
    "Eureka 是三副本 StatefulSet，Service 为 clusterIP: None。",
    "EUREKA_SERVER_ADDRESS 写的是 demo-eureka-0/1/2.demo-eureka:8761，服务寻址已经依赖 K8s DNS。",
    "网关、业务与前端各有自己的 Deployment 与 Service，外部入口由 Ingress 按 host 和 path 分发。",
    "注册中心仍在运行并接收注册，课件未给出下线步骤，退场属于后续的去中心化升级。"
   ],
   "code": [
    "spec.replicas: 3 / spec.serviceName: demo-eureka / podManagementPolicy: Parallel",
    "spec.clusterIP: None：Eureka 的 Service 为 headless",
    "env EUREKA_SERVER_ADDRESS: http://demo-eureka-0.demo-eureka:8761/eureka/,http://demo-eureka-1.demo-eureka:8761/eureka/,http://demo-eureka-2.demo-eureka:8761/eureka/",
    "Ingress: host demo.test.com / path /receiveapi(/|$)(.*) / rewrite-target /$2"
   ],
   "reuse": [
    "把迁移和去中心化分成两个发布窗口，别在同一次变更里删注册中心。",
    "退场前先盘点所有服务的注册中心地址与调用方式，确认可改用 Service 名。",
    "保留 Eureka 作为回退路径，直到全量调用方切换完成。"
   ],
   "interview": "注册中心退场的前提是服务间寻址全部换成 K8s Service 和 DNS，迁移章节只完成了把 Eureka 搬进集群。",
   "pitfall": "把 18-19 章的迁移当成去中心化：Eureka 还在跑，服务仍向它注册，直接删掉会让按注册表寻址的调用全部断掉。",
   "source": "第18-19章 K8s综合项目：SpringCloud项目迁移",
   "tags": [
    "SpringCloud",
    "注册中心",
    "服务发现"
   ]
  },
  {
   "id": "O-01",
   "layer": "O",
   "title": "可观测性三支柱先日志后指标再链路",
   "oneliner": "先让日志可查，再用指标设告警，最后用链路定位慢调用。",
   "mechanism": [
    "日志由 Filebeat 采集，经 Kafka 缓冲，Logstash 写入 ES，Kibana 查询。",
    "指标由 Prometheus 抓取，kube-prometheus 一并装好告警与 Grafana。",
    "链路由 Skywalking Agent 埋点，数据统一发到 OAP 再落 ES。",
    "三类数据共用 namespace、app、pod 标签，告警和链路才能对齐。",
    "落地按成本排序：日志先通，指标与告警补齐，最后接链路。"
   ],
   "code": [
    "kubectl get es -n logging：查看 ES 集群 HEALTH、NODES 与 PHASE",
    "kubectl get svc grafana -n monitoring：查看 Grafana 的 NodePort",
    "kubectl get po -n monitoring：查看 Prometheus 与 exporter 状态",
    "kubectl get po -n skywalking：确认 OAP、UI 与 ES 是否就绪"
   ],
   "reuse": [
    "先确认三类数据都能用同一组 namespace、app、pod 标签检索，再谈告警。",
    "日志先只接一个命名空间，跑通 Kibana 查询后再扩大范围。",
    "指标接入后先看一周基线，再设 for 与阈值。",
    "链路只给核心交易链路接 Agent，避免全量埋点。"
   ],
   "interview": "可观测性先解决日志能不能查、指标能不能看趋势，再用链路定位单次慢请求，顺序反了会做很多无用埋点。",
   "pitfall": "一上来全量接链路，Agent 增加了启动参数和资源开销，日志却还在用 kubectl logs 逐 Pod 翻。",
   "source": "第29-32章 K8s可观测性",
   "tags": [
    "可观测性",
    "日志",
    "Prometheus",
    "Skywalking"
   ]
  },
  {
   "id": "O-02",
   "layer": "O",
   "title": "日志采集链路用 ECK 声明式部署",
   "oneliner": "采集与入库用 ECK 声明，Kafka 另装，Kibana 查询。",
   "mechanism": [
    "ECK 先装 CRD 再装 Operator，之后用自定义资源创建各 Elastic 组件。",
    "Filebeat 用 DaemonSet 跑在每个节点，hostPath 挂载容器日志目录。",
    "autodiscover 按容器 ID 找到日志文件，输出到 Kafka 的 k8spodlogs。",
    "Logstash 消费 Kafka，按日期索引写入 ES，Kibana 建 data view 查询。",
    "ES 的 nodeSet 配 3 个节点，Kibana 通过 elasticsearchRef 关联集群。",
    "Kafka 与 Zookeeper 不属于 ECK 资源，用 Helm 单独安装。"
   ],
   "code": [
    "kubectl create -f https://download.elastic.co/downloads/eck/2.16.0/crds.yaml：安装 ECK CRD",
    "kubectl apply -f https://download.elastic.co/downloads/eck/2.16.0/operator.yaml：安装 ECK Operator",
    "kind: Elasticsearch，spec.nodeSets[].count: 3：三个 ES 节点",
    "kind: Beat，spec.type: filebeat：声明 Filebeat 采集器",
    "spec.elasticsearchRefs[].clusterName: es-cluster：Logstash 关联 ES"
   ],
   "reuse": [
    "先装 CRD 再装 Operator，顺序反了 Operator 起不来。",
    "ES 的 emptyDir 只适合练习，生产要开 volumeClaimTemplates 挂 PVC。",
    "Kibana 用 NodePort 暴露时把 selfSignedCertificate.disabled 设为 true。",
    "上线前确认 vm.max_map_count 已调到 262144，否则 ES 容器反复重启。"
   ],
   "interview": "ECK 把 Elastic 全家桶变成 Kubernetes 自定义资源，采集端用 Filebeat DaemonSet，中间加 Kafka 削峰，Logstash 负责写 ES。",
   "pitfall": "只装 Operator 没装 CRD，或者 ES 用 emptyDir，Pod 一重建日志全丢。",
   "source": "第29章 K8s可观测性：日志收集",
   "tags": [
    "ECK",
    "Filebeat",
    "Kafka",
    "日志收集"
   ]
  },
  {
   "id": "O-03",
   "layer": "O",
   "title": "日志采集范围靠条件与标签收窄",
   "oneliner": "先用条件限定命名空间或标签，再处理文件日志与 sidecar。",
   "mechanism": [
    "模板里加 condition，按命名空间名过滤，只采集指定空间。",
    "按标签过滤用 drop_event 加 not equals，没标签的空间直接丢弃。",
    "采集主机日志加 type: log，路径 /var/log/messages，并打系统日志标记。",
    "程序把日志写容器内文件时，节点路径读不到，要给 Pod 加 sidecar。",
    "改 Beat 资源用 kubectl replace，同名资源重复 create 会失败。",
    "命名空间没打 filebeat=true 标签时查不到日志，打上后新日志才进来。"
   ],
   "code": [
    "condition.equals.kubernetes.namespace: krm：按命名空间过滤",
    "kubernetes.namespace_labels.filebeat: \"true\"：按命名空间标签过滤",
    "paths: /var/log/containers/*${data.kubernetes.container.id}.log：按容器 ID 定位日志",
    "kubectl label ns krm filebeat=true：给空间打采集标签",
    "kubectl replace -f filebeat-ns.yaml -n logging：更新 Beat 配置"
   ],
   "reuse": [
    "先列出要采集的命名空间与排除项，再写 condition 或 drop_event。",
    "接入前在节点上确认 /var/log/containers 下有对应软链。",
    "改完配置用 replace 更新，观察 Filebeat Pod 是否全部 Running。",
    "容器内文件日志先确认能否改成 stdout，改不了再上 sidecar。"
   ],
   "interview": "Filebeat 的采集范围在 autodiscover 模板里控制，命名空间用 condition，标签用 drop_event，容器内文件日志只能加 sidecar。",
   "pitfall": "只加 drop_event 不给命名空间打标签，然后以为 Filebeat 坏了，实际是过滤条件把日志全丢了。",
   "source": "第29章 K8s可观测性：日志收集",
   "tags": [
    "Filebeat",
    "日志采集",
    "Sidecar"
   ]
  },
  {
   "id": "O-04",
   "layer": "O",
   "title": "监控目标用自定义资源声明",
   "oneliner": "Prometheus Operator 用 CRD 描述采集目标，再生成配置。",
   "mechanism": [
    "kube-prometheus 按 K8s 版本选分支，setup/ 装 CRD，根目录清单装组件。",
    "ServiceMonitor 按 Service 标签匹配，endpoints.port 必须等于端口名。",
    "没有 Metrics 接口的服务先装 Exporter，例如 mysqld_exporter 暴露 9104。",
    "外部主机用 ScrapeConfig，域名探测用 Probe 配 blackbox-exporter。",
    "Etcd 的 Metrics 要证书，Secret 挂到 Prometheus 的 secrets 目录。",
    "Controller Manager 与 Scheduler 默认监听 127.0.0.1，要改成 0.0.0.0。"
   ],
   "code": [
    "kubectl create -f setup/：安装 Prometheus Operator CRD",
    "kubectl get servicemonitor -n monitoring：查看已注册采集目标",
    "spec.endpoints[].port: https-metrics：端口名与 Service 保持一致",
    "kind: ScrapeConfig，spec.staticConfigs[].targets：静态目标采集",
    "kind: Probe，spec.module: http_2xx：域名可用性探测"
   ],
   "reuse": [
    "新服务接入先确认 /metrics 可访问，再写 ServiceMonitor。",
    "ServiceMonitor 匹配失败按五步查：资源、生成的配置、Service、Metrics 可达、端口与 scheme。",
    "etcd 与 controller-manager 这类组件单独建 Endpoints 指向真实 IP。",
    "Grafana 面板先用社区 Dashboard ID，再按业务改。"
   ],
   "interview": "Prometheus Operator 用 ServiceMonitor、PodMonitor、Probe、ScrapeConfig 四类 CRD 描述采集目标，Operator 生成配置并重载 Prometheus。",
   "pitfall": "ServiceMonitor 的 port 写成数字或与 Service 端口名不一致，目标一直不出现。",
   "source": "第30-31章 K8s可观测性：全方位监控",
   "tags": [
    "Prometheus",
    "ServiceMonitor",
    "Exporter",
    "PromQL"
   ]
  },
  {
   "id": "O-05",
   "layer": "O",
   "title": "告警规则写清 for 与标签才算可用",
   "oneliner": "规则决定何时告警，Alertmanager 决定发给谁。",
   "mechanism": [
    "PrometheusRule 由 alert、expr、for、labels、annotations 组成。",
    "Alertmanager 配置分五块：全局、模板、路由、抑制、接收人。",
    "分组等待默认 30s，组内重发 5m，重复通知默认 4h。",
    "inhibit_rules 用 source 与 target 匹配，抑制宿主机宕机带来的衍生告警。",
    "AlertmanagerConfig 按标签分流，邮件、企业微信、钉钉各配一个 receiver。",
    "Grafana 面板里的 PromQL 可直接改成告警表达式，再补 for 与 severity。"
   ],
   "code": [
    "spec.groups[].rules[].expr：告警表达式",
    "expr: predict_linear(node_filesystem_avail_bytes[6h], 24*60*60) < 0：预测磁盘写满",
    "route.group_wait / group_interval / repeat_interval：分组等待与重发间隔",
    "receivers[].email_configs[].send_resolved: true：恢复通知",
    "kind: AlertmanagerConfig，spec.route.routes[].matchers：按标签分流"
   ],
   "reuse": [
    "先给告警打 severity 与 type 标签，再写路由，否则后期无法分流。",
    "阈值先用一周数据回放，确认 for 能过滤掉抖动。",
    "宿主机类告警先配抑制规则，再开容器与 Pod 级告警。",
    "每季度清理一次没人处理的告警规则。"
   ],
   "interview": "PrometheusRule 负责产生告警，Alertmanager 按 route 分组路由、按 inhibit_rules 抑制，最后通过 receiver 发到邮件或 IM。",
   "pitfall": "只写 expr 不写 for，瞬时抖动就打满手机；或者告警没有 severity 标签，路由规则无法匹配。",
   "source": "第30-31章 K8s可观测性：全方位监控",
   "tags": [
    "Alertmanager",
    "PrometheusRule",
    "Grafana",
    "告警"
   ]
  },
  {
   "id": "O-06",
   "layer": "O",
   "title": "全链路追踪靠 Agent 埋点串起来",
   "oneliner": "OAP 收数据落 ES，UI 看拓扑，Agent 决定埋点粒度。",
   "mechanism": [
    "Helm 一次装 ES、OAP、UI，OAP 的 storageType 为 elasticsearch。",
    "Java 用 initContainer 把 agent 复制到 emptyDir，主容器加载 -javaagent。",
    "SW_AGENT_NAME 写成命名空间::服务名，实例名用 Pod 名。",
    "Java 与 Go 的上报地址变量名不同，端口都是 11800。",
    "Go 在编译期执行 skywalking-go-agent -inject，并用 -toolexec 构建。",
    "告警在 alarm-settings.yml 配 hooks，自定义规则写 expression 与 period。"
   ],
   "code": [
    "JAVA_TOOL_OPTIONS: -javaagent:/skywalking/agent/skywalking-agent.jar：加载 Java Agent",
    "SW_AGENT_NAME: $(NAMESPACE)::$(APP)：服务名带命名空间",
    "SW_AGENT_COLLECTOR_BACKEND_SERVICES: skywalking-oap.skywalking:11800：OAP 地址",
    "RUN skywalking-go-agent -inject /path/to/project：Go 编译期注入",
    "kubectl exec <oap-pod> -- cat config/alarm-settings.yml：查看告警配置"
   ],
   "reuse": [
    "接入前先给 Deployment 补 version 与 app 标签，链路和灰度都要用。",
    "agent 用 initContainer 复制，避免把 agent 打进业务镜像。",
    "先接一条核心链路，确认拓扑、trace、错误日志都正常再铺开。",
    "练习环境按 3 台 4C8G 准备，OAP 的 javaOpts 设 -Xmx2g -Xms2g。"
   ],
   "interview": "Skywalking 的 Java Agent 在启动参数里挂载，Go Agent 在编译期注入，数据统一发到 OAP，OAP 落 ES，UI 用 traceId 串起跨服务调用。",
   "pitfall": "只配 JAVA_TOOL_OPTIONS 不配 SW_AGENT_COLLECTOR_BACKEND_SERVICES，Agent 起得来但数据发不到 OAP。",
   "source": "第32章 K8s可观测性：Skywalking",
   "tags": [
    "Skywalking",
    "链路追踪",
    "Agent",
    "OAP"
   ]
  },
  {
   "id": "A-01",
   "layer": "A",
   "title": "HPA 按资源利用率自动增减副本",
   "oneliner": "HPA 按 requests 占比算副本数，没设 requests 就失真。",
   "mechanism": [
    "kubectl autoscale 按 CPU 百分比创建 HPA，示例阈值 10%，副本 1 到 10。",
    "autoscaling/v2 的 metrics 支持 Resource 类型，可对 memory 配利用率。",
    "利用率以 requests 为分母，requests 没设或太小，百分比会失真。",
    "压测后 HPA 从 1 个副本扩到 10 个，TARGETS 显示 230%/10%。",
    "HPA 示例最小副本为 1，KEDA 才支持缩容到 0。",
    "扩容上限由 maxReplicas 卡住，缩容要等指标回落。"
   ],
   "code": [
    "kubectl autoscale deployment nginx-server --cpu-percent=10 --min=1 --max=10：创建 CPU HPA",
    "apiVersion: autoscaling/v2，kind: HorizontalPodAutoscaler：HPA 资源",
    "spec.metrics[].resource.name: memory：按内存伸缩",
    "target.type: Utilization，averageUtilization: 80：目标利用率 80%",
    "kubectl get hpa：查看 TARGETS 与 REPLICAS"
   ],
   "reuse": [
    "上线前给所有工作负载设 requests，否则 HPA 的百分比没有意义。",
    "先用固定 QPS 压测，记录副本数与延迟曲线，再定阈值。",
    "把 maxReplicas 与节点容量、配额一起核算，避免扩到无节点可调度。",
    "内存型 HPA 先观察缩容行为，必要时改用队列长度等业务指标。"
   ],
   "interview": "HPA 按指标算出期望副本数，CPU 和内存用 requests 做分母，所以 requests 必须准确，扩容上限由 maxReplicas 卡住。",
   "pitfall": "requests 设得远小于实际用量，HPA 看到几百个百分点，一直顶在 maxReplicas。",
   "source": "第28章 K8s弹性能力：下一代弹性伸缩KEDA",
   "tags": [
    "HPA",
    "弹性伸缩",
    "requests"
   ]
  },
  {
   "id": "A-02",
   "layer": "A",
   "title": "事件驱动伸缩用 KEDA 接外部指标",
   "oneliner": "ScaledObject 描述触发源，KEDA 生成 HPA 执行扩缩容。",
   "mechanism": [
    "KEDA 由 Operator、metrics apiserver、admission webhooks 组成。",
    "ScaledObject 指向工作负载，triggers 写事件源，KEDA 生成 HPA。",
    "cron 触发器用 timezone、start、end、desiredReplicas 控制定时扩容。",
    "RabbitMQ 的 mode 可选 QueueLength 或 MessageRate，value 是阈值。",
    "pollingInterval 默认 5 秒，cooldownPeriod 默认 300 秒。",
    "TriggerAuthentication 从 Secret 取连接串，ScaledObject 再引用它。"
   ],
   "code": [
    "helm install keda kedacore/keda --namespace keda --create-namespace：安装 KEDA",
    "kind: ScaledObject，spec.triggers[].type: cron：定时扩缩容",
    "metadata.mode: QueueLength，queueName: hello：按 RabbitMQ 队列长度",
    "kind: TriggerAuthentication，spec.secretTargetRef：从 Secret 注入认证",
    "kind: ScaledJob，spec.jobTargetRef：按事件创建 Job"
   ],
   "reuse": [
    "先把事件源的连接信息放进 Secret，再写 TriggerAuthentication。",
    "用 minReplicaCount 保留热实例，避免冷启动拖慢首批请求。",
    "上线前核对 cooldownPeriod，队列清空后缩得太快会反复拉起。",
    "定时任务用 ScaledJob，常驻服务用 ScaledObject。"
   ],
   "interview": "KEDA 不替换 HPA，它把 Kafka、RabbitMQ、MySQL、cron 这些外部指标翻译成 HPA 能读的指标，再让 HPA 调整副本数。",
   "pitfall": "把 cooldownPeriod 设得比业务处理时间还短，队列一清空就缩容，下一批消息又全部冷启动。",
   "source": "第28章 K8s弹性能力：下一代弹性伸缩KEDA",
   "tags": [
    "KEDA",
    "ScaledObject",
    "HPA",
    "事件驱动"
   ]
  },
  {
   "id": "A-03",
   "layer": "A",
   "title": "弹性指标要选业务真正卡住的地方",
   "oneliner": "CPU 看算力，队列看积压，定时高峰用 cron。",
   "mechanism": [
    "计算密集型服务用 CPU 利用率，阈值取压测得出的拐点。",
    "异步消费看队列积压，RabbitMQ 用 QueueLength，Redis 用 listLength。",
    "数据库任务用 SQL 统计待处理行数，queryValue 是触发扩容的平均值。",
    "已知的早高峰用 cron 提前扩容，比等指标上升再扩更快。",
    "扩容看指标，缩容看冷却时间，两个参数分开调。",
    "CPU 不高但延迟高时，加副本解决不了下游瓶颈。"
   ],
   "code": [
    "spec.triggers[].metadata.query: SELECT COUNT(*) FROM orders WHERE status='pending'：按待处理行数",
    "spec.triggers[].metadata.queryValue: \"4.4\"：触发扩容的平均值",
    "metadata.mode: MessageRate：按消息速率",
    "metadata.listLength: \"5\"：Redis 列表长度阈值",
    "spec.minReplicaCount / maxReplicaCount：副本边界"
   ],
   "reuse": [
    "先定位瓶颈是 CPU、内存、连接数还是下游队列，再选指标。",
    "用生产峰值数据回放，确认阈值不会在正常波动时触发。",
    "给扩容留出镜像拉取与就绪探针时间，别把阈值卡在 SLO 边缘。",
    "每季度复盘一次扩缩容记录，删掉从不触发的规则。"
   ],
   "interview": "弹性指标要对着瓶颈选：算力瓶颈看 CPU，异步积压看队列长度，已知高峰用定时，指标和冷却时间一起调。",
   "pitfall": "CPU 不高但接口慢，还按 CPU 扩容，副本加完延迟不变，因为瓶颈在数据库或下游。",
   "source": "第28章 K8s弹性能力：下一代弹性伸缩KEDA",
   "tags": [
    "弹性伸缩",
    "指标",
    "KEDA",
    "容量规划"
   ]
  },
  {
   "id": "A-04",
   "layer": "A",
   "title": "Istio 控制面管配置数据面管流量",
   "oneliner": "istiod 管配置，网关接南北流量，sidecar 管东西流量。",
   "mechanism": [
    "IstioOperator 声明组件，profile 为 default，istioctl install 安装。",
    "istiod 暴露 15010、15012、443、15014 端口，是控制面入口。",
    "命名空间加 istio-injection=enabled，新 Pod 自动多一个 istio-proxy。",
    "Pod 级用 sidecar.istio.io/inject 覆盖命名空间设置。",
    "去掉命名空间标签不影响已注入的 Pod，重建后才恢复单容器。",
    "生产给 istiod 与网关配 minReplicas 2、maxReplicas 5。"
   ],
   "code": [
    "istioctl install -f istio-operator.yaml：按 IstioOperator 安装",
    "kubectl label namespace istio-test istio-injection=enabled：开启自动注入",
    "sidecar.istio.io/inject: \"false\"：单个 Pod 关闭注入",
    "components.pilot.k8s.hpaSpec.minReplicas: 2：控制面至少两个副本",
    "meshConfig.accessLogFile: /dev/stdout：访问日志输出到标准输出"
   ],
   "reuse": [
    "先确认命名空间标签，再重建 Pod，注入发生在创建时。",
    "给 istiod 与网关单独规划资源与副本，别用默认单副本跑生产。",
    "上线前装 Kiali，用拓扑图核对东西流量是否真的经过 sidecar。",
    "把 accessLog 打开并统一成 JSON，方便日志平台解析。"
   ],
   "interview": "Istio 装上以后，istiod 是控制面负责下发配置，ingressgateway 接外部流量，业务 Pod 里的 istio-proxy 接管东西向流量。",
   "pitfall": "给命名空间打完标签却不重建 Pod，旧 Pod 仍是 1/1，流量根本没走 sidecar。",
   "source": "第33章 K8s细粒度流量管理：服务网格",
   "tags": [
    "Istio",
    "Sidecar",
    "istiod",
    "IngressGateway"
   ]
  },
  {
   "id": "A-05",
   "layer": "A",
   "title": "路由决定流量落到哪个服务版本",
   "oneliner": "先按标签划版本，再按权重或请求头分流。",
   "mechanism": [
    "Gateway 用 selector 绑定 istio: ingressgateway，hosts 声明域名。",
    "DestinationRule 的 subsets 按 version 标签划出 v1、v2、v3。",
    "VirtualService 的 route 用 weight 配 80/20，改权重控制灰度。",
    "match.headers 按 end-user 匹配，把特定用户固定到新版本。",
    "rewrite 改路径，redirect 返回 301，两者适用场景不同。",
    "fault 注入 delay 或 abort，用来验证超时、重试与降级。"
   ],
   "code": [
    "kind: DestinationRule，spec.subsets[].labels.version: v2：定义版本子集",
    "route[].destination.subset: v2，weight: 20：20% 流量到 v2",
    "match.headers.end-user.exact: jason：按用户分流",
    "fault.delay.fixedDelay: 5s，percentage.value: 100：注入延迟",
    "fault.abort.httpStatus: 400：注入中断"
   ],
   "reuse": [
    "灰度前先建 DestinationRule，确认 Kiali 里能看到多个版本。",
    "从 1% 或 5% 起步，观察错误率与延迟再调权重。",
    "AB 测试用请求头或 Cookie 固定用户，避免同一用户来回切版本。",
    "故障演练先在测试命名空间注入 delay，确认监控与告警能发现。"
   ],
   "interview": "Istio 灰度先用 DestinationRule 按 version 标签划子集，再用 VirtualService 调权重或按请求头匹配，把流量逐步切到新版本。",
   "pitfall": "DestinationRule 的 subset 标签与 Pod 的 version 不一致，权重配了也没有对应实例。",
   "source": "第33章 K8s细粒度流量管理：服务网格",
   "tags": [
    "Istio",
    "VirtualService",
    "灰度发布",
    "DestinationRule"
   ]
  },
  {
   "id": "A-06",
   "layer": "A",
   "title": "CubeFS 四类节点各管一段存储职责",
   "oneliner": "四类节点分工：元信息、元数据、文件、对象接口。",
   "mechanism": [
    "Master 维护集群元信息，用 StatefulSet 部署，至少 3 个且建议奇数。",
    "DataNode 挂数据盘存文件，MetaNode 存文件元数据，两者都是 DaemonSet。",
    "ObjectNode 无状态，把文件系统转成 S3 协议，用 Deployment 部署。",
    "节点靠 component.cubefs.io 的四类标签决定安装哪个组件。",
    "数据盘格式化为 xfs，挂到 /data0、/data1，并写入 fstab。",
    "Helm 的 disks 写成 /data0:2147483648，冒号后是为该盘保留的字节数。"
   ],
   "code": [
    "kubectl label node <nodename> component.cubefs.io/master=enabled：标记 Master 节点",
    "mkfs.xfs -f /dev/sdb：格式化数据盘",
    "mount /dev/sdb /data0：挂载数据盘",
    "datanode.disks: - /data0:2147483648：声明数据盘与保留空间",
    "master.replicas: 3：Master 副本数为奇数"
   ],
   "reuse": [
    "先规划节点标签，再装 Helm chart，Pod 才会落到正确节点。",
    "数据盘统一按 data0 到 dataN 命名并写 fstab，扩容时顺序不乱。",
    "生产把 Master 与 DataNode 的 requests 提到 8Gi/2 核，limits 32Gi/8 核。",
    "MetaNode 的 total_mem 设为主机内存的 80%。"
   ],
   "interview": "CubeFS 用 Master 管元信息、MetaNode 存元数据、DataNode 存数据、ObjectNode 提供 S3，前三类靠节点标签与对应控制器落地。",
   "pitfall": "只给节点打 datanode 标签却没格式化挂载数据盘，Pod 起来但集群没有可用容量。",
   "source": "第34章 K8s存储能力：EB级分布式存储平台",
   "tags": [
    "CubeFS",
    "分布式存储",
    "DataNode",
    "MetaNode"
   ]
  },
  {
   "id": "A-07",
   "layer": "A",
   "title": "CubeFS 选型看共享、扩容与对象存储",
   "oneliner": "要 RWX 共享、在线扩容和 S3 接口时，一套 CubeFS 就够。",
   "mechanism": [
    "CSI 给工作节点打 csi=enabled 标签，装完生成 StorageClass cfs-sc。",
    "PVC 声明 ReadWriteMany 后 PV 为 RWX，多个 Pod 挂载同一目录。",
    "allowVolumeExpansion 为 true，改 PVC 的 storage 即可在线扩容。",
    "扩容可每台主机加盘改 disks，也可新增节点打 datanode 标签。",
    "ObjectNode 提供 S3 协议，按项目建用户、按微服务建桶。",
    "卷删除默认延迟 48 小时，下线 DataNode 会自动迁移数据。"
   ],
   "code": [
    "kubectl label node component.cubefs.io/csi=enabled：标记可挂载节点",
    "storageClassName: cfs-sc，accessModes: ReadWriteMany：共享卷声明",
    "resources.requests.storage: 2Gi：改 PVC 容量触发在线扩容",
    "cfs-cli datanode decommission k8s-node02:17310：下线数据节点",
    "mc mb projecta/appa：为微服务创建桶"
   ],
   "reuse": [
    "选型先问三个问题：要不要 RWX、要不要在线扩容、要不要 S3。",
    "给 CubeFS 单独规划数据盘与节点标签，不和业务 Pod 抢盘。",
    "上线前验证删 Pod 后数据仍在，再迁数据库类有状态服务。",
    "对象存储按项目发 Access Key，不共用 root。"
   ],
   "interview": "选 CubeFS 主要看三点：能不能给多 Pod 提供 RWX、能不能在线扩容、要不要同时提供 S3 对象存储，这三点它一套都能给。",
   "pitfall": "把 CubeFS 当普通 NFS 用，所有业务共用一个卷一个用户，出问题无法定位也无法限额。",
   "source": "第34章 K8s存储能力：EB级分布式存储平台",
   "tags": [
    "CubeFS",
    "存储选型",
    "CSI",
    "对象存储"
   ]
  },
  {
   "id": "D-01",
   "layer": "D",
   "title": "流水线 Slave 建在集群里，用完即删",
   "oneliner": "Jenkins 主节点常驻，Slave 由插件按流水线创建，构建完删除。",
   "mechanism": [
    "主节点用 Docker 跑，/data/jenkins_data 挂到 /bitnami/jenkins，重启不丢。",
    "8080 是 Web 界面端口，50000 是 jnlp 端口，Slave 靠它和主节点通信。",
    "Kubernetes 插件在指定集群创建 Slave Pod，流水线结束即删除，构建环境不长期占机器。",
    "Slave Pod 按用途分容器：jnlp 通信、build 跑 mvn、kaniko 做镜像、kubectl 发版。",
    "workspace 挂 pipeline-cache PVC，~/.m2 依赖缓存跨构建复用。",
    "拉代码阶段用 env.gitlabBranch 是否为空区分手动触发与 GitLab 触发，两个 stage 并行声明。"
   ],
   "code": [
    "docker run -d --name=jenkins -p 8080:8080 -p 50000:50000 -v /data/jenkins_data:/bitnami/jenkins：主节点与数据持久化",
    "agent { kubernetes { cloud 'kubernetes-study' } }：指定 Slave 建在哪个集群",
    "workspaceVolume persistentVolumeClaimWorkspaceVolume(claimName: \"pipeline-cache\")：工作区挂 PVC",
    "kaniko 容器：executor -d ${HARBOR_ADDRESS}/${REGISTRY_DIR}/${IMAGE_NAME}:${TAG} -c . --insecure",
    "kubectl set image deploy -l app=${IMAGE_NAME} ${IMAGE_NAME}=...:${TAG} -n $NAMESPACE：按标签更新镜像"
   ],
   "reuse": [
    "先给构建节点打 build=true 标签，再在 Pod 模板里配 nodeSelector，避免 Slave 落到 Master。",
    "把 Harbor 地址、项目、镜像名、Namespace 提到 environment，Jenkinsfile 只留一份模板。",
    "Kaniko 的 /kaniko/.docker 挂 docker-registry-config ConfigMap，否则推镜像认证失败。",
    "每次构建用 BUILD_TAG 加 commit 短哈希做 TAG，回滚时能定位到具体提交。"
   ],
   "interview": "Jenkins 不常驻构建机，它通过 Kubernetes 插件为每条流水线创建一个多容器 Pod，拉代码、编译、打镜像、发版都在 Pod 里完成，结束后 Pod 删除。",
   "pitfall": "cloud 名字写错或节点没有 build=true 标签，流水线会一直停在等待 agent；不挂 pipeline-cache，Maven 每次全量下载依赖。",
   "source": "第35-37章 基于K8s和Jenkins的DevOps平台落地",
   "tags": [
    "Jenkins",
    "CI/CD",
    "Pipeline",
    "Kubernetes"
   ]
  },
  {
   "id": "D-02",
   "layer": "D",
   "title": "云原生流水线把每个任务跑成一个 Pod",
   "oneliner": "Task 与 Pipeline 只声明，Run 对象才建 Pod。",
   "mechanism": [
    "Task 定义步骤和镜像，本身不执行；TaskRun 引用 taskRef 后才创建 Pod 跑起来。",
    "Pipeline 用 runAfter 串 Task，PipelineRun 会为每个 Task 建 TaskRun。",
    "传值用 results：上游把值写进 tag 结果，下游按 tasks.init.results.tag 取。",
    "代码目录用 workspaces：PipelineRun 把 PVC 的 subPath 挂成 share-data。",
    "流水线拆成拉代码、初始化、构建、打镜像、发版五个 Task，由一条 Pipeline 串联。",
    "凭据用 Secret 挂成 workspace：Git 密钥、镜像仓库、kubeconfig。"
   ],
   "code": [
    "kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml：安装 Tekton",
    "kind: TaskRun，spec.taskRef.name：引用 Task 并触发一次执行",
    "runAfter: [\"fetch-source\"]：声明 build 在拉代码之后运行",
    "echo $TAG | tee $(results.tag.path)：写入 results，下游用 $(tasks.init.results.tag) 读取",
    "kubectl get taskrun / kubectl logs -f <taskrun>-pod -c step-build：查执行与日志"
   ],
   "reuse": [
    "先",
    "建",
    " ",
    "t",
    "e",
    "k",
    "t",
    "o",
    "n",
    "-",
    "w",
    "o",
    "r",
    "k",
    "s",
    "p",
    "a",
    "c",
    "e",
    " ",
    "与",
    " ",
    "t",
    "e",
    "k",
    "t",
    "o",
    "n",
    "-",
    "c",
    "a",
    "c",
    "h",
    "e",
    " ",
    "两",
    "个",
    " ",
    "P",
    "V",
    "C",
    "，",
    "用",
    "支",
    "持",
    " ",
    "R",
    "W",
    "X",
    " ",
    "的",
    " ",
    "n",
    "f",
    "s",
    "-",
    "c",
    "s",
    "i",
    "。",
    "把 Git、镜像仓库、kubeconfig 三类 Secret 提前建好，PipelineRun 只引用名字。",
    "PipelineRun 用 generateName，每次执行自动生成唯一名字，历史记录不会互相覆盖。",
    "每个 Task 只做一件事，构建命令通过 BUILD_COMMAND 传入，同一套 Pipeline 复用到 Java、Go、前端。"
   ],
   "interview": "Tekton 把流水线拆成 Task 和 Pipeline 两类声明，真正执行靠 TaskRun 和 PipelineRun，每个 TaskRun 就是一个 Pod，日志和产物都留在集群里。",
   "pitfall": "只 apply 了 Task 或 Pipeline 不会跑，必须再建 TaskRun 或 PipelineRun；workspace 的 PVC、Secret 没建，Pod 会卡在挂载。",
   "source": "第38章 云原生DevOps平台：Tekton",
   "tags": [
    "Tekton",
    "Pipeline",
    "TaskRun",
    "CI/CD"
   ]
  },
  {
   "id": "D-03",
   "layer": "D",
   "title": "多集群交付以 Git 为唯一事实源",
   "oneliner": "Git 唯一源，ArgoCD 对齐集群，ApplicationSet 管多集群。",
   "mechanism": [
    "GitOps 把 Git 仓库当唯一事实来源，集群状态由工具从仓库同步，人工不直接改集群。",
    "三个组件：APIServer 收请求，Repository Server 渲染 YAML，Controller 纠偏。",
    "argocd cluster add 会在目标集群创建 argocd-manager 账号，并授予集群级权限。",
    "AppProject 限定可用的仓库、目标集群与 Namespace、可部署的资源类型。",
    "Application 的自动同步可开 selfHeal 和 prune，偏离就改回，Git 里删掉的资源也删。",
    "ApplicationSet 的 list 生成器按 region 生成三个 Application。"
   ],
   "code": [
    "kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml：安装 ArgoCD",
    "argocd cluster add kubernetes-admin@kubernetes --name k8s-bj-cluster：纳管集群",
    "argocd cluster add kubernetes-admin@kubernetes --name k8s-nj-cluster --kubeconfig nj-kubeconfig：按 kubeconfig 纳管",
    "kind: ApplicationSet，spec.generators.list.elements：按集群列表批量生成 Application",
    "argocd app sync -l project=multi：按标签批量同步"
   ],
   "reuse": [
    "纳管集群后先建 AppProject，把 sourceRepos 和 destinations 收窄到项目实际范围。",
    "生产环境先跑手动同步，稳定后再开 automated；开 prune 前确认仓库里没有待删目录。",
    "多环境差异走 ApplicationSet 的 elements 字段加 helm parameters，不要每个集群复制一份 values。",
    "回滚优先改 Git 再同步，页面上的一键 Rollback 只用于紧急止血。"
   ],
   "interview": "ArgoCD 是声明式的 GitOps 交付工具，Controller 持续把集群实际状态和 Git 期望状态做 diff，ApplicationSet 用一个模板就能把同一套 Helm 配置铺到多个集群。",
   "pitfall": "开了自动同步和 PRUNE，Git 里误删目录会直接删掉集群资源；页面 Rollback 之后集群和 Git 不一致，下一次同步又改回去。",
   "source": "第41章 K8s多集群管理-ArgoCD",
   "tags": [
    "ArgoCD",
    "GitOps",
    "ApplicationSet",
    "多集群"
   ]
  },
  {
   "id": "D-04",
   "layer": "D",
   "title": "高可用入口收敛到 VIP 与三台 Master",
   "oneliner": "客户端只认 VIP，haproxy 把 16443 转到 apiserver。",
   "mechanism": [
    "三台 Master 各跑 apiserver、controller-manager、scheduler 和 etcd。",
    "VIP 由 keepalived 持有，haproxy 监听 16443，把请求轮询到三台 Master 的 6443。",
    "keepalived 101 主、100 备，vrrp_script 每 5 秒查 haproxy，失败两次降权。",
    "controlPlaneEndpoint 写 VIP:16443，join 和客户端都走这个地址。",
    "apiServer.certSANs 必须包含 VIP，否则通过 VIP 访问时证书校验不过。",
    "其余 Master 用 --control-plane 加入，certificate-key 两小时后失效可重传。"
   ],
   "code": [
    "controlPlaneEndpoint: 192.168.181.236:16443：集群统一入口",
    "apiServer.certSANs: [192.168.181.236]：证书包含 VIP",
    "frontend k8s-master 绑定 0.0.0.0:16443，backend 指向三台 6443：haproxy 四层转发",
    "priority 101 / 100 加 vrrp_script chk_apiserver：主备选举与健康检查",
    "kubeadm join 192.168.181.236:16443 --control-plane --certificate-key ...：加入控制平面"
   ],
   "reuse": [
    "规划时先确认 VIP 在同网段且无人使用，ping 不通才可用，再写进 certSANs。",
    "公有云直接用 SLB、NLB、ELB 替代 haproxy 和 keepalived，不要硬套 VIP 方案。",
    "生产选小版本号大于 5 的版本，课件按 1.33.4 落地。",
    "装完在三台 Master 上核对 systemctl status keepalived haproxy 与 netstat -lntp。"
   ],
   "interview": "高可用的关键是收住入口：客户端只认一个 VIP，haproxy 把 16443 转到三台 apiserver 的 6443，keepalived 负责 VIP 漂移，etcd 跟着 Master 做多副本。",
   "pitfall": "VIP 和公司内网已有 IP 冲突，或者忘了把它加进 certSANs，集群能 init 成功但走 VIP 访问 TLS 失败；公有云大多不支持 keepalived。",
   "source": "第39章 K8s高可用集群落地",
   "tags": [
    "高可用",
    "keepalived",
    "haproxy",
    "etcd"
   ]
  },
  {
   "id": "D-05",
   "layer": "D",
   "title": "可用性要按清单验证，不只看节点状态",
   "oneliner": "节点 Ready 只是第一步，VIP、端口、DNS、跨节点通信都要逐项验。",
   "mechanism": [
    "VIP 验证分两步：所有节点 ping 通，telnet VIP 16443 能建立连接。",
    "不通时按顺序查 firewalld、selinux、haproxy 与 keepalived 状态、监听端口。",
    "kube-proxy 默认可能不是 ipvs，改 cm 的 mode: ipvs 并 patch 触发重建。",
    "metrics-server 装好后 kubectl top 才有数据，节点与 Pod 的资源使用率才能看。",
    "每个节点要能访问 kubernetes svc 的 443 和 kube-dns 的 53，否则解析和调用会失败。",
    "Pod 之间要测同 NS、跨 NS、同机、跨机四种组合，少一种都可能漏掉网络问题。"
   ],
   "code": [
    "ping 192.168.181.236 -c 4 与 telnet 192.168.181.236 16443：VIP 连通性",
    "kubectl edit cm kube-proxy -n kube-system，mode: ipvs：切换代理模式",
    "curl 127.0.0.1:10249/proxyMode：返回 Ipvs 即生效",
    "kubectl top node / kubectl top po -A：metrics-server 验证",
    "nslookup kubernetes 与 nslookup kube-dns.kube-system：同 NS 与跨 NS 解析"
   ],
   "reuse": [
    "集群交付前按可用性清单逐条打勾，别只看 kubectl get node 全绿。",
    "Calico 装完节点才会从 NotReady 变 Ready，初始化阶段的 NotReady 先不要当故障。",
    "换 ipvs 后 patch DaemonSet 加时间戳注解，确保 kube-proxy Pod 真正重建。",
    "把 VIP ping、16443 telnet、nslookup 三条命令写进上线检查脚本。"
   ],
   "interview": "交付时我先验证 VIP 和 16443 端口，再看 kube-proxy 是否 ipvs、metrics 是否有数据，最后按 DNS、跨 Namespace、跨节点通信逐项测一遍。",
   "pitfall": "只 ping 通 VIP 就认为高可用没问题，没测 16443；节点一直 NotReady 就怀疑集群坏了，其实只是 Calico 还没装。",
   "source": "第39章 高可用集群落地与可用性验证",
   "tags": [
    "高可用",
    "可用性验证",
    "kube-proxy",
    "metrics-server"
   ]
  },
  {
   "id": "D-06",
   "layer": "D",
   "title": "下线与升级都先打污点再驱逐",
   "oneliner": "下线、扩容、升级同一套顺序：打污点、迁 Pod、drain、恢复调度。",
   "mechanism": [
    "下线第一步给节点打 offline=true:NoSchedule 污点，阻止新 Pod 调度上去。",
    "kubectl get po -A -owide 找重要服务，先 rollout restart 把它们迁走。",
    "drain --ignore-daemonsets 驱逐普通 Pod，再查 Pending 和非 Running。",
    "确认无异常后 delete node，再在节点上 kubeadm reset -f 并 disable kubelet。",
    "扩容节点要补基础配置、内核参数、containerd、kubelet，再拷证书并 join。",
    "升级按 Master01、其余 Master、Worker 的顺序，kubeadm 不能跨小版本。"
   ],
   "code": [
    "kubectl taint node k8s-node02 offline=true:NoSchedule：禁止新调度",
    "kubectl drain k8s-node02 --ignore-daemonsets：驱逐工作负载",
    "kubeadm token create --print-join-command：给新节点生成 join 命令",
    "kubeadm upgrade plan / kubeadm upgrade apply v1.34.1：主节点升级",
    "kubeadm upgrade node：其余 Master 升级本机组件"
   ],
   "reuse": [
    "下线前确认节点是不是 Ingress 入口、端口流量是否已切走，否则迁完 Pod 业务还是断。",
    "升级前先备份 etcd 和集群资源，关闭 swap，再换新版本 yum 源。",
    "Worker 升级前打 upgrade=true:NoSchedule 并 drain，升级完 uncordon 并去掉污点。",
    "初始化失败先 kubeadm reset -f 再重来，日志看 /var/log/messages 或 /var/log/syslog。"
   ],
   "interview": "我下线节点会先打污点、迁走有状态和入口类服务，再 drain，确认没有 Pending 后删节点；升级则严格按 Master 逐台、再 Worker 的顺序走 kubeadm upgrade。",
   "pitfall": "升级时跳过小版本，或者只升级 Worker 不升级 Master；升级完忘记 uncordon 和去污点，节点会一直不可调度。",
   "source": "第39章 集群维护管理",
   "tags": [
    "节点维护",
    "集群升级",
    "kubeadm",
    "drain"
   ]
  },
  {
   "id": "D-07",
   "layer": "D",
   "title": "异地多活是每个大区一套集群加 LB",
   "oneliner": "每个大区独立建集群和入口，云 LB 对外，GTM 按地域解析。",
   "mechanism": [
    "课件把异地多活分成单集群和多集群两种，落地演示的是每个大区一套独立集群。",
    "大区按华南、华北、华东、华西划分，每个中心各自部署 K8s、Ingress 和测试服务。",
    "对外不直接暴露服务器 IP，每个中心买云 LB，腾讯用 CLB，阿里用 SLB。",
    "单节点测试集群 init 后去掉 control-plane 污点，再打 ingress=true 标签装入口。",
    "GTM 把不同地域的解析指向对应中心的 LB 地址，中心故障时切到另一个地址池。",
    "故障切换不即时，DNS 有缓存有效期，用户要等 TTL 过期才会解析到新地址。"
   ],
   "code": [
    "kubeadm init --apiserver-advertise-address 10.206.0.6 --kubernetes-version 1.34.1：各中心建集群",
    "kubectl taint node k8s-nj-master01 node-role.kubernetes.io/control-plane-：去掉单节点污点",
    "kubectl label node k8s-nj-master01 ingress=true：标记入口节点",
    "kubectl create -f ingress-nginx-daemonset.yaml：每个中心部署一套入口"
   ],
   "reuse": [
    "选区域时按用户分布选两到三个大区，每个大区至少一套独立集群和独立 LB。",
    "各中心 Ingress 域名保持一致，切换只改 DNS，不改应用配置。",
    "演练时直接关停一个中心的服务器，看 GTM 地址池状态和用户实际访问结果。",
    "给每个中心单独规划网段，避免多集群互通时地址冲突。"
   ],
   "interview": "异地多活在我的理解里是每个大区都有能独立承载流量的集群和入口，用户按地域解析到最近的中心，某个中心挂了由 GTM 把解析切到另一个地址池。",
   "pitfall": "把域名直接解析到某一台服务器 IP，机房故障时解析还指着它；以为切 DNS 立刻生效，忽略了 TTL 缓存。",
   "source": "第40章 企业落地异地多活、异地容灾架构",
   "tags": [
    "异地多活",
    "多集群",
    "Ingress",
    "容灾"
   ]
  },
  {
   "id": "D-08",
   "layer": "D",
   "title": "智能 DNS 用地址池和健康检查切流量",
   "oneliner": "GTM 按健康检查和线路选地址池，主力全挂才走兜底地址池。",
   "mechanism": [
    "GTM 实例对应一个对外业务域名，创建后得到一个 CNAME 域名，业务域名再 CNAME 过去。",
    "监控器对地址池做健康检查，类型有 PING、TCP、HTTP(S)，每个勾选节点消耗一个探测额度。",
    "地址池是一组提供相同服务的 IP，一般按机房或中心划分。",
    "调度策略由线路类型、一级地址池、二次地址池、兜底地址池组成，按优先级切换。",
    "兜底地址池在所有主力地址池不可用时启用，默认返回池内全部地址。",
    "按大区划分线路需要 DNSPod 专业版，生产套餐建议 50 个探测额度以上。"
   ],
   "code": [
    "TTL：域名对应 IP 在运营商 DNS 的缓存时间，决定切换多久生效",
    "CNAME 域名：GTM 接入域名，业务域名 CNAME 到它",
    "线路类型：只调度对应线路的流量，大区划分需要专业版 DNSPod",
    "兜底地址池：所有主力不可用时返回池内全部地址"
   ],
   "reuse": [
    "先建监控器再建地址池，地址池里挂各中心的 LB 地址。",
    "给每个大区配一条调度策略，最后补一条默认策略接住其他地域。",
    "套餐额度按地址池数量乘探测节点数估算，别只按域名数买。",
    "上线前用不同地域的出口测试解析结果，确认返回的是对应中心的地址。"
   ],
   "interview": "智能 DNS 的判断依据是健康检查和线路，监控器发现某个地址池不可用就按策略切到二次地址池，全部不可用才走兜底。",
   "pitfall": "只买域名不买探测额度，监控器建不起来；兜底地址池留空，主力全挂时解析直接失败。",
   "source": "第40章 企业落地异地多活、异地容灾架构",
   "tags": [
    "智能DNS",
    "GTM",
    "流量调度",
    "健康检查"
   ]
  },
  {
   "id": "D-09",
   "layer": "D",
   "title": "Velero 把集群资源备份进对象存储",
   "oneliner": "备份资源到对象存储，恢复时按备份重建，跨集群靠复制目录。",
   "mechanism": [
    "Velero 把备份文件上传到对象存储，课件用 Minio，桶名 velerobackup。",
    "服务端用 velero install 装，provider 选 aws，配 S3 插件和存储位置。",
    "备份内容是集群资源和元数据，默认 ttl 720h，快照数据移动默认关闭。",
    "恢复用 restore create --from-backup，可指定 NS 和资源类型，按最小范围。",
    "周期任务用 schedule create，cron 按 UTC 算，排除 kube-system 和 velero。",
    "跨集群恢复只需把备份目录复制到目标集群的存储位置，Velero 会自动识别成 Backup 资源。"
   ],
   "code": [
    "velero install --provider aws --plugins registry.cn-beijing.aliyuncs.com/dotbalo/velero-plugin-for-aws:latest --bucket velerobackup --backup-location-config region=minio,s3ForcePathStyle=\"true\",s3Url=http://192.168.181.134:9000：装服务端",
    "velero backup create test-backup / velero backup get：备份并看状态",
    "velero restore create test-restore --from-backup test-backup --include-namespaces test --preserve-nodeports：恢复并保留端口",
    "velero schedule create daily-cluster-backup --schedule=\"0 13 * * *\" --exclude-namespaces=\"velero,kube-system\" --ttl=720h0m0s：每日备份",
    "velero restore create ... --existing-resource-policy=update：覆盖已存在资源"
   ],
   "reuse": [
    "给每个集群单独建桶或加 --prefix，不要把多个集群的备份混在同一目录。",
    "每次大变更前先 velero backup create <ns>-ns-backup，失败时按备份回滚。",
    "恢复带 NodePort 的服务一律加 --preserve-nodeports，避免端口变化影响上游。",
    "定期把备份恢复到测试集群，确认备份文件真的可用。"
   ],
   "interview": "Velero 把 K8s 资源和卷信息备份到对象存储，恢复时按备份重建资源；生产上我会用 schedule 每天备份，并在重大变更前单独做一次全量备份。",
   "pitfall": "恢复时以为会覆盖现有资源，其实默认跳过，Deployment 不会回滚；不带 --preserve-nodeports，Service 端口会重新分配。",
   "source": "第42章 K8s集群备份恢复Velero",
   "tags": [
    "Velero",
    "备份恢复",
    "对象存储",
    "Minio"
   ]
  },
  {
   "id": "D-10",
   "layer": "D",
   "title": "企业落地按 CI、GitOps、多活、备份推进",
   "oneliner": "先 CI，再 GitOps 和高可用，然后多活，最后用 Velero 兜底。",
   "mechanism": [
    "第一步把镜像仓库和流水线跑通：GitLab 存代码，Harbor 存镜像，Jenkins 或 Tekton 负责构建。",
    "第二步把部署方式统一成 Helm 加 GitOps，ArgoCD 从 Git 同步，人工不直接改集群。",
    "第三步做集群高可用：三 Master、VIP 加 haproxy 和 keepalived，云上用 LB。",
    "第四步做异地多活：每个大区独立集群、独立 LB，GTM 按地域调度。",
    "第五步补备份：Velero 定时备份到对象存储，重大变更前额外做一次。",
    "每一步都要有验收口径，集群按可用性清单，多活按故障切换演练，备份按实际恢复验证。"
   ],
   "code": [
    "kubectl get node / kubectl get po -A：底座验收的第一条命令",
    "argocd cluster add kubernetes-admin@kubernetes --name k8s-bj-cluster：GitOps 纳管各集群",
    "velero schedule create daily-cluster-backup --schedule=\"0 13 * * *\"：每天备份",
    "kubectl drain k8s-node02 --ignore-daemonsets：变更前先维护节点"
   ],
   "reuse": [
    "按团队现状选 Jenkins 或 Tekton，存量 Jenkins 用户先复用插件和凭证体系。",
    "上 ArgoCD 前先把微服务改成 Helm chart，否则多环境差异只能手改 YAML。",
    "多活和备份都要演练，没演练过的切换和恢复不能算能力。",
    "给每个阶段定验收项：流水线能一键发版、节点故障不掉业务、单中心挂掉能切走。"
   ],
   "interview": "我会先把 CI 和镜像仓库跑通，再把部署收敛到 Helm 加 ArgoCD，然后做集群高可用和异地多活，最后用 Velero 把误删和变更失败兜住。",
   "pitfall": "工具一口气全上，但资源没有 Helm 化，ArgoCD 只能同步原始 YAML；多活建了集群却没配 GTM 和 LB，故障时流量切不出去。",
   "source": "第35-42章 DevOps、高可用与容灾",
   "tags": [
    "落地路线",
    "DevOps",
    "GitOps",
    "容灾"
   ]
  }
 ]
};
