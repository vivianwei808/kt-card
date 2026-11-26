---
id: D-09
layer: 交付、多集群与容灾
title: Velero 把集群资源备份进对象存储
source: 第42章 K8s集群备份恢复Velero
tags: [Velero, 备份恢复, 对象存储, Minio]
---

# D-09 Velero 把集群资源备份进对象存储

> 备份资源到对象存储，恢复时按备份重建，跨集群靠复制目录。

## 机制

- Velero 把备份文件上传到对象存储，课件用 Minio，桶名 velerobackup。
- 服务端用 velero install 装，provider 选 aws，配 S3 插件和存储位置。
- 备份内容是集群资源和元数据，默认 ttl 720h，快照数据移动默认关闭。
- 恢复用 restore create --from-backup，可指定 NS 和资源类型，按最小范围。
- 周期任务用 schedule create，cron 按 UTC 算，排除 kube-system 和 velero。
- 跨集群恢复只需把备份目录复制到目标集群的存储位置，Velero 会自动识别成 Backup 资源。

## YAML 与命令

- `velero install --provider aws --plugins registry.cn-beijing.aliyuncs.com/dotbalo/velero-plugin-for-aws:latest --bucket velerobackup --backup-location-config region=minio,s3ForcePathStyle="true",s3Url=http://192.168.181.134:9000`：装服务端
- `velero backup create test-backup / velero backup get`：备份并看状态
- `velero restore create test-restore --from-backup test-backup --include-namespaces test --preserve-nodeports`：恢复并保留端口
- `velero schedule create daily-cluster-backup --schedule="0 13 * * *" --exclude-namespaces="velero,kube-system" --ttl=720h0m0s`：每日备份
- `velero restore create ... --existing-resource-policy=update`：覆盖已存在资源

## 复用清单

- 给每个集群单独建桶或加 --prefix，不要把多个集群的备份混在同一目录。
- 每次大变更前先 velero backup create <ns>-ns-backup，失败时按备份回滚。
- 恢复带 NodePort 的服务一律加 --preserve-nodeports，避免端口变化影响上游。
- 定期把备份恢复到测试集群，确认备份文件真的可用。

## 面试一句话

Velero 把 K8s 资源和卷信息备份到对象存储，恢复时按备份重建资源；生产上我会用 schedule 每天备份，并在重大变更前单独做一次全量备份。

## 常见坑

恢复时以为会覆盖现有资源，其实默认跳过，Deployment 不会回滚；不带 --preserve-nodeports，Service 端口会重新分配。

---

来源：第42章 K8s集群备份恢复Velero
