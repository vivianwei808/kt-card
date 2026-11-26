# -*- coding: utf-8 -*-
"""生成 K8s 专题：topics/k8s-enterprise/ 与 topics.js 注册项。

用法：
    python3 _build/render_k8s.py [卡片JSON目录]

默认从 /tmp/k8s-kb/cards 读取 M/W/S/C/R/E/O/A/D.json，重跑会整体重写
data.js、cards/*.md、README.md，并把本专题合并回 topics.js（保留其他专题）。
"""

import json
import os
import re
import sys

LIB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/k8s-kb/cards"
TOPIC_SLUG = "k8s-enterprise"
TOPIC_DIR = os.path.join(LIB, "topics", TOPIC_SLUG)
CARDS_DIR = os.path.join(TOPIC_DIR, "cards")
TODAY = "2026-11-26"

LAYERS = [
    {"key": "M", "name": "总览与基座", "en": "Map", "color": "#475569",
     "desc": "云原生定位、K8s 架构组件、容器基础与集群初体验"},
    {"key": "W", "name": "工作负载与调度", "en": "Workload", "color": "#b45309",
     "desc": "Pod、控制器、Job 与调度约束"},
    {"key": "S", "name": "服务发布与流量", "en": "Service", "color": "#1d4ed8",
     "desc": "Label、Service、Ingress 与服务发现"},
    {"key": "C", "name": "配置与存储", "en": "Config", "color": "#0f766e",
     "desc": "ConfigMap、Secret、Volume 与 PV/PVC/StorageClass"},
    {"key": "R", "name": "资源治理与安全", "en": "Governance", "color": "#b91c1c",
     "desc": "配额、QoS、RBAC 与多租户隔离"},
    {"key": "E", "name": "工程化与扩展", "en": "Engineering", "color": "#7c3aed",
     "desc": "Helm、Operator/CRD 与 SpringCloud 迁移"},
    {"key": "O", "name": "可观测性", "en": "Observability", "color": "#0e7490",
     "desc": "日志、指标、链路追踪与告警"},
    {"key": "A", "name": "弹性、网格与存储平台", "en": "Advanced", "color": "#047857",
     "desc": "HPA/KEDA、Istio、CubeFS"},
    {"key": "D", "name": "交付、多集群与容灾", "en": "Delivery", "color": "#be185d",
     "desc": "CI/CD、GitOps、高可用、异地多活与备份"},
]

EXPECTED = {
    "M": ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06", "M-07", "M-08", "M-09"],
    "W": ["W-01", "W-02", "W-03", "W-04", "W-05", "W-06", "W-07", "W-08", "W-09", "W-10", "W-11"],
    "S": ["S-01", "S-02", "S-03", "S-04", "S-05", "S-06", "S-07"],
    "C": ["C-01", "C-02", "C-03", "C-04", "C-05", "C-06", "C-07"],
    "R": ["R-01", "R-02", "R-03", "R-04", "R-05", "R-06", "R-07"],
    "E": ["E-01", "E-02", "E-03", "E-04", "E-05", "E-06"],
    "O": ["O-01", "O-02", "O-03", "O-04", "O-05", "O-06"],
    "A": ["A-01", "A-02", "A-03", "A-04", "A-05", "A-06", "A-07"],
    "D": ["D-01", "D-02", "D-03", "D-04", "D-05", "D-06", "D-07", "D-08", "D-09", "D-10"],
}

TOPIC_META = {
    "slug": TOPIC_SLUG,
    "title": "K8s 企业级深度研修",
    "subtitle": "从容器基础到多集群容灾，把 K8s 用成企业级平台",
    "description": "基于《51CTO 宽哥 K8s 企业级深度研修实战》40 章课件整理。覆盖容器基础、工作负载、服务发布、配置存储、资源治理、Helm/Operator、可观测性、弹性伸缩、服务网格、DevOps 与异地多活。",
    "source": "课程课件第 2 至 42 章，含 PDF / PPTX / DOCX 讲义",
    "updated": TODAY,
    "accent": "#326ce5",
    "tags": ["Kubernetes", "云原生", "DevOps", "Istio", "可观测性"],
}

LAYER_BY_KEY = {l["key"]: l for l in LAYERS}
FIELDS = ("id", "layer", "title", "oneliner", "mechanism", "code",
          "reuse", "interview", "pitfall", "source", "tags")


def slugify(text):
    text = re.sub(r"[\\/:*?\"<>|,，。；;：、（）()【】「」\s]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")


def load_cards():
    cards = []
    for layer in LAYERS:
        key = layer["key"]
        path = os.path.join(CARDS_SRC, key + ".json")
        with open(path, encoding="utf-8") as f:
            items = json.load(f)
        got = [c["id"] for c in items]
        if got != EXPECTED[key]:
            raise SystemExit("卡片清单不符 %s：期望 %s，实际 %s" % (key, EXPECTED[key], got))
        for c in items:
            missing = [k for k in FIELDS if k not in c]
            if missing:
                raise SystemExit("%s 缺字段 %s" % (c.get("id"), missing))
            if c["layer"] != key:
                raise SystemExit("%s layer 应为 %s" % (c["id"], key))
            for k in ("mechanism", "code", "reuse", "tags"):
                if not isinstance(c[k], list) or not c[k]:
                    raise SystemExit("%s 的 %s 不能为空" % (c["id"], k))
        cards.extend(items)
    return cards


