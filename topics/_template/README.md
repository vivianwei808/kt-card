# 专题模板

复制整个 `_template` 目录，改名为你的专题 slug（例如 `mysql-tuning`），然后：

1. 修改 `data.js` 里的 `meta`、`layers`、`cards`。
2. 把 Markdown 卡片放进 `cards/`，文件名建议 `编号-标题.md`。
3. 在根目录 `topics.js` 追加一条注册信息。

门户只读取 `topics.js`，不会被 `_template` 干扰。
