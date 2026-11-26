---
id: P-14
layer: 部署与性能
title: 约束写进 Lint，Agent 才会照做
source: 第37章
tags: [AI测试, Harness, CI]
---

# P-14 约束写进 Lint，Agent 才会照做

> 文档里的规范会被忽略，写成 Lint 规则违反就 CI 失败，Agent 无法跳过。

## 机制

- Harness 三支柱：Inform 告知、Constrain 约束、Verify 验证。
- AGENTS.md 超过 60 行效果下降，正确做法是 50 到 100 行的目录页。
- Lint 错误信息要带 FIX 步骤，Agent 才能读懂并自我纠正。
- CI 三道门按速度排列：结构 Lint 几秒、单元测试几秒、集成测试几分钟。
- 单元测试 Job 把 DASHSCOPE_API_KEY 置空，防止误调付费接口。

## 代码落点

- `AGENTS.md`：50 到 100 行目录页
- `check_report_structure.py`：结构 Lint
- `pytest`：单元测试门
- `CI`：三道门流水线

## 复用清单

- 规范能被机器检查就写成 Lint，别只写文档。
- 错误信息里直接给修复步骤。

## 面试一句话

把品味编码成 Lint 规则，让约束机械化执行，比写在文档里可靠。

## 常见坑

把所有规则堆进一个巨型说明文件，Agent 记不住也无法验证。

---

来源：第37章
