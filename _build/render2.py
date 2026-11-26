# -*- coding: utf-8 -*-
"""生成「知识库 / 专题」两级结构：门户 + 专题卡片墙 + Markdown 源。"""

import json
import os
import re
import shutil

from layers import LAYERS
from cards_mpc import CARDS_MPC
from cards_lh import CARDS_LH
from cards_igr import CARDS_IGR

CARDS = CARDS_MPC + CARDS_LH + CARDS_IGR
LIB = "/tmp/kg-course/lib"
TOPIC_SLUG = "agent-loop-graph"
TOPIC_DIR = os.path.join(LIB, "topics", TOPIC_SLUG)
CARDS_DIR = os.path.join(TOPIC_DIR, "cards")
TODAY = "2026-11-26"

TOPIC_META = {
    "slug": TOPIC_SLUG,
    "title": "Agent Loop + Graph 工程化",
    "subtitle": "从一次模型调用，走到可验收、可停止、可恢复、可拆结构的 Agent 系统",
    "description": "基于《Agent Loop + Graph 工程化实战》11 章课件与 LoopTrip 参考实现整理。覆盖 Prompt、Context、Harness、Loop、Graph 五层能力，外加交互与简历表达。",
    "source": "课程课件第 1 至 11 章；代码仓库 graph-main（LoopTrip）",
    "updated": TODAY,
    "accent": "#1d4ed8",
    "tags": ["Agent", "Java", "Spring AI", "Loop", "Graph"],
}

LAYER_BY_KEY = {l["key"]: l for l in LAYERS}