def card_markdown(c):
    layer = LAYER_BY_KEY[c["layer"]]
    lines = [
        "---",
        "id: %s" % c["id"],
        "layer: %s" % layer["name"],
        "title: %s" % c["title"],
        "source: %s" % c["source"],
        "tags: [%s]" % ", ".join(c["tags"]),
        "---",
        "",
        "# %s %s" % (c["id"], c["title"]),
        "",
        "> %s" % c["oneliner"],
        "",
        "## 机制",
        "",
    ]
    lines += ["- %s" % m for m in c["mechanism"]]
    lines += ["", "## YAML 与命令", ""]
    for x in c["code"]:
        if "：" in x:
            left, right = x.split("：", 1)
            lines.append("- `%s`：%s" % (left, right))
        else:
            lines.append("- `%s`" % x)
    lines += ["", "## 复用清单", ""]
    lines += ["- %s" % x for x in c["reuse"]]
    lines += ["", "## 面试一句话", "", c["interview"], ""]
    lines += ["## 常见坑", "", c["pitfall"], ""]
    lines += ["---", "", "来源：%s" % c["source"]]
    return "\n".join(lines) + "\n"


def write_topic(cards):
    os.makedirs(CARDS_DIR, exist_ok=True)
    for old in os.listdir(CARDS_DIR):
        if old.endswith(".md"):
            os.remove(os.path.join(CARDS_DIR, old))

    for c in cards:
        name = "%s-%s.md" % (c["id"], slugify(c["title"]))
        with open(os.path.join(CARDS_DIR, name), "w", encoding="utf-8") as f:
            f.write(card_markdown(c))

    layers = []
    for l in LAYERS:
        count = sum(1 for c in cards if c["layer"] == l["key"])
        layers.append({
            "key": l["key"], "name": l["name"], "en": l["en"],
            "color": l["color"], "desc": l["desc"], "count": count,
        })

    topic = {
        "slug": TOPIC_SLUG,
        "meta": dict(TOPIC_META),
        "layers": layers,
        "cards": [{k: c[k] for k in FIELDS} for c in cards],
    }
    with open(os.path.join(TOPIC_DIR, "data.js"), "w", encoding="utf-8") as f:
        f.write("window.KB_TOPIC = " + json.dumps(topic, ensure_ascii=False, indent=1) + ";\n")
    write_readme(layers, cards)
    return layers


def write_readme(layers, cards):
    m = TOPIC_META
    lines = [
        "# %s" % m["title"],
        "",
        m["description"],
        "",
        "- 卡片数量：%d" % len(cards),
        "- 分层数量：%d" % len(layers),
        "- 更新日期：%s" % m["updated"],
        "- 来源：%s" % m["source"],
        "",
        "## 怎么用",
        "",
        "- 从知识库门户进入本专题，或直接打开 `../index.html#/%s`。" % TOPIC_SLUG,
        "- 点击卡片在右侧面板阅读，支持搜索、分层筛选、上下键切换、打印。",
        "- `cards/` 下是 Markdown 源文件，可直接导入 Obsidian、Notion、Anki。",
        "",
        "## 分层",
        "",
        "| 层 | 名称 | 数量 | 回答什么 |",
        "| --- | --- | --- | --- |",
    ]
    for l in layers:
        lines.append("| %s | %s | %d | %s |" % (l["key"], l["name"], l["count"], l["desc"]))
    lines += ["", "## 卡片索引", ""]
    for l in layers:
        lines += ["### %s %s" % (l["key"], l["name"]), ""]
        for c in [x for x in cards if x["layer"] == l["key"]]:
            name = "%s-%s.md" % (c["id"], slugify(c["title"]))
            lines.append("- [%s %s](cards/%s)：%s" % (c["id"], c["title"], name, c["oneliner"]))
        lines.append("")
    lines += [
        "## 内容边界",
        "",
        "- 卡片只整理课件里出现的概念、参数与操作步骤，不代表生产环境的最佳实践全集。",
        "- 命令与 YAML 来自课件演示环境，版本差异请以集群实际 API 为准。",
    ]
    with open(os.path.join(TOPIC_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def register_topic(layers, cards):
    path = os.path.join(LIB, "topics.js")
    existing = []
    if os.path.exists(path):
        raw = open(path, encoding="utf-8").read()
        raw = raw[raw.find("["):raw.rfind("]") + 1]
        existing = json.loads(raw)
    entry = {
        "slug": TOPIC_SLUG,
        "title": TOPIC_META["title"],
        "subtitle": TOPIC_META["subtitle"],
        "description": TOPIC_META["description"],
        "tags": TOPIC_META["tags"],
        "updated": TOPIC_META["updated"],
        "accent": TOPIC_META["accent"],
        "cards": len(cards),
        "layers": [{"name": l["name"], "color": l["color"], "count": l["count"]} for l in layers],
    }
    merged = [t for t in existing if t.get("slug") != TOPIC_SLUG] + [entry]
    with open(path, "w", encoding="utf-8") as f:
        f.write("window.KB_TOPICS = " + json.dumps(merged, ensure_ascii=False, indent=1) + ";\n")
    return len(merged)


def main():
    cards = load_cards()
    layers = write_topic(cards)
    total = register_topic(layers, cards)
    print("专题 %s：%d 张卡，%d 层，topics.js 共 %d 个专题" % (TOPIC_SLUG, len(cards), len(layers), total))
    for l in layers:
        print("  %s %-12s %2d" % (l["key"], l["name"], l["count"]))


if __name__ == "__main__":
    main()
