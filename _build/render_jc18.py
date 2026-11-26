# -*- coding: utf-8 -*-
"""生成「AI 大模型应用专家 · 18 期」专题：data.js + cards/*.md + README。

在 _build/ 下运行：
    python3 render_jc18.py

会重写 topics/ai-llm-expert-18/ 下的 data.js、cards/ 与 README.md，
并把本专题的注册信息合并进根目录 topics.js（保留其他专题）。
"""

import json
import os
import re
import shutil

from layers_jc18 import LAYERS
from cards_jc18_f import CARDS_F
from cards_jc18_w import CARDS_W, CARDS_V
from cards_jc18_d import CARDS_D
from cards_jc18_r import CARDS_R
from cards_jc18_a import CARDS_A
from cards_jc18_t import CARDS_T
from cards_jc18_p import CARDS_P
from cards_jc18_b import CARDS_B, CARDS_I

CARDS = (CARDS_F + CARDS_W + CARDS_V + CARDS_D + CARDS_R + CARDS_A
         + CARDS_T + CARDS_P + CARDS_B + CARDS_I)

BUILD_DIR = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.dirname(BUILD_DIR)
TOPIC_SLUG = "ai-llm-expert-18"
TOPIC_DIR = os.path.join(LIB, "topics", TOPIC_SLUG)
CARDS_DIR = os.path.join(TOPIC_DIR, "cards")
TODAY = "2026-11-26"

TOPIC_META = {
    "slug": TOPIC_SLUG,
    "title": "AI 大模型应用专家 · 18 期",
    "subtitle": "40 讲课程的一张知识地图：大模型、RAG、Agent、微调、部署与面试",
    "description": "基于知乎「AI 大模型应用专家实战训练营 18 期」41 章课件与 34 份课堂笔记整理。从 API 与 Prompt 起步，经 Coze/Dify、数据分析、Embedding、RAG、Agent 工程，到微调蒸馏、多模态、企业部署与 Text-to-SQL，每层都能单独查，也能按顺序读。",
    "source": "课程课件第 0 至 40 章；课堂笔记 34 份",
    "updated": TODAY,
    "accent": "#7c3aed",
    "tags": ["大模型", "RAG", "Agent", "微调", "部署"],
}

LAYER_BY_KEY = {l["key"]: l for l in LAYERS}
REQUIRED = ("id", "layer", "title", "oneliner", "mechanism", "code",
            "reuse", "interview", "pitfall", "source", "tags")


def slugify(text: str) -> str:
    text = re.sub(r"[\\/:*?\"<>|,，。；;：、（）()【】「」\s]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")


def validate():
    problems = []
    seen = set()
    for c in CARDS:
        cid = c.get("id", "?")
        if cid in seen:
            problems.append(f"{cid}: id 重复")
        seen.add(cid)
        for key in REQUIRED:
            if key not in c:
                problems.append(f"{cid}: 缺字段 {key}")
        if c.get("layer") not in LAYER_BY_KEY:
            problems.append(f"{cid}: 未知分层 {c.get('layer')}")
        if not (3 <= len(c.get("mechanism", [])) <= 8):
            problems.append(f"{cid}: mechanism 条数 {len(c.get('mechanism', []))}")
        if not (1 <= len(c.get("code", [])) <= 5):
            problems.append(f"{cid}: code 条数 {len(c.get('code', []))}")
        if not (2 <= len(c.get("reuse", [])) <= 4):
            problems.append(f"{cid}: reuse 条数 {len(c.get('reuse', []))}")
        if not (2 <= len(c.get("tags", [])) <= 5):
            problems.append(f"{cid}: tags 条数 {len(c.get('tags', []))}")
        blob = " ".join([c.get("title", ""), c.get("oneliner", ""), c.get("interview", ""),
                         c.get("pitfall", "")] + c.get("mechanism", []) + c.get("reuse", []))
        if "——" in blob or "—" in blob:
            problems.append(f"{cid}: 出现破折号")
    if problems:
        raise SystemExit("校验失败：\n- " + "\n- ".join(problems))


def card_markdown(c: dict) -> str:
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


def build_topic():
    validate()
    if os.path.isdir(CARDS_DIR):
        shutil.rmtree(CARDS_DIR)
    os.makedirs(CARDS_DIR)

    layers = []
    for l in LAYERS:
        layers.append({**l, "count": sum(1 for c in CARDS if c["layer"] == l["key"])})

    index = []
    for c in CARDS:
        name = f"{c['id']}-{slugify(c['title'])}.md"
        with open(os.path.join(CARDS_DIR, name), "w", encoding="utf-8") as f:
            f.write(card_markdown(c))
        index.append((c, name))

    data = {"slug": TOPIC_SLUG, "meta": TOPIC_META, "layers": layers, "cards": CARDS}
    js = "window.KB_TOPIC = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    with open(os.path.join(TOPIC_DIR, "data.js"), "w", encoding="utf-8") as f:
        f.write(js)

    write_topic_readme(index, layers)
    register(layers)
    return layers


def write_topic_readme(index, layers):
    lines = [
        f"# {TOPIC_META['title']}",
        "",
        TOPIC_META["description"],
        "",
        f"- 卡片数量：{len(CARDS)}",
        f"- 分层数量：{len(layers)}",
        f"- 更新日期：{TOPIC_META['updated']}",
        f"- 来源：{TOPIC_META['source']}",
        "",
        "## 怎么用",
        "",
        "- 从知识库门户进入本专题，或直接打开 `../index.html#/" + TOPIC_SLUG + "`。",
        "- 点击卡片在右侧面板阅读，支持搜索、分层筛选、上下键切换、打印。",
        "- `cards/` 下是 Markdown 源文件，可直接导入 Obsidian、Notion、Anki。",
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
        lines.append(f"### {l['key']} {l['name']}")
        lines.append("")
        for c, name in index:
            if c["layer"] == l["key"]:
                lines.append(f"- [{c['id']} {c['title']}](cards/{name})：{c['oneliner']}")
        lines.append("")
    with open(os.path.join(TOPIC_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def register(layers):
    path = os.path.join(LIB, "topics.js")
    topics = []
    if os.path.exists(path):
        raw = open(path, encoding="utf-8").read()
        m = re.search(r"window\.KB_TOPICS\s*=\s*(\[.*\])\s*;?\s*$", raw, re.S)
        if m:
            topics = json.loads(m.group(1))
        topics = [t for t in topics if t.get("slug") != TOPIC_SLUG]
    entry = {
        "slug": TOPIC_SLUG,
        "title": TOPIC_META["title"],
        "subtitle": TOPIC_META["subtitle"],
        "description": TOPIC_META["description"],
        "tags": TOPIC_META["tags"],
        "updated": TOPIC_META["updated"],
        "accent": TOPIC_META["accent"],
        "cards": len(CARDS),
        "layers": [{"name": l["name"], "color": l["color"], "count": l["count"]} for l in layers],
    }
    topics.append(entry)
    js = "window.KB_TOPICS = " + json.dumps(topics, ensure_ascii=False, indent=1) + ";\n"
    with open(path, "w", encoding="utf-8") as f:
        f.write(js)


if __name__ == "__main__":
    layers = build_topic()
    print(f"OK {len(CARDS)} cards, {len(layers)} layers")
    for l in layers:
        print(f"  {l['key']} {l['name']}: {l['count']}")
