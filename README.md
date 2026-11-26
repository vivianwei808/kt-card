# 知识卡片库

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
├── _build/                生成脚本（可选，重跑会重写 data.js 与 cards）
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
3. 在 `topics.js` 追加一条：`{slug, title, subtitle, tags, updated, accent, cards, layers}`。
4. 刷新门户，新专题会作为并列卡片出现。

卡片字段见 `topics/_template/README.md`，或直接对照 `topics/agent-loop-graph/data.js`。

## 当前专题

- `agent-loop-graph`：Agent Loop + Graph 工程化，87 张卡片，8 个分层。
