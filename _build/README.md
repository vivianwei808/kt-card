# 生成脚本

`data.js`、`cards/*.md`、`topics.js` 由这几个文件生成，跑一遍就整体重写：

```bash
python3 render2.py
```

- `layers.py` 八个分层定义（key、名称、颜色、说明）。
- `cards_mpc.py`  M/P/C 三层共 19 张卡。
- `cards_lh.py`   L/H 两层共 30 张卡。
- `cards_igr.py`  I/G/R 三层共 38 张卡。
- 输出目录写死在 `render2.py` 里的 `LIB`，换机器先改这一行。

后续加卡片有两条路：直接改 `topics/agent-loop-graph/data.js`（快，但重跑脚本会覆盖）；或者改这三个卡片模块再重跑（内容留档，推荐）。两种方式都能用，选一种坚持就行。