def slugify(text: str) -> str:
    text = re.sub(r"[\\/:*?\"<>|,，。；;：、（）()【】「」\s]+", "-", text)
    return re.sub(r"-{2,}", "-", text).strip("-")


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
    return layers, index


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
    lines += [
        "## 项目事实",
        "",
        "- 技术栈：Java 21 / Spring Boot 3.5.8 / Spring AI 1.1.2 / Vite 7 + React 19 + TypeScript + Tailwind 4。",
        "- 代码规模：121 个主类，43 个含 `@Test` 的测试类，176 个测试用例，8 个课程回放脚本。",
        "- 执行图：8 个业务节点、16 条边、3 个终态。",
        "- 事实来源：本地 JSON 快照，不代表真实库存或生产 SLA。",
    ]
    with open(os.path.join(TOPIC_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def write_topics_js(layers):
    topics = [{
        "slug": TOPIC_SLUG,
        "title": TOPIC_META["title"],
        "subtitle": TOPIC_META["subtitle"],
        "description": TOPIC_META["description"],
        "tags": TOPIC_META["tags"],
        "updated": TOPIC_META["updated"],
        "accent": TOPIC_META["accent"],
        "cards": len(CARDS),
        "layers": [{"name": l["name"], "color": l["color"], "count": l["count"]} for l in layers],
    }]
    js = "window.KB_TOPICS = " + json.dumps(topics, ensure_ascii=False, indent=1) + ";\n"
    with open(os.path.join(LIB, "topics.js"), "w", encoding="utf-8") as f:
        f.write(js)


APP_HTML = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>知识卡片库</title>
<style>
:root{
  --paper:#f7f5f0; --card:#fffdf8; --panel:#fffcf4; --ink:#1b1a17; --muted:#6b6659;
  --line:#e2ddd1; --shadow:0 1px 2px rgba(30,25,15,.05), 0 8px 24px rgba(30,25,15,.06);
  --accent:#1d4ed8; --radius:14px; --bar-h:64px; --panel-w:452px;
}
@media (prefers-color-scheme: dark){
  :root{ --paper:#14161a; --card:#1b1e24; --panel:#181b21; --ink:#e9e6de; --muted:#9b978c;
         --line:#2b2f38; --shadow:0 1px 2px rgba(0,0,0,.4), 0 10px 30px rgba(0,0,0,.35); }
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; background:var(--paper); color:var(--ink);
  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Noto Sans SC","Microsoft YaHei",sans-serif;
  font-size:15px; line-height:1.75; -webkit-font-smoothing:antialiased;
}
body.panel-open{overflow:hidden}
h1,h2,h3,h4{font-family:"Songti SC","Noto Serif SC",Georgia,"Times New Roman",serif; font-weight:600; letter-spacing:.01em}
a{color:inherit; text-decoration:none}
button{font:inherit}

/* ---------- 顶栏 ---------- */
.bar{
  position:sticky; top:0; z-index:30; height:var(--bar-h);
  display:flex; align-items:center; gap:16px; padding:0 24px;
  background:color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter:blur(14px); border-bottom:1px solid var(--line);
}
.brand{display:flex; align-items:center; gap:10px; font-family:"Songti SC",Georgia,serif; font-size:17px; font-weight:600; white-space:nowrap}
.brand .mark{width:22px; height:22px; border-radius:6px; background:linear-gradient(135deg,#1d4ed8,#0f766e); display:inline-block}
.crumb{color:var(--muted); font-size:13px; display:flex; align-items:center; gap:8px; min-width:0}
.crumb a:hover{color:var(--ink)}
.crumb .sep{opacity:.5}
.crumb .cur{color:var(--ink); overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.barActions{margin-left:auto; display:flex; gap:8px; align-items:center}
.btn{
  padding:7px 13px; border-radius:8px; border:1px solid var(--line); background:var(--card);
  color:var(--ink); font-size:13px; cursor:pointer; white-space:nowrap;
}
.btn:hover{border-color:var(--muted)}
.btn.ghost{background:transparent}

/* ---------- 布局 ---------- */
.app{max-width:1320px; margin:0 auto; padding:0 24px}
.page{padding:34px 0 90px}
.layout{position:relative; transition:padding-right .24s ease}
@media (min-width:1041px){
  .layout.detail-open{padding-right:calc(var(--panel-w) + 22px)}
}

/* ---------- 门户 ---------- */
.hero{padding:26px 0 30px; border-bottom:1px solid var(--line)}
.hero h1{margin:0; font-size:34px; line-height:1.25}
.hero .lead{margin:10px 0 0; color:var(--muted); max-width:720px; font-size:14.5px}
.heroStats{display:flex; gap:30px; margin-top:22px}
.heroStats div strong{display:block; font-family:"Songti SC",Georgia,serif; font-size:24px}
.heroStats div strong.date{font-family:inherit; font-size:15px; font-weight:600; padding-top:6px}
.heroStats div span{color:var(--muted); font-size:12px}
.sectionHead{display:flex; align-items:baseline; justify-content:space-between; margin:34px 0 16px}
.sectionHead h2{margin:0; font-size:19px}
.sectionHead span{color:var(--muted); font-size:12.5px}
.topics{display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:18px}
.topic{
  position:relative; display:flex; flex-direction:column; min-height:250px; padding:20px 20px 16px;
  background:var(--card); border:1px solid var(--line); border-top:3px solid var(--c);
  border-radius:var(--radius); box-shadow:var(--shadow); transition:transform .16s ease, border-color .16s;
}
.topic:hover{transform:translateY(-3px); border-color:color-mix(in srgb,var(--c) 40%, var(--line))}
.tTop{display:flex; align-items:center; justify-content:space-between; font-size:11px; color:var(--muted)}
.tBadge{color:var(--c); background:color-mix(in srgb,var(--c) 12%, transparent); padding:2px 8px; border-radius:999px}
.topic h2{margin:12px 0 6px; font-size:20px; line-height:1.35}
.tSub{margin:0; color:var(--muted); font-size:13px; line-height:1.7}
.tStats{display:flex; gap:18px; margin:16px 0 12px; font-size:12.5px; color:var(--muted)}
.tStats strong{font-size:19px; color:var(--ink); font-family:"Songti SC",Georgia,serif; margin-right:3px}
.tLayers{display:flex; flex-wrap:wrap; gap:6px; margin-top:auto}
.tLayers span{display:inline-flex; align-items:center; gap:5px; font-size:11px; color:var(--muted); background:color-mix(in srgb,var(--ink) 5%, transparent); padding:2px 7px; border-radius:5px}
.tLayers i{width:6px; height:6px; border-radius:50%; display:inline-block}
.tFoot{display:flex; justify-content:space-between; align-items:center; margin-top:14px; padding-top:12px; border-top:1px solid var(--line); font-size:12px; color:var(--muted)}
.tFoot .go{color:var(--c)}
.topic.ghost{border-style:dashed; border-top-color:var(--line); background:transparent; box-shadow:none; cursor:pointer; text-align:left; color:var(--ink)}
.topic.ghost:hover{border-color:var(--muted); transform:none}
.topic.ghost .plus{font-size:26px; color:var(--muted); font-family:Georgia,serif; line-height:1}
.topic.ghost h2{font-size:17px}
.topic.ghost p{color:var(--muted); font-size:12.5px; margin:6px 0 0}

/* ---------- 专题头 ---------- */
.tHead{padding:24px 0 6px}
.tHead .back{display:none}
.tHead h1{margin:0; font-size:28px; line-height:1.3}
.tHead .sub{margin:8px 0 0; color:var(--muted); font-size:14px; max-width:780px}
.tMeta{display:flex; flex-wrap:wrap; gap:14px; margin-top:14px; color:var(--muted); font-size:12.5px}
.tMeta .pill{border:1px solid var(--line); border-radius:999px; padding:2px 9px}

/* ---------- 工具条 ---------- */
.toolbar{position:sticky; top:var(--bar-h); z-index:20; padding:14px 0 12px;
  background:color-mix(in srgb, var(--paper) 92%, transparent); backdrop-filter:blur(12px); border-bottom:1px solid var(--line)}
.toolRow{display:flex; gap:10px; align-items:center; flex-wrap:wrap}
.search{flex:1 1 300px; position:relative}
.search input{width:100%; padding:10px 14px 10px 36px; border-radius:10px; border:1px solid var(--line); background:var(--card); color:var(--ink); font-size:14px; outline:none}
.search input:focus{border-color:var(--accent); box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 14%, transparent)}
.search::before{content:"⌕"; position:absolute; left:13px; top:7px; color:var(--muted); font-size:17px}
.chips{display:flex; gap:7px; flex-wrap:wrap; margin-top:11px}
.chip{display:inline-flex; align-items:center; gap:7px; padding:5px 11px; border-radius:999px; border:1px solid var(--line); background:transparent; color:var(--muted); font-size:12.5px; cursor:pointer}
.chip .dot{width:7px; height:7px; border-radius:50%; background:var(--c)}
.chip .n{font-size:10.5px; opacity:.7}
.chip.on{background:color-mix(in srgb,var(--c) 12%, transparent); border-color:color-mix(in srgb,var(--c) 45%, transparent); color:var(--ink)}
.chip.all.on{background:color-mix(in srgb,var(--ink) 8%, transparent); border-color:var(--muted)}

/* ---------- 卡片墙 ---------- */
.count{color:var(--muted); font-size:12.5px; margin:16px 0 12px}
.wall{display:grid; grid-template-columns:repeat(auto-fill,minmax(286px,1fr)); gap:15px; align-items:start}
.card{
  position:relative; background:var(--card); border:1px solid var(--line); border-top:3px solid var(--c);
  border-radius:var(--radius); padding:16px 17px 14px; box-shadow:var(--shadow); cursor:pointer;
  transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease; outline:none;
}
.card:hover{transform:translateY(-2px); border-color:color-mix(in srgb,var(--c) 45%, var(--line))}
.card:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 30%, transparent)}
.card.sel{outline:2px solid var(--c); outline-offset:2px; transform:none}
.card .meta{display:flex; align-items:center; gap:8px; font-size:11px; color:var(--muted); margin-bottom:9px}
.card .badge{color:var(--c); background:color-mix(in srgb,var(--c) 12%, transparent); padding:2px 8px; border-radius:999px; white-space:nowrap}
.card .cid{white-space:nowrap}
.card .cid{font-variant-numeric:tabular-nums; letter-spacing:.04em}
.card .src{margin-left:auto; max-width:54%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.card h3{margin:0 0 7px; font-size:16.5px; line-height:1.45}
.card .one{margin:0; color:var(--muted); font-size:13px; line-height:1.68}
.card .tags{display:flex; gap:6px; flex-wrap:wrap; margin-top:10px}
.card .tags span{font-size:10.5px; color:var(--muted); background:color-mix(in srgb,var(--ink) 5%, transparent); padding:1px 7px; border-radius:5px}
.card .more{position:absolute; right:14px; bottom:12px; font-size:11px; color:var(--c); opacity:0; transition:opacity .16s}
.card:hover .more,.card.sel .more{opacity:1}
.empty{padding:70px 0; text-align:center; color:var(--muted)}

/* ---------- 右侧阅读面板 ---------- */
.panel{
  position:fixed; top:var(--bar-h); right:0; bottom:0; width:var(--panel-w); z-index:40;
  background:var(--panel); border-left:1px solid var(--line);
  box-shadow:-18px 0 40px rgba(30,25,15,.10);
  transform:translateX(102%); transition:transform .24s ease; display:flex; flex-direction:column;
}
.panel.open{transform:none}
.pBar{display:flex; align-items:center; gap:8px; padding:10px 14px; border-bottom:1px solid var(--line); background:var(--panel); position:sticky; top:0; z-index:2}
.pBar .pPos{font-size:11.5px; color:var(--muted); font-variant-numeric:tabular-nums; margin-left:2px}
.pBar .spacer{flex:1}
.iconBtn{width:32px; height:30px; border-radius:7px; border:1px solid var(--line); background:var(--card); color:var(--muted); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; font-size:13px}
.iconBtn:hover:not(:disabled){color:var(--ink); border-color:var(--muted)}
.iconBtn:disabled{opacity:.35; cursor:default}
.pBody{overflow:auto; padding:20px 22px 40px; scrollbar-width:thin}
.pBody .pMeta{display:flex; align-items:center; gap:8px; font-size:11px; color:var(--muted); margin-bottom:10px}
.pBody .pMeta .badge{color:var(--c); background:color-mix(in srgb,var(--c) 12%, transparent); padding:2px 8px; border-radius:999px}
.pBody h2{margin:0 0 8px; font-size:23px; line-height:1.4; font-family:"Songti SC","Noto Serif SC",Georgia,serif}
.pBody .pOne{margin:0; color:var(--muted); font-size:13.5px; line-height:1.75}
.pBody .pTags{display:flex; gap:6px; flex-wrap:wrap; margin:12px 0 2px}
.pBody .pTags span{font-size:10.5px; color:var(--muted); background:color-mix(in srgb,var(--ink) 5%, transparent); padding:1px 7px; border-radius:5px}
.sec{margin:20px 0 0; padding-top:16px; border-top:1px dashed var(--line)}
.sec h4{margin:0 0 8px; font-size:11px; letter-spacing:.14em; color:var(--c); font-family:inherit; font-weight:600}
.sec ul{margin:0; padding-left:18px}
.sec li{margin:6px 0; font-size:13.5px; line-height:1.75}
.sec.code li{font-size:12.5px}
.sec code{font-family:"SF Mono",ui-monospace,Menlo,Consolas,monospace; font-size:11.5px; background:color-mix(in srgb,var(--ink) 5%, transparent); padding:1.5px 6px; border-radius:5px; word-break:break-word}
.sec.quote p{margin:0; border-left:2px solid var(--c); padding-left:11px; font-size:13.5px; line-height:1.75}
.sec.pit p{margin:0; background:color-mix(in srgb,#b91c1c 7%, transparent); border-radius:8px; padding:9px 11px; font-size:13px; line-height:1.7}
.pFoot{display:flex; align-items:center; justify-content:space-between; gap:10px; margin-top:22px; padding-top:14px; border-top:1px solid var(--line)}
.hint{font-size:11.5px; color:var(--muted)}
.scrim{position:fixed; inset:0; background:rgba(15,15,12,.28); z-index:35; opacity:0; pointer-events:none; transition:opacity .2s}
.scrim.on{opacity:1; pointer-events:auto}

/* ---------- 帮助 ---------- */
.helpSteps{counter-reset:s; margin:0; padding:0; list-style:none}
.helpSteps li{position:relative; padding:14px 0 14px 38px; border-top:1px dashed var(--line); font-size:13.5px; line-height:1.75}
.helpSteps li:before{counter-increment:s; content:counter(s); position:absolute; left:0; top:14px; width:24px; height:24px; border-radius:50%; background:color-mix(in srgb,var(--accent) 12%, transparent); color:var(--accent); display:flex; align-items:center; justify-content:center; font-size:12px}
.helpSteps code{font-family:"SF Mono",ui-monospace,Menlo,monospace; font-size:12px; background:color-mix(in srgb,var(--ink) 6%, transparent); padding:1px 6px; border-radius:5px}

/* ---------- 打印 ---------- */
.printSheet{display:none}
@media print{
  :root{--paper:#fff; --card:#fff; --ink:#000; --muted:#444; --line:#ccc; --shadow:none}
  body{background:#fff}
  .bar,.app,.panel,.scrim,.toolbar{display:none !important}
  .printSheet{display:block}
  .printSheet .pItem{break-inside:avoid; page-break-inside:avoid; margin:0 0 14px; padding:12px 0 8px; border-bottom:1px solid #ddd}
  .printSheet .pMeta{font-size:10px; color:#555; margin-bottom:4px}
  .printSheet h3{margin:2px 0 6px; font-size:15px}
  .printSheet .one{font-size:11.5px; color:#444; margin:0 0 8px}
  .printSheet ul{padding-left:16px; margin:4px 0}
  .printSheet li{font-size:10.5px; line-height:1.55}
  .printSheet h5{font-size:10px; margin:8px 0 3px; color:#555; letter-spacing:.08em}
}

/* ---------- 响应式 ---------- */
@media (max-width:1040px){
  .panel{top:0; width:100%; max-width:none; border-left:none; z-index:60}
  .scrim{z-index:55}
  .layout.detail-open{padding-right:0}
  .card .more{opacity:1}
}
@media (max-width:720px){
  .bar{padding:0 16px; gap:10px}
  .app{padding:0 16px}
  .hero h1{font-size:26px}
  .heroStats{gap:22px}
  .tHead h1{font-size:23px}
  .wall{grid-template-columns:1fr}
  .crumb .sep,.crumb .cur{display:none}
}
</style>
</head>
<body>
<header class="bar">
  <a class="brand" href="#/"><span class="mark"></span><span>知识卡片库</span></a>
  <nav class="crumb" id="crumb"></nav>
  <div class="barActions" id="barActions"></div>
</header>

<main class="app" id="app"></main>

<aside class="panel" id="panel" aria-hidden="true" aria-label="卡片详情">
  <div class="pBar">
    <button class="iconBtn" id="pPrev" title="上一张（↑）">↑</button>
    <button class="iconBtn" id="pNext" title="下一张（↓）">↓</button>
    <span class="pPos" id="pPos"></span>
    <span class="spacer"></span>
    <button class="iconBtn" id="pClose" title="关闭（Esc）">✕</button>
  </div>
  <div class="pBody" id="pBody"></div>
</aside>
<div class="scrim" id="scrim"></div>
<section class="printSheet" id="printSheet"></section>

<script src="topics.js"></script>
<script>
const TOPICS = window.KB_TOPICS || [];
const loaded = {};
const state = { slug:null, topic:null, cardId:null, cardPushed:false, query:'', active:new Set(), visible:[] };
const $ = id => document.getElementById(id);

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function loadTopic(slug){
  if (loaded[slug]) return Promise.resolve(loaded[slug]);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'topics/' + slug + '/data.js';
    s.onload = () => { loaded[slug] = window.KB_TOPIC; resolve(window.KB_TOPIC); };
    s.onerror = () => reject(new Error('找不到专题数据：' + slug));
    document.head.appendChild(s);
  });
}
function parseHash(){
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const p = raw.split('/').filter(Boolean);
  return { slug: p[0] || null, cardId: p[1] || null };
}
function go(hash){ if (location.hash === hash) route(); else location.hash = hash; }

/* ---------------- 门户 ---------------- */
function renderPortal(){
  state.slug = null; state.topic = null; state.cardId = null; state.cardPushed = false;
  closePanel(true);
  document.title = '知识卡片库';
  $('crumb').innerHTML = '<span class="cur">全部专题</span>';
  $('barActions').innerHTML = '';

  const totalCards = TOPICS.reduce((n,t)=>n+(t.cards||0),0);
  const latest = TOPICS.map(t=>t.updated).sort().pop() || '';

  const topics = TOPICS.map(t => `
    <a class="topic" href="#/${encodeURIComponent(t.slug)}" style="--c:${esc(t.accent||'#1d4ed8')}">
      <div class="tTop"><span class="tBadge">技术专题</span><span>更新 ${esc(t.updated||'')}</span></div>
      <h2>${esc(t.title)}</h2>
      <p class="tSub">${esc(t.subtitle||'')}</p>
      <div class="tStats">
        <span><strong>${t.cards||0}</strong>卡片</span>
        <span><strong>${(t.layers||[]).length}</strong>分层</span>
      </div>
      <div class="tLayers">${(t.layers||[]).map(l=>`<span><i style="background:${esc(l.color)}"></i>${esc(l.name)} ${l.count}</span>`).join('')}</div>
      <div class="tFoot"><span>${(t.tags||[]).map(esc).join(' · ')}</span><span class="go">打开 →</span></div>
    </a>`).join('');

  $('app').innerHTML = `
    <div class="page">
      <section class="hero">
        <h1>知识卡片库</h1>
        <p class="lead">按技术专题归集的可复用知识卡。每张卡包含机制、代码落点、复用清单与面试表达，既能当资料库查，也能直接搬进项目或简历。</p>
        <div class="heroStats">
          <div><strong>${TOPICS.length}</strong><span>个专题</span></div>
          <div><strong>${totalCards}</strong><span>张卡片</span></div>
          <div><strong class="date">${esc(latest)}</strong><span>最近更新</span></div>
        </div>
      </section>
      <div class="sectionHead"><h2>全部专题</h2><span>点击进入；专题之间结构一致，可平行扩展</span></div>
      <section class="topics">
        ${topics}
        <button class="topic ghost" id="howto">
          <div class="plus">+</div>
          <h2>新增专题</h2>
          <p>在 topics/ 下新建目录，放入 data.js 与 cards/，再到 topics.js 注册一行。三步即可并列一个新的技术专题。</p>
          <div class="tFoot"><span>查看步骤</span><span class="go">→</span></div>
        </button>
      </section>
    </div>`;
  $('howto').onclick = openHelp;
  window.scrollTo(0,0);
}

/* ---------------- 专题 ---------------- */
function renderTopic(topic, cardId){
  state.slug = topic.slug; state.topic = topic; state.cardId = cardId || null;
  state.query = ''; state.active = new Set();
  document.title = topic.meta.title + ' · 知识卡片库';
  $('crumb').innerHTML = `<a href="#/">全部专题</a><span class="sep">/</span><span class="cur">${esc(topic.meta.title)}</span>`;
  $('barActions').innerHTML = `<button class="btn ghost" id="bPrint">打印 / PDF</button>`;

  const layers = topic.layers || [];
  const chips = `<button class="chip all on" data-layer="*"><span class="dot" style="background:var(--ink)"></span>全部<span class="n">${topic.cards.length}</span></button>` +
    layers.map(l=>`<button class="chip" data-layer="${esc(l.key)}" style="--c:${esc(l.color)}"><span class="dot"></span>${esc(l.name)}<span class="n">${l.count}</span></button>`).join('');

  const cards = topic.cards.map(c => {
    const L = layers.find(l=>l.key===c.layer) || {name:'',color:'#888'};
    return `<article class="card" data-id="${esc(c.id)}" data-layer="${esc(c.layer)}" style="--c:${esc(L.color)}" tabindex="0" role="button" aria-label="阅读 ${esc(c.id)} ${esc(c.title)}">
      <div class="meta"><span class="badge">${esc(L.name)}</span><span class="cid">${esc(c.id)}</span><span class="src">${esc(c.source)}</span></div>
      <h3>${esc(c.title)}</h3>
      <p class="one">${esc(c.oneliner)}</p>
      <div class="tags">${c.tags.map(t=>`<span>#${esc(t)}</span>`).join('')}</div>
      <span class="more">阅读 →</span>
    </article>`;
  }).join('');

  $('app').innerHTML = `
    <div class="page">
      <div class="layout" id="layout">
        <div class="tHead">
          <h1>${esc(topic.meta.title)}</h1>
          <p class="sub">${esc(topic.meta.subtitle||'')}</p>
          <div class="tMeta">
            <span class="pill">${topic.cards.length} 张卡片</span>
            <span class="pill">${layers.length} 个分层</span>
            <span class="pill">更新 ${esc(topic.meta.updated)}</span>
            <span>${esc(topic.meta.source||'')}</span>
          </div>
        </div>
        <div class="toolbar">
          <div class="toolRow">
            <div class="search"><input id="q" type="search" placeholder="搜索概念、类名、配置项、面试问题…（按 / 聚焦）" autocomplete="off"></div>
          </div>
          <div class="chips" id="chips">${chips}</div>
        </div>
        <p class="count" id="count"></p>
        <div class="wall" id="wall">${cards}</div>
        <div class="empty" id="empty" hidden>没有匹配的卡片。试试「护栏」「Context」「Graph」或类名。</div>
      </div>
    </div>`;

  $('q').addEventListener('input', e => { state.query = e.target.value.trim().toLowerCase(); applyFilter(); });
  $('q').addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.target.value=''; state.query=''; applyFilter(); e.target.blur(); }
    if (e.key === 'Enter' && state.visible.length) openCard(state.visible[0].id);
  });
  $('chips').addEventListener('click', e => {
    const btn = e.target.closest('.chip'); if (!btn) return;
    const key = btn.dataset.layer;
    if (key === '*') { state.active.clear(); document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on')); btn.classList.add('on'); }
    else {
      document.querySelector('.chip.all').classList.remove('on');
      if (state.active.has(key)) { state.active.delete(key); btn.classList.remove('on'); }
      else { state.active.add(key); btn.classList.add('on'); }
      if (!state.active.size) document.querySelector('.chip.all').classList.add('on');
    }
    applyFilter();
  });
  $('wall').addEventListener('click', e => {
    const card = e.target.closest('.card'); if (card) openCard(card.dataset.id);
  });
  $('wall').addEventListener('keydown', e => {
    const card = e.target.closest('.card'); if (!card) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(card.dataset.id); }
  });
  $('bPrint').onclick = printTopic;

  applyFilter();
  window.scrollTo(0,0);
  if (state.cardId) openCard(state.cardId, true);
}

function applyFilter(){
  const cards = [...document.querySelectorAll('.card')];
  const topic = state.topic; const byId = Object.fromEntries(topic.cards.map(c=>[c.id,c]));
  state.visible = [];
  cards.forEach(el => {
    const c = byId[el.dataset.id];
    const layerOk = state.active.size === 0 || state.active.has(c.layer);
    const hay = [c.title,c.oneliner,c.mechanism.join(' '),c.code.join(' '),c.reuse.join(' '),c.interview,c.pitfall,c.tags.join(' '),c.source].join(' ').toLowerCase();
    const ok = layerOk && (!state.query || hay.includes(state.query));
    el.hidden = !ok;
    if (ok) state.visible.push(c);
  });
  $('count').textContent = `显示 ${state.visible.length} / ${topic.cards.length} 张`;
  $('empty').hidden = state.visible.length !== 0;
  if (state.cardId && !state.visible.some(c=>c.id===state.cardId)) closePanel();
}

function cardBody(c){
  const L = (state.topic.layers||[]).find(l=>l.key===c.layer) || {name:'',color:'#888'};
  const sec = (title, inner, cls='') => `<div class="sec ${cls}"><h4>${title}</h4>${inner}</div>`;
  return `
    <div class="pMeta" style="--c:${esc(L.color)}"><span class="badge" style="--c:${esc(L.color)}">${esc(L.name)}</span><span class="cid">${esc(c.id)}</span><span>${esc(c.source)}</span></div>
    <h2>${esc(c.title)}</h2>
    <p class="pOne">${esc(c.oneliner)}</p>
    <div class="pTags">${c.tags.map(t=>`<span>#${esc(t)}</span>`).join('')}</div>
    ${sec('机制','<ul>'+c.mechanism.map(m=>`<li>${esc(m)}</li>`).join('')+'</ul>')}
    ${sec('代码落点','<ul class="code">'+c.code.map(x=>{const i=x.indexOf('：');return `<li>${i>0?`<code>${esc(x.slice(0,i))}</code>${esc(x.slice(i))}`:`<code>${esc(x)}</code>`}</li>`;}).join('')+'</ul>')}
    ${sec('复用清单','<ul>'+c.reuse.map(m=>`<li>${esc(m)}</li>`).join('')+'</ul>')}
    ${sec('面试一句话',`<p>${esc(c.interview)}</p>`,'quote')}
    ${sec('常见坑',`<p>${esc(c.pitfall)}</p>`,'pit')}
    <div class="pFoot"><button class="btn" id="pCopy">复制 Markdown</button><span class="hint">来源 ${esc(c.source)}</span></div>`;
}

function openCard(id, silent){
  const c = state.topic.cards.find(x=>x.id===id); if (!c) return;
  const hadOpen = !!state.cardId || silent;
  state.cardId = id;
  document.querySelectorAll('.card').forEach(el=>el.classList.toggle('sel', el.dataset.id===id));
  const panel = $('panel'); const body = $('pBody');
  const L = (state.topic.layers||[]).find(l=>l.key===c.layer) || {color:'#888'};
  body.style.setProperty('--c', L.color);
  body.innerHTML = cardBody(c);
  panel.classList.add('open'); panel.setAttribute('aria-hidden','false');
  $('layout') && $('layout').classList.add('detail-open');
  if (window.innerWidth < 1041) { document.body.classList.add('panel-open'); $('scrim').classList.add('on'); }
  body.scrollTop = 0;
  updatePos();
  $('pCopy').onclick = () => copyCard(c, $('pCopy'));
  const target = '#/' + state.slug + '/' + id;
  if (silent) return;
  if (hadOpen || state.cardPushed) history.replaceState(null, '', target);
  else { history.pushState(null, '', target); state.cardPushed = true; }
}

function closePanel(silent){
  state.cardId = null;
  $('panel').classList.remove('open'); $('panel').setAttribute('aria-hidden','true');
  $('layout') && $('layout').classList.remove('detail-open');
  document.body.classList.remove('panel-open'); $('scrim').classList.remove('on');
  document.querySelectorAll('.card.sel').forEach(el=>el.classList.remove('sel'));
  if (silent) return;
  if (state.cardPushed) { state.cardPushed = false; history.back(); return; }
  history.replaceState(null, '', '#/' + state.slug);
}

function updatePos(){
  const i = state.visible.findIndex(c=>c.id===state.cardId);
  $('pPos').textContent = i >= 0 ? `${i+1} / ${state.visible.length}` : '';
  $('pPrev').disabled = i <= 0;
  $('pNext').disabled = i < 0 || i >= state.visible.length-1;
}
function step(d){
  const i = state.visible.findIndex(c=>c.id===state.cardId); if (i < 0) return;
  const j = i + d; if (j < 0 || j >= state.visible.length) return;
  openCard(state.visible[j].id);
}

function markdown(c){
  const L = (state.topic.layers||[]).find(l=>l.key===c.layer) || {name:''};
  const lines = ['---',`id: ${c.id}`,`layer: ${L.name}`,`title: ${c.title}`,`source: ${c.source}`,`tags: [${c.tags.join(', ')}]`,'---','',`# ${c.id} ${c.title}`,'',`> ${c.oneliner}`,'','## 机制',''];
  c.mechanism.forEach(m=>lines.push('- '+m));
  lines.push('','## 代码落点','');
  c.code.forEach(x=>{const i=x.indexOf('：');lines.push(i>0?`- \`${x.slice(0,i)}\`${x.slice(i)}`:`- \`${x}\``);});
  lines.push('','## 复用清单','');
  c.reuse.forEach(m=>lines.push('- '+m));
  lines.push('','## 面试一句话','',c.interview,'','## 常见坑','',c.pitfall);
  return lines.join('\n');
}
async function copyCard(c, btn){
  const text = markdown(c);
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; }
  catch {
    const ta = document.createElement('textarea'); ta.value = text;
    ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    document.body.removeChild(ta);
  }
  btn.textContent = ok ? '已复制' : '复制失败，请手动选择';
  setTimeout(()=>btn.textContent='复制 Markdown', 1400);
}

/* ---------------- 帮助面板 ---------------- */
function openHelp(){
  const panel = $('panel'), body = $('pBody');
  body.style.setProperty('--c','#1d4ed8');
  body.innerHTML = `
    <div class="pMeta" style="--c:#1d4ed8"><span class="badge" style="--c:#1d4ed8">使用说明</span><span>知识库扩展</span></div>
    <h2>新增一个平行专题</h2>
    <p class="pOne">专题之间互相独立，结构完全一致。新增一个技术主题时，三步就位，门户会自动多出一张卡。</p>
    <ol class="helpSteps">
      <li>在 <code>topics/</code> 下新建目录，例如 <code>topics/mysql-tuning/</code>，把模板 <code>topics/_template/</code> 里的 <code>data.js</code> 复制进去，再建一个 <code>cards/</code> 放 Markdown。</li>
      <li>修改 <code>data.js</code>：填 <code>meta</code>（标题、副标题、描述、标签、更新日期、主题色），填 <code>layers</code>（这一专题的分层），填 <code>cards</code>（卡片数组，字段与现有卡片一致）。</li>
      <li>在根目录 <code>topics.js</code> 的数组里追加一条：<code>{slug, title, subtitle, tags, updated, accent, cards, layers}</code>。卡片数与分层数写在这里，门户直接展示，不需要加载全部数据。</li>
    </ol>
    <div class="sec"><h4>卡片字段</h4><ul class="code">
      <li><code>id</code> 编号，建议 <code>层-序号</code>，如 <code>L-03</code></li>
      <li><code>layer</code> 分层 key，与 layers 对应</li>
      <li><code>title / oneliner</code> 标题与一句话</li>
      <li><code>mechanism / code / reuse</code> 三个字符串数组</li>
      <li><code>interview / pitfall / source / tags</code> 面试表达、常见坑、来源、标签</li>
    </ul></div>
    <div class="sec quote"><p>主题色只影响卡片顶部与徽标；分层颜色写在 layers 里，同一专题内保持一致。</p></div>`;
  panel.classList.add('open'); panel.setAttribute('aria-hidden','false');
  $('layout') && $('layout').classList.add('detail-open');
  if (window.innerWidth < 1041) { document.body.classList.add('panel-open'); $('scrim').classList.add('on'); }
  body.scrollTop = 0;
  $('pPos').textContent = '';
  $('pPrev').disabled = true; $('pNext').disabled = true;
}

/* ---------------- 打印 ---------------- */
function buildPrint(){
  const sheet = $('printSheet');
  const cards = state.visible.length ? state.visible : (state.topic ? state.topic.cards : []);
  const title = state.topic ? state.topic.meta.title : '知识卡片库';
  sheet.innerHTML = `<h2 style="font-size:20px;margin:0 0 4px">${esc(title)}</h2>
    <p style="font-size:11px;color:#555;margin:0 0 16px">共 ${cards.length} 张 · 生成于 ${new Date().toLocaleDateString('zh-CN')}</p>` +
    cards.map(c=>{
      const L = (state.topic.layers||[]).find(l=>l.key===c.layer)||{name:''};
      return `<div class="pItem">
        <div class="pMeta">${esc(L.name)} · ${esc(c.id)} · ${esc(c.source)}</div>
        <h3>${esc(c.title)}</h3>
        <p class="one">${esc(c.oneliner)}</p>
        <h5>机制</h5><ul>${c.mechanism.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>
        <h5>代码落点</h5><ul>${c.code.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        <h5>复用清单</h5><ul>${c.reuse.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>
        <h5>面试一句话</h5><p class="one">${esc(c.interview)}</p>
        <h5>常见坑</h5><p class="one">${esc(c.pitfall)}</p>
      </div>`;
    }).join('');
}
function printTopic(){ buildPrint(); setTimeout(()=>window.print(), 80); }
window.addEventListener('beforeprint', () => { if (state.topic) buildPrint(); });

/* ---------------- 路由与全局按键 ---------------- */
function route(){
  const { slug, cardId } = parseHash();
  if (!slug) return renderPortal();
  if (state.slug === slug && state.topic) {
    if (cardId && state.topic.cards.some(c=>c.id===cardId)) openCard(cardId, true);
    else if (!cardId) { state.cardPushed = false; closePanel(true); }
    return;
  }
  loadTopic(slug).then(topic => renderTopic(topic, cardId)).catch(err => {
    $('app').innerHTML = `<div class="page"><div class="empty">${esc(err.message)}<br><br><a class="btn" href="#/">返回门户</a></div></div>`;
  });
}
window.addEventListener('hashchange', route);

$('pClose').onclick = () => { if (state.topic) closePanel(); else { closePanel(true); history.replaceState(null,'','#/'); renderPortal(); } };
$('pPrev').onclick = () => step(-1);
$('pNext').onclick = () => step(1);
$('scrim').onclick = () => { state.topic ? closePanel() : $('pClose').onclick(); };
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1041) { document.body.classList.remove('panel-open'); $('scrim').classList.remove('on'); }
  else if ($('panel').classList.contains('open')) { document.body.classList.add('panel-open'); $('scrim').classList.add('on'); }
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if (e.key === '/' && !typing) { const q=$('q'); if (q) { e.preventDefault(); q.focus(); } }
  if (e.key === 'Escape') {
    if ($('panel').classList.contains('open')) { state.topic ? closePanel() : $('pClose').onclick(); }
    else if (typing) document.activeElement.blur();
  }
  if (!typing && $('panel').classList.contains('open')) {
    if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); step(1); }
  }
});

route();
</script>
</body>
</html>
"""


def write_app():
    with open(os.path.join(LIB, "index.html"), "w", encoding="utf-8") as f:
        f.write(APP_HTML)


def write_template():
    tpl_dir = os.path.join(LIB, "topics", "_template")
    os.makedirs(os.path.join(tpl_dir, "cards"), exist_ok=True)
    tpl = {
        "slug": "your-topic",
        "meta": {
            "title": "新专题标题",
            "subtitle": "一句话说明这个专题解决什么问题",
            "description": "专题简介，会显示在门户卡片上。",
            "source": "来源说明",
            "updated": TODAY,
            "accent": "#0f766e",
            "tags": ["标签1", "标签2"],
        },
        "layers": [
            {"key": "A", "name": "第一层", "en": "Layer A", "color": "#0f766e", "desc": "这一层回答什么", "count": 1},
            {"key": "B", "name": "第二层", "en": "Layer B", "color": "#b45309", "desc": "这一层回答什么", "count": 0},
        ],
        "cards": [{
            "id": "A-01",
            "layer": "A",
            "title": "示例卡片标题",
            "oneliner": "一句话说清这张卡的核心结论。",
            "mechanism": ["机制第一条", "机制第二条"],
            "code": ["类名或配置项：说明"],
            "reuse": ["复用清单第一条"],
            "interview": "面试时的一句话表达。",
            "pitfall": "最常见的错误做法。",
            "source": "来源：章节或文档",
            "tags": ["示例"],
        }],
    }
    with open(os.path.join(tpl_dir, "data.js"), "w", encoding="utf-8") as f:
        f.write("// 复制本文件到 topics/<你的专题>/data.js，改完内容后在 topics.js 注册。\n")
        f.write("window.KB_TOPIC = " + json.dumps(tpl, ensure_ascii=False, indent=1) + ";\n")
    readme = """# 专题模板

复制整个 `_template` 目录，改名为你的专题 slug（例如 `mysql-tuning`），然后：

1. 修改 `data.js` 里的 `meta`、`layers`、`cards`。
2. 把 Markdown 卡片放进 `cards/`，文件名建议 `编号-标题.md`。
3. 在根目录 `topics.js` 追加一条注册信息。

门户只读取 `topics.js`，不会被 `_template` 干扰。
"""
    with open(os.path.join(tpl_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme)


def write_root_readme():
    readme = f"""# 知识卡片库

按技术专题归集的可复用知识卡。一个专题一个目录，门户并列展示，后续可以继续添加别的技术主题。

## 目录结构

```
知识卡片/
├── index.html              门户与阅读器（所有专题共用，不用改）
├── topics.js               专题注册表（新增专题改这里）
├── topics/
│   ├── _template/          空白模板
│   └── agent-loop-graph/
│       ├── data.js         本专题的分层与卡片数据
│       ├── README.md       专题索引
│       └── cards/          87 个 Markdown 卡片
└── README.md
```

## 打开方式

双击 `index.html`，或在浏览器里打开。地址形如：

- 门户：`index.html`
- 专题：`index.html#/agent-loop-graph`
- 某张卡：`index.html#/agent-loop-graph/L-03`

## 阅读器

- 点卡片，详情在右侧面板打开，独立滚动，卡片墙不会被撑长。
- `↑ ↓` 或 `j k` 切换上一张、下一张；`Esc` 关闭；`/` 聚焦搜索。
- 搜索覆盖标题、机制、类名、配置项、面试表达；分层 chips 可多选。
- 「打印 / PDF」按当前筛选结果导出，每张卡独立分页。

## 新增一个专题

1. 复制 `topics/_template/` 到 `topics/<slug>/`。
2. 改 `data.js`：`meta`（标题、副标题、描述、标签、更新日期、主题色）、`layers`（分层）、`cards`（卡片数组）。
3. 在 `topics.js` 追加一条：`{{slug, title, subtitle, tags, updated, accent, cards, layers}}`。
4. 刷新门户，新专题会作为并列卡片出现。

卡片字段见 `topics/_template/README.md`，或直接对照 `topics/agent-loop-graph/data.js`。

## 当前专题

- `agent-loop-graph`：Agent Loop + Graph 工程化，{len(CARDS)} 张卡片，8 个分层。
"""
    with open(os.path.join(LIB, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme)


if __name__ == "__main__":
    if os.path.isdir(LIB):
        shutil.rmtree(LIB)
    os.makedirs(TOPIC_DIR)
    layers, index = build_topic()
    write_topics_js(layers)
    write_app()
    write_template()
    write_root_readme()
    print("topic cards:", len(CARDS), "layers:", len(layers))
    for l in layers:
        print(" ", l["key"], l["count"])
