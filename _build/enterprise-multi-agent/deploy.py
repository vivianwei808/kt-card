# -*- coding: utf-8 -*-
"""把 out/topics/<slug>/ 同步进知识卡片库，并维护 topics.js 注册表。"""
import json
import os
import subprocess
import sys

SLUG = "enterprise-multi-agent"
SRC = f"/tmp/jk-kb/out/topics/{SLUG}"
DST_ROOT = "/Volumes/pipi/baiduDownload/mksz1024-Agent Loop + Graph Engineer 工程化实战【itjc8.com】/知识卡片"
DST = os.path.join(DST_ROOT, "topics", SLUG)
REG = os.path.join(DST_ROOT, "topics.js")


def load_data():
    raw = open(os.path.join(SRC, "data.js"), encoding="utf-8").read().strip()
    body = raw.split("window.KB_TOPIC", 1)[1].split("=", 1)[1].strip()
    if body.endswith(";"):
        body = body[:-1]
    return json.loads(body)


def build_entry(data):
    meta, layers, cards = data["meta"], data["layers"], data["cards"]
    counts = {}
    for c in cards:
        counts[c["layer"]] = counts.get(c["layer"], 0) + 1
    return {
        "slug": data["slug"],
        "title": meta["title"],
        "subtitle": meta.get("subtitle", ""),
        "description": meta.get("description", ""),
        "tags": meta.get("tags", []),
        "updated": meta.get("updated", ""),
        "accent": meta.get("accent", "#1d4ed8"),
        "cards": len(cards),
        "layers": [{"name": l["name"], "color": l["color"], "count": counts.get(l["key"], 0)} for l in layers],
    }


def merge_registry(entry):
    raw = open(REG, encoding="utf-8").read()
    start, end = raw.index("["), raw.rindex("]")
    topics = json.loads(raw[start:end + 1])
    topics = [t for t in topics if t.get("slug") != SLUG]
    topics.append(entry)
    out = raw[:start] + json.dumps(topics, ensure_ascii=False, indent=1) + raw[end + 1:]
    open(REG, "w", encoding="utf-8").write(out)
    return [t["slug"] for t in topics]


def main():
    data = load_data()
    os.makedirs(DST, exist_ok=True)
    subprocess.run(["rsync", "-a", "--delete", SRC + "/", DST + "/"], check=True)
    entry = build_entry(data)
    slugs = merge_registry(entry)
    print("deployed", SLUG, entry["cards"], "cards,", len(entry["layers"]), "layers")
    print("registry:", slugs)


if __name__ == "__main__":
    sys.exit(main())
