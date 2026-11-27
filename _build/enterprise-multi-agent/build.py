# -*- coding: utf-8 -*-
"""生成专题二：企业级多智能体设计实战。"""

import json
import os
import re
import shutil
import sys

from layers import LAYERS
from cards_m import M
from cards_a import A
from cards_t import T
from cards_x import X
from cards_o import O
from cards_e import E
from cards_r import R

try:
    from cards_q import Q
except ImportError:
    Q = []
import importlib
V = []
for _m in ["cards_v", "cards_v2", "cards_v3", "cards_v4", "cards_v5", "cards_v6", "cards_v7"]:
    try:
        V += importlib.import_module(_m).V
    except ImportError:
        pass
V.sort(key=lambda c: c["id"])

_ORDER = {l["key"]: i for i, l in enumerate(LAYERS)}
CARDS = sorted(V + M + A + T + X + O + E + Q + R, key=lambda c: (_ORDER[c["layer"]], c["id"]))
OUT = "/tmp/jk-kb/out"
SLUG = "enterprise-multi-agent"
TOPIC_DIR = os.path.join(OUT, "topics", SLUG)
CARDS_DIR = os.path.join(TOPIC_DIR, "cards")
TODAY = "2026-11-27"

META = {
    "slug": SLUG,
    "title": "企业级多智能体设计实战",
    "subtitle": "从四种架构范式，到可观测、可加固、可持续运营的 Agent 团队",
    "description": "基于《企业级多智能体设计实战》40 讲视频与 CrewAI 配套代码整理。视频按关键帧抽帧取要点，代码落点取自 crewai_mas_demo 仓库。",
    "source": "课程视频 40 讲、直播回放 2 场；代码仓库 crewai_mas_demo-main",
    "updated": TODAY,
    "accent": "#7c3aed",
    "tags": ["Multi-Agent", "CrewAI", "Agent", "MCP", "工程化"],
}

LAYER_BY_KEY = {l["key"]: l for l in LAYERS}


def slugify(text):
    text = re.sub(r"[\\/:*?\"<>|,，。；;：、（）()【】「」\s]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")


def card_markdown(c):
    layer = LAYER_BY_KEY[c["layer"]]
    lines = [
        "---",
        f"id: {c['id']}",
        f"layer: {layer['name']}",
        f"title: {c['title']}",
        f"source: {c['source']}",
        "tags: [" + ", ".join(c["tags"]) + "]",
        "---",
        "",
        f"# {c['id']} {c['title']}",
        "",
        f"> {c['oneliner']}",
        "",
        "## 机制",
        "",
    ]
    lines += [f"- {m}" for m in c["mechanism"]]
    lines += ["", "## 代码落点", ""]
    for x in c["code"]:
        if "：" in x:
            left, right = x.split("：", 1)
            lines.append(f"- `{left}`：{right}")
        else:
            lines.append(f"- `{x}`")
    lines += ["", "## 复用清单", ""]
    lines += [f"- {x}" for x in c["reuse"]]
    lines += ["", "## 面试一句话", "", c["interview"], ""]
    lines += ["## 常见坑", "", c["pitfall"], ""]
    lines += ["---", "", f"来源：{c['source']}"]
    return "\n".join(lines) + "\n"


def main():
    if os.path.isdir(TOPIC_DIR):
        shutil.rmtree(TOPIC_DIR)
    os.makedirs(CARDS_DIR)

    layers = [{**l, "count": sum(1 for c in CARDS if c["layer"] == l["key"])} for l in LAYERS]
    index = []
    for c in CARDS:
        name = f"{c['id']}-{slugify(c['title'])}.md"
        with open(os.path.join(CARDS_DIR, name), "w", encoding="utf-8") as f:
            f.write(card_markdown(c))
        index.append((c, name))

    data = {"slug": SLUG, "meta": META, "layers": layers, "cards": CARDS}
    with open(os.path.join(TOPIC_DIR, "data.js"), "w", encoding="utf-8") as f:
        f.write("window.KB_TOPIC = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")

    lines = [
        f"# {META['title']}",
        "",
        META["description"],
        "",
        f"- 卡片数量：{len(CARDS)}",
        f"- 分层数量：{len(LAYERS)}",
        f"- 更新日期：{META['updated']}",
        f"- 来源：{META['source']}",
        "",
        "## 分层",
        "",
        "| 层 | 名称 | 数量 | 回答什么 |",
        "| --- | --- | --- | --- |",
    ]
    for l in layers:
        lines.append(f"| {l['key']} | {l['name']} | {l['count']} | {l['desc']} |")
    lines += ["", "## 卡片索引", ""]
    for l in layers:
        rows = [(c, n) for c, n in index if c["layer"] == l["key"]]
        if not rows:
            continue
        lines.append(f"### {l['key']} {l['name']}")
        lines.append("")
        for c, name in rows:
            lines.append(f"- [{c['id']} {c['title']}](cards/{name})：{c['oneliner']}")
        lines.append("")
    lines += [
        "## 视频要点怎么来的",
        "",
        "每讲按固定间隔抽帧，用 macOS Vision 做中英 OCR，去掉水印和重复画面后按时间轴压缩成要点。第 01 至 08 讲为全文逐帧 OCR，其余讲为等距 12 帧抽样。",
        "",
        "## 代码事实",
        "",
        "- 技术栈：Python 3.10+ / CrewAI / 通义千问（DashScope）/ pgvector / Langfuse / Docker 沙箱。",
        "- 代码规模：243 个 Python 文件，28 个示例目录，181 个 Markdown 文档。",
        "- 沙箱镜像：ghcr.io/agent-infra/sandbox，MCP 端口 8022。",
    ]
    with open(os.path.join(TOPIC_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    print("cards:", len(CARDS), "layers:", len(layers))
    for l in layers:
        print(" ", l["key"], l["name"], l["count"])


if __name__ == "__main__":
    main()
